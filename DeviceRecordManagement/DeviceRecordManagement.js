
// We can also use a transform to normalize values.
// For instance, if we wish to ignore case 
// (i.e. if "abc" and "ABC" should be treated as a repeat)
// we can pass in a transform that makes all values upper-case.
// An example of this might be network interface hardware addresses.

// We'll allow the values to be in upper or lower case, 
// but treat those as the same value.


$(function() {

		// Set Single Source Policy => Allow Cross Domain Requests
			$.support.cors = true;		
			
			$("#deleteButton").button()
			
			$("#macAddress").change(function() { 
				
				if (IsDeviceKnown()) {
				
					var DeviceName = GetDeviceNameByMac();
				
					if (DeviceName == "" || DeviceName == "error") {
					
						$("#deviceName").text("Device not found...");			
						
					} 	
					else {
						$("#deviceName").text(DeviceName);
						$("#deleteButton").button("enable");
					}

					
					
				} else {
				
					$("#deviceName").text("Device not found...");
				
				}			
				
			});
			
		
			$("#deleteButton").click(function() {
				var result = DeleteMachine();
				
				if (result == "false" || result == "error") {
					
					$("#removalResult").text("Device removal failed! Sure the client exists?");			
					$("#removalResult").addClass("ui-state-error");		
				} 		
				
				if (result == "true"){
					
					$("#removalResult").text("Device '" + $("#deviceName").text() + "' (MAC: " + $("#macAddress").val() + ") removed successfully!");	
					$("#removalResult").addClass("ui-state-highlight");
					$("#deleteButton").button("disable");
					$("#macAddress").val("");
					
				}			
				
				$("#removalResult").show();	
				
			});
		
		
		 var DeleteMachine = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  "http://selfservice.corp.viamonstra.com/deploymentwebservice/sccm.asmx/DeleteComputer",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:"PS1"},
			        success: function (response) {
			            $('#result').html('success:');
			            $(response).find("boolean").each(function () {			                     
			              
			               	result = $(this).text();			
							
							
									             
			            });
			        },
			        error: function (response) {
			           result =  "error";			       
			        }
			    });	
				
				return result
					
									
			    
		}

		var GetDeviceNameByMac = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  "http://selfservice.corp.viamonstra.com/deploymentwebservice/sccm.asmx/GetComputerName",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:"PS1"},
			        success: function (response) {
			            $('#result').html('success:');
			            $(response).find("string").each(function () {			                     
			              
			               	result = $(this).text();			
							
							
									             
			            });
			        },
			        error: function (response) {
			           result =  "error";			       
			        }
			    });	
				
				return result
					
									
			    
		}
		
		var IsDeviceKnown = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  "http://selfservice.corp.viamonstra.com/deploymentwebservice/sccm.asmx/IsComputerKnown",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:"PS1"},
			        success: function (response) {
			            $('#result').html('success:');
			            $(response).find("boolean").each(function () {			                     
			              
			               	result = $(this).text();			
							
							
									             
			            });
			        },
			        error: function (response) {
			           result =  "error";			       
			        }
			    });	
				
				return result
					
									
			    
		}
});

