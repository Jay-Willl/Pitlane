import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useCreation} from "ahooks";

const data = [
    {x: 1, y: 5},
    {x: 2, y: 15},
    {x: 3, y: 34},
    {x: 4, y: 53},
    {x: 5, y: 27},
];

const margin = ({top: 20, right: 0, bottom: 30, left: 40});
const height = 500;
const width = 800;

const Chart2 = ({width, height, margin, data}) => {
    // build scale functions
    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent([...data], d => d.x))
            .range([margin.left, width - margin.right]);
    }, [data]);

    // console.log(data.map(d => d.x))
    console.log([{x: 0, y: 0}, ...data])
    console.log(d3.extent([{x: 0, y: 0}, ...data], d => d.x))
    // console.log([margin.left, width - margin.right])
    // console.log(xScale(1));
    // console.log(xScale(2));
    // console.log(xScale(3));
    // console.log(xScale(4));
    // console.log(xScale(5));

    const yScale = useCreation(() => {
        return d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([height - margin.bottom, margin.top]);
    }, [data]);

    // build axes
    const chartRef = useD3(svg => {
        const xAxis = (g) => {
            return g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickSizeOuter(0).tickValues(xScale.ticks(5)));
        }

        const yAxis = (g) => {
            return g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale).tickSizeOuter(0));
        }

        svg.append('g')
            .call(xAxis);

        svg.append('g')
            .call(yAxis);

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .attr("fill", "#69b3a2")

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', "#69b3a2")
            .attr('stroke-width', 2)
            .attr('d', d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
            )
    });

    // read axes and render svg
    return (
        <>
            <svg
                ref={chartRef}
                style={{
                    height: 1000,
                    width: "100%",
                    marginRight: "0px",
                    marginLeft: "0px",
                }}
            />
        </>
    )
}

export default () => <Chart2 width={width} height={height} margin={margin} data={data}/>
