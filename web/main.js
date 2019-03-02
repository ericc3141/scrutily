"use strict";

const BACKEND = "http://localhost:8888";

function stagger(total) {
    return (d,i) => {return total/(i+1);};
}

// https://stackoverflow.com/questions/10692100/invoke-a-callback-at-the-end-of-a-transition
 function endall(transition, callback) { 
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) { callback() }
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
  } 

  d3.selectAll("g").transition().call(endall, function() { console.log("all done") });

function clear(data) {
    setTimeout(()=>{update(data)}, 1000);
    d3.selectAll(".tile")
        .transition().duration(100).delay((d,i) => {return 500/(i+1);})
        .style("opacity", 0)
        .remove();
}
function update(data) {
    console.log(data);
    d3.select(".tile-grid").selectAll(".tile").data(data)
    .enter().append("div")
    .attr("class", "tile")
    .text((d) => {return d.text})
    .style("opacity", 1e-6)
    .transition().duration(100).delay(stagger(1000))
    .style("opacity", 1);
}

function fetchnew(e) {
    let name = e.srcElement[0].value;
    d3.json(BACKEND + "/getTimeline?name=" + name).then(clear);
}

function init() {
    document.getElementById("user-form").addEventListener("submit", fetchnew);
}

window.addEventListener("load", init);