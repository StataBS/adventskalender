"use strict";

/*
global $
global d3
*/

$(document).ready(function(){
    $.get("data/adventskalender.tsv", function(data) {
        
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
        
        var dataArray = tsvToObject(data);
        console.log(dataArray);
    });
});