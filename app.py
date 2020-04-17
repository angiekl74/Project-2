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
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Boise = Base.classes.boise
Columbus = Base.classes.columbus
Detroit = Base.classes.detroit
# Greenbay = Base.classes.greenbay
# La = Base.classes.la
# Neworleans = Base.classes.neworleans
# Ny = Base.classes.ny
# Portland = Base.classes.portland
# Seattle = Base.classes.seattle
# Southbend = Base.classes.southbend

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
        f"<a href='/api/v1.0/boise'> Air Quality Index data Boise</a><br/>"
        f"<a href='/api/v1.0/cleveland'> Air Quality Index data Cleveland</a><br/>"
        f"<a href='/api/v1.0/grandrapids'> Air Quality Index data Grand Rapids</a><br/>"
        f"<a href='/api/v1.0/greenbay'> Air Quality Index data Green Bay</a><br/>"
        f"<a href='/api/v1.0/la'> Air Quality Index data Los Angeles</a><br/>"
        f"<a href='/api/v1.0/neworleans'> Air Quality Index data New Orleans</a><br/>"
        f"<a href='/api/v1.0/ny'> Air Quality Index data New York City</a><br/>"
        f"<a href='/api/v1.0/portland'> Air Quality Index data Portland</a><br/>"
        f"<a href='/api/v1.0/seattl'> Air Quality Index data Seattle</a><br/>"
        f"<a href='/api/v1.0/southbend'> Air Quality Index data South Bend</a><br/>"
    )

@app.route("/api/v1.0/boise")   
def boise():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    boise_score = session.query.(
        Boise.date,
        Boise.overall_aqi_value,
        Boise.main_pollutant,
        Boise.site_name,
        Boise.site_id,
        Boise.ozone,
        Boise.pm25,
        Boise.no2,
        Boise.lat,
        Boise.lon,
        Boise.city_name,
        Boise.state_ordinance).all()
    
    session.close()

    boise_aqi = list(np.ravel(boise_score))

    return jsonify(boise_aqi)

@app.route("/api/v1.0/columbus")
def columbus():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    columbus_score = session.query(
        Columbus.date,
        Columbus.overall_aqi_value,
        Columbus.main_pollutant,
        Columbus.site_name,
        Columbus.site_id,
        Columbus.ozone,
        Columbus.pm25,
        Columbus.no2,
        Columbus.lat,
        Columbus.lon,
        Columbus.city_name,
        Columbus.state_ordinance).all()
    
    session.close()

    columbus_aqi = list(np.ravel(columbus_score))

    return jsonify(columbus_aqi)   

@app.route("/api/v1.0/detroit")
def detroit():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    detroit_score = session.query(
        Detroit.date,
        Detroit.overall_aqi_value,
        Detroit.main_pollutant,
        Detroit.site_name,
        Detroit.site_id,
        Detroit.ozone,
        Detroit.pm25,
        Detroit.no2,
        Detroit.lat,
        Detroit.lon,
        Detroit.city_name,
        Detroit.state_ordinance).all()
    
    session.close()

    detroit_aqi = list(np.ravel(detroit_score))

    return jsonify(detroit_aqi)   

@app.route("/api/v1.0/greenbay")
def greenbay():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    greenbay_score = session.query(Greenbay.date, Greenbay.overall_aqi_value, Greenbay.main_pollutant, Greenbay.site_name, Greenbay.site_id, Greenbay.ozone, Greenbay.pm25, Greenbay.no2, Greenbay.lat, Greenbay.lon, Greenbay.city_name, Greenbay.state_ordinance).all()
    
    session.close()

    greenbay_aqi = list(np.ravel(greenbay_score))

    return jsonify(greenbay_aqi)

@app.route("/api/v1.0/la")
def la():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    la_score = session.query(La.date, La.overall_aqi_value, La.main_pollutant, La.site_name, La.site_id, La.ozone, La.pm25, La.no2, La.lat, La.lon, La.city_name, La.state_ordinance).all()
    
    session.close()

    la_aqi = list(np.ravel(la_score))

    return jsonify(la_aqi)   

@app.route("/api/v1.0/neworleans")
def neworleans():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    neworleans_score = session.query(Neworleans.date, Neworleans.overall_aqi_value, Neworleans.main_pollutant, Neworleans.site_name, Neworleans.site_id, Neworleans.ozone, Neworleans.pm25, Neworleans.no2, Neworleans.lat, Neworleans.lon, Neworleans.city_name, Neworleans.state_ordinance).all()
    
    session.close()

    neworleans_aqi = list(np.ravel(neworleans_score))

    return jsonify(neworleans_aqi)

@app.route("/api/v1.0/ny")
def ny():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    ny_score = session.query(Ny.date, Ny.overall_aqi_value, Ny.main_pollutant, Ny.site_name, Ny.site_id, Ny.ozone, Ny.pm25, Ny.no2, Ny.lat, Ny.lon, Ny.city_name, Ny.state_ordinance).all()
    
    session.close()

    ny_aqi = list(np.ravel(ny_score))

    return jsonify(ny_aqi)

@app.route("/api/v1.0/portland")
def portland():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    portland_score = session.query(Portland.date, Portland.overall_aqi_value, Portland.main_pollutant, Portland.site_name, Portland.site_id, Portland.ozone, Portland.pm25, Portland.no2, Portland.lat, Portland.lon, Portland.city_name, Portland.state_ordinance).all()
    
    session.close()

    portland_aqi = list(np.ravel(portland_score))

    return jsonify(portland_aqi)

@app.route("/api/v1.0/seattle")
def seattle():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    seattle_score = session.query(Seattle.date, Seattle.overall_aqi_value, Seattle.main_pollutant, Seattle.site_name, Seattle.site_id, Seattle.ozone, Seattle.pm25, Seattle.no2, Seattle.lat, Seattle.lon, Seattle.city_name, Seattle.state_ordinance).all()
    
    session.close()

    seattle_aqi = list(np.ravel(seattle_score))

    return jsonify(seattle_aqi)

@app.route("/api/v1.0/southbend")
def southbend():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    southbend_score = session.query(Southbend.date, Southbend.overall_aqi_value, Southbend.main_pollutant, Southbend.site_name, Southbend.site_id, Southbend.ozone, Southbend.pm25, Southbend.no2, Southbend.lat, Southbend.lon, Southbend.city_name, Southbend.state_ordinance).all()
    
    session.close()

    southbend_aqi = list(np.ravel(southbend_score))

    return jsonify(southbend_aqi)

if __name__ == '__main__':
    app.run(debug=True)