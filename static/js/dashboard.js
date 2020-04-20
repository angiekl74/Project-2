d3.select('#selDataset').on("change", updateGraphs);

// Format Date
function formatDate(nowDate) {
    nowDate = (nowDate.getMonth() + 1) +'/'+ nowDate.getDate() +"/"+ nowDate.getFullYear();
    return nowDate;
}

function mean(numbers) {
    var total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function getSummary() {
    // pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    var url="http://127.0.0.1:5000/api/v1.0/"+ state

        
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
        var meanAqiPost = mean(postShelterAqi.map(aqidata => aqidata.aqi_value));
        var meanAqiPre = mean(preShelterAqi.map(aqidata => aqidata.aqi_value));
        var round_meanAqiPost = Math.round(meanAqiPost,2);
        var round_meanAqiPre = Math.round(meanAqiPre,2);
        
        // Select and input statiscal data
        document.getElementById("pre").innerHTML = round_meanAqiPre;
        document.getElementById("post").innerHTML = round_meanAqiPost;
        document.getElementById("shelterDate").innerHTML = chosenCityShelterDate2;
        document.getElementById("population").innerHTML = chosenCityPopulation2;
    })
}

function getPlot() {
    // April 17 - pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    var url="http://127.0.0.1:5000/api/v1.1/"+ state

    d3.json(url).then(function (data) {
        // console.log(data)
        var chosenCityDate = [];
        var chosenCityAqi = [];
        var chosenCityName = [];
        var chosenCityShelterDate = []
    
        for (i=0; i<data.length; i++) {
            chosenCityDate.push(data[i].date);
            chosenCityAqi.push(data[i].aqi_value);      
            chosenCityName.push(data[i].city_name);
            chosenCityShelterDate.push(data[i].state_ordinance)

        var chosenCityName2 = chosenCityName[0]
        var shelterDay = new Date(chosenCityShelterDate[0])
        var chosenCityShelterDate2 = new Date(chosenCityShelterDate[0]).toISOString().slice(5, 10);
    
        // Sort and format date
        var newDate = chosenCityDate.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        })
        var newDate2 = [];
        for (i=0; i<newDate.length; i++) {  
            newDate2.push(new Date(newDate[i]).toISOString().slice(5,10));
        }
        
        // Just take 17 days PRE and POST shelter-in-place date for the city
        var dateThisYear = newDate2.slice(63, 100);
        var aqiThisYear = chosenCityAqi.slice(63,100);
        var aqiShelter = aqiThisYear[(shelterDay.getDate()-4)];
        // console.log(aqiShelter);

        // Create chart
        var chart = document.getElementById('chart');
        var myChart = echarts.init(chart);
        var option = {
            title: { 
                    text: `${chosenCityName2} Daily AQI`, // (3/5/2020 - 4/10/2020)` ,
                    textStyle: {
                        fontSize: 30,
                        fontFamily: "ariel"
                    },
                    x: "center"
            },
            tooltip: { 
                    trigger: 'axis'
            },
            xAxis: { 
                    axisLabel: {
                        show: true,   
                        interval: 5,
                        rotate: 45, 
                    },
                    data: dateThisYear.map(function (item) {
                        return item})
            },          
            yAxis: { 
                    splitLine: {
                    show: false  // ??? AO - splitLine - not sure what this does
                        },
            },
            visualMap: {
                    top: 20,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 50,
                        color: '#096'
                    }, {
                        gt: 50,
                        lte: 100,
                        color: '#ffde33'
                    }, {
                        gt: 100,
                        lte: 150,
                        color: '#ff9933'
                    // }, {
                    //     gt: 150,
                    //     lte: 200,
                    //     color: '#cc0033'
                    // }, {
                    //     gt: 200,
                    //     lte: 300,
                    //     color: '#660099'
                    // }, {
                    //     gt: 300,
                    //     color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
            },
            // toolbox: {                          
            //     left: 'center',
            //     feature: {
            //         dataZoom: {
            //             yAxisIndex: 'none'
            //         },
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            dataZoom: [{                    // AO this controls accordian line
                startValue: '2020-01-01'    // at the bottom
            }, {
                type: 'inside'
            }],
            
            series: {
                name: `${chosenCityName2} AQI`,
                type: 'bar',
                data: aqiThisYear.map(function (item) {
                    return item}),   
                markPoint: {
                    data: [{//value: `Ordinance Date: ${chosenCityShelterDate2}`, 
                    xAxis: (shelterDay.getDate()-4), yAxis: (aqiShelter)}],
                    symbol: 'pin',
                    symbolSize: 40,
                    label:{
                        fontSize: 16,
                        fontStyle: "bold",
                        color: "black",
                        offset: [10, -10]
                    }
                    },
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 50
                    }, {
                        yAxis: 100
                    }, {
                        yAxis: 150
                    }, {
                        yAxis: 200
                    }, {
                        yAxis: 300
                    }],
                    // lineStyle: {
                    //     "normal": {
                    //       "color": "red",
                    //       "type": "solid"
                    //     }
                    // }
                }
            },
            
        };
        myChart.setOption(option);

    }
    // getSpline(data)
    })
}

function getSpline() {
    // April 17 - pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    var url="http://127.0.0.1:5000/api/v1.1/"+ state

    // // Use D3 fetch to read the JSON file
    d3.json(url).then((importedData) => {
        
        // Pull in the data
        var info = importedData;
        // console.log(info);

        // Create lists to hold data
        var date=[], aqi=[], city=[]; 
            
        // Grab values from json object to build demographics info
        for (var i = 0; i < info.length; i++) {
            date.push(info[i].date);
            aqi.push(parseInt(info[i].aqi_value));
            city.push(info[i].city_name);
        }
        // console.log(date)
        
        var dps = [];
        var dps2 = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            title :{
                text: `${city[0]} 2019 vs. 2020`,
                fontFamily: "ariel",
                fontSize: 30,
                fontWeight: "bold"
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
                color:"grey" 
            },{
                type: "spline",
                showInLegend: true,
                name: "2020",
                markerSize: 5,
                dataPoints: dps2,
                color: "green"
            }]
        });
        
        var dateThisYear = date.slice(60, 99)
        var aqiThisYear = aqi.slice(60, 99)
        // var dateLastYear = date.slice(160, 199)  // don't need this cause we need to use same date
        var aqiLastYear = aqi.slice(160, 199)
        var val = 0;
        var val2 = 0
        var xVal = dateThisYear[0];
        var xVal2 = dateThisYear[0];
        var yVal = aqiLastYear[0];
        var yVal2 = aqiThisYear[0];
        var updateInterval = 250;
        var dataLength = 5; // number of dataPoints visible at any point

        var updateChart = function (count) {
            count =  count || 1; // count is number of times loop runs to generate random dataPoints.
    
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
            // getPlot();      
    })

}

function updateGraphs() {
    getSummary();
    getPlot();
    // getSpline();
}

updateGraphs();
