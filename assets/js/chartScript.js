//Declare cloud9 global variables to prevent cloud9 warnings
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
    
//Global Selector Vars
//Declare outside of main function for use in reset buttons
var sourceSelectMenu;
var yearSelectMenu;

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
    totalEmissionsFigure(ndx); //Render total emissions throughout the period
    highlightsFigure(ndx, sumEmissions, true); //Render average emissions over the period
    highlightsFigure(ndx, totalEmissionsPerYearGroup); //Render the most polluting year
    
    showSourceSelector(ndx); //Render the vehicle selector box
    timeFigure(ndx); //Render the figure representing the emissions of selected vehicle types
    timeFigurePercentage(ndx); //Render the figure representing the emissions percentage of selected vehicle types
    
    totalEmissionsOverTime(ndx); //Render the line chart
    compositeChart(ndx); //Render the composite chart
    
    showYearSelector(ndx); //Render the year select box
    periodFigure(ndx); //Render the figure representing total emissions in selected years

    totalEmissionsPerSourcePie(ndx); //Render the pie chart
    totalEmissionsPerSource(ndx); //Render the bar chart

    dc.renderAll(); //Render all charts to page
    
    addForceCenter(); //Ensure charts are position correctly
    
    // // // DEFINE FUNCTIONS
    
    // // // GENERAL FUNCTIONS
    //Responsiveness function, this adds a degree of responsiveness to the charts and works alongside bootstrap's rows system
    function chartsResponsive(chartType, chartWidthSmall, chartWidthLarge, renderChart, chartLegend, legendXSmall, legendXLarge) {
        if ($(window).width() > 1199 && $(window).width() < 1331) { //If the browser window is within the target width range
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
    }
    
    //Add a class used to center the charts in the viewport
    function addForceCenter() {
        d3.selectAll('svg')
            .attr('class', 'force-center');
    }
    
    // // // CHART RENDERING FUNCTIONS
    
    //Render the total emissions figure
    function totalEmissionsFigure(ndx) {
        dc.numberDisplay("#total-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .valueAccessor(function(d) {
                return d;
            });
    }

    //Render the figures that reside in the Highlights section
    //The figures are generated using dc numberDisplay. However, since I want the figures to remain static and not be changed via crossfilter, the dc numberDisplay values are then rendered using jQuery
    var averageGeneratedValue, topYearValue; //Declare the vars where generated values will live
    function highlightsFigure(ndx, group, averageValue) {
        dc.numberDisplay("null") //I don't actually want dc to render the value, hence I provide a dummy parent
            .group(group)
            .valueAccessor(function(d) {
                if (averageValue) { //If it is the average emissions per year value we want
                    averageGeneratedValue = d / countYears; //Generate a value and assign it to the variable  
                    $('#average-emissions-figure').html(averageGeneratedValue.toLocaleString("en", {maximumFractionDigits: 2})); //jQuery is used to print the value to the document.
                } else { //Else the desired value is the most polluting year
                    topYearValue = d.key;     
                    $('#top-year-figure').html(topYearValue.toLocaleString("en", {maximumFractionDigits: 2}));
                }
            });
    }    

    //Render the select menu to show data for a particular vehicle type
    function showSourceSelector(ndx) {
        sourceSelectMenu = dc.selectMenu("#source-selector");
        sourceSelectMenu
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .promptText("All Vehicles")
            .multiple(true)
            .title(function(d) {
                return d.key;
            });
    }
    
    //Render the figure that interacts with the emissions over time charts
    function timeFigure(ndx) {
        dc.numberDisplay("#show-time-figure")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            });
    }
    
    //Render the figure that expresses emissions over time as a percentage of total emissions
    function timeFigurePercentage(ndx) {
        dc.numberDisplay("#show-time-figure-percentage")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format(".2%"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d / sumEmissionsValue;
            });    
    }
    
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
    }
    
    //Render a composite chart showing all source's emissions over time
    function compositeChart(ndx) {
        //Function to give each line on the composite chart a title
        function lineTitle(sourceArg, dataArg) {
            return sourceArg + dataArg.key + ": " + dataArg.value.toLocaleString("en") + " kilotons";
        }
        
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
    }
    
    //Render the select menu to show data for a particular year
    function showYearSelector(ndx) {
        yearSelectMenu = dc.selectMenu('#year-selector');
        yearSelectMenu
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .promptText("Whole Period")
            .multiple(true)
            .title(function(d) {
                return d.key;
            });
    }
    
    //Render the figure showing the amount of emissions within the period or for a given year
    function periodFigure(ndx) {
        dc.numberDisplay("#show-period-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            });    
    }
    
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
                //sumEmissions.value(), rather than the var sumEmissionsValue I defined above, must be used here or else it won't return the values I want
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
    }
    
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
                    .style({'font-size': '0.7rem', 'font-style': 'italic'});
            }
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
    }
    
    //Once the charts are rendered, jQuery is able to manipulate the DOM
    $(document).ready(function() {
        var valueArray; //Declare the variable which the array of select options are contained in. The exact array depends upon the user's selection
        
        $('#percentage-p').css('visibility', 'hidden'); //For the All Vehicles option which shows in the source select initially, hide the percentage information. It doesn't make sense to show "That is 100% of emissions"
        
        //Duplicate the options from the 1st source select box to the 2nd source select box
        var $sourceOptions = $('#source-selector select > option').clone();
        $('#source-selector-2').append($sourceOptions);
        $('#source-selector-2 option:nth-child(1)').attr('selected','selected'); //Set the first option of the cloned select box to be default
        //Likewise for the year select boxes
        var $yearOptions = $('#year-selector select > option').clone();
        $('#year-selector-2').append($yearOptions);
        $('#year-selector-2 option:nth-child(1)').attr('selected','selected'); //Set the first option of the cloned select box to be default
        
        adjustXTicks(); //This function, for the bar chart, must be called once the document is ready

        //Make sure the selectChange function is invoked for all four selection boxes
        selectChange('#source-selector select', sourceSelectMenu, '#source-selector-2', yearSelectMenu, '#year-selector-2');
        selectChange('#source-selector-2', sourceSelectMenu,'#source-selector select', yearSelectMenu, '#year-selector-2');

        selectChange('#year-selector select', yearSelectMenu, '#year-selector-2', sourceSelectMenu, '#source-selector-2');
        selectChange('#year-selector-2', yearSelectMenu, '#year-selector select', sourceSelectMenu, '#source-selector-2');
                
        // // // DEFINE SELECT BOX CHANGE FUNCTIONS
        //Redraw the graphs with required filter
        function redrawGraphs(menu, newFilter) {
            menu
                .replaceFilter([newFilter])
                .redrawGroup();     
        }
        
        //This function checks to see if any of the select box option values are empty. Since the only empty value is the default option, this function is essentially checking if the default option is selected or not.
        function checkArray(valueArray){
           for (var i=0; i < valueArray.length; i++){ //Loop through the array
               if (valueArray[i] === "") //If the default option is selected   
                  return false;
           }
           return true;
        }
                
        //Main function for select box change
        function selectChange(targetDiv, targetMenu, otherDiv, otherSelect, otherSelect2) {
            $(targetDiv).change(function() { //When the select box the user clicks on changes
                var sourceSelect;
                
                if (targetDiv == '#source-selector select' || targetDiv == '#source-selector-2') {
                    sourceSelect = true;
                } else {
                    sourceSelect = false;
                }
                
                if (sourceSelect) { //If the changed box is one in the 'total emissions over time' section
                    $('#percentage-p').css('visibility', 'visible'); //I want to ensure that the paragraph with the percentage information is shown for all selection options bar 'All Vehicles'
                }
                
                //Reset both year select boxes when the source select box is changed
                resetSelects(otherSelect, otherSelect2, false);
                
                valueArray = $(targetDiv).val(); //Since the select box is multiple, it returns an array. The array elements are composed of the user's selection

                if (checkArray(valueArray)) { //If no empty value is found (the empty value represents "All Vehicles", since all other options have values)
                    var valueArrayLength = valueArray.length - 1;
                    
                    //Change the array so that there is a space at the beginning of each array element. This is so the array prints like a proper English sentence
                    var modifiedArray = valueArray.map(function(valueArray) {
                         return " " + valueArray;
                    });
                    //For when there are 3 or more array items, I want them to print with commas separating them
                    var multiArray = valueArray.map(function(valueArray) {
                        return valueArray + ", ";
                    });
                    
                    $(otherDiv).val($(targetDiv).val()); //Set the other (duplicate) select box to match the target's values
                    redrawGraphs(targetMenu, $(targetDiv).val()); //Update the charts
                    
                    if (sourceSelect) {
                        $('#accounted').html("accounted for"); //Add this string after the printed array so the sentence reads better
                    }
                    
                    //The below logic chain checks for how many select options are currently selected
                    if (valueArrayLength == 0) { //If the user has only selected one value
                        if (sourceSelect) {
                            $('#show-source-span').html(modifiedArray); //Simply print the value they have selected
                        } else {
                           $('#period-span').html("in" + modifiedArray); //Simply print the value they have selected 
                        }
                    } else if (valueArrayLength == 1) { //Else if the user has selected 2 values
                        var andArray = modifiedArray.join(" and "); //Join the two elements and separate them with "and"
                        if (sourceSelect) {
                            $('#show-source-span').html(andArray); //And then print the joined array
                        } else {
                            $('#period-span').html("in" + andArray); //And then print the joined array
                        }
                    } else if (valueArrayLength > 1) { //Else if there are more than 2 values selected
                        if (sourceSelect) { //If the user has only selected one value
                            var lastItem = multiArray[valueArrayLength]; //Get the last item of the array
                            multiArray[valueArrayLength] = " and " + lastItem.replace(/,/g, ''); //Modify the last item of the array to have "and" before it, so that when the entire array is printed it reads like proper English. Remove the trailing ',' as it is unnecessary for the last item
                            $('#show-source-span').html(multiArray); //Then print the array
                        } else {
                            var lastItem = modifiedArray[valueArrayLength]; //Get the last item of the array
                            modifiedArray[valueArrayLength] = " and " + lastItem; //Modify the last item of the array to have "and" before it, so that when the entire array is printed it reads like proper English 
                            $('#period-span').html("in" + modifiedArray); //Then print the array
                        }
                    }
                } else { //Else the user has selected "All Vehicles"
                    //It doesn't make sense for the user to be able to select "All Vehicles" along with individual vehicle types, so if the user tries to select "All Vehicles" along with separate vehicles, only "All Vehicles" will be selected
                    $(targetDiv).val("");
                    $(otherDiv).val("");
                    //Then draw graph to represent all data
                    targetMenu
                        .filterAll()
                        .redrawGroup();
                    if (sourceSelect) {
                        $('#show-source-span').html("There was a total of "); //Update text on screen
                        $('#accounted').html("");
                        $('#percentage-p').css('visibility', 'hidden'); //I want to ensure that the paragraph with the percentage information is shown for all selection options bar 'All Vehicles'
                    } else {
                        $('#period-span').html(" throughout the whole period"); //Update text on screen   
                    }
                }
            });
        };
        
        //Main function for year selector change
        // function yearSelectorChange(targetDiv, otherDiv) {
        //     $(targetDiv).change(function() { //On the year select boxes change...
        //         //Reset both source select boxes when the year select boxes are changed
        //         resetSelects(sourceSelectMenu, '#source-selector-2', false);
                
        //         valueArray = $(targetDiv).val(); //Since the select box is multiple, it returns an array
                
        //         if (checkArray(valueArray)) { //If no empty value is found (this represents "Whole Period", since all other options have values)
        //             var valueArrayLength = valueArray.length - 1;
        //             //Change the array so that there is a space at the beginning of each array element
        //             var modifiedArray = valueArray.map(function(valueArray) {
        //                  return " " + valueArray;
        //             });
                    
        //             $(otherDiv).val($(targetDiv).val()); //Set the other select box to match the target's values
        //             redrawGraphs(yearSelectMenu, $(targetDiv).val()); //Update the display
                    
        //             if (valueArrayLength == 0) { //If the user has only selected one value
        //                 $('#period-span').html("in" + modifiedArray); //Simply print the value they have selected
        //             } else if (valueArrayLength == 1) { //Else if the user has selected 2 values
        //                 var andArray = modifiedArray.join(" and "); //Join the two elements and separate them with "and"
        //                 $('#period-span').html("in" + andArray); //And then print the joined array
        //             } else if (valueArrayLength > 1) { //Else if there are more than 2 values selected
        //                 var lastItem = modifiedArray[valueArrayLength]; //Get the last item of the array
        //                 modifiedArray[valueArrayLength] = " and " + lastItem; //Modify the last item of the array to have "and" before it, so that when the entire array is printed it reads like proper English 
        //                 $('#period-span').html("in" + modifiedArray); //Then print the array
        //             }

        //         } else { //Else the user has selected "Whole Period"
        //             //It doesn't make sense for the user to be able to select "Whole Period" along with individual years, so if the user tries to select "Whole Period" along with separate years, only "Whole Period" will be selected
        //             $(targetDiv).val("");
        //             $(otherDiv).val("");
        //             //Then draw graph to represent all data
        //             yearSelectMenu
        //                 .filterAll()
        //                 .redrawGroup();
        //             $('#period-span').html(" throughout the whole period"); //Update text on screen
        //         }
        //     });
        // }
    });
}

//Hide the informative pie chart pop up if the user clicks on it
function chartPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("hide");
}

//Reset charts to default when user clicks the reset button
function resetSelects(select, resetDuplicate, button) { //The arg passed into 'select' depends upon which button the user clicks
    //Reset the charts
    select.filterAll()
    
    if (button) { //This is only executed for the version of the function called by the html reset buttons
        select.redrawGroup(); //The reset button must redraw
    }

    //Ensure the duplicate select box for source or year are reset  
    $(resetDuplicate).val("");
    
    //Reset to correct default text
    if (select == sourceSelectMenu) {
        $('#percentage-p').css('visibility', 'hidden');
        $('#show-source-span').html("There was a total of "); //Update text on screen
        $('#accounted').html("");
    }
}