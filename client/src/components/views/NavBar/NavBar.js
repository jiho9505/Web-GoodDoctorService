import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import Alarm from './Sections/Alarm';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import logo from './Title.PNG';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div>
        <a href="/">
          <img  className='logoimg' src={logo} alt='숨은명의찾기' />
        </a>
        
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
          <Alarm mode="horizontal" />
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
