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
function makeGrid(data, colorFunction, annotate) {
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

  annotate;
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

// const annotations = [{
//   note: { label: "HiIIIIIIIIIIIIIIIIIIIIIIIIIII"},
//   x: 100, y: 100,
//   dy: 137, dx: 162,
//   subject: { radius: 50, radiusPadding: 10 }
// }]

const lenArray = getLength(4000);


const annotate = annotate_dict => {
  grid.append("text")
        .attr("x", (30))             
        .attr("y", 0 - (22))
        .attr("text-anchor", "middle")  
        .style("font-size", "50px") 
        .style("text-decoration", "underline")  
        .text(annotate_dict.note.label);  
}



// makeGrid(getLength(4000), d => 'red')
// const tst = {
//             id: "bitcoin-cash-fork",
//             // If you don't provide a custom "type" attribute in your options dictionary, , 
//             // the default type in the getAnnotations function will be used.
//             note: {
//                 label: "Bitcoin splits into Bitcoins and Bitcoin Cash",
//                 title: "08-01-2017"
//             },
//             dx: -15, 
//             dy: -57 
//         }

makeGrid(lenArray, colorFuncGenerator(boundariesExample), annotate(tst));


const state = {slideIdx: 0};
const buttons = select('.buttons-container')
    .selectAll('button')
    .data([
      {
        text: 'button 1',
        bounds: [
          {upperBound: 300, color: '#DD7500'},
          {upperBound: 700, color: 'blue'},
          {upperBound: 4000, color: '#003F87'}
        ],
        annotation: {
            id: "bitcoin-cash-fork",
            // If you don't provide a custom "type" attribute in your options dictionary, , 
            // the default type in the getAnnotations function will be used.
            note: {
                label: "Bitcoin splits into Bitcoins and Bitcoin Cash",
                title: "08-01-2017"
            },
            dx: -15, 
            dy: -57, 
        }
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
      makeGrid(lenArray, colorFuncGenerator(d.bounds), annotate(d.annotation)); 
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


csv("./data/tst_clean.csv")
  .then(data => console.log(data[0]["CRASH_DATE"]))
  .catch(e => {console.log(e);
  });

// console.log(loop)
// console.log([0,1,2].length)

console.log(tst)

