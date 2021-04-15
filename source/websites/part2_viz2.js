// Parse the Data
d3.json(
  "https://dsci550-sp21-hw3-part2.s3-us-west-2.amazonaws.com/part2_viz2_data.json",
  function (err, data) {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 10, bottom: 120, left: 200 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#res_viz2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // data format needs to be [{...}, {...}, ...]
    const real_data = [
      { label: "positive sentiment", value: data.positiveSentiment },
      { label: "negative sentiment", value: data.negativeSentiment },
    ];
    console.log(real_data);
    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        real_data.map(function (d) {
          console.log(d.label);
          return d.label;
        })
      )
      .padding(0.4);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-15,0)rotate(-10)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 4500]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(real_data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.label);
      })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", function (d) {
        return height - y(0);
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0);
      });

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(500)
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        console.log(d.value);
        return height - y(d.value);
      })
      .delay(function (d, i) {
        return i * 100;
      });
  }
);
