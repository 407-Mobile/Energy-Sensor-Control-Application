function init() {

 document.addEventListener("deviceready", deviceReady, true);
 delete init;
}


$("#loginBtn").click(function (e) {
	if(localStorage){
		//Set the name, age and colour items
		alert("yay");
	}
	//Alert the user to upgrade their browser
	else {
		alert('Local storage not supported. Please get a proper browser');
	}

	// var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
	// alert(db.name);

var u = $("#username").val();
var p = $("#password").val();
// window.localStorage.setItem("key", "minhbinh");
//                 var keyname = window.localStorage.key(i);
//                 // keyname is now equal to "key"
//                 var value = window.localStorage.getItem("key");
alert(u);
alert(p);
// alert(keyname);
// alert(value);
});






// $(document).bind('pageinit', function(event){
// var u = $("#username", this).val();
//  var p = $("#password", this).val();
//  alert(u);
//  alert(p);
//  $( "#loginBtn" ).on( "click", function(event, ui) {
//     alert("TEST");
//      //disable the button so we can't resubmit while we wait
//      $("#submitButton",this).attr("disabled","disabled");
//  var u = $("#username", this).val();
//  var p = $("#password", this).val();
//  alert(u);
//  alert(p);
//  // if(u != '' && p!= '') {
//      // $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
//          // if(res == true) {
//              $.mobile.changePage("home.html");
//          // } else {
//              // navigator.notification.alert("Your login failed", function() {});
//          // }
//          // $("#submitButton").removeAttr("disabled");
//      // },"json");
// // }
// return false;
// });
// }