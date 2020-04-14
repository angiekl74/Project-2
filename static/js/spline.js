// // Save current form of table (allows to delete)
// var demoOrigin = document.getElementById("demo");
// function myFunction(item, index) {   
//     for (var i = 0; i < info.length; i++) {
//         item
//     console.log(item); 
// }

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
            aqi.push(parseInt(info[i].OverallAQIValue));
            city.push(info[i].SiteName);
        }
        console.log(date)
        
    
        var dps = [];
        var dps2 = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            title :{
                text: "Portland 2020 AQI Data"
            },
            axisY: {
                includeZero: true
            },
            data: [{
                type: "spline",
                showInLegend: true,
                name: "2019",
                markerSize: 2,
                dataPoints: dps 
            },{
                type: "spline",
                showInLegend: true,
                name: "2020",
                markerSize: 0,
                dataPoints: dps2 
            }]
        });
        var val = 0;
        var val2 = 0
        var xVal = date[0];
        var xVal2 = date[0];
        var yVal = aqi[0];
        var yVal2 = aqi[5];
        var updateInterval = 1;
        var dataLength = 10; // number of dataPoints visible at any point

        var updateChart = function (count) {
            count = count || 1;
            console.log(count)
            // count is number of times loop runs to generate random dataPoints.
            for (var j = 0; j < count; j++) {	
                xVal = new Date(date[val])
                yVal = aqi[val]
                dps.push({
                    x: xVal,
                    y: yVal
                });
                val++;
            }
            for (var j = 0; j < count; j++) {	
                xVal2 = new Date(date[val2])
                yVal2 = aqi[val2+5]
                dps2.push({
                    x: xVal2,
                    y: yVal2
                });
                val2++;
            }
            // if (dps2.length > dataLength) {
            //     dps2.shift();
            // }
            chart.render()
            
        };
        
        updateChart(dataLength); 
        setInterval(function(){ updateChart() }, updateInterval);
     
    })
}
// // Use D3 fetch to read the JSON file
// d3.csv("Resources/aqiDailyPortland.csv").then((importedData) => {
    
//     // Pull in the data
//     var info = importedData;
//     console.log(info);

//     // Create lists to hold data
//     var date=[], aqi=[], city=[]; 
        
//     // Grab values from json object to build demographics info
//     for (var i = 0; i < info.length; i++) {
//         date.push(info[i].Date);
//         aqi.push(info[i].OverallAQIValue);
//         city.push(info[i].SiteName);
//     }
//     console.log(date)

// })

//     // Grab values from json object to build dropdown
//     var names = info.names;
//     // console.log(names);

//     // Creating divs and imputting data for demographics info
//     var selection = d3.select("#selDataset").selectAll("#selDataset")
//         .data(names);
//     selection.enter()
//         .append("option")
//         .text(function(d) {
//             return d;
//         })
//         .merge(selection);
    
//     // Create variable to grap and hold demo
//     var demoArray = []
//     var metadata = info.metadata[0]
//     console.log(demoArray)
//     Object.entries(metadata).forEach(([key, value]) => {
//         // Log the key and value
//         demoArray.push(`${key}:${value}`);
//     });
//     // console.log(demoArray)

//     // Creating divs and imputting data for demographics info
//     demoHTML = d3.select(".panel")
//     var line;
//     for (var i = 0; i < demoArray.length; i++) {
//         line = demoHTML.append("div");
//         line.text(demoArray[i]);
//     }

//     // Grab values from json object to build bar graph
//     // var sample_ids = info.samples[0].id;
//     var sample_values = info.samples[0].sample_values;
//     var otu_labels = info.samples[0].otu_labels;
//     var otu_ids1 = info.samples[0].otu_ids;
//     var otu_ids = otu_ids1.map(String);
    
//     // // Check data 
//     console.log(sample_values, otu_ids, otu_labels);

//     // Data for the horizontal bar graph
//     var trace1 = {
//         x: sample_values.slice(0,10).reverse(),
//         y: otu_ids.slice(0,10).map(function(otu) {return 'OTU ' + otu}).reverse(),
//         type: "bar",
//         orientation: "h",
//         text: sample_values.slice(0,10).reverse().map(String),
//         textposition: 'auto',
//         hovertemplate: otu_labels.slice(0,10).reverse(),
//         marker: {
//             color: 'rgb(158,202,225)',
//             opacity: 0.6,
//             line: {
//                 color: 'rgb(8,48,107)',
//                 width: 1.5
//             }
//         }
//     };
    
//     var data = [trace1];

//     var layout = {
//         bargap :0.1
//         };
   
//     // Plot the bar graph
//     Plotly.newPlot("bar", data, layout);
    
//     // Data for the gauge chart
//     var data = [{
//         domain: { x: [0, 1], y: [0, 1] },
//         value: info.metadata[0].wfreq,
//         title: { text: "Belly Button Washing Frequency (Weekly)" },
//         type: "indicator",
//         mode: "gauge+number",
//         // label: ["0-1","0-1","0-1","0-1","0-1","0-1","0-1","0-1","0-1","0-1"],
//         gauge: {
//             axis: { range: [0, 9] },
//             bar: { color: "#585858" },
//             steps: [
//                 { range: [0, 1], color: "rgb(247, 240, 232)" },
//                 { range: [1, 2], color: "rgb(242, 238, 222)" },
//                 { range: [2, 3], color: "rgb(228, 226, 189)" },
//                 { range: [3, 4], color: "rgb(223, 229, 161)" },
//                 { range: [4, 5], color: "rgb(203, 225, 136)" },
//                 { range: [5, 6], color: "rgb(169, 196, 125)"},
//                 { range: [6, 7], color: "rgb(121, 182, 115)"},
//                 { range: [7, 8], color: "rgb(120, 177, 123)"},
//                 { range: [8, 9], color: "rgb(115, 169, 117)"}
//             ]
//         }
//     }];

