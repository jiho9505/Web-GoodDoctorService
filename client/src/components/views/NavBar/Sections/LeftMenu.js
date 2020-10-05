import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/" >홈</a>
      </Menu.Item>
      <Menu.Item key="community">
        <a href="/community" >커뮤니티</a>
      </Menu.Item>
      <Menu.Item key="read">
        <a href="/mustread">필독사항</a>
      </Menu.Item>
      
  </Menu>
  )
}

export default LeftMenu