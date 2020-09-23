import React from 'react'
import { SmileTwoTone } from '@ant-design/icons';
import { Typography } from 'antd'

const {Title} = Typography

function Logo() {
    return (
        <div style={{  textAlign:'center' }}>
            <Title level={3} >
            <SmileTwoTone twoToneColor="#52c41a"/> Find Good Doctors <SmileTwoTone twoToneColor="#52c41a"/></Title>
        </div>
    )
}

export default Logo
