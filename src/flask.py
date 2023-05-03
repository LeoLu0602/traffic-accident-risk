from flask import Flask
import pandas as pd 

app = Flask(__name__)

@app.route('/showRisk')
def show_risk_on_map():
    risk_df = pd.read_csv('NET.csv')
    print(risk_df)
    return risk_df

show_risk_on_map()