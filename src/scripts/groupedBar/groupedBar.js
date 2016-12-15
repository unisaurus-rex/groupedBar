import * as d3 from "d3";

export default function groupedBarChart(){

  
  // margins
  var margin = {top: 20, right: 20, bottom: 100, left: 50},
    width = 500 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  //create scales
  /*var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);*/
    var x0 = d3.scaleBand()
    .rangeRound([0, width])
    ;


  //var x1 = d3.scale.ordinal();
  var x1 = d3.scaleBand(); 
  var y = d3.scaleLinear()
    .range([height, 0])
    ;


  //colors
  var color = d3.scaleOrdinal()
    .range(["#00a9e0", "#40c1ac", "#ffa300", "#fd0000", "#e5e5e5", "#4d4f53", "#4d4f53"]);

  //x axis
  var xAxis = d3.axisBottom()
    .scale(x0)
    //.tickSizeInner(-height)
    //.tickSizeOuter(0)
    //.tickPadding(10)
    ;

  //formatting for output
  var formatPercent = d3.format(".1%");

  //y axis
  var yAxis = d3.axisLeft()
    .scale(y)
    //.orient("left")
    .tickFormat(formatPercent)
    .ticks(5)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(10)
    ;

  //tool tips
  /*var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Percentage:</strong> <span>" + formatPercent(d.value ) + "</span>";
    })*/

  //add svg
  var svg = d3.select("div#chartid")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")     
    .attr("viewBox","0 0 " + width + " " + height)
     //class to make it responsive
    .classed("svg-content-responsive padding", true);

  //initialize tooltip
  //svg.call(tip);

  //plot data 
  d3.csv("scripts/groupedBar/data.csv", function(error, data) {
    if (error) throw error;

        //return data component other than x axis key
    var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });
   //return data
    data.forEach(function(d) {
      d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
    });


  //set domains
  x0.domain(data.map(function(d) { return d.Issuer; }));
  x1
    .domain(ageNames)
    .rangeRound([0, x0.bandwidth()])
    ;
  
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
  



 



    //x axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    //y axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      //.text("percentage")
    ;

    // x axis text
    var issuer = svg.selectAll(".issuer")
      .data(data)
      .enter().append("g")
      .attr("class", "issuer")
      .attr("transform", function(d) { return "translate(" + x0(d.Issuer) + ",0)"; });

    // drawing the bars
    issuer.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); })
      //.on('mouseover', tip.show)
      //.on('mouseout', tip.hide)
      ;

  }); 
}