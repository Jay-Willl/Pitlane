import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useCreation} from "ahooks";

import data from '../data/sample_result.json';
import lookup from '../lookup';

let drivers = [];
let codes = [];
for (let i = 0; i < data.length; i++) {
    drivers.push(data[i].Driver);
    codes.push(data[i].DriverNumber);
}
drivers = [...new Set(drivers)];

let subGroups = ['Sector1Time', 'Sector2Time', 'Sector3Time'];

// console.log(drivers);

const margin = ({top: 20, right: 50, bottom: 20, left: 50});
const height = 600;
const width = 1400;

const Chart = ({width, height, margin, data}) => {
    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain([0, 93000])
            .range([margin.left, width - margin.right])
    }, [data]);

    // driver names
    const yScale = useCreation(() => {
        return d3.scaleBand()
            .domain(drivers)
            .range([height - margin.bottom, margin.top])
    }, [data])

    const colorScale = useCreation(() => {
        return d3.scaleOrdinal()
            .domain(subGroups)
            .range(d3.schemeSet2);
    }, [subGroups]);

    const dataStack = useCreation(() => {
        return d3.stack()
            .keys(subGroups)
            (data);
    }, [data, subGroups]);

    // console.log(dataStack);

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

        svg.append('g')
            .selectAll('g')
            .data(dataStack)
            .join('g')
            .attr('fill', (d) => {
                return colorScale(d.key);
            })
            .attr('class', d => {
                return 'rect ' + d.key;
            })
            .selectAll('rect')
            .data((d) => d)
            .join('rect')
            .attr('x', (d) => {
                return xScale(d[0]);
            })
            .attr('y', (d) => {
                return yScale(d.data.Driver) + 5;
            })
            .attr('width', (d) => {
                return xScale(d[1]) - xScale(d[0]);
            })
            .attr('height', yScale.bandwidth() - 10)
            .attr('stroke', 'grey')
            .on('mouseover', function (event, d) {
                const subGroupName = d3.select(this.parentNode).datum().key;
                // console.log(subGroupName);
                d3.selectAll('.rect')
                    .style('opacity', 0.2);
                d3.selectAll('.' + subGroupName)
                    .style('opacity', 1);
            })
            .on('mouseleave', function (event, d) {
                d3.selectAll('.rect')
                    .style('opacity', 1);
            })

        svg.selectAll('paths')
            .data(data)
            .enter()
            .append('path')
            .style("fill", "none")
            .style("stroke", "#69b3a2")
    })

    return (
        <div className="track-overview">
            <svg
                ref={chartRef}
                style={{
                    minHeight: 650,
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

