import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine('postgresql://localhost:5432/aqiproject')
Base = automap_base()
# reflect the table
Base.prepare(engine, reflect=True)

# Save reference to the table
aqi = Base.classes.aqi 
# Titles = Base.classes.titles (WHAT TABLE NAMES ARE WE GOING TO USE?)
​
#################################################
# Flask Setup
#################################################
app = Flask(__name__)
​
​
#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available aqi routes."""
    return (
        f"Welcome to the Air Quality Index Data!<br/>"
        f"Available Routes:<br/>"
        f"<a href='/api/v1.0/aqi'> Air Quality Index data</a><br/>"
        # f"<a href='/api/v1.0/stations'> List of stations </a><br/>"
        # f"<a href='/api/v1.0/tobs'> Temperature observations of the most active station for the last year of data. </a><br/>"
        # f"<a href='/api/v1.0/start'> Temperature for greater than and equal to the start date.</a><br/>"
        # f"<a href='/api/v1.0/start/end'> Temperature for dates between the start and end date inclusive.</a><br/>"
       
    )

@app.route("/api/v1.0/aqi")   
def aqi():
    # Create our session (link) from Python to the DB
    session = Session(engine)
​
   # Perform a query to retrieve the data
    aqi_score = session.query(aqi.city, aqi.lat, aqi.lon, aqi.value, aqi.date)
    
    session.close()
​
    # Create a dictionary from the row data and append to a list of all_aqi results
    all_aqi = list(np.ravel(aqi_score))
    
​
    return jsonify(all_aqi)

if __name__ == '__main__':
    app.run(debug=True)
