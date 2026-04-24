
import Swal from 'sweetalert2';
import { Breadcrumb, Button, Table, Layout, theme, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DoubleRightOutlined,
    DeleteFilled,
    EditFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getVessel } from '../../../redux/Action';
import { useEffect, useState } from 'react';
// import EditVessel from "./EditVessel";
// import AddVessel from "./AddVessel";
import dayjs from "dayjs";

const { Content } = Layout;

const { Text } = Typography;

function Vessels() {

    const dispatch = useDispatch();
    const vesselArrs = useSelector((state) => state.vesselArr);

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalNewOpen, setModalNewOpen] = useState(false);

    const [selectedVessel, setSelectedVessel] = useState([]);

    function setOpenModalEditFunc(job) {
        setSelectedVessel(job);
        setModalEditOpen(true);
    }

    const handleClose = () => {
        setModalEditOpen(false);
    };

    useEffect(() => {
        dispatch(getVessel());
    }, []);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const showConfirmationAlert = () => {
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
                // dispatch(deleteArea(id));
            } else {
                Swal.close();
            }
        });
    };
    const dateFormat = 'DD/MMM/YYYY';
    const columns = [
        {
            title: "CreatedDate",
            dataIndex: "createdDate",
            render: (x) => (
                <span>{x ? dayjs(x).format(dateFormat) : ''}</span>
            ),
            sorter: (a, b) => a.createdDate.length - b.createdDate.length,
        },
        {
            title: "CreatedBy",
            dataIndex: "createdBy",
            sorter: (a, b) => a.createdBy.length - b.createdBy.length,
        },
        {
            title: "Vessel",
            dataIndex: "vesselDesc",
            sorter: (a, b) => a.vesselDesc.length - b.vesselDesc.length,
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
                            <DeleteFilled onClick={(e) => showConfirmationAlert()} style={{ color: "#444" }} />
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

    return (
        <div>
            <Content style={{ margin: '0 16px' }}>

                <div className="header d-flex justify-content-between align-items-center">
                    <div>
                        <h5>Vessels</h5>
                        <Text type="secondary">Manage your Vessel</Text>
                    </div>
                    <Button type="primary" onClick={() => setModalNewOpen(true)}>Add New Vessel</Button>
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
                        <Table columns={columns} dataSource={vesselArrs} />
                    </div>
                </div>
            </Content>
            {/* <EditVessel
                open={modalEditOpen}
                onClose={handleClose}
                selectedCustomer={selectedVessel}
            />
            <AddVessel
                open={modalNewOpen}
                onClose={()=>setModalNewOpen(false)}
            /> */}
        </div>
    )

}
export default Vessels;