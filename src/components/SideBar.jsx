import {
    DockerOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiDashboard3Fill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from 'react';

const SideBar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const isAdmin = localStorage.getItem("isAdmin");
    const { Sider } = Layout;
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate, location.pathname]);

    //Navbar
    const adminNav = [
        getItem(<Link to="/AdminDashboard" style={{ textDecoration: "none" }}>Admin Dashboard</Link>, "1", <RiDashboard3Fill />),
        getItem("Job", '2', <DockerOutlined />, [
            getItem(<Link to="/Job" style={{ textDecoration: "none" }}>Job</Link>, "3"),
            getItem(<Link to="/AddJob" style={{ textDecoration: "none" }}>Add New Job</Link>, "4")
        ]),
        getItem(<Link to="/Customer" style={{ textDecoration: "none" }}>Customer</Link>, "6", <HiMiniUserGroup />),
        getItem(<Link to="/User" style={{ textDecoration: "none" }}>User</Link>, "5", <UsergroupAddOutlined />),
        getItem(<Link to="/Login" style={{ textDecoration: "none" }}>Logout</Link>, "7", <MdOutlineLogout />),
    ];
    const nav = [
        getItem(<Link to="/Dashboard" style={{ textDecoration: "none" }}>Dashboard</Link>, "1", <RiDashboard3Fill />),
        getItem("Job", '2', <DockerOutlined />, [
            getItem(<Link to="/Job" style={{ textDecoration: "none" }}>Job</Link>, "3"),
            getItem(<Link to="/AddJob" style={{ textDecoration: "none" }}>Add New Job</Link>, "4")
        ]),
        getItem(<Link to="/Login" style={{ textDecoration: "none" }}>Logout</Link>, "7", <MdOutlineLogout />),
    ];
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const selectedKeyMap = {
        "/Dashboard": "1",
        "/AdminDashboard": "1",
        "/Job": "3",
        "/AddJob": "4",
        "/User": "5",
        "/Customer": "6",
        "/Login": "7"
    };
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        navigate("/login", { replace: true });
    };

    return (
        <Sider
            id='navBar'
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            style={{ position: "relative", background: "white" }}
        >
            <Button
                type="text"
                onClick={() => setCollapsed(!collapsed)}
                className="custom-collapse-btn"
                icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            />
            <Menu defaultSelectedKeys={['3']} mode="inline" selectedKeys={[selectedKeyMap[location.pathname]]} items={isAdmin == "true" ? adminNav : nav}
                onClick={({ key }) => {
                    if (key === "7") {
                        handleLogout();
                    }
                }}
            />
        </Sider>
    )
}
export default SideBar;
