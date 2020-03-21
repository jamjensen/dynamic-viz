// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
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
    console.log(currentColors.length)
    for (var i = 0; i < 5; i++) {
      d3.select('#legend-container *').remove();  
    }
    // d3.select('#legend-container *').remove();
    const join = legend.selectAll('.legend-row').data(currentColors);
    const rows = join.enter()
    .append('div')
    .attr('class', 'legend-row')

    // text
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

  // legend(currentColors)

  // annotate;
}
// transform agg into this 
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

// function legendFunc(data) {
//       select('.legend-container')
//       .selectAll('legend')
//       .data(data)
//       .enter()
//       .append('legend')
//       .text(d => d.text)
//       ;
//     }

// function legendFunc() {
//   console.log('hey')
// }

const lenArray = getLength(4000);


// makeGrid(lenArray, colorFuncGenerator(boundariesExample), annotate(tst));
makeGrid(lenArray, colorFuncGenerator(initial));
// legend('initialAnnotation')

const state = {slideIdx: 0};
const buttons = select('.buttons-container')
    .selectAll('button')
    .data([
      {
        text: 'Start',
        bounds: [{upperBound: 4000, color: 'gray'}],
        currentColors: [{color: 'gray', name: 'There are over 4,000 accidents involving a car and a cyclist each year in NYC.'}]
      },
      {
        text: 'Slide 1',
        bounds: [
          {upperBound: 300, color: '#DD7500'},
          {upperBound: 700, color: '#AF1E2D'},
          {upperBound: 4000, color: '#E0AA0F'}
        ],
        currentColors: [{color: '#DD7500', name: 'type 1'}, {color:'#AF1E2D', name:'type1b'}, {color:'#E0AA0F', name:'type3' }]
      },
      {
        text: 'Slide 2',
        bounds: [
          {upperBound: 500, color: 'green', name: 'what'},
          {upperBound: 900, color: 'blue', name: 'the'},
          {upperBound: 4000, color: 'red', name: 'eff'}
        ],
        currentColors: [{color: '#DD7500', name: 'type 1'}, {color:'#AF1E2D', name:'type1b'}, {color:'#E0AA0F', name:'type3' }]
      },
      {
        text: 'Slide 3',
        bounds: [
          {upperBound: 300, color: 'green'},
          {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: 'red'}
        ],
        currentColors: [{color: '#DD7500', name: 'type 1'}, {color:'#AF1E2D', name:'type1b'}, {color:'#E0AA0F', name:'type3' }]
      }
    ])
    .enter()
    .append('button')
    .text(d => d.text)
    .on('click', d => {
      makeGrid(lenArray, colorFuncGenerator(d.bounds));
      // legend(d.annotation);
      legend(d.currentColors)
    });

buttons

// var test = select('.legend-container')
//   .selectAll('legend')
//   .data([{
//     text: 'slide1'
//   },
//   {
//     text: 'slide2'
//   }])
//   .enter()
//   .append('legend')
//   .text(d => d.text)





function getLength(length) {
  var loop = [];
  // var length = data;
  for(var i = 0; i < length; i++) {
      loop.push(i);
  }
  return loop
}




