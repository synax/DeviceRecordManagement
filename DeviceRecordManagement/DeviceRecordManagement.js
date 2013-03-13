
$(function() {

// Set Single Source Policy => Allow Cross Domain Requests
			$.support.cors = true;

		$("#deleteButton").click(function() {
			alert(DeleteMachine());
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
			           result =  response;			       
			        }
			    });	
				
				return result
					
									
			    
		}
});