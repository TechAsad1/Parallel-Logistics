
import Swal from 'sweetalert2';
import { Breadcrumb, Button, Table, Layout, theme, Select,Typography } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DoubleRightOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const { Text } = Typography;

function Jobs() {
    // const dispatch = useDispatch();
    // const postData1 = useSelector((state) => state.area);
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
    const columns = [
        {
            title: "Month",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "Job",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "Customer",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "POL",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "BI Number",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "Commodity",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "CTN",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "GD",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-area"
                        // onClick={(e) => updateHandle(e, record.areaId)}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <i
                                data-feather="trash-2"
                                className="feather-trash-2"
                                onClick={(e) => showConfirmationAlert()}
                            ></i>
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
                    <Table columns={columns} dataSource={""} />
                </div>
            </div>
        </Content>
    )
}
export default Jobs;