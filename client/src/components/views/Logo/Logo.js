import React from 'react'
import { SmileTwoTone } from '@ant-design/icons';
import { Typography } from 'antd'
import logo from '../NavBar/Title.PNG';
const {Title} = Typography

function Logo() {
    return (
        <div style={{  display:'flex', justifyContent:'center' }}>
             {/* style={{marginTop:'5px',marginRight:'5px',fontSize:'22px'}} */}
            {/* <SmileTwoTone twoToneColor="#52c41a"/> */}
            {/* <Title level={1} style={{fontSize:'24px'}}>숨은명의찾기</Title> */}
            <img  className='logoimg' src={logo} alt='숨은명의찾기' />
            {/* <SmileTwoTone twoToneColor="#52c41a" /> */}
            {/* style={{marginTop:'5px',marginLeft:'5px',fontSize:'22px'}} */}
        </div>
    )
}

export default Logo
