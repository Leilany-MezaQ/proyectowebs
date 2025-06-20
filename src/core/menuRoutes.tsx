import Dashboard from "../modules/dashboard/Dashboard";
import UserForm from "../modules/user/UserForm";


export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;
  icon?: string;
  roleIds?: string[]; // si quieres filtrar por rol
  hidden?: boolean;
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: <UserForm />,
    label: 'Inicio',
    icon: 'HomeOutlined',
  },
  {
    path: '/users',
    element: <UserForm />,
    label: 'Usuarios',
    icon: 'UserOutlined',
  },
  {
    path: '/dashboard',
    element: <UserForm />,
    label: 'Usuarios',
    icon: 'UserOutlined',
  },
  {
    path: '/users',
    element: <UserForm />,
    label: 'Usuarios',
    icon: 'UserOutlined',
  },
];

export default routes;
