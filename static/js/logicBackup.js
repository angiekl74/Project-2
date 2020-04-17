// Creating map object
var map = L.map("map", {
  center: [33.8283, -98.5795],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

// Load in geojson data
var statesAQI = "static/data/statesAQI.json";

var geojson;
var aqiAvg = [];


// Grab data with d3
d3.csv(shelter, function(info) {
  var city = info;
  
  d3.json(states, function(data) {
    // console.log(city)
    for(i = 0; i < city.length; i++){
      aqiAvg.push(parseFloat(city[i].AQI))
      // console.log((city[i].AQI))
    }
    console.log(aqiAvg)
    
    
    L.geoJson(data).addTo(map);

    // function getColor(d) {

    //   return d > 50  ? '#BD0026' :
    //          d > 40  ? '#E31A1C' :
    //          d > 30  ? '#FC4E2A' :
    //          d > 20   ? '#FD8D3C' :
    //          d > 10   ? '#FEB24C' :
    //          d > 5   ? '#FED976' :
    //                     '#FFEDA0';
    //   }

    // function getColor(d) {
    //   return d > 500  ? '#BD0026' :
    //          d > 300  ? '#E31A1C' :
    //          d > 200  ? '#FC4E2A' :
    //          d > 150   ? '#FD8D3C' :
    //          d > 100   ? '#FEB24C' :
    //          d > 50   ? '#FED976' :
    //                     '#FFEDA0';
    // }

    // function style(feature) {
    //   return {
    //       fillColor: getColor(aqiAvg),
    //       weight: 2,
    //       opacity: 1,
    //       color: 'white',
    //       dashArray: '3',
    //       fillOpacity: 0.7
    //   };
    // }
    
    // L.geoJson(data, {style: style}).addTo(map);
    
  // // Create a new choropleth layer
  // geojson = L.choropleth(data, {
    
  //   // Define what property in the features to use
  //   valueProperty: "cases",

  //   // Set color scale
  //   scale: ["rgb(254,255,195)", "rgb(88,180,177)", "rgb(29,38,127)"],

  //   // Number of breaks in step range
  //   steps: 15,

  //   // q for quartile, e for equidistant, k for k-means
  //   mode: "q",
  //   style: {
  //     // Border color
  //     color: "#fff",
  //     weight: 1,
  //     fillOpacity: 0.8
  //   },

  //   // Binding a pop-up to each layer
  //   onEachFeature: function(feature, layer) {
  //     layer.bindPopup(feature.properties.name + "<br>Deaths: " + feature.properties.deaths + 
  //     "<br>Confirmed Cases: " + feature.properties.cases);
  //   }
  // }).addTo(map);

  // // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Covid-19 Cases</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // // Adding legend to the map
  // legend.addTo(map);
  });
});