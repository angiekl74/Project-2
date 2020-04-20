d3.select('#selDataset').on("change", getSummary);
function getSummary() {
    // pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    if (state === "boise") {
        var url = "http://127.0.0.1:5000/api/v1.0/boise"
    }
    if (state === "columbus") {
        var url = "http://127.0.0.1:5000/api/v1.0/columbus"
    }
    if (state === "detroit") {
        var url = "http://127.0.0.1:5000/api/v1.0/detroit"
    }
    if (state === "milwaukee") {
        var url = "http://127.0.0.1:5000/api/v1.0/milwaukee"
    }
    if (state === "la") {
        var url = "http://127.0.0.1:5000/api/v1.0/la"
    }
    if (state === "neworleans") {
        var url = "http://127.0.0.1:5000/api/v1.0/neworleans"
    }
    if (state === "ny") {
        var url = "http://127.0.0.1:5000/api/v1.0/ny"
    }
    if (state === "portland") {
        var url = "http://127.0.0.1:5000/api/v1.0/portland"
    }
    if (state === "seattle") {
        var url = "http://127.0.0.1:5000/api/v1.0/seattle"
    }
    if (state === "indianapolis") {
        var url = "http://127.0.0.1:5000/api/v1.0/indianapolis"
    }
    d3.json(url).then(function (data) {
        console.log(data)
        var chosenCityDate = [];
        var chosenCityAqi = [];
        var chosenCityName = [];
        var chosenCityShelterDate = [];
        var chosenCityPopulation = [];
        for (i=0; i<data.length; i++) {
            chosenCityName.push(data[i].city_name);
            chosenCityShelterDate.push(data[i].state_ordinance)
            chosenCityPopulation.push(data[i].population); 
            chosenCityAqi.push(data[i].aqi_value);      
            chosenCityDate.push(data[i].date);
        }
        var chosenCityName2 = chosenCityName[0]
        var chosenCityPopulation2 = chosenCityPopulation[0]
        var chosenCityShelterDate2 = new Date(chosenCityShelterDate[0]).toISOString().slice(0, 10);
        //console.log(chosenCityDate)
        // Sort and format date
        var newDate = chosenCityDate.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        })
        var newDate2 = [];
        for (i=0; i<newDate.length; i++) {  
            newDate2.push(new Date(newDate[i]).toISOString().slice(5,10));
        }
        
        //  PRE and POST shelter-in-place data for the city
        var postShelterAqi = data.filter(elementData => new Date(elementData.date) >= new Date(chosenCityShelterDate[0]));
        var preShelterAqi = data.filter(elementData => new Date(elementData.date) <= new Date(chosenCityShelterDate[0]));
        
        // PRE and POST shelter-in=place date
        var meanAqiPost = math.mean(postShelterAqi.map(aqidata => aqidata.aqi_value));
        var meanAqiPre = math.mean(preShelterAqi.map(aqidata => aqidata.aqi_value))
        var round_meanAqiPost = math.round(meanAqiPost,2)
        var round_meanAqiPre = math.round(meanAqiPre,2)
        // Then, select the unordered list element by class name
        var list = d3.select("#summary");
        // remove any data from the list
        list.html("");
        // append stats to the list
        list.append("li").text(`City: ${chosenCityName2}`);
        list.append("li").text(`Population: ${chosenCityPopulation2}`);
        list.append("li").text(`State Ordinance: ${chosenCityShelterDate2}`);
        list.append("li").text(`Pre_Shelter_AQI Mean: ${round_meanAqiPre}`);
        list.append("li").text(`Post_Shelter_AQI Mean: ${round_meanAqiPost}`);
    })
}