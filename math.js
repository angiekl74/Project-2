d3.select('#selDataset').on("change", getSummary);

function getSummary() {
    // April 17 - pulling data from Flask url
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
        // console.log(data)
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
            
            

        var chosenCityName2 = chosenCityName[0]
        var chosenCityPopulation2 = chosenCityPopulation[0]
        var chosenCityShelterDate2 = new Date(chosenCityShelterDate[0]).toISOString().slice(0, 10);
    
        // Sort and format date
        var newDate = chosenCityDate.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        })
        var newDate2 = [];
        for (i=0; i<newDate.length; i++) {  
            newDate2.push(new Date(newDate[i]).toISOString().slice(5,10));
        }
        // // filter date by 
        // var startDate = chosenCityShelterDate;
            

        // var postShelterAqi = chosenCityDate.filter(
        //         function (a)
        //         {
        //             return (a.chosenCityAqi) > startDate;
        //         });
        // console.log(postShelterAqi);
        
        // Just take 17 days PRE and POST shelter-in-place date for the city
        //var postShelterAqi = chosenCityAqi.filter(chosenCityAqi => chosenCityAqi >= chosenCityShelterDate);
        var dateThisYear = newDate2.slice(63, 100)
        var aqiThisYear = chosenCityAqi.slice(63,100)
        var datePreShelter = newDate2.slice(0, 62)
        var aqiPreShelter = chosenCityAqi.slice(0,62)
        // console.log(chosenCityAqi)
        // var meanAqiPost = math.mean(aqiThisYear)
        // var meanAqiPre = math.mean(aqiPreShelter)
        // console.log(dateThisYear, math.sum(aqiThisYear),chosenCityName2)
        // Then, select the unordered list element by class name
        var list = d3.select("#summary");

        // remove any children from the list
        list.html("");

        // append stats to the list
        list.append("li").text(`City: ${chosenCityName2}`);
        list.append("li").text(`Population: ${chosenCityPopulation2}`);
        list.append("li").text(`State Ordinance: ${chosenCityShelterDate2}`);
        list.append("li").text(`AQI Mean: ${math.mean(chosenCityAqi)}`);
        // list.append("li").text(`: ${standardDeviation}`);
        list.append("li").text(`Post_Shelter_AQI Mean: ${math.mean(aqiThisYear)}`);
        // list.append("li").text(`Pre_Shelter_AQI Mean: ${meanAqiPre}`);
            
        

    }
    });
}




