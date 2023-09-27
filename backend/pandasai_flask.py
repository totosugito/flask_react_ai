import json

import pandasai
from flask import Flask, request

import pandas as pd
from pandasai import SmartDataframe
import openai_api_key

openai_api_key = openai_api_key.KEY

default_data = {
    "country": ["United States", "United Kingdom", "France", "Germany", "Italy", "Spain", "Canada", "Australia",
                "Japan", "China"],
    "gdp": [19294482071552, 2891615567872, 2411255037952, 3435817336832, 1745433788416, 1181205135360,
            1607402389504, 1490967855104, 4380756541440, 14631844184064],
    "happiness_index": [6.94, 7.16, 6.66, 7.07, 6.38, 6.4, 7.23, 7.22, 5.87, 5.12]
}

HTTP_SUCCESS = 200
HTTP_FAILED = 501


class MyDataFrame:
    def __init__(self):
        self.df = None
        self.call_API = None
        self.llm = None

    def create_chat_api(self):
        # create chat KEY
        from pandasai.llm import OpenAI
        if self.llm is None:
            self.llm = OpenAI(api_token=openai_api_key)

    def data_is_ready(self):
        # check if data is ready
        if self.call_API is None:
            self.create_default_data()

    def create_default_data(self):
        print("------------ create_default_data ---------------")
        self.set_data_frame(default_data)

    def set_data_frame(self, obj):
        try:
            self.create_chat_api()
            self.df = pd.DataFrame(obj)
            self.call_API = SmartDataframe(self.df, config={"llm": self.llm})
            return "Successful upload the new data", HTTP_SUCCESS
        except:
            return "Failed to upload the data", HTTP_FAILED

    def reformat_response(self, question, response):
        # print("---------", question, response, type(response))
        try:
            # -----------------------------------
            # return INTEGER
            # -----------------------------------
            if isinstance(response, int):
                return 'text', str(response)

            # -----------------------------------
            # return SmartDataframe
            # -----------------------------------
            if isinstance(response, pandasai.smart_dataframe.SmartDataframe):
                from backend.convert_data import smart_data_frame_to_json
                return 'SmartDataframe', smart_data_frame_to_json(response)
            else:
                # -----------------------------------
                # return FigureCanvas/PlotLy
                # -----------------------------------
                if "'FigureCanvas'" in response:
                    import chartgpt as cg
                    chart = cg.Chart(self.df, api_key=openai_api_key)
                    fig = chart.plot(question, return_fig=True)

                    # create formatted plotpy object
                    return 'plotly', {"data": json.loads(fig.data[0].to_json()),
                                      "layout": json.loads(fig.layout.to_json())}

                # -----------------------------------
                # return String
                # -----------------------------------
                else:
                    return 'text', response
        except:
            obj = {"status": "Error", "retType": type(response)}
            return 'error', json.loads(obj)

    def get_answer(self, question):
        import random
        random_id = random.randint(0, 1000000)

        # --------------------------
        # return response_type :
        # --------------------------
        # error --> error
        # unknown --> pandasai can not get response from user question
        # text  --> string data type
        # SmartDataframe  --> python data frame format
        # plotly --> plotly chart object

        self.data_is_ready()
        if self.call_API is None:
            return {'id': random_id, 'user': 'ai', 'question': question, 'type': 'error',
                    'response': 'No license found'}, HTTP_SUCCESS

        answer = self.call_API.chat(question)
        if answer is None:
            return {'id': random_id, 'user': 'ai', 'question': question, 'type': 'error',
                    'response': 'No result'}, HTTP_SUCCESS

        response_type, response = self.reformat_response(question=question, response=answer)

        # not sure the problem. Sometimes return error message :
        # Invalid Input Error: Required module 'pandas.core.arrays.arrow.dtype' failed to import,
        # due to the following Python exception: ModuleNotFoundError: No module named 'pandas.core.arrays.arrow.dtype'
        # try to send the question ...
        if "'pandas.core.arrays.arrow.dtype'" in response:
            answer = self.call_API.chat(question)
            if answer is None:
                return {'id': random_id, 'user': 'ai', 'question': question, 'type': 'unknown',
                        'response': "No result"}, HTTP_SUCCESS

            response_type, response = self.reformat_response(question=question, response=answer)
            return {'id': random_id, 'user': 'ai', 'question': question, 'type': response_type,
                    'response': response}, HTTP_SUCCESS
        else:
            return {'id': random_id, 'user': 'ai', 'question': question, 'type': response_type,
                    'response': response}, HTTP_SUCCESS


# -------------------------------------------------------
# CREATE FLASK ROUTER
# -------------------------------------------------------
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/test")
def test():
    # testing the router
    return "<p>Hello, World!</p>"


@app.route('/send-question', methods=['POST'])
def send_question():
    # send the question to dataframe
    question = request.form['question']
    return mdf.get_answer(question=question)


@app.route('/set-data-frame', methods=['POST'])
def set_data_frame():
    # replace data frame
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        body = request.json
    else:
        body = 'Content-Type not supported!'

    return mdf.set_data_frame(obj=body)


mdf = MyDataFrame()
if __name__ == '__main__':
    app.run(debug=True, port=8001)
