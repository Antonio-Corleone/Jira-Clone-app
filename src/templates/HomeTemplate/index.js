import React from 'react';
import { Route } from 'react-router-dom';

import SideBar from './_components/Sidebar';
import Menu from './_components/Menu';
import Modal from './_components/Modal';

export default function HomeTemplate(props) {
  const { exact, path, component } = props;
  return (
    <>
      <div className="jira">
        {/* Sider Bar  */}
        <SideBar />
        {/* Menu */}
        <Menu />
        {/* Component */}
        <Route
          exact={exact}
          path={path}
          component={component}
        />
      </div>
      <Modal />
    </>
  )
}
