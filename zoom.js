
//DOCS: https://jsfiddle.net/fmesvgL8/
// set up a zoom handler only for panning
// by limiting the scaleExtent    
var zoom = d3.behavior.zoom()
  .x(x)
  .y(y)
  .scaleExtent([1, 1])
  .on("zoom", pan);

var loadedPage = 1; // begin with one page of data loaded
var nextPage = 2; // next page will be page 2
var panX = 0;

function pan() {

  if (d3.event) {

    panX = d3.event ? d3.event.translate[0] : 0;

    // is there a better way to determine when
    // to load the next page?
    nextPage = panX / (width + margin.left + margin.right) + 2;
    nextPage = Math.floor(nextPage);

    // if we haven't loaded in the next page's data
    // load it in so that the user can scroll into it
    if (nextPage > loadedPage) {

      console.log("Load a new page");
      loadedPage += 1;

      // load more data
      Chart.query( /*params will be here*/ ).then(
        function(response) {

          // append the new data onto the front of the array
          data = data.concat(response);
          console.log(data.length);

          // I need to add the new data into the line chart
          // but how do I make that work with the pan
          // logic from zoom?

        }
      );
    }
    // is this where I update the axes and scroll the chart?
    // What's the best way to do that?

  }
}