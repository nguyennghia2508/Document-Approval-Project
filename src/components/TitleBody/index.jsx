import { Button } from 'antd'
import React from 'react'
import './style.scss'
const TitleBody = ({
    label,
    isForm = false
}) => {
    return (
        <div className='titlebody'>
            <label className='titlebody-left'>{label}</label>
            <div className='titlebody-right'>
                <Button>Export excel</Button>
                <Button>Filer</Button>
                <Button>Create new</Button>
            </div>
        </div>
    )
}

export default TitleBody