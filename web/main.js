"use strict";


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
    console.log(data.tweets);
    d3.select(".tile-grid").selectAll(".tile").data(data.tweets)
    .enter().append("div")
    .text((d) => {return d.text});
}

function fetchnew(e) {
    console.log("Username: ", e.srcElement[0].value);
    d3.json("/data.json").then(clear);
}

function init() {
    document.getElementById("user-form").addEventListener("submit", fetchnew);
}

window.addEventListener("load", init);