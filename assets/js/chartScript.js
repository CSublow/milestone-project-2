//QUEUE
queue()
    .defer(d3.json, "assets/data/data.json") //fetch the data
    .await(makeGraph); //call makeGraph when the data is ready 
 
//Obtain the width of the browser in order to implement responsive chart sizing   
// var w = window.innerWidth
// || document.documentElement.clientWidth
// || document.body.clientWidth;

// $(window).resize(function(w) {
//     var w = $(window).width();
//     if (w > 1500) {
//         console.log("SUP");
//     };
// });
// console.log(w);

//DATA VISUALISATION FUNCTION
function makeGraph(error, ggData) {
    if (error) throw error;
    
    var ndx = crossfilter(ggData); //load the data into a crossfilter
    
    //Dimensions
    var sourceDim = ndx.dimension(dc.pluck("Source")), //pluck can be used instead of the inline function
        yearDim = ndx.dimension(dc.pluck("Year"));
    
    //Groups
    var totalEmissionsPerSourceGroup = sourceDim.group().reduceSum(dc.pluck("Emissions")),
        totalEmissionsPerSourceGroupSum = sourceDim.groupAll().reduceSum(dc.pluck("Emissions")),
        
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
    
    sourceFigure(ndx);
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
    
    //DEFINE FUNCTIONS
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
    function averageEmissionsFigure(ndx) {
        dc.numberDisplay("#average-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format(",.2f"))
            .valueAccessor(function(d) {
                return d / countYears;
            })
            
    };
    
    //Render the select menu to show data for a particular vehicle type
    function showSourceSelector(ndx) {
        dc.selectMenu("#source-selector")
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .promptText("All Vehicles")
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            });
    }
    
    //Render the total emissions over time chart
    function totalEmissionsOverTime(ndx) {
        //explicitly map the domain in order to get custom tick layout for x axis
        var domain = ggData.map(function(d) {
            return d.Year;
        }),
            ticks = domain.filter(function(v, i) {
            //without the while loop, the years are returned several times over. I only want them returned once, hence the size of the countYears var is used as a reference
            while (i < countYears) {
                return i % 2 === 0;
            }
        }),
            
            lineChart = dc.lineChart("#total-emissions-over-time"); //Define the call to lineChart
            
        //Add a degree of responsiveness to the chart
        if ($(window).width() > 1182 && $(window).width() < 1331) { //If the browser window is within the target width range
            chartWidth = 600; //Define a lower chart width so that the charts don't overlap
            lineChart
                .width(chartWidth)
        } else { //Else the width is able to be higher
            chartWidth = 700;
            lineChart
                .width(chartWidth)
        };
        
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
            .yAxisPadding("2")
            .dotRadius(10)
            .title(function(d) {
                //format the number as thousands with comma separator
                return d.value.toLocaleString("en") + " kilotons";
            });
        
        //Call the axes outside of the main chart initialization code as recommended here https://stackoverflow.com/questions/40924437/skipping-overlapping-labels-on-x-axis-for-a-barchart-in-dc-js#40940081    
        lineChart
            .xAxis()
                .tickValues(ticks);
        lineChart
            .yAxis()
                .ticks([20]);
        
        //Add a degree of responsiveness to the chart to ensure charts remain responsive if the user resizes the window
        $(window).resize(function() {
            if ($(window).width() > 1182 && $(window).width() < 1331) { //If the browser window is within the target width range
                chartWidth = 600; //Define a lower chart width so that the charts don't overlap
                lineChart
                    .width(chartWidth);
                lineChart.render();
            } else { //Else the width is able to be higher
                chartWidth = 700;
                lineChart
                    .width(chartWidth);
                lineChart.render();
            };
        });
    };
    
    //Render a composite chart showing all source's emissions over time
    function compositeChart(ndx) {
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
            
        //Add a degree of responsiveness to the chart
        if ($(window).width() > 1182 && $(window).width() < 1331) { //If the browser window is within the target width range
            chartWidth = 600; //Define a lower chart width so that the charts don't overlap
            legendX = 400; //Define a lower legendX, or else the lower chart width cuts out some of the legend
            compositeChart
                .width(chartWidth)
                .legend(dc.legend()
                    .x(legendX)
                    .y(20)
                    .itemHeight(13)
                    .gap(5));
        } else { //Else the width is able to be higher
            chartWidth = 700;
            legendX = 500;
            compositeChart
                .width(chartWidth)
                .legend(dc.legend()
                    .x(legendX)
                    .y(20)
                    .itemHeight(13)
                    .gap(5));
        };
        
        //Define the lines to go on composite chart
        var carsPetrolLine =    dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsCarPetrolGroup, "Cars - Petrol")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            carsDieselLine =    dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("red")
                                    .group(totalEmissionsCarDieselGroup, "Cars - Diesel")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    }),
            lgvPetrolLine =      dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsLgvPetrolGroup, "LGV - Petrol")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            lgvDieselLine =     dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsLGVDieselGroup, "LGV - Diesel")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            hgvLine =           dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsHgvGroup, "HGV")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            busAndCoachLine =   dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsBusAndCoachGroup, "Buses and Coaches")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            motorcycleLine =    dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsMotorcyclesGroup, "Motorcycles - >50cc")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            mopedLine =         dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("blue")
                                    .group(totalEmissionsMopedsGroup, "Mopeds - <50cc")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]),
            lpgLine =           dc.lineChart(compositeChart)
                                    .dimension(yearDim)
                                    .colors("green")
                                    .group(totalEmissionsLPGGroup, "All LPG Vehicles")
                                    .dotRadius(10)
                                    .valueAccessor(function(d) {
                                      return d.value;
                                    })
                                    .dashStyle([2,2]);

        compositeChart
            .height(700)
            .margins({top:10, right:50, bottom: 40, left:60})
            .dimension(yearDim)
            .group(totalEmissionsCarPetrolGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxisLabel("Emissions (kilotons)")
            .yAxisPadding("26")
            .elasticY(true)
            .brushOn(false)
            .title(function(d) {
                //Format the number as thousands with comma separator
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
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
            if ($(window).width() > 1182 && $(window).width() < 1331) { //If the browser window is within the target width range
                chartWidth = 600; //Define a lower chart width so that the charts don't overlap
                legendX = 400 //Define a lower legendX, or else the lower chart width cuts out some of the legend
                compositeChart
                    .width(chartWidth)
                    .legend(dc.legend()
                        .x(legendX));
                compositeChart.render();
            } else { //Else the width is able to be higher
                chartWidth = 700;
                legendX = 500;
                compositeChart
                    .width(chartWidth)
                    .legend(dc.legend()
                        .x(legendX));
                compositeChart.render();
            };
        });
    };
    
    //Render the select menu to show data for a particular year
    function showYearSelector(ndx) {
        dc.selectMenu("#year-selector")
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .promptText("Whole Period")
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            });
    }
    
    //Render the pie chart breaking down emissions by source
    function totalEmissionsPerSourcePie(ndx) {
        dc.pieChart("#total-emissions-per-source-pie")
            .height(700)
            .width(600)
            .radius(275)
            // .innerRadius(200)
            // .externalLabels(10)
            // .externalRadiusPadding(50)
            // .minAngleForLabel(0)
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .label(function(d) { //hide the labels, rely on the legend to orientate the user
                return "";
            })
            .title(function(d) {
                return d.key + ": " + d.value.toLocaleString("en") + " kilotons";
            })
            .legend(dc.legend()
                // .x(-50)
                // .y(20)
                .itemHeight(13)
                .gap(2))
    };
    
    //Render the bar chart breaking down emissions by source
    function totalEmissionsPerSource(ndx) {
        dc.barChart("#total-emissions-per-source")
            .width(700)
            .height(700)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true);
    };
    
    function sourceFigure(ndx) {
        dc.numberDisplay("#show-source-figure")
            .group(totalEmissionsPerSourceGroupSum)
            .formatNumber(d3.format("0,000"))
            .transitionDuration(0)
            .valueAccessor(function(d) {
                return d;
            })    
    }
    
    function timeFigure(ndx) {
        dc.numberDisplay("#show-time-figure")
            .group(totalEmissionsPerYearGroupSum)
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
    
    //The document must be rendered before d3 selections will work
    $(document).ready(function() {
        //Move every 2nd tick text down slightly
        d3.selectAll("#total-emissions-per-source .x.axis .tick:nth-child(even) text")
            .style("transform", "translate(0,20px)");
            
        //Increase the length of every 2nd tick line
        d3.selectAll("#total-emissions-per-source .x.axis .tick:nth-child(even) line")
            .attr("y2", "20");

        //Change the source figure descriptive text based on the value of the select element
        $('#source-selector select').change(function() {
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
                };
        });
    });
};