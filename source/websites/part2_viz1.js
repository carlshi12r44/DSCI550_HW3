var data = d3.json(
  "https://dsci550-sp21-hw3-part2.s3-us-west-2.amazonaws.com/part2_viz1_data.json",
  function (err, data) {
    // set the dimensions and margins of the graph
    var width = window.innerWidth * 0.7;
    height = window.innerHeight * 0.7;
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
      "Reconnaissance": data.isReconnaissance,
      "Social Engineering": data.isSocialEngineering,
      "Malware": data.isMalware,
      "Credential Phishing": data.isCredentialPhishing,
    };
    var color = d3.scaleOrdinal().domain(data).range(d3.schemeDark2);
    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);
    var pie = d3.pie().value(function (d) {
      return d.value;
    });
    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.9);

    var data_ready = pie(d3.entries(data_sub));

    var getAngle = function (d) {
      return ((180 / Math.PI) * (d.startAngle + d.endAngle)) / 2 - 90;
    };

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
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    // Add the polylines between chart and labels:
    // svg
    //   .selectAll("allPolylines")
    //   .data(data_ready)
    //   .enter()
    //   .append("polyline")
    //   .attr("stroke", "black")
    //   .style("fill", "none")
    //   .attr("stroke-width", 1)
    //   .attr("points", function (d) {
    //     var posA = arc.centroid(d); // line insertion in the slice
    //     var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
    //     var posC = outerArc.centroid(d); // Label position = almost the same as posB
    //     var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
    //     posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
    //     return [posA, posB, posC];
    //   });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        return d.data.key + " - " + d.data.value / 3999 * 1000;
      })
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);

        return "translate(" + pos + ")" + "rotate(" + getAngle(d) + ")";
      })
      .style("text-anchor", "middle");
    //   .style("text-anchor", function (d) {
    //     var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    //     return midangle < Math.PI ? "start" : "end";
    //   });
  }
);
