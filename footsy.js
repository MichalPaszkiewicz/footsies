var colors = [
	{ color:"#F7464A", highlight: "#FF5A5E" },
	{ color: "#46BFBD", highlight: "#5AD3D1"},
	{ color: "#FDB45C", highlight: "#FFC870"},
	{ color: "rgb(73, 88, 196)", highlight: "rgb(82, 96, 197)"},
	{ color: "rgb(44, 184, 55)",highlight: "rgb(77, 184, 85)"},
	{ color: "#CC33FF", highlight: "#D65CFF"},
	{ color: "#993333" , highlight: "#AD5C5C" },
	{ color: "#009999" , highlight: "#33ADAD" },
	{ color: "#9999FF" , highlight: "#ADADFF" },
	{ color: "#FFCC00" , highlight: "#FFD633" },
];

var allTheThings = new Array();

var feed = $.getJSON("https://spreadsheets.google.com/feeds/list/0AhySzEddwIC1dEtpWF9hQUhCWURZNEViUmpUeVgwdGc/1/public/basic?alt=json", function(data){ 

var things = "";		
var currentArray = data.feed.entry;

for(var i = 0; i < currentArray.length - 2; i++){

if(currentArray[i].content != undefined){
var text = currentArray[i].content.$t;


var sections = text.split(",");

var obj = { "name": sections[0].substring(sections[0].indexOf(":") + 2)
,"price": sections[1].substring(sections[1].indexOf(":") + 2)
,"change": sections[2].substring(sections[2].indexOf(":") + 2)
};

allTheThings.push(obj);
}
}

createChart(ctx, "pie");
createChart(ctx2, "bar");
});

var ctx = document.getElementById("myChart").getContext("2d");
var ctx2 = document.getElementById("myBarChart").getContext("2d");

    function getPushItem(array, item){
        return	{
	        value: parseFloat(( 100 * array[item].change / array[item].price).toFixed(2)),
                color: colors[item].color,
                highlight: colors[item].highlight,
                label: array[item].name + " (%)"
            };
    }

function createChart(canvas, type){

var top = allTheThings.sort(function(a, b){
return (b.change / b.price) - (a.change / a.price);
});

if(type == "pie"){
    var data = [];
    for(var j = 0; j < 10; j ++){
        data.push(getPushItem(top, j));
    }

    var myPieChart = new Chart(canvas).Pie(data);
}

else if(type== "bar"){
	var data = { labels: [], datasets: [
        {
            label: "First dataset",
            fillColor: "rgba(150,220,150,0.8)",
            strokeColor: "rgba(50,50,50,0.3)",
            highlightFill: "rgba(140,220,140,0.55)",
            highlightStroke: "rgba(50,50,50,0.9)",
            data: []
        }] };
       
       for(var j = 0; j < 10; j++)
       {
            data.labels.push(  top[j].name + " (%)");
            data.datasets[0].data.push( parseFloat((100 * top[j].change / top[j].price ).toFixed(2)) );
        
       }
	
	var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.1)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}
	
    var myBarChart = new Chart(ctx2).Bar(data, options);
};
};
