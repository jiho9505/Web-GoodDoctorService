import React from 'react'
import { SmileTwoTone } from '@ant-design/icons';
import { Typography } from 'antd'

const {Title} = Typography

function Logo() {
    return (
        <div style={{  display:'flex', justifyContent:'center' }}>
            
            <SmileTwoTone twoToneColor="#52c41a" style={{marginTop:'5px',marginRight:'5px',fontSize:'22px'}}/>
            <Title level={1} style={{fontSize:'24px'}}>숨은명의찾기</Title>
            <SmileTwoTone twoToneColor="#52c41a" style={{marginTop:'5px',marginLeft:'5px',fontSize:'22px'}}/>
        </div>
    )
}

export default Logo
