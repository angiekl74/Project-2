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
engine = create_engine("postgresql://postgres:postgres@localhost:5432/Project2AQI")

Base = automap_base()
# reflect the table
Base.prepare(engine, reflect=True)

# Save reference to the table
Project2AQI = Base.classes.boise

# Flask Setup
#################################################
app = Flask(__name__)

# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available aqi routes."""
    return (
        f"Welcome to the Air Quality Index Data!<br/>"
        f"Available Routes:<br/>"
        f"<a href='/api/v1.0/aqi'> Air Quality Index data</a><br/>"
    )

@app.route("/api/v1.0/aqi")   
def aqi():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    aqi_score = session.query(Project2AQI.date, Project2AQI.overall_aqi_value, Project2AQI.main_pollutant, Project2AQI.site_name, Project2AQI.site_id, Project2AQI.ozone, Project2AQI.pm25, Project2AQI.no2, Project2AQI.lat, Project2AQI.lon, Project2AQI.city_name, Project2AQI.state_ordinance).all()
    
    session.close()

    all_aqi = list(np.ravel(aqi_score))

    return jsonify(all_aqi)

if __name__ == '__main__':
    app.run(debug=True)
