import { Input, Button, Modal, Form, Row, Col } from "antd";
import {
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateCargo } from '../../../redux/Action';
import Swal from 'sweetalert2';


function EditCargoItem({ open, onClose, selectedRow }) {

    const dispatch = useDispatch();
    const [forms] = Form.useForm();

    useEffect(() => {
        forms.setFieldsValue({
            CargoDetail: selectedRow?.cargoDetailDesc
        });
    }, [open, selectedRow]);

    const handleOk = async () => {
        try {
            const values = await forms.validateFields();
            const obj = {
                createdDate: new Date(),
                createdBy: 1,
                cargoDetailDesc: values?.CargoDetail,
                isActive: true
            };
            dispatch(updateCargo(selectedRow?.cargoDetailDesc, obj, recordUpdatedMessage));
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
            title="Edit Cargo Detail"
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
                        <Form.Item name="CargoDetail" label="Cargo Detail" rules={[{ required: true }]}>
                            <Input placeholder="Enter Cargo Detail.." />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default EditCargoItem;