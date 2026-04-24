
import Swal from 'sweetalert2';
import { Button, Table, Layout, theme, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, deleteUser } from '../../redux/Action';
import { useEffect, useState } from 'react';
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { Navigate } from "react-router-dom";
import SideBar from '../SideBar.jsx'

const { Content } = Layout;

const { Text } = Typography;

function Users() {

    const dispatch = useDispatch();
    const userArrs = useSelector((state) => state.userArr);

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalNewOpen, setModalNewOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState([]);

    function setOpenModalEditFunc(job) {
        setSelectedUser(job);
        setModalEditOpen(true);
    }

    const handleClose = () => {
        setModalEditOpen(false);
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const showConfirmationAlert = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#00ff00",
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#ff0000",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    className: "btn btn-success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
                dispatch(deleteUser(id));
            } else {
                Swal.close();
            }
        });
    };
    const columns = [
        {
            title: "UserName",
            dataIndex: "userName",
            sorter: (a, b) => a.userName.length - b.userName.length,
        },
        {
            title: "Designation",
            dataIndex: "designation",
            sorter: (a, b) => a.designation.length - b.designation.length,
        },
        {
            title: "Password",
            dataIndex: "password",
            sorter: (a, b) => a.password.length - b.password.length,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            fixed: "right",
            width: 180,
            render: (_, record) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">
                        <Link className="me-2 p-2" onClick={() => setOpenModalEditFunc(record)}>
                            <EditFilled style={{ color: "#444" }} />
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <DeleteFilled onClick={(e) => showConfirmationAlert(record.userId)} style={{ color: "#444" }} />
                        </Link>
                    </div>
                </div>
            ),
        },
    ];
    const oldandlatestvalue = [
        { value: "date", label: "Sort by Date" },
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
    ];

    const user = localStorage.getItem("user");
    if (!user) return <Navigate to="/login" />;
    return (
        <>
            <Layout style={{minHeight:'100vh'}}>
                <SideBar />
                <Content style={{ margin: '0 16px' }}>

                    <div className="header d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Users</h5>
                            <Text type="secondary">Manage your users</Text>
                        </div>
                        <Button type="primary" onClick={() => setModalNewOpen(true)}>Add New User</Button>
                    </div>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className="searchArea row">
                            <div className="col-lg-3">
                                <Search placeholder="input search text" style={{ width: 200 }} />
                            </div>
                            <div className="col-lg-9 d-flex justify-content-end">
                                <Select
                                    classnameprefix="react-select"
                                    options={oldandlatestvalue}
                                    placeholder="Newest"
                                // onChange={(e) => searchEngine(e.value, "")}
                                />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table columns={columns} dataSource={userArrs} />
                        </div>
                    </div>
                </Content>
                <EditUser
                    open={modalEditOpen}
                    onClose={handleClose}
                    selectedUser={selectedUser}
                />
                <AddUser
                    open={modalNewOpen}
                    onClose={() => setModalNewOpen(false)}
                />
            </Layout>
        </>
    )

}
export default Users;