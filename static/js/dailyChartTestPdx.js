d3.select('#selDataset').on("change", getPlot);

function getPlot() {
    // April 17 - pulling data from Flask url
    var state = d3.select("#selDataset").node().value;
    var url2="http://127.0.0.1:5000/api/v1.0/"+ state
    // if (state === "boise") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/boise"
    // }
    // if (state === "columbus") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/columbus"
    // }
    // if (state === "detroit") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/detroit"
    // }
    // if (state === "milwaukee") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/milwaukee"
    // }
    // if (state === "la") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/la"
    // }
    // if (state === "neworleans") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/neworleans"
    // }
    // if (state === "ny") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/ny"
    // }
    // if (state === "portland") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/portland"
    // }
    // if (state === "seattle") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/seattle"
    // }
    // if (state === "indianapolis") {
    //     var url = "http://127.0.0.1:5000/api/v1.0/indianapolis"
    // }

    d3.json(url2).then(function (data) {
        // console.log(data)

        // set variables to hold selected city information
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
        var chosenCityShelterDate2 = new Date(chosenCityShelterDate[0]).toISOString().slice(5, 10);
    
        // Sort and format date
        var newDate = chosenCityDate.sort(function(a, b) {
            return  +new Date(a.date) - +new Date(b.date);
        })
        var newDate2 = [];
        for (i=0; i<newDate.length; i++) {  
            newDate2.push(new Date(newDate[i]).toISOString().slice(5,10));
        }
        
        // Filter 17 days PRE and POST shelter-in-place date for the city to create chart
        var dateThisYear = newDate2.slice(63, 100)
        var aqiThisYear = chosenCityAqi.slice(63,100)
        // console.log(dateThisYear, aqiThisYear)

        // Create chart
        var chart = document.getElementById('chart');
        var myChart = echarts.init(chart);
        var option = {
            title: { text: `${chosenCityName2} Daily AQI (3/5/2020 - 4/10/2020)` ,
                    textAlign: 'auto'
            },
            tooltip: { 
                    trigger: 'axis'
            },
            // legend: {   
            //         show: false,
            //         data: [ 'AQI' ] 
            // },
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
                    show: false             // ??? AO - splitLine - not sure what this does
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
            dataZoom: [{                            // AO this controls accordian line
                startValue: '2020-01-01'            // at the bottom
            }, {
                type: 'inside'
            }],
            
            series: {
                name: `${chosenCityName2} AQI`,
                type: 'bar',
                data: aqiThisYear.map(function (item) {
                    return item}),   
                markPoint: {
                    data: [{value: `Shelter start date: ${chosenCityShelterDate2}`, xAxis: 19, yAxis: 40}],
                    symbol: 'pin',
                    symbolSize: 40,
                    label:{
                        fontSize: 12,
                        color: "black",
                        offset: [30, -30]
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
                    // }, {
                    //     yAxis: 200
                    // }, {
                    //     yAxis: 300
                    }]
                }
            },
            
        };
        myChart.setOption(option);

        }
    })
}

getPlot();
