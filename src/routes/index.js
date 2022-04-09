import { lazy } from "react";
import HomeTemplate from "../templates/HomeTemplate"


const routesHome = [
  //home
  {
    exact: true,
    path: "/",
    component: lazy(() => import("../pages/HomePage")),
  },
  {
    exact: false,
    path: "/create-project",
    component: lazy(() => import("../pages/CreateProject")),
  },
  {
    exact: false,
    path: "/project-management",
    component: lazy(() => import("../pages/ProjectManagement")),
  },
  {
    exact: false,
    path: "/project-detail/:projectId",
    component: lazy(() => import("../pages/ProjectDetail")),
  },
  {
    exact: false,
    path: "/DnD",
    component: lazy(() => import("../pages/DragAndDropDnD")),
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