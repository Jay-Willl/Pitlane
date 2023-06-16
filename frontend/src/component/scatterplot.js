import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useMemo} from 'react';
import {useCreation, useSelections, useUpdateEffect} from "ahooks";
import {Checkbox, Col, Row} from 'antd';

import data from '../data/sample_scatterplot.json';
import lookup from '../lookup';
import {Content} from "antd/es/layout/layout";


data = data.filter(function (d) {
    // console.log(d.PitInTime === null);
    return (d.PitInTime === null && d.PitOutTime === null && d.TrackStatus === "1");
});

const margin = ({top: 20, right: 30, bottom: 20, left: 50});
const height = 500;
const width = 1400;

const compoundLookup = {
    "SOFT": "#FF0A47",
    "MEDIUM": "#ffff33",
    "HARD": "#ffffff"
}


const Chart = ({width, height, margin, data}) => {
    const list = useMemo(() => {
        return Object.keys(lookup);
    }, []);

    const {selected, allSelected, isSelected, toggle, toggleAll, partiallySelected} = useSelections(
        list, ['VER']
    );

    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.TyreLife;
            }))
            .range([margin.left, width - margin.right]);
    }, [data]);

    const yScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.LapTime;
            }))
            .range([height - margin.bottom, margin.top]);
    }, [data]);

    const sumStat = useCreation(() => {
        return d3.group(data, function (d) {
            return d.Driver;
        })
    }, [data]);

    const colorScale = useCreation(() => {
        return d3.scaleOrdinal()
            .domain(Object.keys(lookup))
            .range(Object.values(lookup));
    }, [lookup]);

    const compoundColorScale = useCreation(() => {
        return d3.scaleOrdinal()
            .domain(Object.keys(compoundLookup))
            .range(Object.values(compoundLookup));
    }, [compoundLookup]);

    const xAxis = (g) => {
        return g.attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));
    }

    const yAxis = (g) => {
        return g.attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));
    }

    const chartRef = useD3(svg => {
        svg.append('g')
            .attr("class", "x-axis")
            .call(xAxis);

        svg.append('g')
            .attr("class", "y-axis")
            .call(yAxis);

        sumStat.forEach((group, key) => {
            // console.log(group)
            svg.selectAll(`.rect`)
                .data(group)
                .join("rect")
                .attr("x", d => xScale(d.TyreLife))
                .attr("y", d => yScale(d.LapTime) - 14)
                .attr("width", 14)
                .attr("height", 14)
                .style("fill", d => colorScale(d.Driver).PColor)
                .style("opacity", d => {
                    if (selected.includes(d.Driver)) {
                        return 0.7;
                    } else {
                        return 0;
                    }
                });

            svg.selectAll(`.dot`)
                .data(group)
                .join("circle")
                .attr("cx", d => xScale(d.TyreLife))
                .attr("cy", d => yScale(d.LapTime))
                .attr("r", 8)
                .style("fill", d => compoundColorScale(d.Compound))
                .style("opacity", d => {
                    if (selected.includes(d.Driver)) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .attr("stroke", "black");
        })
    });

    useUpdateEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll(`*`).remove();
        svg.append('g')
            .attr("class", "axis")
            .call(xAxis);
        svg.append('g')
            .attr("class", "axis")
            .call(yAxis);
        sumStat.forEach((group, key) => {
            // console.log(group)
            svg.selectAll(`.rect`)
                .data(group)
                .join("rect")
                .attr("x", d => xScale(d.TyreLife))
                .attr("y", d => yScale(d.LapTime) - 14)
                .attr("width", 14)
                .attr("height", 14)
                .style("fill", d => colorScale(d.Driver).PColor)
                .style("opacity", d => {
                    if (selected.includes(d.Driver)) {
                        return 0.7;
                    } else {
                        return 0;
                    }
                });

            svg.selectAll(`.dot`)
                .data(group)
                .join("circle")
                .attr("cx", d => xScale(d.TyreLife))
                .attr("cy", d => yScale(d.LapTime))
                .attr("r", 8)
                .style("fill", d => compoundColorScale(d.Compound))
                .style("opacity", d => {
                    if (selected.includes(d.Driver)) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .attr("stroke", "black");
        })
    }, [selected]);

    return (
        <div className="track-overview">
            <Content>
                <Row>
                    <Col span={24}>
                        <div>
                            {/*<div>Selected : {selected.join(', ')}</div>*/}
                            <div style={{padding: '15px 15px 0 15px'}}>
                                <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
                                    Check all
                                </Checkbox>
                                {/*<Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>*/}
                                {/*    Hide all*/}
                                {/*</Checkbox>*/}
                            </div>
                            <Row style={{padding: '0 15px'}}>
                                {list.map((o) => {
                                    const temp_color = colorScale(o).TColor;
                                    // console.log(temp_color);
                                    const temp_style = {
                                        color: temp_color
                                    }
                                    return (
                                        <Col span={1} key={o}>
                                            <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
                                                <p style={temp_style}>{o}</p>
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
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
                    </Col>
                </Row>
            </Content>
        </div>
    )
}

export default () => <Chart width={width} height={height} margin={margin} data={data}/>
