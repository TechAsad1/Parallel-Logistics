
import Swal from 'sweetalert2';
import { Button, Table, Layout, theme, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, deleteCustomer } from '../../redux/Action';
import { useEffect, useState } from 'react';
import EditCustomer from "./EditCustomer";
import { Navigate } from "react-router-dom";
import AddCustomer from "./AddCustomer";
import SideBar from '../SideBar.jsx'

const { Content } = Layout;

const { Text } = Typography;

function Customers() {

    const dispatch = useDispatch();
    const customerArrs = useSelector((state) => state.customerArr);

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalNewOpen, setModalNewOpen] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState([]);

    function setOpenModalEditFunc(job) {
        setSelectedCustomer(job);
        setModalEditOpen(true);
    }

    const handleClose = () => {
        setModalEditOpen(false);
    };

    useEffect(() => {
        dispatch(getCustomer());
    }, []);

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
                dispatch(deleteCustomer(id));
            } else {
                Swal.close();
            }
        });
    };
    const columns = [
        {
            title: "CustomerName",
            dataIndex: "customerName",
            sorter: (a, b) => a.customerName.length - b.customerName.length,
        },
        {
            title: "Contact",
            dataIndex: "contact",
            sorter: (a, b) => a.contact.length - b.contact.length,
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "Address",
            dataIndex: "address",
            sorter: (a, b) => a.address.length - b.address.length,
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
                            <DeleteFilled onClick={(e) => showConfirmationAlert(record.customerId)} style={{ color: "#444" }} />
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
                            <h5>Customers</h5>
                            <Text type="secondary">Manage your customers</Text>
                        </div>
                        <Button type="primary" onClick={() => setModalNewOpen(true)}>Add New Customer</Button>
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
                            <Table columns={columns} dataSource={customerArrs} />
                        </div>
                    </div>
                </Content>
            </Layout>
            <EditCustomer
                open={modalEditOpen}
                onClose={handleClose}
                selectedCustomer={selectedCustomer}
            />
            <AddCustomer
                open={modalNewOpen}
                onClose={() => setModalNewOpen(false)}
            />
        </>
    )

}
export default Customers;