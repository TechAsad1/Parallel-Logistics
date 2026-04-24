import { Input, Modal, Form, Row, Col } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerById, updateCustomer } from '../../redux/Action';
import Swal from 'sweetalert2';

function EditCustomer({ open, onClose, selectedCustomer }) {

    const dispatch = useDispatch();
    const singleCustomerArrs = useSelector((state) => state.singleCustomerArr);

    const [forms] = Form.useForm();

    useEffect(() => { dispatch(getCustomerById(selectedCustomer?.customerId)); }, [open, selectedCustomer]);

    useEffect(() => {
        forms.setFieldsValue({
            customerId: singleCustomerArrs?.customerId, customerName: singleCustomerArrs?.customerName, contact: singleCustomerArrs?.contact,
            email: singleCustomerArrs?.email, address: singleCustomerArrs?.address
        });
    }, [singleCustomerArrs]);

    const handleOk = async () => {
        try {
            const values = await forms.validateFields();
            const obj = {
                customerId: singleCustomerArrs?.customerId,
                createdBy: 0,
                createdDate: new Date().toISOString(),
                customerName: values.customerName,
                contact: values.contact,
                email: values.email,
                address: values.address,
                isActive: true
            };
            dispatch(updateCustomer(selectedCustomer?.customerId, obj, recordUpdatedMessage));
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
            title="Edit Customer"
            centered
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okText="Update"
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
                            <Input placeholder="Enter Contact.." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="Enter Email.." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="address" label="Address">
                            <Input placeholder="Enter Address.." />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
}

export default EditCustomer;