from scraper.github import queryManager as qm

# Take all input lists, process, and write back to file

# Primary Inputs

inputLists = qm.DataManager("../input_lists.json", True)

print("Cleaning primary input lists...")

# normalize everything except for the API environment key - note that object keys will also be sorted
for hostUrl in inputLists.data.keys():
    inputLists.data[hostUrl]["repoType"] = inputLists.data[hostUrl]["repoType"].lower()
    for hostInfo in ["memberOrgs", "orgs", "repos"]:
        print("\t%s: %s" % (hostUrl, hostInfo))
        listWIP = [
            x.lower() for x in inputLists.data[hostUrl][hostInfo]
        ]  # Standardize as all lowercase
        listWIP = list(set(listWIP))  # Remove duplicates
        listWIP.sort()  # List in alphabetical order
        inputLists.data[hostUrl][hostInfo] = listWIP

inputLists.fileSave(newline="\n")

print("Primary input lists cleaned!")
