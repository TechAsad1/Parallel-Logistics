
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Typography, Flex, Row, Col, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';

const { Content } = Layout;

const { Text } = Typography;

function NewUser() {
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
                    <h5>New User</h5>
                </div>
                <Link to="/users"><Button type="primary">Back To Users</Button></Link>
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
                        <Col span={12}>
                            <Form.Item name={['user', 'email']} label="UserName" rules={[{ type: 'email' }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Email">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Password">
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item name={['user', 'website']} label="Confirm Password">
                                <Input />
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
export default NewUser;