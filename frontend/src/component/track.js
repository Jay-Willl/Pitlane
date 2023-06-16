import * as d3 from 'd3';
import d3tip from 'd3-tip';
import {useState} from 'react';
import {useD3} from '../hooks';
import {useCreation, useSafeState} from "ahooks";

import {UserHoverContext} from "../UserHoverContext";

import './track.css'

import data from '../data/sample_track.json'
import {useRef} from "react";


const margin = ({top: 20, right: 30, bottom: 20, left: 30});
const height = 600;
const width = 450;

const Chart = ({width, height, margin, data}) => {
    const hoverRef = useRef(0);
    const [hoverState, setHoverState] = useState(null);

    function updateHoverState(newValue) {
        setHoverState(newValue);
    }

    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent([...data], d => d.X / 10))
            .range([margin.left, width - margin.right]);
    }, [data]);

    const yScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent([...data], d => d.Y / 10))
            .range([height - margin.bottom, margin.top]);
    }, [data]);

    const chartRef = useD3(svg => {
        // const xAxis = (g) => {
        //     return g.attr('transform', `translate(0, ${height - margin.bottom})`)
        //         .call(d3.axisBottom(xScale).tickSizeOuter(0));
        // }
        //
        // const yAxis = (g) => {
        //     return g.attr('transform', `translate(${margin.left}, 0)`)
        //         .call(d3.axisLeft(yScale).tickSizeOuter(0));
        // }
        //
        // svg.append('g')
        //     .attr("class", "axis")
        //     .call(xAxis);
        //
        // svg.append('g')
        //     .attr("class", "axis")
        //     .call(yAxis);

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', "#000000")
            .attr('stroke-width', 16)
            .attr('d', d3.line()
                .x(d => xScale(d.X / 10))
                .y(d => yScale(d.Y / 10))
            )

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', "#69b3a2")
            .attr('stroke-width', 8)
            .attr('d', d3.line()
                .x(d => xScale(d.X / 10))
                .y(d => yScale(d.Y / 10))
            )

        const tooltip = d3tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function(d) {
                let raw_data = Object(d.fromElement?.__data__);
                // console.log(raw_data);
                // console.log(typeof(raw_data));
                // console.log(Object.keys(raw_data));
                if(raw_data.Speed === undefined){
                    console.log(raw_data)
                }
                return `<div>
                            <p>Speed ${raw_data.Speed}</p>
                            <P>Gear ${raw_data.nGear}</P>
                            <p>Throttle ${raw_data.Throttle}</p>
                            <p>RPM ${raw_data.RPM}</p>
                        </div>`;
            });

        svg.call(tooltip);

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("cx", d => xScale(d.X / 10))
            .attr("cy", d => yScale(d.Y / 10))
            .attr("r", 10)
            .attr("opacity", 0)
            .on("mouseover", function (d, i) {
                // const svgElement = svg.node();
                // console.log("SVG Element:", svgElement);
                // console.log(d);
                const dataItem = d.fromElement.__data__; // 当前的数据对象
                if (dataItem !== undefined) {
                    tooltip.show(d, d3.select(this).node()); // 显示提示框
                    // hoverRef.current = dataItem.Distance;
                    // setHoverState(dataItem.Distance);
                    // console.log("DataItem: ", dataItem);
                    // console.log("Distance: ", dataItem.Distance);
                    // console.log(hoverRef);
                    // console.log(hoverState);
                }
            })
            .on("mouseout", tooltip.hide);
    }, [hoverState]);

    return (
        <UserHoverContext.Provider value={{hoverState, updateHoverState}} >
            <div className="track-overview">
                <svg
                    ref={chartRef}
                    style={{
                        minHeight: 680,
                        width: "100%",
                        marginRight: "0px",
                        marginLeft: "0px",
                        background: "#f5f5f5"
                    }}
                />
            </div>
        </UserHoverContext.Provider>
    )
}

export default () => <Chart width={width} height={height} margin={margin} data={data}/>
