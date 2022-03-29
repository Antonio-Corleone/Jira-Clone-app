import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import './style.css'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function SideBar(props) {
  const [state, setState] = useState({ collapsed: false, });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <Sider trigger={null} collapsible collapsed={state.collapsed}>
      <div className="logo" />
      <div className="text-right my-2" style={{color:'white'}}>
          {state.collapsed ?
            <MenuUnfoldOutlined className="trigger" style={{ fontSize: 20 }} onClick={toggle} /> :
            <MenuFoldOutlined className="trigger" style={{ fontSize: 20 }} onClick={toggle} />
          }
        </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
          Create issue
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
          Search
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
