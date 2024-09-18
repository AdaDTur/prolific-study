# -*- coding: utf-8 -*-

import os
import json
import numpy as np
import pandas as pd

## REPLACE PATH VARIABLE WITH LOCAL PATH
path = "/Users/adatur/Downloads/AI Projects/Shift Happens/Prolific/"

os.chdir(path)

cont_df = pd.read_csv("prolific_study_data.csv")
cont_df = cont_df.sort_values("index")

cont_df = cont_df.sample(frac=1, random_state=117)
batch_size=18
list_df = [cont_df.iloc[i:i+batch_size,] for i in range(0,len(cont_df),batch_size)]
jsons = [df.to_json(orient="records") for df in list_df]
parsed = [json.loads(jstring) for jstring in jsons]
js_string = json.dumps(parsed, indent=2)

with open("js/prolific_study_allstims.js", "w", encoding="utf-8") as file:
    file.write("var all_stims = "+"\n"+js_string)
