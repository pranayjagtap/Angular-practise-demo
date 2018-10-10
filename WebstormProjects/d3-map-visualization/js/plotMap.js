function plotMap() {
    var data2;
    var mapper={};
// Clear the canvas before we paint
    d3
        .select("#vis_canvas")
        .selectAll("*")
        .remove();
    d3
        .select("#vis_canvas2")
        .selectAll("*")
        .remove();

    var margin = { top: 20, right: 10, bottom: 20, left: 10 }
    var height = 400 - margin.top - margin.bottom
    var width = 700 - margin.left - margin.right
    var mycanvas=d3.select("#vis_canvas")
    var svg = mycanvas.append("svg")
        .attr('height',height + margin.top + margin.bottom)
        .attr('width',width + margin.left + margin.right)
        .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

// Map and projection
    d3.csv('./data/athlete_events.csv', function (d) {

        data2 = d3.nest(d)
            .key(function (d) {
                return d.NOC;
            })
            .rollup(function (d) {
                return d.length
            })
            .entries(d);



        var myCountrydata;
        var myCountdata;


        var path = d3.geoPath();
        var projection = d3.geoNaturalEarth()
            .scale(width / 2 / Math.PI)
            .translate([width / 2, height / 2])
        var path = d3.geoPath()
            .projection(projection);

// Data and color scale
        var data = d3.map();
        var colorScheme = d3.schemeBlues[6]
        colorScheme.unshift("#eee")
        var colorScale = d3.scaleThreshold()
            .domain([0, 100,1000, 2000, 5000, 10000, 15000])
            .range(colorScheme);

// Legend
        var g = svg.append("g")
            .attr("class", "legendThreshold")
            .attr("transform", "translate(5,5)");
        g.append("ext")
            .attr("class", "caption")
            .attr("x", 0)
            .attr("y", -6)
            .text("Count");
        var labels = ['0','100','1000', '2000', '5000', '10000',   '> 15000'];
        var legend = d3.legendColor()
            .labels(function (d) {
                return labels[d.i];
            })

            .scale(colorScale);
        svg.select(".legendThreshold")
            .call(legend);

// Load external data and boot

        d3.queue()
            .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")


            .await(function ready(error, topo,data) {
                if (error) throw error;

                // Draw the map
                svg.append("g")
                    .attr("class", "countries")
                    .selectAll("path")
                    .data(topo.features)
                    .enter().append("path")
                    .attr("fill", function (d){
                        // Pull data for this country


                        for( i=0;i<data2.length;i++){
                            if(data2[i].key==d.id){

                                ColorValue=data2[i].value
                                mapper[d.properties.name]=ColorValue;
                                return colorScale(ColorValue);
                            }

                        }

                        return colorScale(0);



                        // Set the color

                    })
                    .attr("d", path)
                    //On mousehover for annotation
                    .on('mouseover', function (d) {
                        console.log(d)
                        d3.select(this)
                            .transition()
                            .duration(500)

                            .attr('stroke-width',3)
                            .enter()
                            .append("text")
                            .text(function(d) {return d.properties.name+'\nCount: '+mapper[d.properties.name];})

                    })
                    .on('mouseout', function (d) {
                        d3.select(this)
                            .transition()
                            .duration(500)

                            .attr('stroke-width',1)
                    })
                    .append('title')
                    .text(function(d) {return d.properties.name+'\nCount: '+(mapper[d.properties.name]===undefined?0:mapper[d.properties.name]);})
                    .on('click',function(d){

                    })



                ;
            });
    });


}



