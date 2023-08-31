// create URL for data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Call in data from JSON file
const dataInfo = d3.json(url);
    console.log("Data Info: ", dataInfo);

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});

// Variable setup and gather JSON data for charts
var samples;
var metadata;
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    metadata = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(metadata[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function nextSample(value) {
    const isolateID = samples.find((item) => item.id === value);
    const demoInfo = metadata.find((item) => item.id == value);

    // Call In demographics
    metaData(demoInfo);

    // Create Bar Chart
    hbarChart(isolateID);

    // Create Bubble Chart
    bubbleChart(isolateID);

}

function metaData(demoInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
    `id: ${demoInfo.id} <br> 
    ethnicity: ${demoInfo.ethnicity} <br>
    gender: ${demoInfo.gender} <br>
    age: ${demoInfo.age} <br>
    location: ${demoInfo.location} <br>
    bbtype: ${demoInfo.bbtype} <br>
    wfreq: ${demoInfo.wfreq}`
    );
}

function hbarChart(isolateID) {
    let x_axis = isolateID.sample_values.slice(0, 10).reverse();
    let y_axis = isolateID.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = isolateID.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let data = [barChart];

    let layout = {
        height: 600,
        width: 800
    };

    Plotly.newPlot("bar", data, layout);
}

function bubbleChart(isolateID) {
    let x_axis = isolateID.otu_ids;
    let y_axis = isolateID.sample_values;
    let marker_size = isolateID.sample_values;
    let color = isolateID.otu_ids;
    let text = isolateID.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
	
}


