import os
from glob import glob


def process_list_to_ascending(files_list, save_directory, name):
    """
    assume your working directory is the project root directory, outside the source folder
    """
    i =  0
    res = []
    for item in files_list:
        os.rename(item, save_directory + f"/{i}.png")
        
        i +=1
    return res
    
def append_to_list(directory, name):
    dir_glob = glob(directory + "/*")
    
    # rename the file
    #dir_glob = process_list_to_ascending(dir_glob, directory, name)
        
    sorted(dir_glob, key=lambda i: int(os.path.splitext(os.path.basename(i))[0]))
    
    return dir_glob

def format_path(dir_glob, name, save_directory):
    res = []
    i = 0
    for item in dir_glob:   
        res.append(save_directory + f"/{i}.png")
        i+=1
    return res

if __name__ == "__main__":
    cred_phish_attackers = append_to_list(os.getcwd() + "/data/hw2_data/part7/CredentialPhishing", "CredentialPhishing")
    cred_phish_attackers = format_path(cred_phish_attackers, "CredentialPhishing",os.getcwd() + "/data/hw2_data/part7/CredentialPhishing")
    malware_attackers = append_to_list(os.getcwd() + "/data/hw2_data/part7/Malware", "Malware")
    malware_attackers = format_path(malware_attackers, "Malware", os.getcwd() + "/data/hw2_data/part7/Malware")
    reconnaissance_attackers = append_to_list(os.getcwd() + "/data/hw2_data/part7/Reconnaissance", "Reconnaissance")
    reconnaissance_attackers = format_path(reconnaissance_attackers, "Reconnaissance", os.getcwd() + "/data/hw2_data/part7/Reconnaissance")
    social_engineering_attackers = append_to_list(os.getcwd() + "/data/hw2_data/part7/SocialEngineering", "SocialEngineering")
    social_engineering_attackers = format_path(social_engineering_attackers, "SocialEngineering", os.getcwd() + "/data/hw2_data/part7/SocialEngineering")

    res = []
    res.append(cred_phish_attackers)
    res.append(malware_attackers)
    res.append(reconnaissance_attackers)
    res.append(social_engineering_attackers)
    print(os.path.isfile("./data/hw2_data/part7/CredentialPhishing/0.png"))
    with open('lists.txt', "w+") as file_write:
        for i in range(len(res)):
            for item in res[i]:
                file_write.write("%s\n" % item)
                print(f"process {file_write}")