//     // Plot gauge chart
//     Plotly.newPlot("gauge", data);

//     // Data for the bubble chart
//     var trace1 = {
//     x: otu_ids,
//     y: sample_values,
//     xAxes: "OTU ID",
//     text: otu_labels,
//     mode: 'markers',
//     marker: {
//         color: otu_ids1,
//         size: sample_values
//     }
//     };
    
//     var data = [trace1];

//     var layout = {xaxis: {title: {text: 'OTU ID'}}};

//     // Plot the bubble chart
//     Plotly.newPlot("bubble", data, layout);
// });


// // Call updateDashboard() when a change takes place to the DOM
// d3.select("#selDataset").on("change", updateDashboard);
 
// // This function is called when a dropdown menu item is selected
// function updateDashboard() {
    
//     // Use D3 fetch to read the JSON file
//     d3.json("data/samples.json").then((importedData) => {
    
//         // Pull in the data
//         var info = importedData;

//         // Assign the value of the dropdown menu option to a variable
//         var dataset = d3.select("#selDataset").node().value;

//         // Create lists to hold data
//         var id=[], ethnicity=[], gender=[], age=[], 
//         location=[], bbtype=[], wfreq = [] 
        
//         // Grab values from json object to build demographics info
//         for (var i = 0; i < info.metadata.length; i++) {
//             id.push(info.metadata[i].id);
//             ethnicity.push(info.metadata[i].ethnicity);
//             gender.push(info.metadata[i].gender);
//             age.push(info.metadata[i].age);
//             location.push(info.metadata[i].location);
//             bbtype.push(info.metadata[i].bbtype);
//             wfreq.push(info.metadata[i].wfreq);
//         }
//         // console.log(id, ethnicity, gender, age, location, bbtype, wfreq)
        
//         for (var i = 0; i < id.length; i++) {
//             // console.log(parseInt(dataset))
//             // console.log(id[i])
//             if (parseInt(dataset) === id[i]) {
//                 var demoArray = [
//                     `id : ${id[i]}`, 
//                     `ethnicity : ${ethnicity[i]}`, 
//                     `gender : ${gender[i]}`,
//                     `age : ${age[i]}`,
//                     `location : ${location[i]}`,
//                     `bbtype : ${bbtype[i]}`,
//                     `wfreq : ${wfreq[i]}`
//                 ];
//             };
//         };

//         // // Check data
//         // console.log(demoArray)

//         // Deleting divs and imputting data for demographics info
//         while (demoOrigin.children.length > 1) {
//             demoOrigin.removeChild(demoOrigin.lastChild);
//           }

//         // Creating divs and imputting data for demographics info
//         demoHTML = d3.select(".panel")
//         var line;
//         for (var i = 0; i < demoArray.length; i++) {
//             line = demoHTML.append("div");
//             line.text(demoArray[i]);
//         }
        
//         // Create lists to hold data
//         var sample_values=[], otu_labels=[], otu_ids2=[], otu_ids=[];

//         // Grab values from json object to build bar graph
//         for (var i = 0; i < id.length; i++) {
//             // sample_ids.push(info.samples[i].id);
//             sample_values.push(info.samples[i].sample_values.slice(0,10).reverse());
//             otu_labels.push(info.samples[i].otu_labels.slice(0,10).reverse());
//             otu_ids2.push(info.samples[i].otu_ids.slice(0,10).map(String).reverse());
//             otu_ids.push(otu_ids2[i].map(function(otu) {return 'OTU ' + otu}));
//         }

//         for (var i = 0; i < id.length; i++) {
//             // console.log(parseInt(dataset))
//             // console.log(id[i])
//             if (parseInt(dataset) === id[i]) {
//                     Plotly.restyle("bar", "x", [sample_values[i]]);
//                     Plotly.restyle("bar", "y", [otu_ids[i]]);
//                     Plotly.restyle("bar", "text", [sample_values[i].map(String)]);
//                     Plotly.restyle("bar", "hovertemplates", [otu_labels[i]]);
//             }
//         }

//         for (var i = 0; i < id.length; i++) {
//             if (parseInt(dataset) === id[i]) {
//                 console.log(wfreq[i])
//                 Plotly.restyle("gauge", "value", [wfreq[i]]);
//             };
//         };

//         // Create lists to hold data
//         var sampleValues=[], otuLabels=[], otuIds=[];

//         // Grab values from json object to build bar graph
//         for (var i = 0; i < id.length; i++) {
//             sampleValues.push(info.samples[i].sample_values);  
//             otuLabels.push(info.samples[i].otu_labels);  
//             otuIds.push(info.samples[i].otu_ids); 
//         }
//         console.log(otuIds)
//         // New inputs for the bubble graph
//         for (var i = 0; i < id.length; i++) {
//             if (parseInt(dataset) === id[i]) {
//                     Plotly.restyle("bubble", "x", [otuIds[i]]);
//                     Plotly.restyle("bubble", "y", [sampleValues[i]]);
//                     Plotly.restyle("bubble", "text", [otuLabels[i]]);
//                     Plotly.restyle("bubble", "marker.color", [otuIds[i]]);
//                     Plotly.restyle("bubble", "marker.size", [sampleValues[i]]);
//             }
//         }
//     })
// }   