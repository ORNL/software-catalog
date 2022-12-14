# A Python program to read the intRepo_Metadata.json file and print a list of topics.

import json
import os

# Printing the directory of this scipt.
fileDir = os.path.dirname(os.path.abspath(__file__))

# Changing the directory of this scipt.
os.chdir(fileDir)

# Opening the JSON file.
inputFile = open('../../explore/github-data/intRepo_Metadata.json')

# Loading the JSON file into a Python dictionary.
data = json.load(inputFile)

all_topics = []

# Iterating through the JSON file and generating the all_topics array.
for i in data:
    repoName = data[i]
    if "topics" in repoName.keys():
        topics = repoName.get('topics')

        # If if the topic is NULL...
        if topics is not None:

            # Print the topic(s) for each repository.
            # print(topics)

            for t in topics:
                all_topics.append(t)

# Alphabetically sorting the topics, removing any duplicates, printing, and counting them.
for i in sorted(set(all_topics)):
    print(i, all_topics.count(i))
