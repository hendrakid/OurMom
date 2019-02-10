import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const MasterUser = React.lazy(() => import('./views/Mom/MOM01'));
const MasterProject = React.lazy(() => import('./views/Mom/MOM02'));
const MasterCustomer = React.lazy(() => import('./views/Mom/MOM03'));
const MasterLocation = React.lazy(() => import('./views/Mom/MOM04'));
const MasterMom = React.lazy(() => import('./views/Mom/MOM05'));
const MasterMenu = React.lazy(() => import('./views/Mom/MOM06'));
const MaintainUserLogin = React.lazy(() => import('./views/Mom/MOM01SV'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/mom/user-login', name: 'User', component: MasterUser },
  { path: '/mom/master-project', name: 'Project', component: MasterProject },
  { path: '/mom/master-customer', name: 'Customer', component: MasterCustomer },
  { path: '/mom/master-location', name: 'Location', component: MasterLocation },
  { path: '/mom/master-mom', name: 'Mom', component: MasterMom },
  { path: '/mom/master-menu', name: 'Menu', component: MasterMenu },
  { path: '/mom/maintain-user-login', name: 'Maintain User Login', component: MaintainUserLogin }
];

export default routes;
