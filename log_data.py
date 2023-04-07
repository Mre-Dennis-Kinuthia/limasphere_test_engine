import json
import os.path

# define the path to the JSON file
json_file_path = 'history_log.json'

# create a history log object
history_log_obj = {
    'test': 'Test Name',
    'timestamp': '2022-04-05 10:32:00'
}

# if the JSON file exists, load the data from it and append the new history log object
if os.path.exists(json_file_path):
    with open(json_file_path, 'r') as f:
        history_log_data = json.load(f)
        history_log_data.append(history_log_obj)
    with open(json_file_path, 'w') as f:
        json.dump(history_log_data, f)
# if the JSON file does not exist, create it and write the history log object as the first item
else:
    with open(json_file_path, 'w') as f:
        json.dump([history_log_obj], f)
