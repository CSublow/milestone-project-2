/*global $*/
/*global crossfilter*/
/*global queue*/
/*global d3*/
/*global dc*/

//QUEUE
queue()
    .defer(d3.json, "assets/data/data.json") //Fetch the data
    .await(makeGraph); //Call makeGraph when the data is ready 

//Global Color Variables
var generalColor = "#0b9c00",

    carsPetrolColor = "#9dc183",
    carsDieselColor = "#708238",
    lgvPetrolColor = "#c7ea46",
    lgvDieselColor = "#3f704d",
    hgvColor = "#00A86B",
    busesAndCoachesColor = "#8F9779",
    motorcyclesColor = "#4F7942",
    mopedsColor = "#29AB87",
    lpgColor = "#A9BA9D";

//DATA VISUALISATION FUNCTION
function makeGraph(error, ggData) {
    if (error) throw error;
    var ndx = crossfilter(ggData); //Load the data into a crossfilter
    
    //Dimensions
    var sourceDim = ndx.dimension(dc.pluck("Source")),
        yearDim = ndx.dimension(dc.pluck("Year"));
    
    //Groups
    var totalEmissionsPerSourceGroup = sourceDim.group().reduceSum(dc.pluck("Emissions")),
        
        totalEmissionsPerYearGroup = yearDim.group().reduceSum(dc.pluck("Emissions")),
        totalEmissionsPerYearGroupSum = yearDim.groupAll().reduceSum(dc.pluck("Emissions")),
        
        sumEmissions = sourceDim.groupAll().reduceSum(dc.pluck("Emissions")),
        sumEmissionsValue = sumEmissions.value(),
        
        countYears = yearDim.group().reduceCount().size();
        
    //Source Groups
    var totalEmissionsCarPetrolGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Cars - Petrol") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsCarDieselGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Cars - Diesel") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsLgvPetrolGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "LGV - Petrol") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsLGVDieselGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "LGV - Diesel") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsBusAndCoachGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Buses and Coaches") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsHgvGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "HGV") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsMotorcyclesGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Motorcycles - >50cc") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsMopedsGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Mopeds - <50cc") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsLPGGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "All LPG Vehicles") {
                return d.Emissions;
            } else {
                return 0;
            }
        });
    
    //Axes
    //Explicitly map the domain in order to get custom tick layout for x axis on some charts
    var domain = ggData.map(function(d) {
        return d.Year;
    }),
        ticks = domain.filter(function(v, i) {
        //Without the while loop, the years are returned several times over. I only want them returned once, hence the size of the countYears var is used as a reference
        while (i < countYears) {
            return i % 2 === 0;
        }
    });
    
    //FUNCTION CALLS
    totalEmissionsFigure(ndx);
    averageEmissionsFigure(ndx);
    
    showSourceSelector(ndx);
    timeFigure(ndx);
    timeFigurePercentage(ndx);
    totalEmissionsOverTime(ndx);
    compositeChart(ndx);
    
    showYearSelector(ndx);
    periodFigure(ndx);
    totalEmissionsPerSource(ndx);
    totalEmissionsPerSourcePie(ndx);

    dc.renderAll(); //Render all charts
    
    addForceCenter();
    
    // // // DEFINE FUNCTIONS
    
    // // // GENERAL FUNCTIONS
    //Responsiveness function, this adds a degree of responsiveness to the charts and works alongside bootstrap's rows system
    function chartsResponsive(chartType, chartWidthSmall, chartWidthLarge, renderChart, chartLegend, legendXSmall, legendXLarge) {
        if ($(window).width() > 1182 && $(window).width() < 1331) { //If the browser window is within the target width range
            chartType
                .width(chartWidthSmall);
            if (renderChart == true) { //Chart render only has to be called when the window resize function is invoked, not when the page is loaded initially
                chartType.render();
            };
            if (chartLegend == true) { //Only some chart types need a legend
                chartType
                    .legend(dc.legend()
                        .x(legendXSmall)
                        .y(20)
                        .itemHeight(13)
                        .gap(5));
            };
        } else { //Else the chart width is able to be higher
            chartType
                .width(chartWidthLarge);
            if (renderChart == true) {
                chartType.render();
            };
            if (chartLegend == true) { //Only some chart types need a legend
                chartType
                    .legend(dc.legend()
                        .x(legendXLarge)
                        .y(20)
                        .itemHeight(13)
                        .gap(5));
            };
        };
        addForceCenter(); //Rerendering the chart removes the class, this has to be added back in
    };
    
    //This function helps totalEmissionsPerSource's x axis ticks be more legible
    function adjustXTicks() {
        //Move every 2nd tick text down slightly
        d3.selectAll("#total-emissions-per-source .x.axis .tick:nth-child(even) text")
            .style("transform", "translate(0,20px)");
            
        //Increase the length of every 2nd tick line
        d3.selectAll("#total-emissions-per-source .x.axis .tick:nth-child(even) line")
            .attr("y2", "20");
    };
    
    //Add a class used to center the charts in the viewport
    function addForceCenter() {
        d3.selectAll('svg')
            .attr('class', 'force-center');
    };
    
    // // // CHART RENDERING FUNCTIONS
    
    //Render the total emissions figure
    function totalEmissionsFigure(ndx) {
        dc.numberDisplay("#total-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .valueAccessor(function(d) {
                return d;
            });
    };

    //Render the average emissions figure
    var generatedValue; //Declare the var where the value generated by averageEmissionsFigure will live
    function averageEmissionsFigure(ndx) {
        dc.numberDisplay("null") //I don't actually want dc to render the value, hence I provide a dummy parent
            .group(sumEmissions)
            .valueAccessor(function(d) {
                generatedValue = d / countYears; //I generate a value and assign it to the variable
            });
    };
    $('#average-emissions-figure').html(generatedValue.toLocaleString("en", {maximumFractionDigits: 2})); //jQuery is used to print the value to the document. Using jQuery means the value stays constant regardless of any crossfilter filtering, which is the desire functionality

    //Render the select menu to show data for a particular vehicle type
    var sourceSelectMenu; //Declare outside of function for use in jQuery document.ready function
    function showSourceSelector(ndx) {
        sourceSelectMenu = dc.selectMenu("#source-selector");
        sourceSelectMenu
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .promptText("All Vehicles")
            .title(function(d) {
                return d.key;
            });
    };
    
    //Render the figure that interacts with the emissions over time charts
    function timeFigure(ndx) {
        dc.numberDisplay("#show-time-figure")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            });
    };
    
    //Render the figure that expresses emissions over time as a percentage of total emissions
    function timeFigurePercentage(ndx) {
        dc.numberDisplay("#show-time-figure-percentage")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format(".2%"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d / sumEmissionsValue;
            });    
    };
    
    //Render the total emissions over time chart
    function totalEmissionsOverTime(ndx) {
        var lineChart = dc.lineChart("#total-emissions-over-time"); //Define the call to lineChart
            
        chartsResponsive(lineChart, 600, 700, false); //Make sure the chart is responsive
        
        lineChart
            .height(700)
            .margins({top:10, right:50, bottom: 40, left:60})
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .x(d3.scale.ordinal().domain(domain))
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .interpolate("basis")
            .renderArea(true)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxisLabel("Emissions (kilotons)")
            .yAxisPadding("5")
            .dotRadius(10)
            .title(function(d) {
                //format the number as thousands with comma separator
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            })
            .colorAccessor(d => d.key)
            .ordinalColors([generalColor]);
        
        //Call the axes outside of the main chart initialization code as recommended here https://stackoverflow.com/questions/40924437/skipping-overlapping-labels-on-x-axis-for-a-barchart-in-dc-js#40940081    
        lineChart
            .xAxis()
                .tickValues(ticks);
        lineChart
            .yAxis()
                .ticks([20]);

        //Add a degree of responsiveness to the chart to ensure charts remain responsive if the user resizes the window
        $(window).resize(function() {
            chartsResponsive(lineChart, 600, 700, true);
        });
    };
    
    //Render a composite chart showing all source's emissions over time
    function compositeChart(ndx) {
        //Function to give each line on the composite chart a title
        function lineTitle(sourceArg, dataArg) {
            return sourceArg + dataArg.key + ": " + dataArg.value.toLocaleString("en") + " kilotons";
        };
        
        var compositeChart = dc.compositeChart("#composite-chart"); //Define the call to compositeChart
            
        chartsResponsive(compositeChart, 600, 700, false, true, 400, 500); //Pass in the relevant arguments
        
        //Define the lines to go on composite chart
        var carsPetrolLine =    dc.lineChart(compositeChart)
                                    .colors(carsPetrolColor)
                                    .group(totalEmissionsCarPetrolGroup, "Cars - Petrol")
                                    .title(function(d) {
                                        return lineTitle("Cars - Petrol, ", d);
                                    }),
            carsDieselLine =    dc.lineChart(compositeChart)
                                    .colors(carsDieselColor)
                                    .group(totalEmissionsCarDieselGroup, "Cars - Diesel")
                                    .title(function(d) {
                                        return lineTitle("Cars - Diesel, ", d);
                                    }),
            lgvPetrolLine =      dc.lineChart(compositeChart)
                                    .colors(lgvPetrolColor)
                                    .group(totalEmissionsLgvPetrolGroup, "LGV - Petrol")
                                    .title(function(d) {
                                        return lineTitle("LGV - Petrol, ", d);
                                    }),
            lgvDieselLine =     dc.lineChart(compositeChart)
                                    .colors(lgvDieselColor)
                                    .group(totalEmissionsLGVDieselGroup, "LGV - Diesel")
                                    .title(function(d) {
                                        return lineTitle("LGV - Diesel, ", d);
                                    }),
            hgvLine =           dc.lineChart(compositeChart)
                                    .colors(hgvColor)
                                    .group(totalEmissionsHgvGroup, "HGV")
                                    .title(function(d) {
                                        return lineTitle("HGV, ", d);
                                    }),
            busAndCoachLine =   dc.lineChart(compositeChart)
                                    .colors(busesAndCoachesColor)
                                    .group(totalEmissionsBusAndCoachGroup, "Buses and Coaches")
                                    .title(function(d) {
                                        return lineTitle("Buses and Coaches, ", d);
                                    }),
            motorcycleLine =    dc.lineChart(compositeChart)
                                    .colors(motorcyclesColor)
                                    .group(totalEmissionsMotorcyclesGroup, "Motorcycles - >50cc")
                                    .title(function(d) {
                                        return lineTitle("Motorcycles - >50cc, ", d);
                                    }),
            mopedLine =         dc.lineChart(compositeChart)
                                    .colors(mopedsColor)
                                    .group(totalEmissionsMopedsGroup, "Mopeds - <50cc")
                                    .title(function(d) {
                                        return lineTitle("Mopeds - <50cc, ", d);
                                    }),
            lpgLine =           dc.lineChart(compositeChart)
                                    .colors(lpgColor)
                                    .group(totalEmissionsLPGGroup, "All LPG Vehicles")
                                    .title(function(d) {
                                        return lineTitle("All LPG Vehicles, ", d);
                                    });

        compositeChart
            .height(700)
            .margins({top:10, right:60, bottom: 40, left:60})
            .dimension(yearDim)
            .group(totalEmissionsCarPetrolGroup) //It doesn't matter here which source group is used
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxisLabel("Emissions (kilotons)")
            .yAxisPadding("31")
            .elasticY(true)
            .brushOn(false)
            .shareTitle(false)
            .childOptions({
                dotRadius: 10  
            })
            .compose([carsPetrolLine, 
                      carsDieselLine,
                      lgvPetrolLine,
                      lgvDieselLine,
                      hgvLine,
                      busAndCoachLine,
                      motorcycleLine,
                      mopedLine,
                      lpgLine]);
                      
        //Call the x axis outside of the main chart initialization code as recommended here https://stackoverflow.com/questions/40924437/skipping-overlapping-labels-on-x-axis-for-a-barchart-in-dc-js#40940081    
        compositeChart
            .xAxis()
                .tickValues(ticks);
        compositeChart
            .yAxis()
                .ticks([20]);

        //Add a degree of responsiveness to the chart to ensure charts remain responsive if the user resizes the window
        $(window).resize(function() {
            chartsResponsive(compositeChart, 600, 700, true, true, 400, 500);
        });
    };
    
    //Render the select menu to show data for a particular year
    var yearSelectMenu; //Declare outside of function for use in jQuery document ready function
    function showYearSelector(ndx) {
        yearSelectMenu = dc.selectMenu('#year-selector');
        yearSelectMenu
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .promptText("Whole Period")
            .title(function(d) {
                return d.key;
            });
    };
    
    //Render the figure showing the amount of emissions within the period or for a given year
    function periodFigure(ndx) {
        dc.numberDisplay("#show-period-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            });    
    };
    
    //Render the pie chart breaking down emissions by source
    function totalEmissionsPerSourcePie(ndx) {
        
        var pieChart = dc.pieChart("#total-emissions-per-source-pie");

        chartsResponsive(pieChart, 500, 600, false);
        
        pieChart
            .height(700)
            .radius(275)
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .label(function(d) { //Hide the labels, rely on the legend to orientate the user
                return "";
            })
            .title(function(d) {
                console.log(sumEmissions.value()); //sumEmissions.value(), rather than the var sumEmissionsValue I defined above, must be used here or else it won't return the values I want
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons" + " | " + ((d.value / sumEmissions.value()) * 100).toFixed(2) + "%"; //Format the title as the key + the value with commas separator + the percentage expressed by the pie chart's slice
            })
            .ordinalColors([carsPetrolColor, hgvColor, carsDieselColor, lgvDieselColor, busesAndCoachesColor, lgvPetrolColor, motorcyclesColor, lpgColor, mopedsColor]) //The colors here go in order of highest to lowest value for the whole period
            .legend(dc.legend()
                .itemHeight(13)
                .gap(2));

        //Remove click functionality from chart, this has to be done both here and on the bar chart to prevent clicks from rerendering the values that are displayed above the bar chart's bars
        pieChart.on('pretransition', function(chart) {
            pieChart.selectAll('path,.dc-legend-item').on('click', null);
        });
        pieChart.filter = function() {}; //Remove chart interactivity, preventing slices from greying out
        
        //Add a degree of responsiveness to the chart to ensure charts remain responsive if the user resizes the window
        $(window).resize(function() {
            pieChart
                .transitionDuration(0); //Remove transitionDuration before the chart has been resized
            chartsResponsive(pieChart, 500, 600, true);
            pieChart
                .transitionDuration(250); //Reset transitionDuration to default once the size changes have been applied
        });
    };
    
    //Render the bar chart breaking down emissions by source
    function totalEmissionsPerSource(ndx) {
        var barChart = dc.barChart("#total-emissions-per-source");
        
        chartsResponsive(barChart, 600, 700, false);
        
        barChart
            .height(700)
            .margins({top:10, right:60, bottom: 60, left:60})
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Type of Vehicle")
            .yAxisLabel("Emissions (kilotons)")
            .yAxisPadding('5')
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            })
            .colorAccessor(d => d.key) //Required to give each bar an individual color
            //The ordinal data is ordered alphabetically, so we assign colors in the same way
            .ordinalColors([lpgColor, busesAndCoachesColor, carsDieselColor, carsPetrolColor, hgvColor, lgvDieselColor, lgvPetrolColor, mopedsColor, motorcyclesColor]);
 
        //Remove click functionality from chart, this conflicts with the values that are dislayed above the bars
        barChart.on('pretransition', function(chart) {
            barChart.selectAll('rect.bar').on('click', null);
        });
        
        //Show values on top of the bars
        barChart.on('renderlet', function(chart){
        
            var barsData = [];
            var bars = chart.selectAll('.bar').each(function(d) { barsData.push(d); });
            
            //Create group for labels 
            var gLabels = d3.select(bars[0][0].parentNode).append('g').attr('id','inline-labels');
        
            for (var i = bars[0].length - 1; i >= 0; i--) {
        
                var b = bars[0][i];
        
                gLabels
                    .append("text")
                    .text((barsData[i].data.value).toLocaleString('en'))
                    .attr('x', +b.getAttribute('x') + (b.getAttribute('width')/2) )
                    .attr('y', +b.getAttribute('y') + -10)
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    .style({'font-size': '0.8rem', 'font-style': 'italic'});
            };
        });
        
        //Remove values on top of bars when chart is being redrawn
        barChart.on('preRedraw', function(chart){
            chart.select('#inline-labels').remove();
        });
    
        $(window).resize(function() {
            barChart
                .transitionDuration(0); //Remove transitionDuration before the chart has been resized
            chartsResponsive(barChart, 600, 700, true);
            barChart
                .transitionDuration(250); //Reset transitionDuration to default once the size changes have been applied
            
            adjustXTicks(); //The x ticks must also be rerendered or else they revert to their default and unwanted position
        });
    };
    
    $(document).ready(function() {
        $('#percentage-p').css('visibility', 'hidden'); //For the All Vehicles option which shows in the source select initially, hide the percentage information
        
        //Duplicate the options from the 1st source select box to the 2nd source select box
        var $sourceOptions = $('#source-selector select > option').clone();
        $('#source-selector-2').append($sourceOptions);
        //Likewise for the year select boxes
        var $yearOptions = $('#year-selector select > option').clone();
        $('#year-selector-2').append($yearOptions);
        
        adjustXTicks(); //This function, for the bar chart, must be called once the document is ready

        //Make sure the sourceSelectChange function is invoked for both source selection boxes
        sourceSelectChange('#source-selector select', '#source-selector-2');
        sourceSelectChange('#source-selector-2', '#source-selector select');
        
        //Likewise for both year selects
        yearSelectorChange('#year-selector select', '#year-selector-2');
        yearSelectorChange('#year-selector-2', '#year-selector select');
        
        //Change the source figure descriptive text based on the value of the select element and ensure selection boxes match
        function sourceSelectChange(targetDiv, otherDiv) {
            $(targetDiv).change(function() {
                yearSelectMenu.filterAll(); //Reset the year select box when the source select box is changed
                $('#percentage-p').css('visibility', 'visible'); //I want to ensure that the paragraph with the percentage information is shown for all selection options bar 'All Vehicles'
                
                //Redraw the graphs with required filter
                function redrawGraphs(sourceFilter) {
                    sourceSelectMenu
                        .replaceFilter([sourceFilter])
                        .redrawGroup();     
                };
                
                //The text to update to the span is different for each value, hence the neccessity for the long logic chain below
                if($(targetDiv).val() == "Cars - Petrol") {
                    $('.show-source-span').html("Petrol cars accounted for");
                    $(otherDiv).val("Cars - Petrol");
                    redrawGraphs("Cars - Petrol");
                } else if ($(targetDiv).val() == "Cars - Diesel") {
                    $('.show-source-span').html("Diesel cars accounted for");
                    $(otherDiv).val("Cars - Diesel");
                    redrawGraphs("Cars - Diesel");
                } else if ($(targetDiv).val() == "LGV - Petrol") {
                    $('.show-source-span').html("Petrol LGVs accounted for");
                    $(otherDiv).val("LGV - Petrol");
                    redrawGraphs("LGV - Petrol");
                } else if ($(targetDiv).val() == "LGV - Diesel") {
                    $('.show-source-span').html("Diesel LGVs accounted for");
                    $(otherDiv).val("LGV - Diesel");
                    redrawGraphs("LGV - Diesel");
                } else if ($(targetDiv).val() == "Buses and Coaches") {
                    $('.show-source-span').html("Buses and coaches accounted for"); 
                    $(otherDiv).val("Buses and Coaches");
                    redrawGraphs("Buses and Coaches");
                } else if ($(targetDiv).val() == "HGV") {
                    $('.show-source-span').html("HGVs accounted for"); 
                    $(otherDiv).val("HGV");
                    redrawGraphs("HGV");
                } else if ($(targetDiv).val() == "Motorcycles - >50cc") {
                    $('.show-source-span').html("Motorcycles above 50cc accounted for"); 
                    $(otherDiv).val("Motorcycles - >50cc");
                    redrawGraphs("Motorcycles - >50cc");
                } else if ($(targetDiv).val() == "Mopeds - <50cc") {
                    $('.show-source-span').html("Mopeds below 50cc accounted for"); 
                    $(otherDiv).val("Mopeds - <50cc");
                    redrawGraphs("Mopeds - <50cc");
                } else if ($(targetDiv).val() == "All LPG Vehicles") {
                    $('.show-source-span').html("LPG vehicles accounted for"); 
                    $(otherDiv).val("All LPG Vehicles");
                    redrawGraphs("All LPG Vehicles");
                } else { 
                    $('.show-source-span').html("There was a total of");
                    $(otherDiv).val("");
                    sourceSelectMenu
                        .filterAll()
                        .redrawGroup();
                    $('#percentage-p').css('visibility', 'hidden'); //Make sure the percentage information is hidden if the user reselects the default option
                };
            });
        };
        
        function yearSelectorChange(targetDiv, otherDiv) {
            $(targetDiv).change(function() { //On the year select boxes change...
                //Reset the source select boxes when the year select box is changed
                sourceSelectMenu.filterAll(); //Source select box 1
                $('#source-selector-2').val(""); //Source select box 2
                if ($(targetDiv).val() == "") { //If the year selector is the default value
                    $('#period-span').html("throughout the period"); //Update html to correct text 
                    $(otherDiv).val(""); //Set other select box to default value
                } else {
                    $('#period-span').html("in " + $(targetDiv).val()); //Update the html to reflect the value that is in the select box
                    $(otherDiv).val($(targetDiv).val()); //Set the other year select box to match the target's value
                    //Make sure the graph is redrawn no matter which select box the user interacts with
                    yearSelectMenu
                        .replaceFilter($(targetDiv).val())
                        .redrawGroup();
                };
            });
        };
    //Remove the loading overlay when the document is ready. A delay is set to ensure that users on quick connections, or those who have already visited the site and have cookies saved, can see the screen is a loading screen and not get confused if it disappears quickly
        $('body').delay(1000).queue(function() { //The loading screen will appear for at least one second
            $(this).addClass('loaded');
        });
    });
};

//Hide the informative pie chart pop up if the user clicks on it
function chartPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("hide");
};