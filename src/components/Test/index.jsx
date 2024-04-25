import { Table, Button, Input, Space, Row, Col } from 'antd';
import { useState } from 'react';

const Test = () => {
    const [data, setData] = useState([]);
    const [addingRow, setAddingRow] = useState(false);
    const [newRowData, setNewRowData] = useState({});
    const handleAddRow = () => {
        setAddingRow(true);
    };

    const handleSaveRow = () => {
        setData([...data, newRowData]);
        setNewRowData({});
        setAddingRow(false);
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: <div style={{ textAlign: 'center' }}>
                <Button onClick={handleAddRow}>Add</Button>
            </div>,
            dataIndex: 'address',
            key: 'address',
        },
    ];



    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
            />
            {addingRow && (
                <div>
                    <Row>
                        <Col>
                            <Input
                                placeholder="Name"
                                value={newRowData.name}
                                onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
                            />
                        </Col>
                        <Col>
                            <Input
                                placeholder="Age"
                                value={newRowData.age}
                                onChange={(e) => setNewRowData({ ...newRowData, age: e.target.value })}
                            />
                        </Col>
                        <Col>
                            <Input
                                placeholder="Address"
                                value={newRowData.address}
                                onChange={(e) => setNewRowData({ ...newRowData, address: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row>

                    </Row>

                    <Button onClick={handleSaveRow}>Save</Button>
                </div>
            )}

        </div>
    );
};

export default Test;
