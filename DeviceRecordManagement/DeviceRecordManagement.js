
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
			
			$.SCCMSettings = { 
				WebserviceUri : "http://zrheae18.emea.kuoni.int/deploymentwebservice/sccm.asmx", 
				SiteCode : "ZRH" 
			};
			
			$("#deleteButtonMac").button();
			
			$("#deleteButtonName").button();
			
			
			$("#accordion").accordion();
					
			var cache = {};
			
			$("#resourceSelect").autocomplete({
			  delay: 1000,
  			  select: function( event, ui ) {
			  
				$("#resourceID").text(ui.item.value);
				$("#resourceSelect").val(ui.item.label);
				$("#deleteButtonName").button("enable");
				$("#contentWidgetComputerName").addClass("ui-state-highlight");	
				return false;
			  
			  },
			  minLength: 2,
			  source: function( request, res ) {
				var term = request.term;
								
				var resources =  new Array();        
			
                $.ajax({
			        type: "GET",
					async: true,
			        url:  $.SCCMSettings.WebserviceUri + "/SearchComputerByName",
			        contentType: "text/xml; charset=utf-8",
			        data: {SearchString:term,siteCode:$.SCCMSettings.SiteCode},
			        success: function (response) {
					
					
						
			            $(response).find("Resource").each(function () {			                     
			              
							resources.push( { "label":$(this).find("NetbiosName").text() , "value":$(this).find("ResourceID").text()  } );					
			
             
			            });
						
						
						res( resources );
					
			        },
			        error: function (response) {
			            res(resources);			       
			        }
			    });	
				
				
				
				
				 
				}
			  
			});
			
			
			
			$("#macAddress").change(function() { 
				
				//if (IsDeviceKnown() == "true") {				
						
					var DeviceName = GetDeviceNameByMac();
					
					if (DeviceName == "error")  {
						$("#deviceName").text("Webservice request error...");
						$("#contentWidgetMacAddress").addClass("ui-state-error");	
						
					} else {
				
						if (DeviceName == "" ) {
						
							$("#deviceName").text("Device name not found...");	
							$("#contentWidgetMacAddress").addClass("ui-state-highlight");							
							
						} 	
						else {
							$("#deviceName").text(DeviceName);
							$("#deleteButtonMac").button("enable");
							$("#contentWidgetMacAddress").addClass("ui-state-highlight");	
						}
					
					}					
					
				//} else {
				
					//$("#deviceName").text("Device is not known in SCCM...");
				
				//}			
				
			});
				
			
		
			$("#deleteButtonMac").click(function() {
				var result = DeleteMachineByMac();
				
				if (result == "false" || result == "error") {
					
					$("#removalResult").text("Device removal failed! Sure the client exists?");			
					$("#removalResult").addClass("ui-state-error");		
				} 		
				
				if (result == "true"){
					
					$("#removalResult").text("Device '" + $("#deviceName").text() + "' (MAC: " + $("#macAddress").val() + ") removed successfully!");	
					$("#removalResult").addClass("ui-state-highlight");
					$("#deleteButtonMac").button("disable");
					$("#macAddress").val("");
					
				}			
				
				$("#removalResult").show();	
				
			});
			
			
			
			
			$("#deleteButtonName").click(function() {
				var result = DeleteMachineByName();
				
				if (result == "false" || result == "error") {
					
					$("#removalResult").text("Device removal failed! Sure the client exists?");			
					$("#removalResult").addClass("ui-state-error");		
				} 		
				
				if (result == "true"){
					
					$("#removalResult").text("Device '" + $("#resourceSelect").val() + "' (Resource ID: " + $("#resourceID").text() + ") removed successfully!");	
					$("#removalResult").addClass("ui-state-highlight");
					$("#deleteButtonName").button("disable");
					$("#resourceID").text("");
					$("#resourceSelect").val("");
					
				}			
				
				$("#removalResult").show();	
				
			});
		
		
		 var DeleteMachineByMac = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  $.SCCMSettings.WebserviceUri + "/DeleteComputer",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:$.SCCMSettings.SiteCode},
			        success: function (response) {
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
		
		var DeleteMachineByName = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  $.SCCMSettings.WebserviceUri + "/DeleteComputerByID",
			        contentType: "text/xml; charset=utf-8",
			        data: {ResourceID:$("#resourceID").text(),SiteCode:$.SCCMSettings.SiteCode},
			        success: function (response) {
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
		
		var GetResourceByName =function (term)
		{
		
				
				
				return resources
					
									
			    
		}

		var GetDeviceNameByMac = function ()
		{
        
				var result;
		
                $.ajax({
			        type: "GET",
					async: false,
			        url:  $.SCCMSettings.WebserviceUri + "/GetComputerName",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:$.SCCMSettings.SiteCode},
			        success: function (response) {
			          
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
			        url:  $.SCCMSettings.WebserviceUri + "/IsComputerKnown",
			        contentType: "text/xml; charset=utf-8",
			        data: {MACAddress:$("#macAddress").val(),UUID:"",SiteCode:$.SCCMSettings.SiteCode},
			        success: function (response) {
			            
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

