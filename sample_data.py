import os
import json
import numpy as np
import pandas as pd

## REPLACE PATH VARIABLE WITH LOCAL PATH
path = "/Users/adatur/Downloads/AI Projects/Shift Happens/Prolific/"

os.chdir(path)

vars = ['hnps', 'dative_alt', 'mpp', 'vrb_prt'] #getting equal number of samples from all four shift files
frames = []

for var in vars:
    data = pd.read_json(f'cleaned_collective_data/{var}_collective_data_cleaned.json', lines=True)
    ids = np.random.choice(len(data), 250)
    sub = data[data['id'].isin(ids)]
    sub_s = sub[['id', 'sentence', 'shifted']]
    sub_s['var'] = var
    frames.append(sub_s)

r_sample = pd.concat(frames)
r_sample.to_json('study_data.json', orient='records', lines=True)
