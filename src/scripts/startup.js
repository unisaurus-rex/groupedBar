import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import groupedBarChart from 'groupedBar/groupedBar.js';
import * as d3 from "d3";

//chart parameters
var width = 500;
var height = 100;
var margin = {top: 20, right: 20, bottom: 0, left: 0};
width = width - margin.right - margin.left;
height = height - margin.top - margin.bottom;

var svg = d3.select("div#chartid")
  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")     
  .attr("viewBox","0 0 " + width + " " + height)
  //class to make it responsive
  .classed("svg-content-responsive", true)
;




var classMapFunction = function (d){
  return classMap[ d.name ];
}
var classMap =  {"Department Store": "fill-blue", "Grocery": "fill-red",
"Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
"Pharmacies": "fill-teal", "Total": "fill-gray-dark" };
  //formatting for output
  var formatPercent = d3.format(".1%");
  
  //create scales
  var x0 = d3.scaleBand()
    .rangeRound([0, width])
  ;

  var x1 = d3.scaleBand()
    .paddingOuter(1)
  ; 

  var y = d3.scaleLinear()
    .range([height, 0])
  ;

  //x axis
  var xAxis = d3.axisBottom()
    .scale(x0)
    .tickSizeInner(-height)
    .tickSizeOuter(0)
    .tickPadding(10)
  ;

    //y axis
  var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(formatPercent)
    .ticks(5)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(10)
  ;
  //x axis

//get data, draw svg, draw chart
d3.csv("scripts/groupedBar/data.csv", function(error, data){
  if (error) throw error;

  var groupNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });
  
   //return data
    data.forEach(function(d) {
      d.groups = groupNames.map(function(name) { return {name: name, value: +d[name]}; });
    });

      //set domains
  x0.domain(data.map(function(d) { return d.Issuer; }))
  ;

  x1
    .domain(groupNames)
    .rangeRound([0, x0.bandwidth()])
  ;

  y.domain([0, d3.max(data, function(d) { return d3.max(d.groups, function(d) { return d.value; }); })]);
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  //y axis

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    //.append("text")
    //.attr("transform", "rotate(-90)")
    //.attr("y", 6)
    //.attr("dy", ".71em")
    //.style("text-anchor", "end")
    //.text("percentage")
  ;
  




  //chart config
var test = groupedBarChart()
  .width(width)
  .height(height)
  .classMap(classMap)
  .classMapFunction(classMapFunction)
  .margin(margin)
  .x0( x0 )
  .x1( x1 )
  .yAxis( yAxis )
  .xAxis( xAxis)
  .y( y )
;

window.test=test;
window.data = data;
  
  test(svg, data);
  
  
})

d3.csv("scripts/groupedBar/dataTwo.csv", function(error, data){
  var groupNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });
  data.forEach(function(d) {
      d.groups = groupNames.map(function(name) { return {name: name, value: +d[name]}; });
    });
  window.newdata = data;
  window.svg = svg;


})