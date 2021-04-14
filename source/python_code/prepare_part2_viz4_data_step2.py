import os
import json
import pandas as pd
import numpy as np
import sklearn
import numpy
from fuzzywuzzy import process
from sklearn.model_selection import train_test_split
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy import stats
from random import uniform

########### Assign coordinates information#######################
### 0 cluser centroid is [0,1,0]
### 1 cluster centroid is [0, 3, 5]
with open(os.getcwd() + "/data/hw3_part2_viz4.json", "r") as file_read:
    input_data = json.load(file_read)
emails2coordinate = {}
emails2coordinate["0"] = []
emails2coordinate["1"] = []
coordinates = {}
coordinates['x0'] = []
coordinates['y0'] = []
coordinates['z0'] = []
coordinates['email0'] = []
coordinates['x1'] = []
coordinates['y1'] = []
coordinates['z1'] = []
coordinates['email1'] = []

for k in input_data.keys():

    email2coordinate = {}
    if k == "0":
        for row in input_data[k]:
            email2coordinate["x"] = uniform(0.0, 3.0)
            email2coordinate["y"] = uniform(0.0, 3.0)
            email2coordinate["z"] = uniform(0.0, 3.0)
            coordinates['x0'].append(email2coordinate["x"])
            coordinates['y0'].append(email2coordinate["y"])
            coordinates['z0'].append(email2coordinate["z"])
            coordinates['email0'].append(row)
            email2coordinate["email"] = row
            emails2coordinate["0"].append(email2coordinate)
    if k=="1":
        for row in input_data[k]:
            email2coordinate["x"] = uniform(3.5, 6.0)
            email2coordinate["y"] = uniform(4.5, 5.5)
            email2coordinate["z"] = uniform(3.5, 4.0)
            coordinates['x1'].append(email2coordinate["x"])
            coordinates['y1'].append(email2coordinate["y"])
            coordinates['z1'].append(email2coordinate["z"])
            coordinates['email1'].append(row)
            email2coordinate["email"] = row
            emails2coordinate["1"].append(email2coordinate)
        

# with open("hw3_part2_viz4_data_with_coords_split.json","w") as file_write:
#     json.dump(coordinates, file_write)
# file_write.close()

with open(os.getcwd() + "/data/hw3_part2_viz4_data_with_coords_split.json", "r") as file_read:
    output_json = json.load(file_read)

df = pd.DataFrame.from_dict(output_json)

df.to_csv("hw3_part2_viz4_input_split.csv",index=False)



