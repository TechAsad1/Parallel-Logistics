import { Input, Modal, Form, Row, Col } from "antd";
import { useDispatch } from 'react-redux';
import { insertCustomer } from '../../redux/Action';
import Swal from 'sweetalert2';

function AddCustomer({ open, onClose }) {

    const dispatch = useDispatch();
    const [forms] = Form.useForm();
    const user = localStorage.getItem("user");

    const handleOk = async () => {
        try {
            const values = await forms.validateFields();
            const obj = {
                customerId: "",
                createdBy: user,
                createdDate: new Date().toISOString(),
                customerName: values.customerName,
                contact: values.contact,
                email: values.email,
                address: values.address,
                isActive: true
            };
            dispatch(insertCustomer(obj, recordInsertMessage, onClose));
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
        required: `${label} is required!`,
    };

    return (
        <Modal
            title="Add Customer"
            centered
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okText="Insert"
            cancelText="Close"
        >
            <Form layout="vertical" form={forms} validateMessages={validateMessages}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="customerName" label="Customer Name" rules={[{ required: true }]}>
                            <Input placeholder="Enter Customer Name.." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="contact" label="Contact">
                            <Input placeholder="Enter contact.." />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="Enter email.." />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="address" label="Address">
                            <Input placeholder="Enter address.." />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
}

export default AddCustomer;