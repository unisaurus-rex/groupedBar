SERVICES
DOCUMENTS
Untitled Document.md
NEW DOCUMENT
SAVE SESSION
Start a free trial now!
PREVIEW AS 
EXPORT AS 
SAVE TO 
IMPORT FROM 
DOCUMENT NAME


Untitled Document.md
WORDS: 1171
MARKDOWN Toggle Zen Mode PREVIEW


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
# JSPM Project Template 
This repo contains the basic framework for a project that contains jspm, D3 and 
bootstrap css.
## Install
First, run
    npm install
    
Then, run
    jspm install
    
## Installing Dependencies
Any dev dependencies should be installed with npm.  Any client side dependencies 
should be installed with jspm.
## This Project is a Dev Envrionment
The files and folders have been organized to support a development workflow.  If 
you would like to produce a production build, there are npm scripts you can run to 
install files in the build folder.
## Serving the Development Version
Download your favorite server package of choice 
([http-server](https://www.npmjs.com/package/http-server) is nice). 
### A Note on JavaScript Modules
Any module you write needs to be imported in ```scripts/startup.js```, or used by a 
module imported in ```startup.js```
## Custom NPM Scripts
The following scripts can be run using
    npm run <command-name>
    
For more information see the package.json file
```npm run bundle-js```
Package all javascript dependencies into a single file, minify and write the file 
to build/build.js
```npm run bundle-sass```
Compile sass files in styles/sass and output the result to build/styles
```npm run build```
Run bundle-js and bundle-sass
```npm run clean-styles```
Remove build/styles/css and build/styles/fonts folders
```npm run sass```
Compile sass files in styles/sass and output to styles/css
```npm run watch-sass```
Watch styles/sass for changes. On any change, compile to styles/css
## Serving the Production Version
Run your server with a root folder of ```./build```
## Testing
### Unit Testing
[Jasmine](https://jasmine.github.io/) and 
[Karma](https://karma-runner.github.io/1.0/index.html) are used for unit testing.  
Jasmine is a testing framework and Karma is a test runner. What's the difference, 
you ask?  You write your tests using Jasmine and it's libraries.  Once you write 
your tests, you need to run the code in a browser javascript engine.  We use Karma 
to handle a lot of the annoying things that come with trying to run your code in 
different browser engines.  
#### Set up
Most of what you need to run tests will be installed when you run ```npm 
install```, but there are some additional steps you also need to take.
1) Install Jasmine globally (it's already installed locally) ```npm install -g 
jasmine```
2) Install the node karma command line tool globally ``` npm install -g 
karma-cli```
#### Running All Tests
```npm test ```
#### Running Select Tests
coming soon...
#### Adding Tests
All test files live in ```src/spec``` and should have a name that ends in 
```-spec.js```  Any file that you want to test will need to be imported, just like 
you would with any other file in jspm.  For an example, see 
```src/spec/hello-spec.js```
#### Errors When Running
When you try to run your new spec, you may encounter errors loading files imported 
by your new spec.  To fix these, try the following steps:
1) Check the error message in the console and make note of the load path Karma and 
SystemJS attempted to use. 
2) In ```src/config.js```, if there is not yet an entry in the map object for the 
file that is causing the error, add an entry and adjust any files that depend on 
the module accordingly.  
3) This should fix the issue in most cases.  If that doesn't work, you may need to 
look at ```karma.conf.js```  Specifically the proxies object and the jspm:paths 
object.
#### Technical Details You Won't Need Until You Do
1) The Karma server serves all files from /base/<your path starts here>
2) karma-jspm is a karma plugin that allows us to use our jspm/es6 modules with 
Karma and Jasmine. In some instances Karma's server paths may cause conflicts with 
the paths set up in the jspm config.js file.  To work around this, there is a jspm 
object in karma.conf.js that can be used to tell Karma how to reconfigure paths for 
testing only.
#### Using the Module
1) Add the path to system config (optional)
2) Import the module
3) Call the constructor function with optional arguments
4) The constructor function returns a function that takes two parameters: a 
selection and data
Example: 
``` 
import groupedBarChart from 'groupedBar/groupedBar.js';
var function = groupedBarChart();
```
## Configuration
Configuration can be assigned by calling the constructor function and chaining set 
functions
##### Configurable Options
width (int)
* Sets the max width of the chart
height (int)
* Sets the max height of the chart
classMap (key/values)
* Object holding key-value pairs where key is the rowId and the value is the class 
that will be applied.
classMapFunction (function)
* Function that returns the correct value from classMap given a rowId
x0( scale )
* d3 scaleband, defines band width of each group of bars
x1( scale )
* d3 scaleband, defines band width of each rectangle within a group
y( scale )
* d3 scale for y axis, define scale of y axis
groupRangeFunction( function )
*  Function that returns the transform attribute for defining the position for each 
group
## Example
#### Creating svg 
```
import groupedBarChart from 'groupedBar/groupedBar.js';
var width = 500;
var height = 100;
//draw svg
var svg = d3.select("div#chartid")
  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")     
  .attr("viewBox","0 0 " + width + " " + height)
  //class to make it responsive
  .classed("svg-content-responsive", true)
;
```
#### Example data set
```
var falsyData = [
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
```
#### Prepare data for module, define scales, define classes and functios
```
//split data into chartable groups
var jsonGroupNames = d3.keys(jsonObj[0]).filter(function(key) { return key !== 
"Issuer"; }); 
jsonObj.forEach(function(d) {
    d.groups = jsonGroupNames.map(function(name) { return {name: name, value: 
+d[name]}; });
});
//create scales
//scale for each group of rectangles
var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .domain(jsonObj.map(function(d) { return d.Issuer; }))
;
//scale for each rectangle within a group
var x1 = d3.scaleBand()
  .paddingOuter(1)
  .domain(jsonGroupNames)
  .rangeRound([0, x0.bandwidth()])
; 
//scale for the y axis
var y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(jsonObj, function(d) { return d3.max(d.groups, function(d) { 
return d.value; }); })]);
;
var classMapFunction = function (d){
  return classMap[ d.name ];
}
var classMap =  {"Department Store": "fill-blue", "Grocery": "fill-red",
"Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
"Pharmacies": "fill-teal", "Total": "fill-gray-dark" };
//define function to define position for a group
var groupRangeFunction = function(d) {return "translate(" + x0(d.Issuer) + ",0)"; 
};
```
#### Adding optional axes
```
//define axes
var xAxis = d3.axisBottom()
  .scale(x0)
  .tickSizeInner(-height)
  .tickSizeOuter(0)
  .tickPadding(10)
;
//formatting for y axis
var formatPercent = d3.format(".1%");
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
;
```
#### Configuration and function call
```
var func = groupedBarChart()
    .width(width)
    .height(height)
    .classMap(classMap)
    .classMapFunction(classMapFunction)
    .x0( x0 )
    .x1( x1 )
    .y( y )
    .groupRangeFunction(groupRangeFunction)
;
func(svg, falsydata); //where selection is a d3 selection;
```
JSPM Project Template
This repo contains the basic framework for a project that contains jspm, D3 and bootstrap css.

Install
First, run

npm install
Then, run

jspm install
Installing Dependencies
Any dev dependencies should be installed with npm. Any client side dependencies should be installed with jspm.

This Project is a Dev Envrionment
The files and folders have been organized to support a development workflow. If you would like to produce a production build, there are npm scripts you can run to install files in the build folder.

Serving the Development Version
Download your favorite server package of choice (http-server is nice).

A Note on JavaScript Modules
Any module you write needs to be imported in scripts/startup.js, or used by a module imported in startup.js

Custom NPM Scripts
The following scripts can be run using

npm run <command-name>
For more information see the package.json file

npm run bundle-js

Package all javascript dependencies into a single file, minify and write the file to build/build.js

npm run bundle-sass

Compile sass files in styles/sass and output the result to build/styles

npm run build

Run bundle-js and bundle-sass

npm run clean-styles

Remove build/styles/css and build/styles/fonts folders

npm run sass

Compile sass files in styles/sass and output to styles/css

npm run watch-sass

Watch styles/sass for changes. On any change, compile to styles/css

Serving the Production Version
Run your server with a root folder of ./build

Testing
Unit Testing
Jasmine and Karma are used for unit testing. Jasmine is a testing framework and Karma is a test runner. What’s the difference, you ask? You write your tests using Jasmine and it’s libraries. Once you write your tests, you need to run the code in a browser javascript engine. We use Karma to handle a lot of the annoying things that come with trying to run your code in different browser engines.

Set up
Most of what you need to run tests will be installed when you run npm install, but there are some additional steps you also need to take.

Install Jasmine globally (it’s already installed locally) npm install -g jasmine

Install the node karma command line tool globally npm install -g karma-cli

Running All Tests
npm test

Running Select Tests
coming soon…

Adding Tests
All test files live in src/spec and should have a name that ends in -spec.js Any file that you want to test will need to be imported, just like you would with any other file in jspm. For an example, see src/spec/hello-spec.js

Errors When Running
When you try to run your new spec, you may encounter errors loading files imported by your new spec. To fix these, try the following steps:

Check the error message in the console and make note of the load path Karma and SystemJS attempted to use.

In src/config.js, if there is not yet an entry in the map object for the file that is causing the error, add an entry and adjust any files that depend on the module accordingly.

This should fix the issue in most cases. If that doesn’t work, you may need to look at karma.conf.js Specifically the proxies object and the jspm:paths object.

Technical Details You Won’t Need Until You Do
The Karma server serves all files from /base/<your path starts here>

karma-jspm is a karma plugin that allows us to use our jspm/es6 modules with Karma and Jasmine. In some instances Karma’s server paths may cause conflicts with the paths set up in the jspm config.js file. To work around this, there is a jspm object in karma.conf.js that can be used to tell Karma how to reconfigure paths for testing only.

Using the Module
Add the path to system config (optional)
Import the module
Call the constructor function with optional arguments
The constructor function returns a function that takes two parameters: a selection and data
Example:

import groupedBarChart from 'groupedBar/groupedBar.js';
var function = groupedBarChart();
Configuration
Configuration can be assigned by calling the constructor function and chaining set functions

Configurable Options
width (int)

Sets the max width of the chart
height (int)

Sets the max height of the chart
classMap (key/values)

Object holding key-value pairs where key is the rowId and the value is the class that will be applied.
classMapFunction (function)

Function that returns the correct value from classMap given a rowId
x0( scale )

d3 scaleband, defines band width of each group of bars
x1( scale )

d3 scaleband, defines band width of each rectangle within a group
y( scale )

d3 scale for y axis, define scale of y axis
groupRangeFunction( function )

Function that returns the transform attribute for defining the position for each group
Example
Creating svg
import groupedBarChart from 'groupedBar/groupedBar.js';
var width = 500;
var height = 100;

//draw svg
var svg = d3.select("div#chartid")
  .append("div")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")     
  .attr("viewBox","0 0 " + width + " " + height)
  //class to make it responsive
  .classed("svg-content-responsive", true)
;
Example data set
var falsyData = [
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
Prepare data for module, define scales, define classes and functios
//split data into chartable groups
var jsonGroupNames = d3.keys(jsonObj[0]).filter(function(key) { return key !== "Issuer"; }); 
jsonObj.forEach(function(d) {
    d.groups = jsonGroupNames.map(function(name) { return {name: name, value: +d[name]}; });
});

//create scales
//scale for each group of rectangles
var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .domain(jsonObj.map(function(d) { return d.Issuer; }))
;
//scale for each rectangle within a group
var x1 = d3.scaleBand()
  .paddingOuter(1)
  .domain(jsonGroupNames)
  .rangeRound([0, x0.bandwidth()])
; 
//scale for the y axis
var y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(jsonObj, function(d) { return d3.max(d.groups, function(d) { return d.value; }); })]);
;

var classMapFunction = function (d){
  return classMap[ d.name ];
}

var classMap =  {"Department Store": "fill-blue", "Grocery": "fill-red",
"Family Clothing": "fill-gray-light", "Fast Food": "fill-orange-yellow",
"Pharmacies": "fill-teal", "Total": "fill-gray-dark" };

//define function to define position for a group
var groupRangeFunction = function(d) {return "translate(" + x0(d.Issuer) + ",0)"; };
Adding optional axes
//define axes
var xAxis = d3.axisBottom()
  .scale(x0)
  .tickSizeInner(-height)
  .tickSizeOuter(0)
  .tickPadding(10)
;

//formatting for y axis
var formatPercent = d3.format(".1%");

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
;
Configuration and function call
var func = groupedBarChart()
    .width(width)
    .height(height)
    .classMap(classMap)
    .classMapFunction(classMapFunction)
    .x0( x0 )
    .x1( x1 )
    .y( y )
    .groupRangeFunction(groupRangeFunction)
;
func(svg, falsydata); //where selection is a d3 selection;