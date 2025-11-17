
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Typography, Flex, Row, Col, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';

const { Content } = Layout;

const { Text } = Typography;

function NewJob() {
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
            title: "AreaName",
            dataIndex: "areaName",
            sorter: (a, b) => a.areaName.length - b.areaName.length,
        },
        // {
        //   title: "Status",
        //   dataIndex: "isActive",
        //   render: (x) => (
        //     <div>
        //       {x && (<span className="badge badge-linesuccess">Active</span>)}
        //       {!x && (<span className="badge badge-linedanger">InActive</span>)}
        //     </div>
        //   ),
        //   sorter: (a, b) => a.active.length - b.active.length,
        // },
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

    const layout = {
        labelCol: { span: 16 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        alert("Submited!");
    };

    const dateFormat = 'YYYY/MM/DD';

    return (
        <Content style={{ margin: '0 16px' }}>

            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h5>New Job</h5>
                </div>
                <Link to="/jobs"><Button type="primary">Back To Jobs</Button></Link>
            </div>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >

                <Form
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item name={['user', 'email']} label="Job No" rules={[{ type: 'email' }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name={['user', 'name']} label="Date" rules={[{ required: true }]}>
                                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} style={{width:"100%"}} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="SI Cutt Of Date">
                                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} style={{width:"100%"}} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'age']} label="Job Type" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Cutt Of Date Vessel">
                                <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} style={{width:"100%"}} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Customer">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Cargo Details">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Gross Weight">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Net Weight">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="No Of Container">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Port Of Loading-POL">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Port Of Discharge-POD">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="ETD POL">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="ETA-POD">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Loading Term">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Shipping Line">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Vessel">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Transit Time-Days">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Free Days At POD">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name={['user', 'introduction']} label="Comments">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>

                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>

            </div>
        </Content>
    )
}
export default NewJob;