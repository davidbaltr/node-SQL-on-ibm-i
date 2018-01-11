// jQuery function
$(document).ready(function () 
{	
	// addEventListener von jQuery
	$(submitform).click(getData);
	
	function getData()
	{
		var sqlQuery = $(query).val();
		init();

		// ajax request		
		$.ajax({
			type: 'POST',
			url: 'http://192.168.1.201:8000/sql',
			data:
			{
				query: sqlQuery
			},
			success: function (res) 
			{	
				var result = JSON.parse(res);
				if(result.length > 0)
				{			
					createTable(result);
				}
				else
				{
					showError();
				}
			},
			error: function (err) 
			{
				console.error(err);
			}
		});
	}
	function init()
	{		
		$(".tabledata").remove();
		$("#tableheaders").empty();
		$("#errdiv").empty();
		$("#query").removeClass("error");
	}
	// show records in table
	function createTable(results)
	{
		var myObj = results;
		var table = $("#datatable");
		var header = $("#tableheaders");	
		var openTh = "<th>";
		var closeTh = "</th>";
		
		// create header row
		Object.keys(myObj[0]).forEach(function (key, index) 
		{
			header.append(openTh + key + closeTh);	
		});		

		for (x in myObj) 
		{
			var tr = "<tr class=\"tabledata\">";			

			for (y in myObj[x]) 
			{				
				tr = tr + "<td>" + myObj[x][y] + "</td>";				
			}
			tr += "</tr>";
			table.append(tr);			
		}
	}
	// empty object
	function showError()
	{		
		var errDiv = "<div id=\"errdiv\"><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> Die Abfrage liefert ein leeres Ergebnis." + "</div>";
		$(".outputcontainer").append(errDiv);
		$("#query").addClass("error");		
	}
})