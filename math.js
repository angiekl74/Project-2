d3.csv("Resources/UpdatedPortland.csv").then(function(data) {
    // console.log(data)
    var date = [];
    var city = [];
    var aqi = [];
    var state_ordinance =[];
    var city_population = [];
    
    for (i=0; i<data.length; i++) {
        date.push(data[i].date);
        city.push(data[i].city_name);
        aqi.push(data[i].Overall_AQI_Value);    
        city_population.push(data[i].population) ;
        state_ordinance.push(data[i].state_ordinance) 
    console.log(date, city, aqi,city_population),state_ordinace);  
    }

    // Sort date
    var newDate = date.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(a.date) - +new Date(b.date);
      })
    
    // Just take 17 days PRE and POST shelter-in-place date for the city
    var dateThisYear = newDate.slice(63, 101)
    var aqiThisYear = aqi.slice(63,101)
    var date
    console.log(dateThisYear, aqiThisYear)
// Assign the data from `data.js` to a descriptive variable


// Select the button
    var button = d3.select("#button");

    button.on("click", function() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#patient-form-input");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(people);

    var pre_data = date.filter(date => data.date === inputValue);

    console.log(filteredData);

    // BONUS: Calculate summary statistics for the age field of the filtered data

    // First, create an array with just the age values
    #var ages = filteredData.map(person => person.age);

    // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
    var aqi_mean = math.mean(aqi);
    

    // Then, select the unordered list element by class name
    var list = d3.select(".summary");

    // remove any children from the list
    list.html("");

    // append stats to the list
    list.append("li").text(`City: ${city}`);
    list.append("li").text(`Population: ${population}`);
    list.append("li").text(`State Ordinance: ${state_ordinace}`);
    list.append("li").text(`: ${standardDeviation}`);
    list.append("li").text(`Pre_Shelter_AQI Mean: ${aqi_mean_pre}`);
    list.append("li").text(`Post_Shelter_AQI Mean: ${aqi_mean_post}`);
    // var stats = [["mean", mean], ["median", median], ["mode", mode]];
    // stats.forEach(stat => list.append("li").text(`${stat[0]}: ${stat[1]}`));

    // var stats = {Mean: mean, Median: median, Mode: mode, Variance: variance};
    // Object.entries(stats).forEach(([stat, value]) => list.append("li").text(`${stat}: ${value}`));
    });


