import os

import openai_api_key
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS

os.environ["OPENAI_API_KEY"] = openai_api_key.KEY


def init_db(db_name):
    vector_index = FAISS.load_local(db_name, OpenAIEmbeddings())
    retriever = vector_index.as_retriever(search_type="similarity", search_kwargs={"k": 6})
    qa_interface = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(),
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
    )
    return qa_interface


if __name__ == '__main__':
    qa = init_db("db/sample_invoice")
    # qa = init_db("db/sample_grade")

    while True:
        user_text = input("user : ")
        if user_text == "q":
            break
        else:
            response = qa(user_text)
            print("AI : " + response["result"])
