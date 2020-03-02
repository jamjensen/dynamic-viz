// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
const domReady = require('domready');
import {csv} from 'd3-fetch'
import './stylesheets/main.css';


function makeGrid(data) {
  var grid = d3.select("body")
    .append("div")
    .attr("id", "grid")
    .attr("class", "grid")
  ;
  console.log(data)
  var boxes = grid
    .selectAll("div")
    .data(data)
    .enter()
    .filter(function(d){ return d.NUMBER_OF_PERSONS_INJURED >= 0; })
    .append("div")
    .attr("class", "boxes")
    .style("background-color", "red")

  ;
}
csv("./data/tst_clean.csv")
  .then(data => makeGrid(data))
  .catch(e => {console.log(e);
  });





console.log('tst')

