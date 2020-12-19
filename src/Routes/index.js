import React from "react";

const Home = React.lazy(() => import("Containers/Home"));

export default [
  {
    path: '/',
    name: '测试',
    key: 'home',
    component: Home,
    extra: true,
    type: 'base',
    code: '110'
  },
]