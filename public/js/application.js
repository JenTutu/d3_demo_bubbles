$(document).ready(function() {
  var links = [
  {source: "Lienha", target: "Tanner", type: "week1"},
  {source: "Lienha", target: "Jeremy", type: "licensing"},
  {source: "Joseph", target: "Jennifer", type: "suit"},
  {source: "Steve", target: "Jennifer", type: "suit"},
  {source: "Quy", target: "Jennifer", type: "resolved"},
  {source: "Jeremy", target: "Jennifer", type: "suit"},
  {source: "Angela", target: "Jennifer", type: "suit"},
  {source: "Lienha", target: "Ismail", type: "suit"},
  {source: "Lienha", target: "Quy", type: "suit"},
  {source: "Johnathan", target: "Salamander", type: "suit"},
  {source: "Jennifer", target: "Jeremy", type: "suit"},
  {source: "Lienha", target: "Inventec", type: "suit"},
  {source: "Joseph", target: "Angela", type: "resolved"},
  {source: "Tanner", target: "Angela", type: "resolved"},
  {source: "Spencer", target: "Angela", type: "suit"},
  {source: "Andrew", target: "Tanner", type: "suit"},
  {source: "Angela", target: "Tanner", type: "resolved"},
  {source: "Jennifer", target: "Andrew", type: "resolved"},
  {source: "Adrian", target: "Andrew", type: "resolved"},
  {source: "Jennifer", target: "Steve", type: "suit"},
  {source: "Lienha", target: "Steve", type: "suit"},
  {source: "Steve", target: "Lienha", type: "suit"},
  {source: "David", target: "Simon", type: "suit"},
  {source: "Marek", target: "Simon", type: "suit"},
  {source: "Angela", target: "Joseph", type: "resolved"},
  {source: "Jennifer", target: "Joseph", type: "suit"},
  {source: "Angela", target: "Spencer", type: "suit"},
  {source: "Andrew", target: "Adrian", type: "suit"}
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 960,
    height = 960;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("margin", "0 auto");

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["week1","suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 6)
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

});
