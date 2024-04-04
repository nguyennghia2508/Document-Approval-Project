import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import './style.scss'

const { TextArea } = Input;
const Test = () => {
    const [modal2Open, setModal2Open] = useState(false);
    return (
        <div className='modal'>
            <Button type="primary" onClick={() => setModal2Open(true)}>
                Vertically centered modal dialog
            </Button>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={[
                    <Button key="submit" onClick={() => setModal2Open(false)} className='modalSubmit'>Approval</Button>,
                    <Button key="cancel" onClick={() => setModal2Open(false)} className='modalCancel'>Cancel</Button>,
                ]}>
                <TextArea
                    rows={4}
                ></TextArea>
            </Modal>
        </div>
    )
}

export default Test