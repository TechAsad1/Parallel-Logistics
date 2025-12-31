
import Swal from 'sweetalert2';
import { Button, Table, Layout, theme, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DeleteFilled,
    EditFilled,
    EyeFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCargo, getCustomer, getJob, getJobType } from '../../redux/Action';
import { formatDateString } from '../Helper';

const { Content } = Layout;

const { Text } = Typography;

function Jobs() {

    const dispatch = useDispatch();
    const jobArrs = useSelector((state) => state.jobArr);
    const customerArrs = useSelector((state) => state.customerArr);
    const jobTypeArrs = useSelector((state) => state.jobTypeArr);
    const cargoDetailArrs = useSelector((state) => state.cargoDetailArr);

    useEffect(() => {
        dispatch(getCargo());
        dispatch(getJob());
        dispatch(getCustomer());
        dispatch(getJobType());
    }, []);

    useEffect(() => {
        setRawData(jobArrs);
    }, [jobArrs]);

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
    const oldandlatestvalue = [
        { value: "date", label: "Sort by Date" },
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
    ];
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (x) => (<span>{formatDateString(x)}</span>),
            sorter: (a, b) => a.date.length - b.date.length,
        },
        {
            title: "CustomerName",
            dataIndex: "customerId",
            render: (customerId) => {
                const r = customerArrs.find(i => i.customerId === customerId);
                return r ? r.customerName : "";
            },
            sorter: (a, b) => a.customerId.length - b.customerId.length,
        },
        {
            title: "JobType",
            dataIndex: "jobTypeId",
            render: (x) => {
                const r = jobTypeArrs.find(i => i.jobTypeId === x);
                return r ? r.jobTypeDesc : "";
            },
            sorter: (a, b) => a.jobTypeId.length - b.jobTypeId.length,
        },
        {
            title: "CargoDetail",
            dataIndex: "cargoDetailId",
            render: (x) => {
                const r = cargoDetailArrs.find(i => i.cargoId === x);
                return r ? r.cargoDetailDesc : "";
            },
            sorter: (a, b) => a.cargoDetailId.length - b.cargoDetailId.length,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">
                        <Link className="me-2 p-2" to={`/jobDetail/${record.id}`}>
                            <EyeFilled style={{ color: "#444" }} />
                        </Link>
                        <Link className="me-2 p-2" to={`/editJob/${record.id}`}>
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
    const [rawData, setRawData] = useState([]);

    return (
        <Content style={{ margin: '0 16px' }}>

            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h5>Jobs</h5>
                    <Text type="secondary">Manage your records</Text>
                </div>
                <Link to="/newJob"><Button type="primary">Add New Job</Button></Link>
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
                    <Table columns={columns}
                        dataSource={Array.isArray(rawData) ? rawData : []}
                        rowKey="id"
                    />
                </div>
            </div>
        </Content>
    )
}
export default Jobs;