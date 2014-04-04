$( "#tsDControl" ).on( "slidestop", function(event, ui) {
  
  //Get boolean of whether or not slide toggle is on for distance control
  var bDControl = $("#tsDControl").val();

  //If off, hide settings below
  if(bDControl == "off")
  {
  	$( "#distance_group" ).hide();
  }	
  else
  {
  	$( "#distance_group" ).show();
  }

});