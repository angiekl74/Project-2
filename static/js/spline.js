// // Save current form of table (allows to delete)
// var demoOrigin = document.getElementById("demo");
// function myFunction(item, index) {   
//     for (var i = 0; i < info.length; i++) {
//         item
//     console.log(item); 
// }

// fetch("http://127.0.0.1:5000/api/v1.0/boise")
//     .then(response => {
//         return response.json();
//     })
//     .then(users => {
//         console.log(users);
//     })

window.onload = function () {
    // Use D3 fetch to read the JSON file
    d3.csv("Resources/aqiDailyPortland.csv").then((importedData) => {
        
        // Pull in the data
        var info = importedData;
        console.log(info);

        // Create lists to hold data
        var date=[], aqi=[], city=[]; 
            
        // Grab values from json object to build demographics info
        for (var i = 0; i < info.length; i++) {
            date.push(info[i].Date);
            aqi.push(parseInt(info[i].Overall_AQI_Value));
            city.push(info[i].SiteName);
        }
        console.log(date)
        
    
        var dps = [];
        var dps2 = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            title :{
                text: "Portland 2019 vs. 2020 AQI Data"
            },
            legend: {
                cursor: "pointer",
                lineColor:"#949494"
            },
            axisY: {
                includeZero: false,
                title: "AQI value",
            },
            axisX:{
                valueFormatString: "MMM-DD",
              },
            toolTip:{
                reversed: true,
                shared: true
            },
            data: [{
                type: "spline",
                showInLegend: true,
                name: "2019",
                markerSize: 0,
                dataPoints: dps,
                lineColor:"#949494" 
            },{
                type: "spline",
                showInLegend: true,
                name: "2020",
                markerSize: 5,
                dataPoints: dps2,
            }]
        });
        // Change t month and day only
        // formatted_date2 = []
        // for (i=0; i<date.length; i++){
        //     var date1 = new Date(date[i])
        //     var formatted_date = date1.getDate() + "-" + (date1.getMonth() + 1)
        //     formatted_date2.push(formatted_date)
        // }
        // console.log(formatted_date2)

        var dateThisYear = date.slice(60, 99)
        var aqiThisYear = aqi.slice(60, 99)
        console.log(dateThisYear)
        // var dateLastYear = date.slice(160, 199)  // don't need this cause we need to use same date
        var aqiLastYear = aqi.slice(160, 199)
        // console.log(dateLastYear)
        var val = 0;
        var val2 = 0
        var xVal = dateThisYear[0];
        this.console.log(xVal)
        var xVal2 = dateThisYear[0];
        var yVal = aqiLastYear[0];
        var yVal2 = aqiThisYear[0];
        var updateInterval = 1000;
        var dataLength = 5; // number of dataPoints visible at any point

        var updateChart = function (count) {
            count =  count || 1;
            console.log(count)
            // count is number of times loop runs to generate random dataPoints.
      
                for (var j = 0; j < count; j++) {	
                    xVal = new Date(dateThisYear[val])
                    yVal = aqiLastYear[val]
                    dps.push({
                        x: xVal,
                        y: yVal
                    });
                    val++;
                }
                for (var j = 0; j < count; j++) {	
                    xVal2 = new Date(dateThisYear[val2])
                    yVal2 = aqiThisYear[val2]
                    dps2.push({
                        x: xVal2,
                        y: yVal2
                    });
                    val2++;
                }
                // if (dps.length > dataLength && dps2.length > dataLength) {       //AO - This will stop the graph   
                //     dps.shift();
                //     dps2.shift();
                // }
                // else if (dps.length === dataLength && dps2.length === dataLength) {
                //     dps.shift();
                //     dps2.shift();
                // }    
                chart.render()                
            };        

            updateChart(dataLength); 
            setInterval(function(){ updateChart() }, updateInterval);        
    })
}
 