// Read the data and compute summary statistics for each specie
d3.json(
  "https://dsci550-sp21-hw3-part2.s3-us-west-2.amazonaws.com/part2_viz3_data_misspellings.json",
  function (data) {
    // set the dimensions and margins of the graph
    var data_first = data["20_to_25"].sort(d3.ascending);

    var data_second = data["25_to_30"].sort(d3.ascending);
    var data_third = data["30_to_35"].sort(d3.ascending);
    var data_forth = data["35_to_40"].sort(d3.ascending);
    var data_fifth = data["40_to_45"].sort(d3.ascending);

    // compute q1
    var calculate_q1 = (d) => {
      var res = d3.quantile(d, 0.25);
      return res;
    };

    // compute mean
    var calculate_mean = (d) => {
      var res = d3.quantile(d, 0.5);
      return res;
    };

    // compute q3
    var calculate_q3 = (d) => {
      var res = d3.quantile(d, 0.75);
      return res;
    };

    // interQuantileRange
    var calculate_inter_quat = (q1, q3) => {
      return q3 - q1;
    };
    // min
    var calculate_min = (q1, interQuant) => {
      return q1 - 1.5 * interQuant;
    };
    // max
    var calculate_max = (q1, interQuant) => {
      return q1 + 1.5 * interQuant;
    };

    var summarize_all = (d) => {
      var q1 = calculate_q1(d);
      var mean = calculate_mean(d);
      var q3 = calculate_q3(d);
      var interQuant = calculate_inter_quat(q1, q3);
      var min = calculate_min(q1, interQuant);
      var max = calculate_max(q1, interQuant);
      var res = {
        Q1: q1,
        mean: mean,
        Q3: q3,
        interQuant: interQuant,
        min: min,
        max: max,
      };
      return res;
    };
    // first data
    var d1Stat = summarize_all(data_first);

    var d2Stat = summarize_all(data_second);

    var d3Stat = summarize_all(data_third);

    var d4Stat = summarize_all(data_forth);

    var d5Stat = summarize_all(data_fifth);

    var margin = { top: 10, right: 30, bottom: 40, left: 150 },
      width = window.innerWidth * 0.7 - margin.left - margin.right,
      height = window.innerHeight * 0.7 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#res_viz3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Show the X scale
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(["20 to 25", "25 to 30", "30 to 35", "35 to 40", "40 to 45"])
      .paddingInner(2)
      .paddingOuter(0.3);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Show the Y scale
    var y = d3.scaleLinear().domain([-1000, 1500]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // a few features for the box
    var center = 200;
    var width = 100;

    // Show the main vertical line
    svg
      .append("line")
      .attr("x1", center)
      .attr("x2", center)
      .attr("y1", y(d1Stat.min))
      .attr("y2", y(d1Stat.max))
      .attr("stroke", "black");

    svg
      .append("line")
      .attr("x1", center + 6 * width)
      .attr("x2", center + 6 * width)
      .attr("y1", y(d2Stat.min))
      .attr("y2", y(d2Stat.max))
      .attr("stroke", "black");
    svg
      .append("line")
      .attr("x1", center + 12 * width)
      .attr("x2", center + 12 * width)
      .attr("y1", y(d3Stat.min))
      .attr("y2", y(d3Stat.max))
      .attr("stroke", "black");
    svg
      .append("line")
      .attr("x1", center + 18 * width)
      .attr("x2", center + 18 * width)
      .attr("y1", y(d4Stat.min))
      .attr("y2", y(d4Stat.max))
      .attr("stroke", "black");
    svg
      .append("line")
      .attr("x1", center + 24 * width)
      .attr("x2", center + 24 * width)
      .attr("y1", y(d5Stat.min))
      .attr("y2", y(d5Stat.max))
      .attr("stroke", "black");

    // Show the box
    svg
      .append("rect")
      .attr("x", center - width / 2)
      .attr("y", y(d1Stat.Q3))
      .attr("height", y(d1Stat.Q1) - y(d1Stat.Q3))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2");
    svg
      .append("rect")
      .attr("x", center - width / 2 + 6 * width)
      .attr("y", y(d2Stat.Q3))
      .attr("height", y(d2Stat.Q1) - y(d2Stat.Q3))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2");
    svg
      .append("rect")
      .attr("x", center - width / 2 + 12 * width)
      .attr("y", y(d3Stat.Q3))
      .attr("height", y(d3Stat.Q1) - y(d3Stat.Q3))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2");
    svg
      .append("rect")
      .attr("x", center - width / 2 + 18 * width)
      .attr("y", y(d4Stat.Q3))
      .attr("height", y(d4Stat.Q1) - y(d4Stat.Q3))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2");
    svg
      .append("rect")
      .attr("x", center - width / 2 + 24 * width)
      .attr("y", y(d5Stat.Q3))
      .attr("height", y(d5Stat.Q1) - y(d5Stat.Q3))
      .attr("width", width)
      .attr("stroke", "black")
      .style("fill", "#69b3a2");

    // //show median, min and max horizontal lines
    svg
      .selectAll("toto")
      .data([d1Stat.min, d1Stat.mean, d1Stat.max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2)
      .attr("x2", center + width / 2)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");

    svg
      .selectAll("toto")
      .data([d2Stat.min, d2Stat.mean, d2Stat.max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2 + 6 * width)
      .attr("x2", center + width / 2 + 6 * width)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");
    svg
      .selectAll("toto")
      .data([d3Stat.min, d3Stat.mean, d3Stat.max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2 + 12 * width)
      .attr("x2", center + width / 2 + 12 * width)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");
    svg
      .selectAll("toto")
      .data([d4Stat.min, d4Stat.mean, d4Stat.max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2 + 18 * width)
      .attr("x2", center + width / 2 + 18 * width)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");
    svg
      .selectAll("toto")
      .data([d5Stat.min, d5Stat.mean, d5Stat.max])
      .enter()
      .append("line")
      .attr("x1", center - width / 2 + 24 * width)
      .attr("x2", center + width / 2 + 24 * width)
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      })
      .attr("stroke", "black");
  }
);
