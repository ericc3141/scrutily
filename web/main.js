"use strict";

const BACKEND = "http://localhost:8888";
let EM_PER_DAY = 1;
let colorScale = d3.scaleSequential(d3.interpolateYlGnBu);
let timeScale = d3.scaleTime();

function stagger(total) {
    return (d,i) => {return total/(i+1);};
}
function getDate(obj) {
    let t = obj.create_at;
    return new Date(t.yyyy, t.mm-1, t.dd, t.hh, t.min, t.ss);
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
    window.data = data;

    data.reverse();
    let interval = [getDate(data[data.length-1]), getDate(data[0])]
    timeScale.domain(interval).range([0, (interval[0]-interval[1])/(1000*60*60*24)*EM_PER_DAY]);
    colorScale.domain([0,data.length]);

    d3.select(".tile-grid").selectAll(".tile").data(data)
    .enter().append("div")
    .attr("class", "tile")
//     .text((d) => {return d.about.join();})
    .style("opacity", 1e-6)
    .style("width", (d,i) => {return d.text.length/280*100 + "%";})
    .style("top", (d,i) => {return timeScale(getDate(d)) + "em";})
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
    document.getElementById("searchbar-text").addEventListener("click", (e) => {
        e.target.value = "@";
    });
}

window.addEventListener("load", init);