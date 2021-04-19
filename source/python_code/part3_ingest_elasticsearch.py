from elasticsearch import Elasticsearch
from glob import glob
import json
import requests
import os
import time
# settings
# make sure you run the elastic search server using command line first so that on port 9200 it's listening to you
ES_CLUSTER = 'http://localhost:9200/'
ES_INDEX = 'hw3_part2_viz_inputs'
ES_TYPE = 'json'

def add_json_files_to_es(es, directory_glob):
    json_docs = []
    i = 1
    
    files_glob = glob(directory_glob)
    files_glob.sort()
    for filename in files_glob:
        if filename.endswith(".json"):
            f = open(filename)
            docket_content = f.read()
            # send the data into ES 
            es.index(ES_INDEX, ignore=400, doc_type=ES_TYPE, id=i, body=json.loads(docket_content))
            i+=1
    return json_docs


if __name__ == "__main__":
    # res = requests.get('http://localhost:9200')
    es = Elasticsearch()
    
    json_docs = add_json_files_to_es(es, os.getcwd() + "/data/input_part3/*")
    response = es.get(index=ES_INDEX,doc_type=ES_TYPE,id=1)
    print(response)