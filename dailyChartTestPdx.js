// Pull AQI data from aqiDailyPortland.csv 
d3.csv("Resources/aqiDailyPortland.csv").then(function(data) {
    // console.log(data)
    var pdxDate = [];
    var aqi = [];
    for (i=0; i<data.length; i++) {
        pdxDate.push(data[i].Date);
        aqi.push(data[i].Overall_AQI_Value);      
    console.log(pdxDate, aqi);  
    }

    // Sort date
    var newDate = pdxDate.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(a.date) - +new Date(b.date);
      })
    
    // Just take 17 days PRE and POST shelter-in-place date for the city
    var dateThisYear = newDate.slice(63, 101)
    var aqiThisYear = aqi.slice(63,101)
    console.log(dateThisYear, aqiThisYear)

    // Create chart
    var chart = document.getElementById('chart');
    var myChart = echarts.init(chart);
    var option = {
        title: { text: 'Portland Daily AQI (3/4/2020 - 4/10/2020)' ,
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
                }, {
                    gt: 150,
                    lte: 200,
                    color: '#cc0033'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#660099'
                }, {
                    gt: 300,
                    color: '#7e0023'
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
            name: 'Portland AQI',
            type: 'bar',
            data: aqiThisYear.map(function (item) {
                return item}),   
            markPoint: {
                data: [
                    {value: "Shelter start date: 03/23/2020", xAxis: 19, yAxis: 35}
                    ],
                label:{
                    fontSize: 12,
                    color: "black",
                    offset: [80, -30]
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
                }]
            }
        },
        
    };
    myChart.setOption(option);

})

    // if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    // }


// Testing dynamic Echarts

// function randomData() {
//     now = new Date(+now + oneDay);
//     value = value + Math.random() * 21 - 10;
//     return {
//         name: now.toString(),
//         value: [
//             [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//             Math.round(value)
//         ]
//     };
// }

// var data = [];
// var now = +new Date(1997, 9, 3);
// var oneDay = 24 * 3600 * 1000;
// var value = Math.random() * 1000;
// for (var i = 0; i < 1000; i++) {
//     data.push(randomData());
// }

// option = {
//     title: {
//         text: '动态数据 + 时间坐标轴'
//     },
//     tooltip: {
//         trigger: 'axis',
//         formatter: function (params) {
//             params = params[0];
//             var date = new Date(params.name);
//             return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
//         },
//         axisPointer: {
//             animation: false
//         }
//     },
//     xAxis: {
//         type: 'time',
//         splitLine: {
//             show: false
//         }
//     },
//     yAxis: {
//         type: 'value',
//         boundaryGap: [0, '100%'],
//         splitLine: {
//             show: false
//         }
//     },
//     series: [{
//         name: '模拟数据',
//         type: 'line',
//         showSymbol: false,
//         hoverAnimation: false,
//         data: data
//     }]
// };

// setInterval(function () {

//     for (var i = 0; i < 5; i++) {
//         data.shift();
//         data.push(randomData());
//     }

//     myChart.setOption({
//         series: [{
//             data: data
//         }]
//     });
// }, 1000);