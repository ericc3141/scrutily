"use strict";

const BACKEND = "http://localhost:8888";
let colorScale = d3.scaleSequential(d3.interpolateYlGnBu);

function stagger(total) {
    return (d,i) => {return total/(i+1);};
}

function clear(data) {
    setTimeout(()=>{update(data)}, 2000);
    d3.selectAll(".tile")
        .transition().duration(500).delay(stagger(1000))
        .style("opacity", 0)
        .remove();
}
function update(data) {
    console.log("update");
    console.log(data);
    colorScale.domain([0,data.length]);
    d3.select(".tile-grid").selectAll(".tile").data(data)
    .enter().append("div")
    .attr("class", "tile")
    .text((d) => {return d.text})
    .style("opacity", 1e-6)
    .style("background-color", (d,i) => {return colorScale(i);})
    .transition().duration(500).delay(stagger(1000))
    .style("opacity", 1);
}

function fetchnew(e) {
    console.log("fetch");
    let name = e.srcElement[0].value;
    d3.json(BACKEND + "/getTimeline?name=" + name).then(clear);
}

function init() {
    console.log("init");
    document.getElementById("user-form").addEventListener("submit", fetchnew);
}

window.addEventListener("load", init);