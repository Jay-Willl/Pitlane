import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Col, Layout, Row, theme} from 'antd';
import React from 'react';

import {Image} from 'antd';

import Information from './component/info';
import Introduction from './component/introduction';
import Chart from './component/track';
import Maxima from './component/maxima';
import Qualify from './component/qualify';
import Distribution from './component/distribution';
import ScatterPlot from "./component/scatterplot";
import Result from './component/result';
import Standing from './component/standing';

import './panel.css';


const {Header, Content, Footer, Sider} = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const App = () => {
    const {
        token: {colorBgContainer, colorBgLayout, colorText},
    } = theme.useToken();

    return (
        <Layout
            style={{
                padding: '50px 50px',
                minHeight: 30,
                background: colorBgContainer,
            }}
        >
            <Content
                style={{
                    padding: '0 0',
                    background: colorBgContainer,
                    minHeight: 1280
                }}
            >
                <Row>
                    <Col span={8}>
                        {/* 左侧内容 */}
                        <Layout style={{background: 'white'}}>
                            <div className="custom-header-content">
                                {/* 在这里放置 Header 内容 */}
                                <span className="text">&nbsp;RACE OVERVIEW&nbsp;</span>
                            </div>
                            <Information />
                            <div className="custom-header-content">
                                {/* 在这里放置 Header 内容 */}
                                <span className="text">&nbsp;BREAK POINTS&nbsp;</span>
                                {/*<div className="text-container">*/}
                                {/*    <span className="text">这是加粗且居中的文字</span>*/}
                                {/*</div>*/}
                            </div>
                            <Maxima />
                        </Layout>
                    </Col>
                    <Col span={8}>
                        <div className="custom-header-content">
                            {/* 在这里放置 Header 内容 */}
                            <span className="text">&nbsp;TRACK INTRODUCTION&nbsp;</span>
                        </div>
                        <Introduction />
                        {/*<div className="custom-header-content">*/}
                        {/*    /!* 在这里放置 Header 内容 *!/*/}
                        {/*    <span className="text">&nbsp;grand prix result&nbsp;</span>*/}
                        {/*</div>*/}
                    </Col>
                    <Col span={8}>
                        <div className="custom-header-content">
                            {/* 在这里放置 Header 内容 */}
                            <span className="text">&nbsp;TRACK OVERVIEW&nbsp;</span>
                            {/*<div className="text-container">*/}
                            {/*    <span className="text">这是加粗且居中的文字</span>*/}
                            {/*</div>*/}
                        </div>
                        <Chart />
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <div className="custom-header-content">
                            {/* 在这里放置 Header 内容 */}
                            <span className="text">&nbsp;QUALIFY TIMELINE&nbsp;</span>
                        </div>
                        <Qualify />
                        <Result />
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <div className="custom-header-content">
                            {/* 在这里放置 Header 内容 */}
                            <span className="text">&nbsp;GRAND PRIX LAP DISTRIBUTION&nbsp;</span>
                        </div>
                        <Standing />
                        <ScatterPlot />
                        <Distribution />
                    </Col>
                </Row>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    background: colorBgContainer
                }}
            >
                Pitlane Formula 1 ©2023 Created by Jay-Willl
            </Footer>
        </Layout>
    );
};
export default App;
