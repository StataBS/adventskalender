"use strict";

/*
global $
global FilterJS
*/

$(document).ready(function(){
    
    $.get("data/adventskalender.tsv", function(data) {
        var dataArray = tsvToObject(data);
        console.log(dataArray);
        
        var FJS = FilterJS(dataArray, '#days', {
          template: '#day-thumbnail-template',
          callbacks: {
            afterFilter: afterFilter,
          }
        });
        FJS.filter();
    });
});


var afterFilter = function(result, jQ){
    console.log('in callback afterFilter...');
};

//see https://gist.github.com/iwek/7154706
function tsvToObject(tsv){
  var lines = tsv.split("\n");
  var result = [];
  var headers = lines[0].split("\t");
  for(var i = 1;i < lines.length; i++){
	  var obj = {};
	  var currentline=lines[i].split("\t");
	  for(var j = 0; j < headers.length; j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result;
}


//create a div that will contain the chart and an indicator dot for each chart in the result. the result contains charts over all pages. 
//bootstrap carousel combined with modal inspired by https://codepen.io/krnlde/pen/pGijB
function createCarousel(result){
  //add a carousel-inner div for each thumbnail
  //build template function using template from DOM
  var template = (isIndikatorensetView(view)) ? '#indikator-template-modal-indikatorenset' : '#indikator-template-modal-portal';
  var html = $(template).html();
  var templateFunction = FilterJS.templateBuilder(html);
  var container = $('#carousel-inner');
  //first remove all carousel divs
  container.children().remove();
  //add a new carousel for each chart in results
  $.each(result, function(i, item){
    container.append(templateFunction(item));
  });      
  //set first child to active, only now the carousel is visible
  container.children().first().addClass("active");

  //add an indicator (dot that links to a chart) for each chart
  //build template function using template from DOM
  html = $('#carousel-indicator-template').html();
  templateFunction = FilterJS.templateBuilder(html);
  container = $('#carousel-indicators');
  //first remove all carousel divs
  container.children().remove();

  var element = $(templateFunction(1)).appendTo(container);
  //set value of data-slide-to: must be the 0-based index of the indicator      
  element.text('1 / ' + result.length);
  
  //bind keyboard to carousel: arrow left/right, esc
  //source: http://stackoverflow.com/questions/15720776/bootstrap-carousel-with-keyboard-controls
  $(document).bind('keyup', function(e) {
    if(e.which == 39){
      $('.carousel').carousel('next');
    }
    else if(e.which == 37){
      $('.carousel').carousel('prev');
    }
    else if (e.which == 27){
      $('.carousel').modal('hide');
    }
});

}
