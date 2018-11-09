queue()
    .defer(d3.json, "assets/data/data.json") //fetch the data
    .await(makeGraph); //call makeGraph when the data is ready 
    
function makeGraph(error, ggData) {
    if (error) throw error;
    
    //print_filter function, used to see the values for crossfilter objects
    // function print_filter(filter) {
    // var f=eval(filter);
    // if (typeof(f.length) != "undefined") {}else{}
    // if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    // if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    // console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    // }
    
    var ndx = crossfilter(ggData); //load the data into a crossfilter
    
    //Dimensions
    var sourceDim = ndx.dimension(dc.pluck("Source")), //pluck can be used instead of the inline function
        yearDim = ndx.dimension(dc.pluck("Year"));
    
    //Groups
    var totalEmissionsPerSourceGroup = sourceDim.group().reduceSum(dc.pluck("Emissions")),
        totalEmissionsPerYearGroup = yearDim.group().reduceSum(dc.pluck("Emissions")),
        
        sumEmissions = sourceDim.groupAll().reduceSum(dc.pluck("Emissions")),
        sumEmissionsValue = sumEmissions.value(),
        
        countYears = yearDim.group().reduceCount().size(),
        
        
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
            if (d.Source === "Motorcycles - >50 cc") {
                return d.Emissions;
            } else {
                return 0;
            }
        }),
        totalEmissionsMopedsGroup = yearDim.group().reduceSum(function(d) {
            if (d.Source === "Mopeds - <50 cc") {
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
    
    //Function Calls
    totalEmissionsFigure(ndx);
    averageEmissionsFigure(ndx);
    
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
    
    dc.renderAll();

    function totalEmissionsFigure(ndx) {
        dc.numberDisplay("#total-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format("0,000"))
            .valueAccessor(function(d) {
                return d;
            })
    };
    function averageEmissionsFigure(ndx) {
        dc.numberDisplay("#average-emissions-figure")
            .group(sumEmissions)
            .formatNumber(d3.format(",.2f"))
            .valueAccessor(function(d) {
                return d / countYears;
            })
            
    };
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
                return (d / sumEmissionsValue);
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
    
    function totalEmissionsPerSource(ndx) {
        dc.barChart("#total-emissions-per-source")
            .width(700)
            .height(500)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal);
    };
    function totalEmissionsPerSourcePie(ndx) {
        dc.pieChart("#total-emissions-per-source-pie")
            .height(500)
            .radius(600)
            // .innerRadius(200)
            .externalLabels(10)
            .externalRadiusPadding(50)
            .minAngleForLabel(0)
            .drawPaths(true)
            .dimension(sourceDim)
            .group(totalEmissionsPerSourceGroup)
    };

    function totalEmissionsOverTime(ndx) {
        //explicitly map the domain in order to get custom tick layout for x axis
        var domain = ggData.map(function(d) {
            return d.Year;
        });
        var ticks = domain.filter(function(v, i) {
            //without the while loop, the years are returned several times over. I only want them returned once, hence the size of the yearDim var is used as a reference
            while (i < countYears) {
                return i % 2 === 0;
            }
        });
        
        var lineChart = dc.lineChart("#total-emissions-over-time");
        
        lineChart
            .width(700)
            .height(700)
            .margins({top:10, right:50, bottom: 40, left:60})
            .dimension(yearDim)
            .group(totalEmissionsPerYearGroup)
            .x(d3.scale.ordinal().domain(domain))
            .xUnits(dc.units.ordinal)
            .interpolate("basis")
            .renderArea(true)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .xAxisLabel("Year")
            .yAxisLabel("Emissions (kilotons)")
            .dotRadius(10)
            .title(function(d) {
                //format the number as thousands with comma separator
                var formatter = d.value.toLocaleString("en");
                return formatter + " kilotons";
            });
    
        //call the x axis outside of the main chart initialization code as recommended here https://stackoverflow.com/questions/40924437/skipping-overlapping-labels-on-x-axis-for-a-barchart-in-dc-js#40940081    
        lineChart
            .xAxis()
                .tickValues(ticks);
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

    function compositeChart(ndx) {
        var compositeChart = dc.compositeChart("#composite-chart");
        compositeChart
            .width(1000)
            .height(500)
            .margins({top:10, right:50, bottom: 100, left:60})
            .dimension(yearDim)
            .group(totalEmissionsCarPetrolGroup)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .renderHorizontalGridLines(true)
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .brushOn(false)
            .compose([
                dc.lineChart(compositeChart)
                    .dimension(yearDim)
                    .colors("green")
                    .group(totalEmissionsCarPetrolGroup, "Cars - Petrol")
                    .valueAccessor(function(d) {
                      return d.value;
                    })
                    .dashStyle([2,2]),
                dc.lineChart(compositeChart)
                    .dimension(yearDim)
                    .colors("red")
                    .group(totalEmissionsCarDieselGroup, "Cars - Diesel")
                    .valueAccessor(function(d) {
                      return d.value;
                    })
                ]);
    };
};