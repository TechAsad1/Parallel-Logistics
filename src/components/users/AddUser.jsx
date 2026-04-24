import { Input, Button, Modal, Form, Row, Col, Select, Checkbox } from "antd";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { insertUser } from '../../redux/Action';
import Swal from 'sweetalert2';

function AddUser({ open, onClose }) {

    const dispatch = useDispatch();

    const [forms] = Form.useForm();
    const [showPassword, setShowPassword] = useState(false);
    const user = localStorage.getItem("user");

    const handleOk = async () => {
        try {
            const values = await forms.validateFields();
            const obj = {
                userId: 0,
                createdBy: user,
                createdDate: new Date().toISOString(),
                userName: values.userName,
                designation: values.designation,
                password: values.password,
                isAdmin: values.isAdmin,
                isActive: true
            };
            dispatch(insertUser(obj, recordInsertMessage, onClose));
        }
        catch (err) {
            console.log(err);
        }
    };

    const recordInsertMessage = () => {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Record Inserted Successfully",
            timer: 1500,
            showConfirmButton: false
        });
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    return (
        <Modal
            title="Add User"
            centered
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okText="Insert"
        >
            <Form layout="vertical" form={forms} validateMessages={validateMessages}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="userName" label="User Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter Username.." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Row justify="space-between" align="middle">
                            <Col span={20}>
                                <Form.Item name="designation" label="Designation">
                                    <Input placeholder="Enter Designation.." />
                                </Form.Item>
                            </Col>
                            <Col span={4} style={{ textAlign: 'center', paddingLeft: '15px' }}>
                                <Form.Item name="isAdmin" label="IsAdmin">
                                    <Checkbox />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                            <Input
                                key={showPassword}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password.."
                                suffix={
                                    showPassword ? (
                                        <EyeInvisibleOutlined
                                            onClick={() => setShowPassword(false)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ) : (
                                        <EyeOutlined
                                            onClick={() => setShowPassword(true)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default AddUser;