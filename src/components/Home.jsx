import React, { useState } from 'react';
import "./styles/style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {
  DesktopOutlined,
  DockerOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FileOutlined,
  SwitcherOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Export from './export/Export.jsx';
import NewJob from './export/NewJob.jsx';
import Jobs from './export/Jobs.jsx';
import Users from './users/Users.jsx';
import NewUser from './users/NewUser.jsx';

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Jobs", '1', <DockerOutlined />, [
    getItem(<Link to="/jobs">Jobs</Link>, "2"),
    getItem(<Link to="/newJob">New Job</Link>, "3")
  ]),
  getItem("Users", '4', <UsergroupAddOutlined />, [
    getItem(<Link to="/users">Users</Link>, "5"),
    getItem(<Link to="/newUser">New User</Link>, "6")
  ]),
];
// import { format } from "date-fns";
// import { DatePicker } from "antd";
// import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} trigger={null} style={{ position: "relative", background: "white" }}>
          <div className="demo-logo-vertical" />
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            className="custom-collapse-btn"
            icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          ><span></span></Button>
          <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Routes>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/newJob" element={<NewJob />} />
            <Route path="/users" element={<Users />} />
            <Route path="/newUser" element={<NewUser />} />
          </Routes>
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};
export default Home;