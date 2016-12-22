import groupedBarChart from 'groupedBar';
import * as d3 from "d3";


describe("Test the grouped bar chart", function(){

	//chart parameters
	var width = 500;
	var height = 100;
	var margin = {top: 20, right: 20, bottom: 0, left: 0};
	width = width - margin.right - margin.left;
	height = height - margin.top - margin.bottom;

	var svg = d3.select("body")
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
	  
	var jsonObj = [
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

	var jsonGroupNames = d3.keys(jsonObj[0]).filter(function(key) { return key !== "Issuer"; });

	jsonObj.forEach(function(d) {
	  d.groups = jsonGroupNames.map(function(name) { return {name: name, value: +d[name]}; });
	});


	//create scales
	var x0 = d3.scaleBand()
	  .rangeRound([0, width])
	  .domain(jsonObj.map(function(d) { return d.Issuer; }))
	;

	var x1 = d3.scaleBand()
	  .paddingOuter(1)
	  .domain(jsonGroupNames)
	  .rangeRound([0, x0.bandwidth()])
	; 
	var y = d3.scaleLinear()
	  .range([height, 0])
	  .domain([0, d3.max(jsonObj, function(d) { return d3.max(d.groups, function(d) { return d.value; }); })]);
	;


	beforeEach (function(){

	var svg = d3.select("body")
	  .append("div")
	  .classed("svg-container", true)
	  .append("svg")
	  .attr("preserveAspectRatio", "xMinYMin meet")     
	  .attr("viewBox","0 0 " + width + " " + height)
	  //class to make it responsive
	  .classed("svg-content-responsive", true)
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
		test(svg, jsonObj);	
	});

	afterEach ( function(){
		d3.selectAll('.svg-container').remove();
	})
	

	it('should be created, defined, and not null', function() {
		expect(d3.selectAll('svg')._groups[0][0]).not.toBeNull();
		expect(d3.selectAll('svg')._groups[0][0]).toBeDefined();			
	});

	it('should create the correct amount of groups', function() { 
		expect(d3.selectAll('g.issuer')._groups[0].length).toEqual(6);
	});

	it('should create the correct amount of rectangles', function() {
		var rect = d3.selectAll('rect')._groups[0];
		expect (rect.length).toEqual(36);
	});

	it('should create every rectangle with one class', function() {
		//wait for the transition to finish
		setTimeout(function(){
			var rect = d3.selectAll('rect')._groups[0];
			var classes = 0;
			for(var i =0; i< rect.length; i++){
				classes = classes + rect[i].classList.length
				console.log(rect[i].classList.length);
			}
			expect( classes).toEqual(36);
		}, 2000)
	});
});
