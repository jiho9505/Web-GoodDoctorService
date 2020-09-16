import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
 
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/" >홈</a>
      </Menu.Item>
      <Menu.Item key="community">
        <a href="/community" >커뮤니티</a>
      </Menu.Item>
    {/*}
    <SubMenu title={<span>커뮤니티</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  */}
  </Menu>
  )
}

export default LeftMenu