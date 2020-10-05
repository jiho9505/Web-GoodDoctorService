import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

function Notification() {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
        <Button  type='danger' shape='round' onClick={showDrawer}>
            공지사항
        </Button>
        <Drawer
            title="공지사항"
            placement="top"
            closable={false}
            onClose={onClose}
            visible={visible}
        >
            <p>20.10.05 - 공지사항 test</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
        </>
    );
}

export default Notification
