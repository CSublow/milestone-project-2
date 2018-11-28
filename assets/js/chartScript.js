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
        
        countYears = yearDim.group().reduceCount().size(),
        countSources = sourceDim.group().reduceCount().size(),
        
        
        //Source Groups
        totalEmissionsCarPetrolGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Cars - Petrol") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        emissionsCarPetrolGroup1990 = yearDim.groupAll().reduceSum(function(d) {
            if (d.Source === "Cars - Petrol" && d.Year === "1990") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsCarPetrolGroupSum = yearDim.groupAll().reduceSum(function(d) {
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
        totalEmissionsCarDieselGroupSum = yearDim.groupAll().reduceSum(function(d) {
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
        }),
        
        //TEST COMPOSITE CHART GROUPS
        
        //Year Groups
        emissions1990 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1990") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1990Sum = sourceDim.groupAll().reduceSum(function(d) {
            if (d.Year === "1990") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1990SumValue = emissions1990Sum.value(),
        emissions1991 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1991") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1992 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1992") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1993 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1993") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1994 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1994") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1995 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1995") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1996 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1996") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1997 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1997") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1998 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1998") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions1999 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "1999") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2000 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2000") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2001 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2001") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2002 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2002") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2003 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2003") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2004 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2004") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2005 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2005") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2006 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2006") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2007 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2007") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2008 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2008") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2009 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2009") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2010 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2010") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2011 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2011") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2012 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2012") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2013 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2013") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2014 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2014") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2015 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2015") {
                return d.Emissions;
            } else {
                return 0;
            }    
        }),
        emissions2016 = sourceDim.group().reduceSum(function(d) {
            if (d.Year === "2016") {
                return d.Emissions;
            } else {
                return 0;
            }    
        });
    
    //FUNCTION CALLS
    totalEmissionsFigure(ndx);
    averageEmissionsFigure(ndx);
    
    showSourceSelector(ndx);
    showYearSelector(ndx);
    
    periodFigure(ndx);
    timeFigure(ndx);
    timeFigurePercentage(ndx);
    
    carPetrolFigure(ndx);
    carPetrolPercentage(ndx);
    carPetrolFigure1990(ndx);
    
    carPetrolPercentage1990(ndx);
    
    totalEmissionsPerSource(ndx);
    totalEmissionsPerSourcePie(ndx);
    totalEmissionsOverTime(ndx);
    
    totalEmissionsCarPetrol(ndx);
    totalEmissionsCarDiesel(ndx);
    
    emissionsPerSource1990(ndx);
    
    compositeChart(ndx);

    dc.renderAll(); //Render all charts
    
    addForceCenter();
    
    // // // DEFINE FUNCTIONS
    
    // // // General Functions
    
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
    
    //This function helps totalEmissionsPerSource's x axis ticks be more visible
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
    
    // // // Chart Rendering Functions
    
    //Render the total emissions figure
    function totalEmissionsFigure(ndx) {
        dc.numberDisplay("#total-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .valueAccessor(function(d) {
                return d;
            })
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
    $('#average-emissions-figure').html(generatedValue.toLocaleString("en", {maximumFractionDigits: 2})); //jQuery is used to print the value to the document. Using jQuery means the value stays constant regardless of any crossfilter filtering

    //Render the select menu to show data for a particular vehicle type
    var sourceSelectMenu; //Declare outside of function so that a reset can be applied in jQuery code during select box change event
    function showSourceSelector(ndx) {
        sourceSelectMenu = dc.selectMenu("#source-selector");
        sourceSelectMenu
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .promptText("All Vehicles")
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            });
    }
    
    //Render the total emissions over time chart
    function totalEmissionsOverTime(ndx) {
        //Explicitly map the domain in order to get custom tick layout for x axis
        var domain = ggData.map(function(d) {
            return d.Year;
        }),
            ticks = domain.filter(function(v, i) {
            //Without the while loop, the years are returned several times over. I only want them returned once, hence the size of the countYears var is used as a reference
            while (i < countYears) {
                return i % 2 === 0;
            }
        }),
            
            lineChart = dc.lineChart("#total-emissions-over-time"); //Define the call to lineChart
            
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
        }
        
        //Explicitly map the domain in order to get custom tick layout for x axis
        var domain = ggData.map(function(d) {
            return d.Year;
        }),
            ticks = domain.filter(function(v, i, self) {
            //Without the while loop, the years are returned several times over. I only want them returned once, hence the size of the countYears var is used as a reference
            while (i < countYears) {
                return i % 2 === 0;
            }
        }),
        
            compositeChart = dc.compositeChart("#composite-chart");
            
        chartsResponsive(compositeChart, 600, 700, false, true, 400, 500);
        
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
            .group(totalEmissionsCarPetrolGroup)
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
    var yearSelectMenu; //Declare outside of function so that a reset can be applied in jQuery code during select box change event
    function showYearSelector(ndx) {
        yearSelectMenu = dc.selectMenu('#year-selector');
        yearSelectMenu
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .promptText("Whole Period")
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
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
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons" + " | " + ((d.value / sumEmissions.value()) * 100).toFixed(2) + "%";
            })
            .ordinalColors([carsPetrolColor, hgvColor, carsDieselColor, lgvDieselColor, busesAndCoachesColor, lgvPetrolColor, motorcyclesColor, lpgColor, mopedsColor]) //The colors here go in order of highest to lowest value for the whole period
            .legend(dc.legend()
                .itemHeight(13)
                .gap(2));

        pieChart.filter = function() {}; //Remove chart interactivity
        
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
            
        //Show values on top of the bars
        barChart.on('renderlet', function(chart){
        
            var barsData = [];
            var bars = chart.selectAll('.bar').each(function(d) { barsData.push(d); });
        
            //Remove old values (if found)
            // d3.select(bars[0][0].parentNode).select('#inline-labels').remove();
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
            }

            // // Declare colors
            // var colors = d3.scale.ordinal().domain(['Cars - Petrol', 'Cars - Diesel', 'LGV - Petrol', 'LGV - Diesel', 'HGV', 'Buses and Coaches', 'Motorcycles - >50c', 'Mopeds - <50cc', 'All LPG Vehicles'])
            //                                 .range(['#16ff00', '#000000', '#87ff7c', '#71d868', '#46d639', '#24ce14', '#19a30d', '#31a327', '#53a84b']);
            // chart.selectAll('rect.bar').each(function(d) {
            //     d3.select(this).attr('style', 'fill: ' + colors(d.key));
            // })
        });
        
        //Remove values on top of bars when chart is being redrawn
        barChart.on('preRedraw', function(chart){
            //Remove old values (if found)
            chart.select('#inline-labels').remove();
        });
            
        barChart.filter = function() {}; //Remove chart interactivity
        
        $(window).resize(function() {
            barChart
                .transitionDuration(0); //Remove transitionDuration before the chart has been resized
            chartsResponsive(barChart, 600, 700, true);
            barChart
                .transitionDuration(250); //Reset transitionDuration to default once the size changes have been applied
            
            adjustXTicks(); //The x ticks must also be rerendered or else they revert to their default and unwanted values
        });
    };

    function timeFigure(ndx) {
        dc.numberDisplay("#show-time-figure")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            })    
    }
    
    function periodFigure(ndx) {
        dc.numberDisplay("#show-period-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            })    
    }
    
    function timeFigurePercentage(ndx) {
        dc.numberDisplay("#show-time-figure-percentage")
            .group(totalEmissionsPerYearGroupSum)
            .formatNumber(d3.format(".2%"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d / sumEmissionsValue;
            })    
    }
    function carPetrolFigure(ndx) {
        dc.numberDisplay("#show-total-figure")
            .group(totalEmissionsCarPetrolGroupSum)
            .formatNumber(d3.format(".0f"))
            .valueAccessor(function(d) {
                return d;
            })    
    };
    function carPetrolPercentage(ndx) {
        dc.numberDisplay("#show-total-figure-percentage")
            .group(totalEmissionsCarPetrolGroupSum)
            .formatNumber(d3.format(".2%"))
            .valueAccessor(function(d) {
                return d / sumEmissionsValue;
            })    
    };
    function carPetrolFigure1990(ndx) {
        dc.numberDisplay("#show-total-figure-1990")
            .group(emissionsCarPetrolGroup1990)
            .formatNumber(d3.format(".0f"))
            .valueAccessor(function(d) {
                    return d;
            })  
    }
    function carPetrolPercentage1990(ndx) {
        dc.numberDisplay("#show-total-figure-percentage-1990")
            .group(emissionsCarPetrolGroup1990)
            .formatNumber(d3.format(".2%"))
            .valueAccessor(function(d) {
                return d / emissions1990SumValue;
            })    
    };
    function totalEmissionsCarPetrol(ndx) {
        dc.barChart("#total-emissions-car-petrol")
            .width(700)
            .height(500)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(yearDim)
            .group(totalEmissionsCarPetrolGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
    };
    function totalEmissionsCarDiesel(ndx) {
        dc.barChart("#total-emissions-car-diesel")
            .width(700)
            .height(500)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(yearDim)
            .group(totalEmissionsCarDieselGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
    };
    
    function emissionsPerSource1990(ndx) {
        dc.barChart("#emissions-1990")
            .width(700)
            .height(500)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(sourceDim)
            .group(emissions1990)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
    };
    
    $(document).ready(function() {
        $('#percentage-p').css('visibility', 'hidden'); //For the All Vehicles option which shows initially, hide the percentage information
        
        adjustXTicks(); //This function must be called once the document is ready
        
        //Change the source figure descriptive text based on the value of the select element
        $('#source-selector select').change(function() {
            yearSelectMenu.filterAll(); //Reset the year select box when the source select box is changed
            $('#percentage-p').css('visibility', 'visible'); //I want to ensure that the paragraph with the percentage information is shown for all selection options bar 'All Vehicles'
            if($('#source-selector select').val() == "Cars - Petrol") {
                $('.show-source-span').html("Petrol cars accounted for");
            } else if ($('#source-selector select').val() == "Cars - Diesel") {
                $('.show-source-span').html("Diesel cars accounted for"); 
            } else if ($('#source-selector select').val() == "LGV - Petrol") {
                $('.show-source-span').html("Petrol LGVs accounted for"); 
            } else if ($('#source-selector select').val() == "LGV - Diesel") {
                $('.show-source-span').html("Diesel LGVs accounted for"); 
            } else if ($('#source-selector select').val() == "Buses and Coaches") {
                $('.show-source-span').html("Buses and coaches accounted for"); 
            } else if ($('#source-selector select').val() == "HGV") {
                $('.show-source-span').html("HGVs accounted for"); 
            } else if ($('#source-selector select').val() == "Motorcycles - >50cc") {
                $('.show-source-span').html("Motorcycles above 50cc accounted for"); 
            } else if ($('#source-selector select').val() == "Mopeds - <50cc") {
                $('.show-source-span').html("Mopeds below 50cc accounted for"); 
            } else if ($('#source-selector select').val() == "All LPG Vehicles") {
                $('.show-source-span').html("LPG vehicles accounted for"); 
            } else { 
                $('.show-source-span').html("There was a total of");
                $('#percentage-p').css('visibility', 'hidden'); //Make sure the percentage information is hidden if the user reselects the default option
            };
        });
        
        $('#year-selector select').change(function() {
            sourceSelectMenu.filterAll(); //Reset the source select box when the source select box is changed
            if($('#year-selector select').val() == '1990') {
                $('#period-span').html("in 1990");
            } else if ($('#year-selector select').val() == '1991') {
                $('#period-span').html("in 1991"); 
            } else if ($('#year-selector select').val() == '1992') {
                $('#period-span').html("in 1992"); 
            } else if ($('#year-selector select').val() == '1993') {
                $('#period-span').html("in 1993"); 
            } else if ($('#year-selector select').val() == '1994') {
                $('#period-span').html("in 1994"); 
            } else if ($('#year-selector select').val() == '1995') {
                $('#period-span').html("in 1995"); 
            } else if ($('#year-selector select').val() == '1996') {
                $('#period-span').html("in 1996"); 
            } else if ($('#year-selector select').val() == '1997') {
                $('#period-span').html("in 1997"); 
            } else if ($('#year-selector select').val() == '1998') {
                $('#period-span').html("in 1998"); 
            } else if ($('#year-selector select').val() == '1999') {
                $('#period-span').html("in 1999"); 
            } else if ($('#year-selector select').val() == '2000') {
                $('#period-span').html("in 2000"); 
            } else if ($('#year-selector select').val() == '2001') {
                $('#period-span').html("in 2001"); 
            } else if ($('#year-selector select').val() == '2002') {
                $('#period-span').html("in 2002"); 
            } else if ($('#year-selector select').val() == '2003') {
                $('#period-span').html("in 2003"); 
            } else if ($('#year-selector select').val() == '2004') {
                $('#period-span').html("in 2004"); 
            } else if ($('#year-selector select').val() == '2005') {
                $('#period-span').html("in 2005"); 
            } else if ($('#year-selector select').val() == '2006') {
                $('#period-span').html("in 2006"); 
            } else if ($('#year-selector select').val() == '2007') {
                $('#period-span').html("in 2007"); 
            } else if ($('#year-selector select').val() == '2008') {
                $('#period-span').html("in 2008"); 
            } else if ($('#year-selector select').val() == '2009') {
                $('#period-span').html("in 2009"); 
            } else if ($('#year-selector select').val() == '2010') {
                $('#period-span').html("in 2010"); 
            } else if ($('#year-selector select').val() == '2011') {
                $('#period-span').html("in 2011"); 
            } else if ($('#year-selector select').val() == '2012') {
                $('#period-span').html("in 2012"); 
            } else if ($('#year-selector select').val() == '2013') {
                $('#period-span').html("in 2013"); 
            } else if ($('#year-selector select').val() == '2014') {
                $('#period-span').html("in 2014"); 
            } else if ($('#year-selector select').val() == '2015') {
                $('#period-span').html("in 2015"); 
            } else if ($('#year-selector select').val() == '2016') {
                $('#period-span').html("in 2016"); 
            } else {
                $('#period-span').html("throughout the period"); 
            }
        })
    });
};