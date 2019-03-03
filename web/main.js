"use strict";

const BACKEND = "http://localhost:8888";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const TRANS_LEN = 500;
const TRANS_DELAY = 10;
let EM_PER_DAY = 10;
let colorScale = d3.scaleSequential(d3.interpolateCubehelix("#B9FFC4", "#C9AFCC")).domain([0,1]);
// let colorScale = d3.scaleSequential(d3.interpolateCubehelix("#369986", "#C985CC"));
let timeScale = d3.scaleTime();
let lastClicked;

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

function toggleclick(d, i) {
    if (lastClicked && lastClicked != this) {
        lastClicked.classList.remove("clicked");
    }
    this.classList.toggle("clicked");
    lastClicked = this;
}

function clear(data) {
    let tiles = d3.selectAll(".tile");
    if (tiles.size() === 0) {
        update(data);
        return;
    }
    setTimeout(()=>{update(data)}, tiles.size()*TRANS_DELAY+1000);
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
    timeScale.domain(interval).range([0, (interval[0]-interval[1])/(1000*60*60*24)*EM_PER_DAY]);

    let dates = d3.timeDays(interval[1], interval[0]);
    let markers = d3.select(".tile-grid").selectAll(".time").data(dates)
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

    let divs = d3.select(".tile-grid").selectAll(".tile").data(list)
    .enter().append("div");
    console.log(divs.size());

    divs.attr("class", "tile")
    .style("opacity", 1e-6)
    .style("width", (d,i) => {return d.text.length/280*95 + "%";})
    .style("top", (d,i) => {return timeScale(getDate(d)) + "em";})
    .style("background-color", (d,i) => {return colorScale(d.truth_score);})
    .style("color", (d,i) => {return colorScale(i);})
    .on("click", toggleclick)
    .transition().duration(TRANS_LEN).delay(stagger(TRANS_DELAY))
    .style("opacity", 1);

    divs.append("p")
    .text((d,i)=>{return d.about.join()})
    .attr("class", "about");

    divs.append("p")
    .text((d,i)=>{return d.text})
    .attr("class", "content");
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