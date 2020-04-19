import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
from flask import render_template

from flask_cors import CORS
# from config import password


#################################################
# Database Setup
#################################################

engine = create_engine("postgresql://postgres:postgres@localhost:5432/Project2AQI")
# engine = create_engine(f"postgresql://postgres:{password}@localhost:5432/Project2AQI")

conn = engine.connect()

Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Boise = Base.classes.boise
Columbus = Base.classes.columbus
Detroit = Base.classes.detroit
Milwaukee = Base.classes.milwaukee
La = Base.classes.la
Neworleans = Base.classes.neworleans
Ny = Base.classes.ny
Portland = Base.classes.portland
Seattle = Base.classes.seattle
Indianapolis = Base.classes.indianapolis

# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

# Flask Routes
#################################################

# Route to render index.html
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")


@app.route("/<city_name>")
def city(city_name):
    return render_template("dashboard.html", urlOne= city_name)
    #return render_template("index.html", mars=mars_db)


@app.route("/api")
def welcome():

    # AO - Testing Landing page
    return render_template("index2.html")
    
    # """List all available aqi routes."""
    # return (
    #     f"Welcome to the Air Quality Index Data!<br/>"
    #     f"Available Routes:<br/>"
    #     f"<a href='/api/v1.0/boise'> Air Quality Index data Boise</a><br/>"
    #     f"<a href='/api/v1.0/columbus'> Air Quality Index data Columbus</a><br/>"
    #     f"<a href='/api/v1.0/detroit'> Air Quality Index data Detroit</a><br/>"
    #     f"<a href='/api/v1.0/milwaukee'> Air Quality Index data Milwaukee</a><br/>"
    #     f"<a href='/api/v1.0/la'> Air Quality Index data Los Angeles</a><br/>"
    #     f"<a href='/api/v1.0/neworleans'> Air Quality Index data New Orleans</a><br/>"
    #     f"<a href='/api/v1.0/ny'> Air Quality Index data New York City</a><br/>"
    #     f"<a href='/api/v1.0/portland'> Air Quality Index data Portland</a><br/>"
    #     f"<a href='/api/v1.0/seattle'> Air Quality Index data Seattle</a><br/>"
    #     f"<a href='/api/v1.0/indianapolis'> Air Quality Index data Indianapolis</a><br/>"
    #     f"<a href='/api/v1.0/linechartboise'> Air Quality Index data linechartboise</a><br/>"

    # )

@app.route("/api/v1.0/boise")   
def boise():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Boise's data
    boise_data = session.query(
        Boise.date,
        Boise.overall_aqi_value,
        Boise.main_pollutant,
        Boise.site_name,
        Boise.site_id,
        Boise.source_aqi, 
        # Boise.co,
        # Boise.ozone,
        # Boise.so2,
        # Boise.pm10,
        # Boise.pm25,
        # Boise.no2,
        Boise.lat,
        Boise.lon,
        Boise.city_name,
        Boise.state_ordinance,
        Boise.population).all()
    
    session.close()

    # Create a dictionary to hold boise data
    boise_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in boise_data:
        boise_dict = {}
        boise_dict["date"] = date
        boise_dict["aqi_value"] = overall_aqi_value
        boise_dict["main_pollutant"] = main_pollutant
        boise_dict["site_name"] = site_name
        boise_dict["site_id"] = site_id
        boise_dict["source_aqi"] = source_aqi
        boise_dict["lat"] = lat
        boise_dict["lon"] = lon
        boise_dict["city_name"] = city_name
        boise_dict["state_ordinance"] = state_ordinance
        boise_dict["population"] = population
        boise_aqi.append(boise_dict)

    return jsonify(boise_aqi)

