
var nums = [78, 58, 3, 99, 45, 31, 19, 73, 32, 23, 67, 4, 1, 87];

var width = 960,
    height = 700,
    fontHeight = 36,
    baseOpacity = 0.25,
    rangeModifier = (1 - baseOpacity) / 100, //TODO: Get actual range from values
    numPasses = 0,
    curIndex = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20,20)");

function update(data) {

    // DATA JOIN
    // Join new data with old elements, if any.
    var text = svg.selectAll("text")
        .data(data, function(d) {
            return d;
        });

    // UPDATE
    // Update old elements as needed.
    text.attr("class", function(d, i) {
        return i === curIndex ? "current" : "update";
    })
        .style("fill-opacity", function(d, i){
            return i === curIndex ? 1 : (d * rangeModifier + baseOpacity);
        })
        .transition()
        .duration(200)
        .attr("y", function(d, i) {
            return i * fontHeight;
        });

    // ENTER
    // Create new elements as needed.
    text.enter()
        .append("text")
        .attr("class", "enter")
        .attr("dy", ".35em")
        .attr("x", 0)
        .attr("y", function(d, i) {
            return i * fontHeight;
        }).text(function(d) {
            return d;
        });

    // EXIT
    // Remove old elements as needed.
    text.exit().remove();
}

// The initial display.
update(nums);

setInterval(function() {
    update(sortStep(nums));
}, 300);

function sortStep(array) {
    var m = array.length,
        tmp;

    if (array[curIndex] > array[curIndex + 1]) {
        tmp = array[curIndex];
        array[curIndex] = array[curIndex + 1];
        array[curIndex + 1] = tmp;
    }

    curIndex += 1;

    if (curIndex >= m - numPasses) {
        curIndex = 0;
        numPasses += 1;
    }

    return array;
}