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


with open(os.getcwd() + '/data/processed_hw3_inputs_latest.json', "rb") as file_in:
    input_data = json.load(file_in)

documents = []

def calculate_levenshtein_distance_and_ratio(s, t, use_ratio=False):
    """
    calcualte levenshtein distance between two strings and its ratio
    """
    rows = len(s) + 1
    cols = len(t) + 1
    matrix = np.zeros((rows, cols), dtype=int)

    for i in range(1, rows):
        for j in range(1, cols):
            matrix[i][0] = i
            matrix[0][j] = j
    
    for row in range(1, rows):
        for col in range(1, cols):
            if s[row - 1] == t[col - 1]:
                cost = 0
            else:
                # In order to align the results with those of the Python Levenshtein package, if we choose to calculate the ratio
                # the cost of a substitution is 2. If we calculate just distance, then the cost of a substitution is 1.
                if use_ratio:
                    cost = 2
                else:
                    cost = 1
            matrix[row][col] =min(matrix[row - 1][col]+ 1,  # Cost of deletions
                                  matrix[row][col - 1] + 1, # Cost of insertions
                                  matrix[row - 1][col - 1] + cost) # Cost of substitutions
    
    if use_ratio:
        ratio = ((len(s) + len(t)) - matrix[rows-1][cols-1]) / (len(s) + len(t))
        return ratio
    else:
        return f"the strings are {matrix[rows - 1][cols - 1]} away"

for k in input_data["TTR'ed extracted text"].keys():
    documents.append(input_data["TTR'ed extracted text"][k][1:-1].lower())

for k in input_data["part4_800_emails_generated_used_for_Grover"].keys():
    if input_data["part4_800_emails_generated_used_for_Grover"][k] == 0: continue
    documents.append(input_data["part4_800_emails_generated_used_for_Grover"][k][1:-1].lower())

## OLD METHOD: FUZZY MATCH USING LEVENSHTEIN DISTANCE
# word2clusters = {}
# # for each string in the documents
# # then use levenshtein distance to calculate the top 10 words 
# def prepare_other_words(texts, i):
#     res = []
#     for j in range(len(texts)):
#         if (j==i):continue
#         res.append(texts[j])
#     return res
# for i in range(len(documents)):
    
#     word2cluster = {}
#     word2cluster["word"] = documents[i]
#     str2match = documents[i]
#     str_options = prepare_other_words(documents, i)

#     #ratios=process.extract(str2match, str_options)
#     all_similar_words = process.extractBests(str2match, str_options, limit=5)
#     word2cluster["cluster"] = all_similar_words
#     word2clusters[i]=word2cluster
#     print(f"process {i}")


# with open("hw3_part2_viz_4.json", "w") as file_write:
#     json.dump(word2clusters, file_write)

## NEW Method, using K-means 
doc_train, doc_test = train_test_split(documents, test_size=0.33, random_state=42)
vectorizer = TfidfVectorizer(stop_words="english")
X = vectorizer.fit_transform(doc_train)

true_k = 2
model = KMeans(n_clusters=true_k, init="k-means++", max_iter=100, n_init=1)
model.fit(X)

order_centroids = model.cluster_centers_.argsort()[:,::-1]
terms = vectorizer.get_feature_names()

for i in range(true_k):
    print("\n")
    print("Clusters %d" % i)
    for ind in order_centroids[i, :10]:
        print("%s" % terms[ind])

print("Prediction")
centroid2labels = {}
centroid2labels[0] = []
centroid2labels[1] = []
for i in range(len(doc_test)):
    test_input = vectorizer.transform(doc_test)
    pred = model.predict(test_input)
    most_likely_pred = stats.mode(pred)
    centroid2labels[most_likely_pred.mode[0]].append(doc_test[i])
    print(f"processed {i} test doc")

with open("hw3_part2_viz4.json", "w") as fileWrite:
    json.dump(centroid2labels, fileWrite)
fileWrite.close()