@app.route("/api/v1.0/columbus")
def columbus():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Columbus's data
    columbus_data = session.query(
        Columbus.date,
        Columbus.overall_aqi_value,
        Columbus.main_pollutant,
        Columbus.site_name,
        Columbus.site_id,
        Columbus.source_aqi, 
        # Columbus.co,
        # Columbus.ozone,
        # Columbus.so2,
        # Columbus.pm10,
        # Columbus.pm25,
        # Columbus.no2,
        Columbus.lat,
        Columbus.lon,
        Columbus.city_name,
        Columbus.state_ordinance,
        Columbus.population).all()
    
    session.close()

    # Create a dictionary to hold columbus data
    columbus_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in columbus_data:
        columbus_dict = {}
        columbus_dict["date"] = date
        columbus_dict["aqi_value"] = overall_aqi_value
        columbus_dict["main_pollutant"] = main_pollutant
        columbus_dict["site_name"] = site_name
        columbus_dict["site_id"] = site_id
        columbus_dict["source_aqi"] = source_aqi
        columbus_dict["lat"] = lat
        columbus_dict["lon"] = lon
        columbus_dict["city_name"] = city_name
        columbus_dict["state_ordinance"] = state_ordinance
        columbus_dict["population"] = population
        columbus_aqi.append(columbus_dict)

    return jsonify(columbus_aqi)   

@app.route("/api/v1.0/detroit")
def detroit():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Detroit's data
    detroit_data = session.query(
        Detroit.date,
        Detroit.overall_aqi_value,
        Detroit.main_pollutant,
        Detroit.site_name,
        Detroit.site_id,
        Detroit.source_aqi, 
        # Detroit.co,
        # Detroit.ozone,
        # Detroit.so2,
        # Detroit.pm10,
        # Detroit.pm25,
        # Detroit.no2,
        Detroit.lat,
        Detroit.lon,
        Detroit.city_name,
        Detroit.state_ordinance,
        Detroit.population).all()
    
    session.close()

    # Create a dictionary to hold detroit data
    detroit_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in detroit_data:
        detroit_dict = {}
        detroit_dict["date"] = date
        detroit_dict["aqi_value"] = overall_aqi_value
        detroit_dict["main_pollutant"] = main_pollutant
        detroit_dict["site_name"] = site_name
        detroit_dict["site_id"] = site_id
        detroit_dict["source_aqi"] = source_aqi
        detroit_dict["lat"] = lat
        detroit_dict["lon"] = lon
        detroit_dict["city_name"] = city_name
        detroit_dict["state_ordinance"] = state_ordinance
        detroit_dict["population"] = population
        detroit_aqi.append(detroit_dict)

    return jsonify(detroit_aqi)
   

@app.route("/api/v1.0/milwaukee")
def milwaukee():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Milwaukee's data
    milwaukee_data = session.query(
        Milwaukee.date,
        Milwaukee.overall_aqi_value,
        Milwaukee.main_pollutant,
        Milwaukee.site_name,
        Milwaukee.site_id,
        Milwaukee.source_aqi, 
        # Milwaukee.co,
        # Milwaukee.ozone,
        # Milwaukee.so2,
        # Milwaukee.pm10,
        # Milwaukee.pm25,
        # Milwaukee.no2,
        Milwaukee.lat,
        Milwaukee.lon,
        Milwaukee.city_name,
        Milwaukee.state_ordinance,
        Milwaukee.population).all()
    
    session.close()

    # Create a dictionary to hold milwaukee data
    milwaukee_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in milwaukee_data:
        milwaukee_dict = {}
        milwaukee_dict["date"] = date
        milwaukee_dict["aqi_value"] = overall_aqi_value
        milwaukee_dict["main_pollutant"] = main_pollutant
        milwaukee_dict["site_name"] = site_name
        milwaukee_dict["site_id"] = site_id
        milwaukee_dict["source_aqi"] = source_aqi
        milwaukee_dict["lat"] = lat
        milwaukee_dict["lon"] = lon
        milwaukee_dict["city_name"] = city_name
        milwaukee_dict["state_ordinance"] = state_ordinance
        milwaukee_dict["population"] = population
        milwaukee_aqi.append(milwaukee_dict)

    return jsonify(milwaukee_aqi)

