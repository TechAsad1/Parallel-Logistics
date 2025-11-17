import React, { useState } from 'react';
import "./styles/style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {
  DesktopOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Export from './export/Export.jsx';
import NewJob from './export/NewJob.jsx';

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
  getItem("Jobs", '1', <DesktopOutlined />, [
    getItem(<Link to="/job">Job</Link>, "2"),
    getItem(<Link to="/newJob">New Job</Link>, "3")
  ]),
  getItem('Option 2', '4', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '5'),
    getItem('Bill', '6'),
    getItem('Alex', '7'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '8'), getItem('Team 2', '9')]),
  getItem('Files', '10', <FileOutlined />),
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
            <Route path="/job" element={<Export />} />
            <Route path="/newJob" element={<NewJob />} />
          </Routes>
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};
export default Home;