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
            <p>20.11.04 - 공지사항</p>
            <p>의료법때문에 특정 병원 직접적인 언급 및 비판 X</p>
        </Drawer>
        </>
    );
}

export default Notification
