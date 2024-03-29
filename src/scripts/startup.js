import jquery from 'jquery';
import bootstrap from 'bootstrap-sass';
//import {donutChart} from 'donut-widget/donutWidget.js';
import groupedBarChart from 'groupedBar';
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

//formatting for y axis
var formatPercent = d3.format(".1%");

//define function to define range for a group
var groupRangeFunction = function(d) {return "translate(" + x0(d.Issuer) + ",0)"; };
  
var data = [
  {
    "Issuer": "Issuer 1",
    "Department Store": 0.0175,
    "Pharmacies": 0.0045,
    "Fast Food": 0.0125,
    "Grocery": 0.015,
    "Family Clothing": 0.0175,
    "Total": 0.014
  },
  {
    "Issuer": "Issuer 2",
    "Department Store": 0.004,
    "Pharmacies": 0.006,
    "Fast Food": 0.004,
    "Grocery": 0.003,
    "Family Clothing": 0.0174,
    "Total": 0.016
  },
  {
    "Issuer": "Issuer 3",
    "Department Store": 0.0075,
    "Pharmacies": 0.014,
    "Fast Food": 0.01,
    "Grocery": 0.012,
    "Family Clothing": 0.0025,
    "Total": 0.02
  },
  {
    "Issuer": "Issuer 4",
    "Department Store": 0.0114,
    "Pharmacies": 0.019,
    "Fast Food": 0.015,
    "Grocery": 0.016,
    "Family Clothing": 0.014,
    "Total": 0.019
  },
  {
    "Issuer": "Your Issues",
    "Department Store": 0.008,
    "Pharmacies": 0.02,
    "Fast Food": 0.004,
    "Grocery": 0.0075,
    "Family Clothing": 0.01,
    "Total": 0.015
  },
  {
    "Issuer": "All",
    "Department Store": 0.01,
    "Pharmacies": 0.015,
    "Fast Food": 0.005,
    "Grocery": 0.006,
    "Family Clothing": 0.0025,
    "Total": 0.02
  }
];

var jsonGroupNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });

data.forEach(function(d) {
  d.groups = jsonGroupNames.map(function(name) { return {name: name, value: +d[name]}; });
});


//create scales
var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .domain(data.map(function(d) { return d.Issuer; }))
;

var x1 = d3.scaleBand()
  .paddingOuter(1)
  .domain(jsonGroupNames)
  .rangeRound([0, x0.bandwidth()])
; 
var y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, function(d) { return d3.max(d.groups, function(d) { return d.value; }); })]);
;

//axes
var xAxis = d3.axisBottom()
  .scale(x0)
  .tickSizeInner(-height)
  .tickSizeOuter(0)
  .tickPadding(10)
;
var yAxis = d3.axisLeft()
  .scale(y)
  .tickFormat(formatPercent)
  .ticks(5)
  .tickSizeInner(-width)
  .tickSizeOuter(0)
  .tickPadding(10)
;
  
//draw axes
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
;
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
  .x0( x0 )
  .x1( x1 )
  .y( y )
  .groupRangeFunction(groupRangeFunction)
;

window.test=test;

test(svg, data);


d3.csv("scripts/groupedBar/data.csv", function(error, data){
  if (error) throw error;

  var groupNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });
  
 //return data
  data.forEach(function(d) {
    d.groups = groupNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  window.data = data;  
})

d3.csv("scripts/groupedBar/dataTwo.csv", function(error, data){
  var groupNames = d3.keys(data[0]).filter(function(key) { return key !== "Issuer"; });
  data.forEach(function(d) {
      d.groups = groupNames.map(function(name) { return {name: name, value: +d[name]}; });
    });
  window.newdata = data;
  window.svg = svg;


})