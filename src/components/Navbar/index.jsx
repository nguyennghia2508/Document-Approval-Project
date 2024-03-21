import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Open Modal of 1000px width
            </Button>
            <Modal

                title="Modal 1000px width"
                style={{ top: 0 }}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={328}
                bodyStyle={{ height: 726 }}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
};
export default Navbar;