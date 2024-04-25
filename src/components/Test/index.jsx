
import { DatePicker } from 'antd'
import dayjs from 'dayjs';
import moment from 'moment'
import React from 'react'

const Test = () => {

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div>
            <DatePicker
                defaultValue={dayjs(moment().format("YYYY-MM-DD"), dateFormat)}
            >

            </DatePicker>
        </div>
    )
}

export default Test

