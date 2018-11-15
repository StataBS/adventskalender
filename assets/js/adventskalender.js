"use strict";

/*
global $
*/

$(document).ready(function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var dateOverride = parseInt($.url("?dateOverride"), 10);
  //console.log(dd, mm, yyyy, dateOverride);
  if ((mm == 12 || yyyy > 2018) && dd || dateOverride > 0){
    var day = (dateOverride > 0 ? dateOverride : dd);
    $("a[data-toggle='modal_disabled']")
      .slice(0, day)
      .attr("data-toggle", "modal");
  }
});


