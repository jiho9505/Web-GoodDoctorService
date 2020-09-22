import React from 'react'
import { SmileTwoTone } from '@ant-design/icons';
import { Typography } from 'antd'

const {Title} = Typography

function Logo() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Title level={3}>Find good doctors <SmileTwoTone/></Title>
        </div>
    )
}

export default Logo
