
const domReady = require('domready');
import {csv} from 'd3-fetch';
import {select} from 'd3-selection';
import {annotation} from 'd3-svg-annotation';
import './stylesheets/main.css';


var grid = select("body")
  .append("div")
  .attr("id", "grid")
  .attr("class", "grid")
;

var currentColors = [{color: 'orange', name: 'type 1'}]

function legend(currentColors) {
    const legend = d3.select('#legend-container');
    for (var i = 0; i < 5; i++) {
      d3.select('#legend-container *').remove();  
    }
    const join = legend.selectAll('.legend-row').data(currentColors);
    const rows = join.enter()
    .append('div')
    .attr('class', 'legend-row')

    rows.append('div')
        .text(d => d.name)
        .style('color', d => d.color)
}



function makeGrid(data, colorFunction) {
  var boxes = grid
    .selectAll(".boxes")
    .data(data);
  boxes
    .enter()
    .append("div")
    .attr("class", "boxes")
    .merge(boxes)
    .style("background-color", colorFunction)
  ;
}


const initial = [
  {upperBound: 4000, color: 'gray'}
]

const colorFuncGenerator = boundaries => {
  return (d, idx) => {
    return boundaries.find(boundary => {
      return idx < boundary.upperBound;
    }).color
  }
}


const lenArray = getLength(4000);

makeGrid(lenArray, colorFuncGenerator(initial));

const state = {slideIdx: 0};

const buttons = select('.buttons-container')
    .selectAll('button')
    .data([
      {
        text: 'Start',
        bounds: [{upperBound: 4289, color: 'gray'}],
        currentColors: [{color: 'gray', name: 'There were 4,289 accidents involving a car and a cyclist in NYC in 2019.'}]
      },
      {
        text: 'On a Bike Lane?',
        bounds: [
          {upperBound: 1914, color: '#DD7500'},
          {upperBound: 4289, color: '#AF1E2D'}
        ],
        currentColors: [{color: '#DD7500', name: 'Cyclist on Any Type of Bike Path: 1,914 accidents'},
                       {color:'#AF1E2D', name:'Cyclist on Street Without a Bike Path: 2,375 accidents'}]
      },
      {
        text: 'What Type of Bike Lane?',
        bounds: [
          {upperBound: 484, color: '#11605b'},
          {upperBound: 1391, color: '#0571b0'},
          {upperBound: 1914, color: '#E2D6B6'},
          {upperBound: 4289, color: '#AF1E2D'}
        ],
        currentColors: [{color: '#11605b', name: 'Fully Protected Path: 484 accidents'}, {color:'#0571b0', name:'Partially Protected: 907 accidents'},
                       {color:'#E2D6B6', name:'Unprotected / Fully Shared Bike Path: 523 accidents'}, {color: '#AF1E2D', name:'Without a Bike Path: 2,375 accidents'}]
      },
      {
        text: 'By Borough',
        bounds: [
          {upperBound: 82, color: '#e41a1c'},
          {upperBound: 444, color: '#377eb8'},
          {upperBound: 1248, color: '#4daf4a'},
          {upperBound: 2098, color: '#984ea3'},
          {upperBound: 4289, color: '#ff7f00'}
        ],
        currentColors: [{color: '#e41a1c', name: 'Staten Island: 82 accidents'}, {color:'#377eb8', name:'Bronx: 362 accidents'},
                       {color:'#4daf4a', name:'Queens: 804 accidents' }, {color: '#984ea3', name: 'Manhattan: 850 accidents'},
                       {color:'#ff7f00', name:'Brooklyn: 2,191 accidents'},]
      }
    ])
    .enter()
    .append('button')
    .text(d => d.text)
    .on('click', d => {
      makeGrid(lenArray, colorFuncGenerator(d.bounds));
      legend(d.currentColors)
    });

buttons



function getLength(length) {
  var loop = [];
  // var length = data;
  for(var i = 0; i < length; i++) {
      loop.push(i);
  }
  return loop
}




