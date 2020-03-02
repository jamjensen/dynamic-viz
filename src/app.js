// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
const domReady = require('domready');
import {csv} from 'd3-fetch'
import './stylesheets/main.css';

// domReady(() => {
//   // this is just one example of how to import data. there are lots of ways to do it!
// //   fetch('./data/example.json')
// //     .then(response => response.json())
// //     .then(data => myVis(data))
// //     .catch(e => {
// //       console.log(e);
// //     });
// // });

// domReady(() => {
//   // this is just one example of how to import data. there are lots of ways to do it!
//   fetch('./data/example.json')
//     .then(response => response.json())
//     .then(data => myVis(data))
//     .catch(e => {
//       console.log(e);
//     });
// });


// domReady(() => {
//   // this is just one example of how to import data. there are lots of ways to do it!
//   csv('./data/tst_clean.csv')
//   // .then(data => console.log(data))
//   .then(data => makeGrid(data))
//     .catch(e => {
//       console.log(e);
//       console.log('YOOOO')
//     });
// });


function makeGrid(data) {
  var grid = d3.select("body")
    .append("div")
    .attr("id", "grid")
    .attr("class", "grid")
  ;
  console.log(data)
  var chars = grid
    .selectAll("div")
    .data(data)
    .enter()
    .filter(function(d){ return d.NUMBER_OF_PERSONS_INJURED >= 0; })
    .append("div")
    .attr("class", "char")
    .style("background-color", "red")

  ;
}
d3.csv("./data/tst_clean.csv")
  .then(data => makeGrid(data))
  .catch(e => {console.log(e);
  });

// d3.csv("/data/tst_clean.csv").then(function(data) {
//   console.log(data);
// });

// d3.json("https://gist.githubusercontent.com/andybarefoot/172ebdb29e781a71625753ab02f4920d/raw/ced130d481e3b363fa053bffc37034139eb1e670/chars.json").then(function(data) {
//   console.log(data.characters);
// });


console.log('tst')

// d3.csv("/data/tst_clean.csv").then(function(data) {
//   grid = d3.select("body")
//     .append("div")
//     .attr("id", "grid")
//     .attr("class", "grid")
//   ;
//   chars = grid
//     .selectAll("div")
//     .data(data.CRASH_DATE)
//     .enter()
//     .append("div")
//     .attr("class", "char")
//   ;
// })