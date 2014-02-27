function init() {
    alert("TESTINGGG");
 document.addEventListener("deviceready", deviceReady, true);
 delete init;
}
        alert("TESTinit");
        $( "#loginBtn" ).on( "click", function(event, ui) {
            alert("TEST");
        }






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