@app.route("/api/v1.0/la")
def la():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query La's data
    la_data = session.query(
        La.date,
        La.overall_aqi_value,
        La.main_pollutant,
        La.site_name,
        La.site_id,
        La.source_aqi, 
        # La.co,
        # La.ozone,
        # La.so2,
        # La.pm10,
        # La.pm25,
        # La.no2,
        La.lat,
        La.lon,
        La.city_name,
        La.state_ordinance,
        La.population).all()
    
    session.close()

    # Create a dictionary to hold la data
    la_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in la_data:
        la_dict = {}
        la_dict["date"] = date
        la_dict["aqi_value"] = overall_aqi_value
        la_dict["main_pollutant"] = main_pollutant
        la_dict["site_name"] = site_name
        la_dict["site_id"] = site_id
        la_dict["source_aqi"] = source_aqi
        la_dict["lat"] = lat
        la_dict["lon"] = lon
        la_dict["city_name"] = city_name
        la_dict["state_ordinance"] = state_ordinance
        la_dict["population"] = population
        la_aqi.append(la_dict)

    return jsonify(la_aqi) 

@app.route("/api/v1.0/neworleans")
def neworleans():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Neworleans's data
    neworleans_data = session.query(
        Neworleans.date,
        Neworleans.overall_aqi_value,
        Neworleans.main_pollutant,
        Neworleans.site_name,
        Neworleans.site_id,
        Neworleans.source_aqi, 
        # Neworleans.co,
        # Neworleans.ozone,
        # Neworleans.so2,
        # Neworleans.pm10,
        # Neworleans.pm25,
        # Neworleans.no2,
        Neworleans.lat,
        Neworleans.lon,
        Neworleans.city_name,
        Neworleans.state_ordinance,
        Neworleans.population).all()
    
    session.close()

    # Create a dictionary to hold neworleans data
    neworleans_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in neworleans_data:
        neworleans_dict = {}
        neworleans_dict["date"] = date
        neworleans_dict["aqi_value"] = overall_aqi_value
        neworleans_dict["main_pollutant"] = main_pollutant
        neworleans_dict["site_name"] = site_name
        neworleans_dict["site_id"] = site_id
        neworleans_dict["source_aqi"] = source_aqi
        neworleans_dict["lat"] = lat
        neworleans_dict["lon"] = lon
        neworleans_dict["city_name"] = city_name
        neworleans_dict["state_ordinance"] = state_ordinance
        neworleans_dict["population"] = population
        neworleans_aqi.append(neworleans_dict)

    return jsonify(neworleans_aqi)


@app.route("/api/v1.0/ny")
def ny():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Ny's data
    ny_data = session.query(
        Ny.date,
        Ny.overall_aqi_value,
        Ny.main_pollutant,
        Ny.site_name,
        Ny.site_id,
        Ny.source_aqi, 
        # Ny.co,
        # Ny.ozone,
        # Ny.so2,
        # Ny.pm10,
        # Ny.pm25,
        # Ny.no2,
        Ny.lat,
        Ny.lon,
        Ny.city_name,
        Ny.state_ordinance,
        Ny.population).all()
    
    session.close()

    # Create a dictionary to hold ny data
    ny_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in ny_data:
        ny_dict = {}
        ny_dict["date"] = date
        ny_dict["aqi_value"] = overall_aqi_value
        ny_dict["main_pollutant"] = main_pollutant
        ny_dict["site_name"] = site_name
        ny_dict["site_id"] = site_id
        ny_dict["source_aqi"] = source_aqi
        ny_dict["lat"] = lat
        ny_dict["lon"] = lon
        ny_dict["city_name"] = city_name
        ny_dict["state_ordinance"] = state_ordinance
        ny_dict["population"] = population
        ny_aqi.append(ny_dict)

    return jsonify(ny_aqi)

