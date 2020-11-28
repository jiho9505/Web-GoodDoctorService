import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function LeftMenu(props) {
  

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <Link to="/">
          홈
        </Link>
      </Menu.Item>
      <Menu.Item key="community">
        <Link to="/community">
          커뮤니티
        </Link>     
      </Menu.Item>
      <Menu.Item key="read">
        <Link to="/mustread">
           필독사항
        </Link>
      </Menu.Item>
      
  </Menu>
  )
}

export default LeftMenu