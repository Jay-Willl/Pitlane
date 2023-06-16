import * as d3 from 'd3';
import {useD3} from '../hooks';
import {useCreation} from "ahooks";


const margin = ({top: 20, right: 0, bottom: 30, left: 40});
const height = 500;
const width = 800;

const data = [12, 19, 11, 13, 12, 22, 13, 4, 15, 16, 18, 19, 20, 12, 11, 9]

const Chart = ({width, height, margin, data}) => {
    const xScale = useCreation(() => {
        return d3.scaleLinear()
            .domain(d3.extent(data))
            .range([margin.left, width - margin.right]);
    }, [data]);

    const center = 200;
    const length = 100;

    const chartRef = useD3(svg => {
        const xAxis = (g) => {
            return g.attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(xScale).tickSizeOuter(0));
        }

        svg.append('g')
            .call(xAxis);


    });
}

export default () => <Chart />;