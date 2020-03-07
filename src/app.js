// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
const domReady = require('domready');
import {csv} from 'd3-fetch';
import {select} from 'd3-selection';
import './stylesheets/main.css';


var grid = select("body")
  .append("div")
  .attr("id", "grid")
  .attr("class", "grid")
;
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
// transform agg into this 
const boundariesExample = [
  {upperBound: 300, color: 'green'},
  {upperBound: 700, color: 'blue'},
  {upperBound: 1000, color: 'red'},
  {upperBound: 4000, color: 'gray'},
]

const colorFuncGenerator = boundaries => {
  return (d, idx) => {
    return boundaries.find(boundary => {
      return idx < boundary.upperBound;
    }).color
  }
}

const lenArray = getLength(4000);
makeGrid(lenArray, colorFuncGenerator(boundariesExample));


// UNDO THIS COMMMENT
// csv("./data/cyclist-binary.csv")
//   .then(data => makeGrid(data))
//   .catch(e => {console.log(e);
//   });

// makeGrid(getLength(4000), d => 'red')


const state = {slideIdx: 0};
const buttons = select('.buttons-container')
    .selectAll('button')
    .data([
      {
        text: 'button 1',
        bounds: [
          {upperBound: 300, color: '#DD7500'},
          // {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: '#003F87'}
        ]
      },
      {
        text: 'button 2',
        bounds: [
          {upperBound: 500, color: 'green'},
          {upperBound: 900, color: 'blue'},
          {upperBound: 1200, color: 'red'}
        ]
      },
      {
        text: 'button 3',
        bounds: [
          {upperBound: 300, color: 'green'},
          {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: 'red'}
        ]
      }
    ])
    .enter()
    .append('button')
    .text(d => d.text)
    .on('click', d => {
      makeGrid(lenArray, colorFuncGenerator(d.bounds));
    });

buttons

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
var loop = getLength(10)
console.log(loop)

var tst = [0,1,2,3]

csv("./data/tst_clean.csv")
  .then(data => console.log(data[0]["CRASH_DATE"]))
  .catch(e => {console.log(e);
  });

// console.log(loop)
// console.log([0,1,2].length)

console.log(tst)

