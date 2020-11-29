import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import Alarm from './Sections/Alarm/Alarm';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import logo from './Title.PNG';
import { Link } from 'react-router-dom';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  const clickHandler = () => {
    setVisible(false)
  }

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div>
        
        <Link to="/">
          <img  className='logoimg' src={logo} alt='숨은명의찾기' />
        </Link>
        
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
          title="숨은명의찾기"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
          onClick={clickHandler}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
