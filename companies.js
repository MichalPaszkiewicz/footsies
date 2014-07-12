
var item = "";
var company = "";

$("#GetCompanyDetails").click(function(){
	var companyNumber = $("#CompanyNumber").val();

	var chURL = "http://data.companieshouse.gov.uk/doc/company/" + companyNumber + ".json";

	$.getJSON(chURL, function(data){ item = data;

	
	company = item.primaryTopic; 


	$("#CompanyDetails").html(company.CompanyName + "<br>"
		+ company.RegAddress.AddressLine1 + "<br>"
		+ company.RegAddress.AddressLine2 + "<br>"
		+ company.RegAddress.County + "<br>"
		+ company.RegAddress.PostTown + "<br>"
		+ company.RegAddress.Postcode + "<br>"
		+ company.CountryOfOrigin + "<br>"
		+ company.IncorporationDate
		
		

		);
	});

	



	
});