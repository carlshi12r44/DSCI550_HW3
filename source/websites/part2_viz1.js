var data = d3.json(
  "https://dsci550-sp21-hw3-part2.s3-us-west-2.amazonaws.com/part2_viz1_data.json",
  function (err, data) {
    // set the dimensions and margins of the graph
    var width = window.innerWidth;
    height = window.innerHeight ;
    margin = 20;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;
    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select("#res_viz1")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    data_sub = {
      Reconnaissance: data.isReconnaissance,
      "Social Engineering": data.isSocialEngineering,
      Malware: data.isMalware,
      "Credential Phishing": data.isCredentialPhishing,
    };
    // color scheme
    var color = d3.scaleOrdinal(d3.schemeTableau10);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.7) // This is the size of the donut hole
      .outerRadius(radius * 1.0);
    var pie = d3.pie().value(function (d) {
      return d.value;
    });
    

    var data_ready = pie(d3.entries(data_sub));

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    //console.log(data_ready);
    svg
      .selectAll("#res_viz1")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.data.key);
      })
      .attr("transform", "translate(0, 0)")
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    //Add Legend
    var legendRectSize = 35;
    var legendSpacing = 20;
    var legend = svg
      .selectAll(".legend") //the legend and placement
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "circle-legend")
      .attr("transform", function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = (height * color.domain().length) / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return "translate(" + horz + "," + vert + ")";
      });
    legend
      .append("circle") //keys
      .style("fill", color)
      .style("stroke", color)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", "1rem");
    legend
      .append("text") //labels
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .text(function (d) {
        return d;
      });
  
  }
);
