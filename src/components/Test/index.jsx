import React from 'react';
import { Input, DatePicker } from 'antd';
import moment from 'moment'

const Test = () => {


    return (


        <Input
            defaultValue={moment().format('YYYY-MM-DDTHH:mm:ss')}
        ></Input>


    )
};

export default Test;