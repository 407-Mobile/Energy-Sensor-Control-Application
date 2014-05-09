$("#loginBtn").click(function (e) {
    e.preventDefault();

    var e = $("#email").val();
    var p = $("#password").val();

	$.ajax({
     	url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/process_login_mobile.php",
    	type: "post",
    	data: {'email': e,'p':p},
  		datatype: 'json',
      	success: function(data){
	        data = $.trim(data);
	        data = data.replace(/['"]+/g, '');

	        if(data == "Failure"){
	            alert("Incorrect Login: Please Try Again.");
	            localStorage.setItem('loggedin','false')
	            return;
	        }

	        data = parseInt(data);


	        if(typeof(data) == "number"){
	            localStorage.setItem('user_id',data)
	            localStorage.setItem('loggedin','true')

	            $(':mobile-pagecontainer').pagecontainer('change', '#devices', {
	            transition: 'slide',
	            changeHash: false,
	            showLoadMsg: true

	            });


	        }else{
	            localStorage.setItem('loggedin','false');
	            return;
	        }
         
      	},

      	error: function(error) {
        	alert((error.responseText));
        	return;
	  	}
    });
   
});


$(document).on("pageshow", "#devices", function( event ) {
    var id = localStorage.getItem("user_id");

    $.ajax({
    url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/get_devices_mobile.php",
    type: "post", 
    data: {'id': id},
    dataType: "json",
    success: function(data){

        var devices = data;
        var currPowerColor = "";
        for(var i = 0; i < devices.length; i++)
        {
            
            if(devices[i].device_state == "1")
            {
                currPowerColor = "green";
            }else{
                currPowerColor = "#800000";
            }


            $('#sensor_list').append('<li data-theme="c"><div class="ui-block-a" style="width:85%"><button data-role="button" onClick="return scheduler(this);" id='+devices[i].sensor_id+' data-state='+devices[i].device_state+' data-theme="c">'+devices[i].name+'</button></div><div class="ui-block-b" style="width:15%"><button data-role="button" style="background-color:'+currPowerColor+'" data-icon="power"data-iconpos="notext"></button></div></li>');
            
        }


        $('#sensor_list').trigger('create');

         
    },
    
    error: function(error) {
        alert(error.responseText);
    }
    
    });
});

$(document).on("pageshow", "#sensor_settings", function( event ) {
    var sensor_id = localStorage.getItem("sensor_id");
    var device_state = localStorage.getItem('device_state');

    if(device_state == "0"){
        $('#device_state').val('off').slider("refresh");
    }else{
        $('#device_state').val('on').slider("refresh");
    }

    $('#schedule_list').append('<div><li data-role="list-divider" role="heading"><h3 style="text-align:center">Active Schedules</h3></li></div>');
    $('#schedule_list').trigger('create');

    $.ajax({
    url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/get_schedules.php",
    type: "post", 
    data: {'sensor_id': sensor_id},
    dataType: "json",
    success: function(data){
        var schedules = data;
        var newTime;

        for(var i = 0; i < schedules.length; i++)
        {
            newTime = ""
            var parts = schedules[i].time.split(':'),
                hour = parts[0],
                minutes = parts[1];

            if (hour > 12) {
                newTime = (hour - 12) + ':' + minutes + ' pm';
            } else if (hour == 0) {
                console.log("hour == 0 test" + hour);
                newTime = 12 + ':' + minutes + ' am';
            } else if (hour == 12) {
                newTime = 12 + ':' + minutes;
                newTime += ' pm';
            } else {
                newTime = parseInt(hour) + ":" + minutes;
                newTime += ' am';
            }

            var weekColors = []
            if(data[i].sunday == 1){
                weekColors[0] = "cornflowerblue";
            }else{
                weekColors[0] = "grey";
            }

            if(data[i].monday == 1){
                weekColors[1] = "cornflowerblue";
            }else{
                weekColors[1] = "grey";
            }

            if(data[i].tuesday == 1){
                weekColors[2] = "cornflowerblue";
            }else{
                weekColors[2] = "grey";
            }

            if(data[i].wednesday == 1){
                weekColors[3] = "cornflowerblue";
            }else{
                weekColors[3] = "grey";
            }

            if(data[i].thursday == 1){
                weekColors[4] = "cornflowerblue";
            }else{
                weekColors[4] = "grey";
            }

            if(data[i].friday == 1){
                weekColors[5] = "cornflowerblue";
            }else{
                weekColors[5] = "grey";
            }

            if(data[i].saturday == 1){
                weekColors[6] = "cornflowerblue";
            }else{
                weekColors[6] = "grey";
            }

            $('#schedule_list').append('<li data-theme="c"><div class="ui-block-a" style="width:40%"><h3 style="text-align:center">'+newTime+'<br><span style="color: '+weekColors[0]+'">Su</span> <span style="color: '+weekColors[1]+'">M</span> <span style="color: '+weekColors[2]+'">T</span> <span style="color: '+weekColors[3]+'">W</span> <span style="color: '+weekColors[4]+'">Tr</span> <span style="color: '+weekColors[5]+'">Fr</span> <span style="color: '+weekColors[6]+'">Sa</span></h3></div><div class="ui-block-b" style="width:25%"><div data-role="fieldcontain" data-controltype="toggleswitch" data-theme="c"><select name="toggleswitch1" id='+data[i].schedule_id+' data-theme="c" onChange="return scheduleState(this);" data-role="slider" data-mini="true" data-theme="c"><option value="off">Off</option><option value="on">On</option></select></div></div><div class="ui-block-c"><button data-role="button" data-icon="delete" id='+data[i].schedule_id+' onClick="return delete_schedule(this);" data-iconpos="notext">Delete</button></div></li>');
   
        }

        $('#schedule_list').trigger('create');
         
    },
    
    error: function(error) {
        alert(error.responseText);
    }
    
	});
    
});

$("#btnSensors").click(function (e) {
    $('#sensor_list').empty();
    $('#sensor_list').trigger('create');
    
    $(':mobile-pagecontainer').pagecontainer('change', '#sensor_settings', {
        transition: 'slide',
        changeHash: false,
        showLoadMsg: true
    });

});

$("#btnLogout").click(function (e) {
    $('#sensor_list').empty();
    $('#sensor_list').trigger('create');

    $(':mobile-pagecontainer').pagecontainer('change', '#loginPage', {
        transition: 'slide',
        changeHash: false,
        reverse: true,
        showLoadMsg: true

    });

});

$("#btnBacktoDevices").click(function (e) {
    $('#schedule_list').empty();
    $('#schedule_list').trigger('create');
    
    $(':mobile-pagecontainer').pagecontainer('change', '#devices', {
        transition: 'slide',
        changeHash: false,
        reverse: true,
        showLoadMsg: true

    });

});

$("#btnBacktoSensorSettings").click(function (e) {

    $(':mobile-pagecontainer').pagecontainer('change', '#sensor_settings', {
        transition: 'slide',
        changeHash: false,
        reverse: true,
        showLoadMsg: true
    });

});

$("#setSchedule").click(function (e) {

    $('#schedule_list').empty();
    $('#schedule_list').trigger('create');

    $(':mobile-pagecontainer').pagecontainer('change', '#time_scheduler', {
            transition: 'slide',
            changeHash: false,
            showLoadMsg: true

    });

});


$('#device_state').on('slidestop', function () {

    var state = $('#device_state').val();
    var sensor_id = localStorage.getItem('sensor_id');

    $.ajax({
        url: "http://studioxps.wings.cs.wisc.edu/cgi-bin/relay.cgi?sensorid="+sensor_id+"&state="+state+"",
        type: "get", 
        success: function(data){

        },
        
        error: function(error) {
            console.log(error.responseText);
        }
        
        });

});


function scheduleState(schedule){
    
    var id = schedule.id;
    var state = $('#'+id+'').val();

    if(state == "off"){
        state = 0;
    }else{
        state = 1;
    }

    $.ajax({
        url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/change_schedule_state.php",
        type: "post",
        data: {'schedule_id':id, 'schedule_state':state},
        success: function(data){        
        },
        
        error: function(error) {
            console.log(error);
        }
        
    });

};

$("#btnSaveSchedule").click(function (e) {

    var sensor_id = localStorage.getItem('sensor_id');
    var time = $('#time').val();
    var device_state = parseInt($('#device_state').val());
    var schedule_state = 1;
    var sunday = $('#sunday').is(":checked") ? 1: 0;
    var monday = $('#monday').is(":checked") ? 1: 0;
    var tuesday = $('#tuesday').is(":checked") ? 1: 0;
    var wednesday = $('#wednesday').is(":checked") ? 1: 0;
    var thursday = $('#thursday').is(":checked") ? 1: 0;
    var friday = $('#friday').is(":checked") ? 1: 0;
    var saturday = $('#saturday').is(":checked") ? 1: 0;

    if(time == "")
    {
        alert("Please make sure to enter a value for the time field");
        return;
    }

    var schedule_data = {"sensor_id": sensor_id,
                "time": time,
                "device_state": device_state,
                "schedule_state": schedule_state,
                "sunday": sunday,
                "monday": monday,
                "tuesday": tuesday,
                "wednesday": wednesday,
                "thursday": thursday,
                "friday": friday,
                "saturday": saturday
    };
    console.log(sensor_id);
    $.ajax({
    	url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/set_schedules.php",
        type: "post", 
        data: schedule_data,
        dataType: "json",
        success: function(data){

        },
        
        error: function(error) {
            console.log(error);
            console.log(error.responseText);
            return;
        }
        
    });

    $(':mobile-pagecontainer').pagecontainer('change', '#sensor_settings', {
            transition: 'slide',
            changeHash: false,
            reverse: true,
            showLoadMsg: true

    });

});


function scheduler(sensor){
    $('#sensor_list').empty();
    $('#sensor_list').trigger('create');

    var sensor_id = sensor.id;
    var device_state = $(sensor).attr("data-state");

    localStorage.setItem('sensor_id',sensor_id);
    localStorage.setItem('device_state', device_state);
    
    $(':mobile-pagecontainer').pagecontainer('change', '#sensor_settings', {
        transition: 'slide',
        changeHash: false,
        showLoadMsg: true

    });
}

function delete_schedule(schedule){

    var id = schedule.id;
    var sensor_id = localStorage.getItem('sensor_id');

    $.ajax({
    url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/delete_schedules.php",
    type: "post", 
    data: {'schedule_id': id},
    dataType: "json",
    success: function(data){

    },
    
    error: function(error) {
        console.log(error);
    }
    
    });
    
    $('#schedule_list').empty();

    $.ajax({
    url: "http://studioxps.wings.cs.wisc.edu/digitalnetworkdevices/includes/get_schedules.php",
    type: "post", 
    data: {'sensor_id': sensor_id},
    dataType: "json",
    success: function(data){
        var schedules = data;
        var newTime;

        for(var i = 0; i < schedules.length; i++)
        {
            newTime = ""
            var parts = schedules[i].time.split(':'),
                hour = parts[0],
                minutes = parts[1];

            if (hour > 12) {
                newTime = (hour - 12) + ':' + minutes + ' pm';
            } else if (hour == 0) {
                console.log("hour == 0 test" + hour);
                newTime = 12 + ':' + minutes + ' am';
            } else if (hour == 12) {
                newTime = 12 + ':' + minutes;
                newTime += ' pm';
            } else {
                newTime = parseInt(hour) + ":" + minutes;
                newTime += ' am';
            }

            var weekColors = []
            if(data[i].sunday == 1){
                weekColors[0] = "cornflowerblue";
            }else{
                weekColors[0] = "grey";
            }

            if(data[i].monday == 1){
                weekColors[1] = "cornflowerblue";
            }else{
                weekColors[1] = "grey";
            }

            if(data[i].tuesday == 1){
                weekColors[2] = "cornflowerblue";
            }else{
                weekColors[2] = "grey";
            }

            if(data[i].wednesday == 1){
                weekColors[3] = "cornflowerblue";
            }else{
                weekColors[3] = "grey";
            }

            if(data[i].thursday == 1){
                weekColors[4] = "cornflowerblue";
            }else{
                weekColors[4] = "grey";
            }

            if(data[i].friday == 1){
                weekColors[5] = "cornflowerblue";
            }else{
                weekColors[5] = "grey";
            }

            if(data[i].saturday == 1){
                weekColors[6] = "cornflowerblue";
            }else{
                weekColors[6] = "grey";
            }

            $('#schedule_list').append('<li data-theme="c"><div class="ui-block-a" style="width:40%"><h3 style="text-align:center">'+newTime+'<br><span style="color: '+weekColors[0]+'">Su</span> <span style="color: '+weekColors[1]+'">M</span> <span style="color: '+weekColors[2]+'">T</span> <span style="color: '+weekColors[3]+'">W</span> <span style="color: '+weekColors[4]+'">Tr</span> <span style="color: '+weekColors[5]+'">Fr</span> <span style="color: '+weekColors[6]+'">Sa</span></h3></div><div class="ui-block-b" style="width:25%"><div data-role="fieldcontain" data-controltype="toggleswitch" data-theme="c"><select name="toggleswitch1" id="toggleswitch1" data-theme="c" data-role="slider"data-mini="true" data-theme="c"><option value="off">Off</option><option value="on">On</option></select></div></div><div class="ui-block-c"><button data-role="button" id='+data[i].schedule_id+' data-icon="delete" onClick="return delete_schedule(this);" data-iconpos="notext">Delete</button></div></li>');
            
        }

        $('#schedule_list').trigger('create');
        
    },
    
    error: function(error) {
        alert(error.responseText);
    }
    
	});

}