@app.route("/api/v1.0/portland")
def portland():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Portland's data
    portland_data = session.query(
        Portland.date,
        Portland.overall_aqi_value,
        Portland.main_pollutant,
        Portland.site_name,
        Portland.site_id,
        Portland.source_aqi, 
        # Portland.co,
        # Portland.ozone,
        # Portland.so2,
        # Portland.pm10,
        # Portland.pm25,
        # Portland.no2,
        Portland.lat,
        Portland.lon,
        Portland.city_name,
        Portland.state_ordinance,
        Portland.population).all()
    
    session.close()

    # Create a dictionary to hold portland data
    portland_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in portland_data:
        portland_dict = {}
        portland_dict["date"] = date
        portland_dict["aqi_value"] = overall_aqi_value
        portland_dict["main_pollutant"] = main_pollutant
        portland_dict["site_name"] = site_name
        portland_dict["site_id"] = site_id
        portland_dict["source_aqi"] = source_aqi
        portland_dict["lat"] = lat
        portland_dict["lon"] = lon
        portland_dict["city_name"] = city_name
        portland_dict["state_ordinance"] = state_ordinance
        portland_dict["population"] = population
        portland_aqi.append(portland_dict)

    return jsonify(portland_aqi)

@app.route("/api/v1.0/seattle")
def seattle():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Seattle's data
    seattle_data = session.query(
        Seattle.date,
        Seattle.overall_aqi_value,
        Seattle.main_pollutant,
        Seattle.site_name,
        Seattle.site_id,
        Seattle.source_aqi, 
        # Seattle.co,
        # Seattle.ozone,
        # Seattle.so2,
        # Seattle.pm10,
        # Seattle.pm25,
        # Seattle.no2,
        Seattle.lat,
        Seattle.lon,
        Seattle.city_name,
        Seattle.state_ordinance,
        Seattle.population).all()
    
    session.close()

    # Create a dictionary to hold seattle data
    seattle_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in seattle_data:
        seattle_dict = {}
        seattle_dict["date"] = date
        seattle_dict["aqi_value"] = overall_aqi_value
        seattle_dict["main_pollutant"] = main_pollutant
        seattle_dict["site_name"] = site_name
        seattle_dict["site_id"] = site_id
        seattle_dict["source_aqi"] = source_aqi
        seattle_dict["lat"] = lat
        seattle_dict["lon"] = lon
        seattle_dict["city_name"] = city_name
        seattle_dict["state_ordinance"] = state_ordinance
        seattle_dict["population"] = population
        seattle_aqi.append(seattle_dict)

    return jsonify(seattle_aqi)


@app.route("/api/v1.0/indianapolis")
def indianapolis():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query Indianapolis's data
    indianapolis_data = session.query(
        Indianapolis.date,
        Indianapolis.overall_aqi_value,
        Indianapolis.main_pollutant,
        Indianapolis.site_name,
        Indianapolis.site_id,
        Indianapolis.source_aqi, 
        # Indianapolis.co,
        # Indianapolis.ozone,
        # Indianapolis.so2,
        # Indianapolis.pm10,
        # Indianapolis.pm25,
        # Indianapolis.no2,
        Indianapolis.lat,
        Indianapolis.lon,
        Indianapolis.city_name,
        Indianapolis.state_ordinance,
        Indianapolis.population).all()
    
    session.close()

    # Create a dictionary to hold indianapolis data
    indianapolis_aqi = []
    for date, overall_aqi_value, main_pollutant, site_name, site_id, source_aqi, lat, lon, city_name, state_ordinance, population in indianapolis_data:
        indianapolis_dict = {}
        indianapolis_dict["date"] = date
        indianapolis_dict["aqi_value"] = overall_aqi_value
        indianapolis_dict["main_pollutant"] = main_pollutant
        indianapolis_dict["site_name"] = site_name
        indianapolis_dict["site_id"] = site_id
        indianapolis_dict["source_aqi"] = source_aqi
        indianapolis_dict["lat"] = lat
        indianapolis_dict["lon"] = lon
        indianapolis_dict["city_name"] = city_name
        indianapolis_dict["state_ordinance"] = state_ordinance
        indianapolis_dict["population"] = population
        indianapolis_aqi.append(indianapolis_dict)

    return jsonify(indianapolis_aqi)

if __name__ == '__main__':
    app.run(debug=True)
