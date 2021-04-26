from elasticsearch import Elasticsearch
from elasticsearch.helpers import scan
from glob import glob
import json
import requests
import os
import time
import pandas as pd
# settings
# make sure you run the elastic search server using command line first so that on port 9200 it's listening to you
ES_CLUSTER = 'http://localhost:9200/'
ES_INDEX = 'hw3_part2_viz_inputs_all'
ES_TYPE = 'json'

# part1_df = pd.read_csv(os.getcwd() + "/data/hw2_data_final.tsv", sep="\t", index=False)
# part1_df.to_json(os.getcwd()+ "/data/input_part3/task1_data.json")



def add_json_files_to_es(es, directory_glob):
    json_docs = []
    i = 1
    
    files_glob = glob(directory_glob)
    files_glob.sort()
    for filename in files_glob:
        if filename.endswith(".json"):
            print(f"{filename}")
            json_docs.append(filename)
            f = open(filename)
            docket_content = f.read()
            # send the data into ES 
            es.index(ES_INDEX, ignore=400, doc_type=ES_TYPE, id=i, body=json.loads(docket_content), request_timeout=30)
            i+=1
    return json_docs


if __name__ == "__main__":
    
    es = Elasticsearch()
    #json_docs = add_json_files_to_es(es, os.getcwd() + "/data/input_part3/*")
    
    # get all the documents indexed by the elasticsearch
    es_response = scan(
        es,
        index=ES_INDEX,
        doc_type=ES_TYPE,
        query={"query": { "match_all" : {}}}
    )

    i = 1
    for item in es_response:
        with open(f"part5_indices_{i}.json", "w+") as file_write:
            json.dump(item, file_write)
        i+=1
        print(f"process {i} item")
