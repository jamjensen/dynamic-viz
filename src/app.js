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

function makeGrid(data, colorFunction, legendFunc) {
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
  legendFunc

  // annotate;
}
// transform agg into this 
const boundariesExample = [
  {upperBound: 300, color: 'green'},
  {upperBound: 700, color: 'blue'},
  {upperBound: 1000, color: 'red'},
  {upperBound: 4000, color: 'gray'},
]

// const makeAnnotation = annotation  => {
//   d3.annotate()
//   .type(d3.annotationLabel)
//   .annotations(annotations)
// }

const colorFuncGenerator = boundaries => {
  return (d, idx) => {
    return boundaries.find(boundary => {
      return idx < boundary.upperBound;
    }).color
  }
}

function legendFunc(data) {
  var test = select('.legend-container')
      .selectAll('legend')
      .data(data);
    test
      .enter()
      .append('legend')
      .text(d => d)
      ;
    }

// const annotations = [{
//   note: { label: "HiIIIIIIIIIIIIIIIIIIIIIIIIIII"},
//   x: 100, y: 100,
//   dy: 137, dx: 162,
//   subject: { radius: 50, radiusPadding: 10 }
// }]

const lenArray = getLength(4000);


// makeGrid(lenArray, colorFuncGenerator(boundariesExample), annotate(tst));
makeGrid(lenArray, colorFuncGenerator(boundariesExample));

const state = {slideIdx: 0};
const buttons = select('.buttons-container')
    .selectAll('button')
    .data([
      {
        text: 'Slide 1',
        bounds: [
          {upperBound: 300, color: '#DD7500'},
          {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: '#003F87'}
        ],
        annotation: 'test1'
      },
      {
        text: 'Slide 2',
        bounds: [
          {upperBound: 500, color: 'green'},
          {upperBound: 900, color: 'blue'},
          {upperBound: 1200, color: 'red'}
        ],
        annotation: 'test2'
      },
      {
        text: 'Slide 3',
        bounds: [
          {upperBound: 300, color: 'green'},
          {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: 'red'}
        ],
        annotation: 'test3'
      }
    ])
    .enter()
    .append('button')
    .text(d => d.text)
    .on('click', d => {
      makeGrid(lenArray, colorFuncGenerator(d.bounds), legendFunc(d.text));
    });

buttons

var test = select('.legend-container')
  .selectAll('legend')
  .data([{
    text: 'slide1'
  },
  {
    text: 'slide2'
  }])
  .enter()
  .append('legend')
  .text(d => d.text)

// test



// domReady(() => {
//   Promise.all([
//     csv('./data/cyclist-binary.csv')
//   ]).then(d => {
//     const [data] = d;
//     console.log(data.length)
//     // app(data, article);
//   });
// });

// var length = 5; // user defined length

function getLength(length) {
  var loop = [];
  // var length = data;
  for(var i = 0; i < length; i++) {
      loop.push(i);
  }
  return loop
}




