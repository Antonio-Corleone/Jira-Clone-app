import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'

import LoginComponent from '../../pages/LoginForm';

const { Sider, Content } = Layout;

export default function UserLoginComponent(props) {
  const [{ width, height }, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    return () => {
      window.onresize = null;
    }
  }, [])
  return (
    <Layout style={{overflowY: 'hidden',overflowX: 'hidden'}}>
      <Sider
        width={width / 2}
        style={{
          height: height,
          backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${height})`,
          backgroundSize: 'cover'
        }}>
      </Sider>
      <Content>
        <LoginComponent {...props} />
      </Content>
    </Layout>
  )
}
