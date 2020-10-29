import React, { useState, useEffect } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import Alarm from './Sections/Alarm';
import { Drawer, Button, Icon } from 'antd';
import {PlusCircleOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';
import axios from 'axios'

function NavBar() {
  
  const [alarmInfo, setalarmInfo] = useState([])

  useEffect(() => {
    let body = {
      userId : localStorage.getItem('userId')
    }

    axios.post('/api/alarm/', body)
         .then(response => {
           if(response.data.success){
              setalarmInfo(response.data.result)
           }
           else{
              alert('알림 기능 Error 발생')
           }
         })    
  }, [])
  
  
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo" style={{width: '200px'}} >
        <PlusCircleOutlined style={{fontSize:'20px',color:"#ffa940",paddingTop:'3px',marginTop:'5px'}}/>
        <a style={{fontSize : '20px', fontFamily : 'Noto Sans' , color:'#ffa940' , paddingLeft:'8px'}} href="/">숨은 명의 찾기</a>
        
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        
        <div className="menu_rigth" >
          <RightMenu mode="horizontal" />
        </div>

        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>

        <div className="menu_rigth_bell" >    
          <Alarm mode="horizontal" info={alarmInfo}/>
        </div>

        <Drawer
          title="Find Good Doctors"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar