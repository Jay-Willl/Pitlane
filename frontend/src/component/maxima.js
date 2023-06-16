import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

import './extrema.css';
import data from '../data/sample_maxima.json'

const App = () => {
    const expandedRowRender = (record) => {
        const column = [
            {title: 'Driver', dataIndex: 'Driver', key: 'Driver'},
            {title: 'Speed', dataIndex: 'Speed', key: 'Speed'},
            {title: 'RPM', dataIndex: 'RPM', key: 'RPM'},
            {title: 'Distance', dataIndex: 'Distance', key: 'Distance'}
        ]
        // console.log(record);
        const inner_data = data[record.Index - 1]
        return <Table columns={column} dataSource={inner_data} pagination={false} scroll={{x: 'max-content'}}/>;
    };

    const column = [
        {title: 'Maxima Point Index', dataIndex: 'Index', key: 'Index', width: 420, align: 'center'},
        // {title: 'AvgSpeed', dataIndex: 'AvgSpeed', key: 'AvgSpeed'},
        // {title: 'MaxSpeed', dataIndex: 'MaxSpeed', key: 'MaxSpeed'},
    ]

    const len = data.length;
    const outer_data = [];
    for (let i = 1; i <= len; i++) {
        outer_data.push({'Index': i, key: i, record: i});
    }
    return (
        <div className="table-overview">
            <Table
                columns={column}
                scroll={{x: 'max-content'}}
                expandable={{
                    expandedRowRender: expandedRowRender
                }}
                dataSource={outer_data}
                size="middle"
                pagination={false}
            />
        </div>
    );
};
export default App;
