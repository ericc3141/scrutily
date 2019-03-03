"use strict";

const BACKEND = "";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const TRANS_LEN = 500;
const TRANS_DELAY = 10;
let EM_PER_DAY = 10;
// color value 1 - LIE / color value 2 - TRUTH
let colorScale = d3.scaleSequential(d3.interpolateCubehelix("#FF9F90", "#A8FF9F")).domain([0.3,0.7]);
// pleasant green-red scale
// let colorScale = d3.scaleSequential(d3.interpolateCubehelix("#FF9F90", "#D2FFAA")).domain([0.3,0.7]);
let timeScale = d3.scaleTime();
let elems = [];
let tiles, markers;
let zoom, maxheight;

function stagger(delay) {
    return (d,i) => {return i * delay;};
}
function getDate(obj) {
    let t = obj.create_at;
    return new Date(t.yyyy, t.mm-1, t.dd, t.hh, t.min, t.ss);
}
function dateToStr(d) {
    return (MONTHS[d.getMonth()]) + " " + d.getDate();
}
function getDate(obj) {
    let t = obj.create_at;
    return new Date(t.yyyy, t.mm-1, t.dd, t.hh, t.min, t.ss);
}

function zoomed() {
//     console.log(d3.event);
    if (!tiles) {
        return;
    }
    timeScale.range([0, maxheight*EM_PER_DAY*d3.event.transform.k]);
    tiles.style("top", (d,i) => {return timeScale(getDate(d)) + "em";});
    markers.style("top", (d,i) => {return timeScale(d) + "em";});
}

function toggleclick(d, i) {
    if (lastClicked && lastClicked != this) {
        lastClicked.classList.remove("clicked");
    }
    this.classList.toggle("clicked");
    lastClicked = this;
}

function clear(resolve) {
    if (!tiles || tiles.size() === 0) {
        resolve();
    }
    setTimeout(resolve, tiles.size()*TRANS_DELAY+1000);
    tiles.transition().duration(TRANS_LEN).delay(stagger(TRANS_DELAY))
        .style("opacity", 0)
        .remove();
    d3.selectAll(".marker").transition().duration(TRANS_LEN)
        .style("opacity", 0)
        .remove();
}
function update(data) {
    console.log("update");
    window.data = data;

    let list = data.tweet_list;
    let interval = [getDate(list[0]), getDate(list[list.length-1])]
    maxheight = (interval[0]-interval[1])/(1000*60*60*24);
    timeScale.domain(interval).range([0, maxheight*EM_PER_DAY]);

    let dates = d3.timeDays(interval[1], interval[0]);
    markers = d3.select(".tile-grid").selectAll(".time").data(dates)
    .enter().append("div");

    d3.selectAll(".avg-color").transition().duration(TRANS_LEN)
    .style("background-color", colorScale(data.avg_t_value));

    d3.select(".line").style("visibility", "visible");

    markers.attr("class", "marker")
    .style("top", (d,i) => {return timeScale(d) + "em";})
    .text((d,i) => {return dateToStr(d);})
    .style("opacity", 1e-6)
    .transition().duration(TRANS_LEN)
    .style("opacity", 1);

    tiles = d3.select(".tile-grid").selectAll(".tile").data(list)
    .enter().append("div");

    tiles.attr("class", "tile")
    .style("opacity", 1e-6)
    .style("width", (d,i) => {return d.text.length/280*95 + "%";})
    .style("top", (d,i) => {return timeScale(getDate(d)) + "em";})
    .style("background-color", (d,i) => {return colorScale(d.truth_score);})
    .style("color", (d,i) => {return colorScale(i);})
    .on("click", toggleclick)
    .transition().duration(TRANS_LEN).delay(stagger(TRANS_DELAY))
    .style("opacity", 1);

    tiles.append("p")
    .text((d,i)=>{return d.about.join()})
    .attr("class", "about");

    tiles.append("p")
    .text((d,i)=>{return d.text})
    .attr("class", "content");
}

function fetchnew(e) {
    console.log("fetch");
    let name = e.srcElement[0].value;
    let request = (name.slice(0,1) == "@") ? "/getTimeline?name=" : "/getHashTag?hashtag=";
    Promise.all([
        d3.json(BACKEND + request + escape(name)),
        new Promise(clear)
    ]).then((d) => {update(d[0])});
}

function init() {
    console.log("init");
    document.getElementById("user-form").addEventListener("submit", fetchnew);
    document.getElementById("searchbar-text").addEventListener("click", (e) => {
        e.target.value = "@";
    });
    zoom = d3.select(".tile-grid").call(d3.zoom().on("zoom", zoomed));
}

window.addEventListener("load", init);