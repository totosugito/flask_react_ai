from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import PyPDF2
import openai_api_key

os.environ["OPENAI_API_KEY"] = openai_api_key.KEY


def save_to_db(db_name, all_texts):
    # split the pdf text
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.create_documents([all_texts])

    # create vector database
    vector_index = FAISS.from_documents(texts, OpenAIEmbeddings())
    vector_index.save_local(db_name)


def save_pdf_to_db(file_name, db_name):
    # read pdf file
    pdf_file_obj = open(file_name, "rb")
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
    num_pages = len(pdf_reader.pages)
    detected_text = ""

    for page_num in range(num_pages):
        page_obj = pdf_reader.pages[page_num]
        detected_text += page_obj.extract_text() + "\n\n"
    pdf_file_obj.close()

    # save to db
    save_to_db(db_name, all_texts=detected_text)


def save_text_to_db(file_name, db_name):
    detected_text = ''
    with open(file_name) as f:
        detected_text = f.read()

    # save to db
    save_to_db(db_name, all_texts=detected_text)


if __name__ == '__main__':
    save_pdf_to_db("./data/sample_invoice.pdf", "db/sample_invoice")
    # save_text_to_db("./data/sample_grade.csv", "db/sample_grade")

