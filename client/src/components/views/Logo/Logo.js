import React from 'react'
import { SmileTwoTone } from '@ant-design/icons';
import { Typography } from 'antd'

const {Title} = Typography

function Logo() {
    return (
        <div style={{  textAlign:'center' }}>
            <Title level={3} >
            <SmileTwoTone twoToneColor="#52c41a"/> 숨은명의찾기 <SmileTwoTone twoToneColor="#52c41a"/></Title>
            <div><h5>-Find Good Doctors-</h5></div>
        </div>
    )
}

export default Logo
