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
    DashboardOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Modal } from 'antd';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiMiniRectangleGroup } from "react-icons/hi2";
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
    const { Content, Sider } = Layout;
    const navigate = useNavigate();
    const isLoginPage = location.pathname === "/Login";

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [location.pathname]);

    //Navbar
    const items = [
        ...(isAdmin == 'true' ? [getItem(<Link to="/AdminDashboard" style={{ textDecoration: "none" }}>Admin Dashboard</Link>, "1", <RiDashboard3Fill />)] : []),
        ...(isAdmin == 'false' ? [getItem(<Link to="/Dashboard" style={{ textDecoration: "none" }}>Dashboard</Link>, "1", <RiDashboard3Fill />)] : []),
        getItem("Job", '2', <DockerOutlined />, [
            getItem(<Link to="/Job" style={{ textDecoration: "none" }}>Job</Link>, "3"),
            getItem(<Link to="/AddJob" style={{ textDecoration: "none" }}>Add New Job</Link>, "4")
        ]),
        ...(isAdmin == 'true' ? [getItem(<Link to="/Customer" style={{ textDecoration: "none" }}>Customer</Link>, "6", <HiMiniUserGroup />)] : []),
        ...(isAdmin == 'true' ? [getItem(<Link to="/User" style={{ textDecoration: "none" }}>User</Link>, "5", <UsergroupAddOutlined />)] : []),
        getItem(<Link to="/Login" style={{ textDecoration: "none" }}>Logout</Link>, "7", <MdOutlineLogout />),
        // getItem("Management", '7', <HiMiniRectangleGroup />, [
        //   getItem(<Link to="/CargoItem" style={{ textDecoration: "none" }}>Cargo Item</Link>, "8"),
        //   getItem(<Link to="/JobType" style={{ textDecoration: "none" }}>Job Type</Link>, "9"),
        //   getItem(<Link to="/GrossWeight" style={{ textDecoration: "none" }}>Gross Weight</Link>, "10"),
        //   getItem(<Link to="/NetWeight" style={{ textDecoration: "none" }}>Net Weight</Link>, "11"),
        //   getItem(<Link to="/NoOfContainer" style={{ textDecoration: "none" }}>No Of Container</Link>, "12"),
        //   getItem(<Link to="/PortOfLoading" style={{ textDecoration: "none" }}>Port Of Loading</Link>, "13"),
        //   getItem(<Link to="/PortOfDischarge" style={{ textDecoration: "none" }}>Port Of Discharge</Link>, "14"),
        //   getItem(<Link to="/LoadingTerm" style={{ textDecoration: "none" }}>Loading Term</Link>, "15"),
        //   getItem(<Link to="/ShippingLine" style={{ textDecoration: "none" }}>Shipping Line</Link>, "16"),
        //   getItem(<Link to="/Vessel" style={{ textDecoration: "none" }}>Vessel</Link>, "17"),
        // ]),
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
            <Menu defaultSelectedKeys={['3']} mode="inline" selectedKeys={[selectedKeyMap[location.pathname]]} items={items}
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
