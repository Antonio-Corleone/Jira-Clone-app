import { lazy } from "react";
import HomeTemplate from "../templates/HomeTemplate"


const routesHome = [
  //home
  {
    exact: true,
    path: "/home",
    component: lazy(() => import("../pages/HomePage")),
  },
  {
    exact: true,
    path: "/create-project",
    component: lazy(() => import("../pages/CreateProject")),
  },
];

const renderRoutesHome = () => {
  return routesHome.map((route, index) => {
    return (
      <HomeTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    );
  });
};

export { renderRoutesHome };