//DOCS: http://jsfiddle.net/vrWDc/19/
var graph = {
    "nodes": [{
        "name": "Myriel",
        "group": 1
    }, {
        "name": "Napoleon",
        "group": 1
    }, {
        "name": "Mlle.Baptistine",
        "group": 1
    }, {
        "name": "Mme.Magloire",
        "group": 1
    }],
        "links": [{
        "source": 1,
        "target": 0,
        "value": 30
    }, {
        "source": 2,
        "target": 0,
        "value": 38
    }, {
        "source": 3,
        "target": 0,
        "value": 40
    }, {
        "source": 3,
        "target": 2,
        "value": 60
    }]
};

var width = 460,
    height = 400;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-10)
    .linkDistance(80)
    .gravity(0.02)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


force.nodes(graph.nodes)
    .links(graph.links)
    .start();

var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
    return Math.sqrt(d.value);
});

var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("g").call(force.drag);

node.append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .style("fill", function (d) {
    return color(d.group);
});

node.append("text")
    .text(function (d) {
    return d.name;
});

node.append("title")
    .text(function (d) {
    return d.name;
});

force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
});