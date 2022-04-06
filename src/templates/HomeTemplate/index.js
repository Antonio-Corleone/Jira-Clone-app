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
        <div className="row">
          <div className="col-md-3 pl-0 ml-3">
            <Menu />
          </div>
          <div className="col-md-8">
            {/* Component */}
            <Route
              exact={exact}
              path={path}
              component={component}
            />
          </div>
        </div>
      </div>
      <Modal />
    </>
  )
}
