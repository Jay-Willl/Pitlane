import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useCreation} from "ahooks";

import data from '../data/sample_standing.json';
import lookup from '../lookup';

const margin = ({top: 30, right: 50, bottom: 20, left: 50});
const height = 600;
const width = 1400;

let drivers = [];
let drv_dict = {};
for (let i = data.length - 1; i >= 0; i--) {
    // console.log(data[i].sequence[0])
    drv_dict[Object.values(data[i].sequence[0])[0]] = data[i].code;
}
// console.log(drv_dict);
for (let i = 1; i <= data.length; i++) {
    drivers.push(drv_dict[i])
}
// drivers.push('MAZ');
drivers = drivers.reverse();
// console.log(drivers.length);
// console.log(drivers);

const Chart = ({width, height, margin, data}) => {
    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain([0, 57])
            .range([margin.left, width - margin.right]);
    }, [data]);

    const yScale = useCreation(() => {
        return d3.scaleLinear()
            .domain([20, 1])
            .range([height - margin.bottom, margin.top]);
    }, [data]);

    const colorScale = useCreation(() => {
        return d3.scaleOrdinal()
            .domain(Object.keys(lookup))
            .range(Object.values(lookup));
    }, [lookup]);

    const yDrvScale = useCreation(() => {
        return d3.scaleBand()
            .domain(drivers)
            .range([height - margin.bottom, margin.top]);
    }, [data]);

    // build axes
    const chartRef = useD3(svg => {
        const xAxis = (g) => {
            return g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale));
        }

        const yAxis = (g) => {
            return g.attr('transform', `translate(${width - margin.right}, 0)`)
                .call(d3.axisRight(yScale).ticks(19));
        }

        const yDrvAxis = (g) => {
            return g.attr('transform', `translate(${margin.left}, -15)`)
                .call(d3.axisLeft(yDrvScale).ticks(19));
        }

        svg.append('g')
            .call(xAxis);

        svg.append('g')
            .call(yAxis);

        svg.append('g')
            .call(yDrvAxis);

        data.forEach((group, key) => {
            // console.log(group);
            svg.append('path')
                .datum(group.sequence)
                .attr('class', (d) => {
                    return 'line' + group.code;
                })
                .attr('fill', 'none')
                .attr('stroke', d => colorScale(group.code).PColor)
                .attr('stroke-width', 6)
                .attr('d', d3.line()
                    // x -> lap信息
                    .x(d => {
                        return xScale(Number(Object.keys(d)[0]));
                    })
                    // y -> position信息
                    .y(d => {
                        return yScale(Number(Object.values(d)[0]));
                    })
                );
        })
    });

    // read axes and render svg
    return (
        <div className='track-overview'>
            <svg
                ref={chartRef}
                style={{
                    height: 650,
                    width: "100%",
                    marginRight: "0px",
                    marginLeft: "0px",
                }}
            />
        </div>
    )
}

export default () => <Chart width={width} height={height} margin={margin} data={data}/>
