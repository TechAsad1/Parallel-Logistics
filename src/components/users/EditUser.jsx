import { Input, Modal, Form, Row, Col, Checkbox } from "antd";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUser } from '../../redux/Action';
import Swal from 'sweetalert2';


function EditUser({ open, onClose, selectedUser }) {

    const dispatch = useDispatch();
    const singleUserArrs = useSelector((state) => state.singleUserArr);

    const [forms] = Form.useForm();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => { dispatch(getUserById(selectedUser?.userId)); }, [open, selectedUser]);

    useEffect(() => {
        forms.setFieldsValue({
            userId: singleUserArrs?.userId, userName: singleUserArrs?.userName, designation: singleUserArrs?.designation, password: singleUserArrs?.password, isAdmin: singleUserArrs?.isAdmin
        });
        setShowPassword(false);
    }, [singleUserArrs]);

    const handleOk = async () => {
        try {
            const values = await forms.validateFields();
            const obj = {
                userId: selectedUser?.userId,
                createdBy: 0,
                createdDate: new Date().toISOString(),
                userName: values.userName,
                designation: values.designation,
                password: values.password,
                isAdmin: values.isAdmin,
                isActive: true
            };
            dispatch(updateUser(selectedUser?.userId, obj, recordUpdatedMessage));
        }
        catch (err) {
            console.log(err);
        }
    };

    const recordUpdatedMessage = () => {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Record Updated Successfully",
            timer: 1500,
            showConfirmButton: false
        });
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    return (
        <Modal
            title="Edit User"
            centered
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okText="Update"
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
                                <Form.Item name="isAdmin" label="IsAdmin" valuePropName="checked">
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
                                value={selectedUser.password}
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

export default EditUser;