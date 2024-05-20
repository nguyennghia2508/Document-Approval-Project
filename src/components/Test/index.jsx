import React, { useState } from 'react';
import { Select } from 'antd';
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const Test = () => {

    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    return (
        <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
                width: '100%',
            }}
            options={filteredOptions.map((item) => ({
                value: item,
                label: item,
            }))}
        />
    )
}

export default Test