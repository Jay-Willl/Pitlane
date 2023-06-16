import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useCreation, useSelections, useSafeState, useUpdateEffect} from "ahooks";

import data from '../data/sample_distribution.json';
import lookup from '../lookup';

let drivers = []
let codes = []
// console.log(data.length);
for (let i = 0; i < data.length; i++) {
    drivers.push(data[i].Driver);
    codes.push(data[i].DriverNumber);
}
drivers = [...new Set(drivers)]
// console.log("codes " + codes);
console.log("drivers " + drivers);

const margin = ({top: 20, right: 30, bottom: 20, left: 50});
const height = 500;
const width = 1400;

const Chart = ({width, height, margin, data}) => {
    const xScale = useCreation(() => {
        return d3.scaleBand()
            .domain(drivers)
            .range([margin.left, width - margin.right])
    }, [data]);

    const yScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(
                // [3.5, 8]
                d3.extent(data, function (d) {
                    return parseInt(d.LapTime);
                })
            )
            .range([height - margin.bottom, margin.top])
    }, [data]);

    const histogram = useCreation(() => {
        return d3.histogram()
            .domain(yScale.domain())
            .thresholds(yScale.ticks(15)) // use 8 approximation
            .value(d => d);
    })

    const sumGroup = useCreation(() => {
        return d3.group(data, function (d) {
            return d.Driver;
        })
    }, [data]);

    const sumStat = useCreation(() => {
        return Array.from(sumGroup, ([key, value]) => {
            let input = value.map((d) => {
                // console.log(d.LapTime);
                return d.LapTime;
            });
            let bin = histogram(input);
            // console.log("input at " + key + ": " + input);
            // console.log("bin at " + key + ": " + bin);
            return {key: key, value: value, partition: bin}
        })
    }, [data]);

    // console.log(sumStat);
    // console.log(sumStat.length);
    // console.log(xScale.bandwidth());

    // let max_num = 0;
    // for (let i in sumStat) {
    //     let allBins = Array(sumStat[i]);
    //     let lengths = allBins.map((d) => d.length);
    //     let longest = d3.max(lengths);
    //     if (longest > max_num) {
    //         max_num = longest;
    //     }
    // }

    const xNum = useCreation(() => {
        return d3.scaleLinear()
            .domain([-9, 9])
            .range([0, xScale.bandwidth()])
    });

    const colorScale = useCreation(() => {
        return d3.scaleOrdinal()
            .domain(Object.keys(lookup))
            .range(Object.values(lookup));
    }, [lookup]);

    const xAxis = (g) => {
        return g.attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(10));
    }

    const yAxis = (g) => {
        return g.attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale).ticks(10));
    }

    const chartRef = useD3(svg => {
        svg.append('g')
            .attr("class", "x-axis")
            .call(xAxis);

        svg.append('g')
            .attr("class", "y-axis")
            .call(yAxis);

        sumStat.forEach((group, key) => {
            svg.append('g')
                .attr("transform", function (d) {
                    // console.log(d);
                    // console.log(xScale(group.key));
                    return ("translate(" + xScale(group.key) + " ,0)");
                })
                .append('path')
                .datum(group.partition)
                .style("stroke", "none")
                .style("fill", "grey")
                .attr('d', d3.area()
                    .x0(function (d) {
                        return (xNum(0));
                    })
                    .x1(function (d) {
                        // console.log(d[0].length);
                        return (xNum(d.length));
                    })
                    .y(d => yScale(Number(d.x0)))
                    .curve(d3.curveCatmullRom)
                )
        })


        sumStat.forEach((group, key) => {
            // console.log(group);
            let rand_width = 40;
            svg.selectAll(`.dot`)
                .data(group.value)
                .join("circle")
                .attr("cx", d => {
                    // console.log(d);
                    // console.log(xScale.bandwidth())
                    return xScale(d.Driver) + xScale.bandwidth() / 2 - Math.random() * rand_width;
                })
                .attr("cy", d => {
                    return yScale((d.LapTime))
                })
                .attr("r", 4)
                .style("fill", d => colorScale(d.Driver).PColor)
                .attr("stroke", "white")

            // svg.selectAll(`.dot`)
            //     .append('div')
            //     .style("position", "absolute")
            //     .style("visibility", "hidden")
            //     .style("background-color", "white")
            //     .style("border", "solid")
            //     .style("border-width", "1px")
            //     .style("border-radius", "5px")
            //     .style("padding", "10px")
            //     .html("<p>Tire: {group.value.Compound}</p>");
            //
            // svg.selectAll(`.dot`)
            //     .on("mouseover", function () {
            //         return svg.selectAll(`.dot`).style("visibility", "visible");
            //     })
            //     .on("mousemove", function (event) {
            //         const mouseX = event.clientX;
            //         const mouseY = event.clientY;
            //         console.log(mouseX + " " + mouseY);
            //         return svg.selectAll(`.dot`)
            //             .style("top", (mouseY + 100) + "px")
            //             .style("left",(mouseX + 100) + "px");
            //     })
            //     .on("mouseout", function () {
            //         return svg.selectAll(`.dot`).style("visibility", "hidden");
            //     })
        })

    });

    return (
        <div className="track-overview">
            <svg
                ref={chartRef}
                style={{
                    minHeight: 550,
                    width: "100%",
                    marginRight: "0px",
                    marginLeft: "0px",
                    background: "#f5f5f5"
                }}
            />
        </div>
    )
}

export default () => <Chart width={width} height={height} margin={margin} data={data}/>
