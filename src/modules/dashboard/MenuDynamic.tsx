import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Icons = {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
};

type MenuItem = {
  title: string;
  path: string;
  icon: keyof typeof Icons;
  roles: string[];
};

function MenuDynamic() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fakeMenuData: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "DashboardOutlined",
      roles: ["665a1f2b40fd3a12b3e77611"],
    },
    {
      title: "Usuarios",
      path: "/users",
      icon: "UserOutlined",
      roles: ["665a1f2b40fd3a12b3e77612"],
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: "BarChartOutlined",
      roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setMenuItems(fakeMenuData);
    }, 500);
  }, []);

  const renderMenu = () => {
    return menuItems.map((item) => {
      const IconComponent = Icons[item.icon];
      return {
        key: item.path,
        icon: IconComponent ? <IconComponent /> : null,
        label: item.title,
      };
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={renderMenu()}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}

export default MenuDynamic;
