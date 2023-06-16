import { Button, Col, Row, Statistic } from 'antd';

import Countup from 'react-countup';

const formatter = (value) => <Countup end={value} separator=","/>
const App = () => (
    <div className='track-overview'>
        <Row gutter={24}>
            <Col span={8} style={{padding: "20px 50px"}}>
                <Statistic title="First Grand Pirx" value={2004} formatter={formatter}/>
            </Col>
            <Col span={8} style={{padding: "20px 30px"}}>
                <Statistic title="Number of Laps" value={57} formatter={formatter}/>
            </Col>
            <Col span={8} style={{padding: "20px 10px"}}>
                <Statistic title="Circuit Length(km)" value={5.412} precision={3}/>
            </Col>
            <Col span={8} style={{padding: "0px 0px 20px 50px"}}>
                <Statistic title="Race Distance(km)" value={308.238} precision={3} formatter={formatter}/>
            </Col>
            <Col span={8} style={{padding: "0px 20px 20px 80px"}}>
                <Statistic title="Track Record" value={'1:31.447'} />
            </Col>
        </Row>
    </div>
);
export default App;
