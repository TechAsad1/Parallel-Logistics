
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Typography, Row, Col, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { formatDate } from '../Helper';
import { useDispatch, useSelector } from 'react-redux';
import { getCargo, getCustomer, getGrossWeight, getJobType, getLoadingTerm, getNetWeight, getNoOfContainer, getPortOfDischarge, getPortOfLoading, getShippingLine, getVessel, insertJob, maxIdJob } from '../../redux/Action';
// import { format } from "date-fns";

const { Content } = Layout;

const { Text } = Typography;

function JobAssign() {
    const dispatch = useDispatch();
    const cargoDetailArrs = useSelector((state) => state.cargoDetailArr);
    const customerArrs = useSelector((state) => state.customerArr);
    const grossWeightArrs = useSelector((state) => state.grossWeightArr);
    const jobTypeArrs = useSelector((state) => state.jobTypeArr);
    const loadingTermArrs = useSelector((state) => state.loadingTermArr);
    const netWeightArrs = useSelector((state) => state.netWeightArr);
    const noOfContainerArrs = useSelector((state) => state.noOfContainerArr);
    const portOfDischargeArrs = useSelector((state) => state.portOfDischargeArr);
    const portOfLoadingArrs = useSelector((state) => state.portOfLoadingArr);
    const shippingLineArrs = useSelector((state) => state.shippingLineArr);
    const vesselArrs = useSelector((state) => state.vesselArr);
    const maxIdState = useSelector((state) => state.maxId);

    const initialForm = {
        jobAssignId: 0,
        createdDate: new Date(),
        jobId: "",
        userId: 1,
        userName: "",
        isActive: true,
    };

    const loadStates = () => {
        dispatch(getCargo());
        dispatch(getCustomer());
        dispatch(getGrossWeight());
        dispatch(getNetWeight());
        dispatch(getNoOfContainer());
        dispatch(getPortOfLoading());
        dispatch(getPortOfDischarge());
        dispatch(getLoadingTerm());
        dispatch(getShippingLine());
        dispatch(getVessel());
        dispatch(getJobType());
        dispatch(maxIdJob());
    }

    useEffect(() => {
        loadStates();
    }, [dispatch]);


    //CargoDetail
    useEffect(() => {
        setCargoOpt([]); // Reset
        setCargoOpt(() => [
            ...cargoDetailArrs.map((x) => ({
                value: x.cargoId,
                label: x.cargoDetailDesc,
            }))
        ]);
    }, [cargoDetailArrs]);

    //Customer
    useEffect(() => {
        setCustomerOpt([]); // Reset
        setCustomerOpt(() => [
            ...customerArrs.map((x) => ({
                value: x.customerId,
                label: x.customerName,
            }))
        ]);
    }, [customerArrs]);

    //GrossWeight
    useEffect(() => {
        setGrossWeightOpt(() => [
            ...grossWeightArrs.map((x) => ({
                value: x.grossWeightDesc,
                label: x.grossWeightDesc,
            }))
        ]);
    }, [grossWeightArrs]);

    //JobType
    useEffect(() => {
        setJobTypeOpt([]); // Reset
        setJobTypeOpt(() => [
            ...jobTypeArrs.map((x) => ({
                value: x.jobTypeId,
                label: x.jobTypeDesc,
            }))
        ]);
    }, [jobTypeArrs]);

    //LoadingTerm
    useEffect(() => {
        setLoadingTermOpt(() => [
            ...loadingTermArrs.map((x) => ({
                value: x.loadingTermDesc,
                label: x.loadingTermDesc,
            }))
        ]);
    }, [loadingTermArrs]);

    //NetWeight
    useEffect(() => {
        setNetWeightOpt(() => [
            ...netWeightArrs.map((x) => ({
                value: x.netWeightDesc,
                label: x.netWeightDesc,
            }))
        ]);
    }, [netWeightArrs]);

    //NoOfContainer
    useEffect(() => {
        setNoOfContainerOpt(() => [
            ...noOfContainerArrs.map((x) => ({
                value: x.noOfContainerDesc,
                label: x.noOfContainerDesc,
            }))
        ]);
    }, [noOfContainerArrs]);

    //PortOfDischarge
    useEffect(() => {
        setPortOfDischargeOpt(() => [
            ...portOfDischargeArrs.map((x) => ({
                value: x.portOfDischargeDesc,
                label: x.portOfDischargeDesc,
            }))
        ]);
    }, [portOfDischargeArrs]);

    //PortOfLoading
    useEffect(() => {
        setPortOfLoadingOpt(() => [
            ...portOfLoadingArrs.map((x) => ({
                value: x.portOfLoadingDesc,
                label: x.portOfLoadingDesc,
            }))
        ]);
    }, [portOfLoadingArrs]);

    //ShippingLine
    useEffect(() => {
        setShippingLineOpt(() => [
            ...shippingLineArrs.map((x) => ({
                value: x.shippingLineDesc,
                label: x.shippingLineDesc,
            }))
        ]);
    }, [shippingLineArrs]);

    //Vessel
    useEffect(() => {
        setVesselOpt(() => [
            ...vesselArrs.map((x) => ({
                value: x.vesselDesc,
                label: x.vesselDesc,
            }))
        ]);
    }, [vesselArrs]);

    //Max-Id
    useEffect(() => {
        setMaxId(maxIdState);
    }, [maxIdState]);


    //Options
    const initialOpt = [{ value: "Choose Option", label: "Choose Option" }];
    const [cargoOpt, setCargoOpt] = useState();
    const [customerOpt, setCustomerOpt] = useState();
    const [grossWeightOpt, setGrossWeightOpt] = useState();
    const [jobTypeOpt, setJobTypeOpt] = useState();
    const [loadingTermOpt, setLoadingTermOpt] = useState();
    const [netWeightOpt, setNetWeightOpt] = useState();
    const [noOfContainerOpt, setNoOfContainerOpt] = useState();
    const [portOfDischargeOpt, setPortOfDischargeOpt] = useState();
    const [portOfLoadingOpt, setPortOfLoadingOpt] = useState();
    const [shippingLineOpt, setShippingLineOpt] = useState();
    const [vesselOpt, setVesselOpt] = useState();

    //Select State
    const [selectCargo, setSelectCargo] = useState(setCargoOpt);
    const [selectCustomer, setSelectCustomer] = useState(setCustomerOpt);
    const [selectGrossWeight, setSelectGrossWeight] = useState(setGrossWeightOpt);
    const [selectJobType, setSelectJobType] = useState(setJobTypeOpt);
    const [selectLoadingTerm, setSelectLoadingTerm] = useState(setLoadingTermOpt);
    const [selectNetWeight, setSelectNetWeight] = useState(setNetWeightOpt);
    const [selectNoOfContainer, setSelectNoOfContainer] = useState(setNoOfContainerOpt);
    const [selectPortOfDischarge, setSelectPortOfDischarge] = useState(setPortOfDischargeOpt);
    const [selectPortOfLoading, setSelectPortOfLoading] = useState(setPortOfLoadingOpt);
    const [selectShippingLine, setSelectShippingLine] = useState(setShippingLineOpt);
    const [selectVessel, setSelectVessel] = useState(setVesselOpt);

    const [form, setForm] = useState(initialForm);
    const resetForm = () => setForm(initialForm);

    const [maxId, setMaxId] = useState("");

    //Select Func
    const setSelectCargoFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectCargo(null);
            setForm({ ...form, cargoDetailId: 0, cargoDetailName: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectCargo([name]);
            setForm({
                ...form,
                cargoDetailId: 0,
                cargoDetailName: name
            });
        }
        else {
            setSelectCargo([opt[0].value]);
            setForm({
                ...form,
                cargoDetailId: opt[0].value,
                cargoDetailName: opt[0].label
            });
        }
    };
    const setSelectJobTypeFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectJobType(null);
            setForm({ ...form, jobTypeId: 0, jobType: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectJobType([name]);
            setForm({
                ...form,
                jobTypeId: 0,
                jobType: name
            });
        }
        else {
            setSelectJobType([opt[0].value]);
            setForm({
                ...form,
                jobTypeId: opt[0].value,
                jobType: opt[0].label
            });
        }
    }
    const setSelectCustomerFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectCustomer(null);
            setForm({ ...form, customerId: 0, customerName: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectCustomer([name]);
            setForm({
                ...form,
                customerId: 0,
                customerName: name
            });
        }
        else {
            setSelectCustomer([opt[0].value]);
            setForm({
                ...form,
                customerId: opt[0].value,
                customerName: opt[0].label
            });
        }
    }
    const setSelectGrossWeightFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectGrossWeight(null);
            setForm({ ...form, grossWeight: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectGrossWeight([name]);
            setForm({
                ...form,
                grossWeight: name
            });
        }
        else {
            setSelectGrossWeight([opt[0].value]);
            setForm({
                ...form,
                grossWeight: opt[0].label
            });
        }
    }
    const setSelectLoadingTermFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectLoadingTerm(null);
            setForm({ ...form, loadingTerm: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectLoadingTerm([name]);
            setForm({
                ...form,
                loadingTerm: name
            });
        }
        else {
            setSelectLoadingTerm([opt[0].value]);
            setForm({
                ...form,
                loadingTerm: opt[0].label
            });
        }
    }
    const setSelectNetWeightFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectNetWeight(null);
            setForm({ ...form, netWeight: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectNetWeight([name]);
            setForm({
                ...form,
                netWeight: name
            });
        }
        else {
            setSelectNetWeight([opt[0].value]);
            setForm({
                ...form,
                netWeight: opt[0].label
            });
        }
    }
    const setSelectNoOfContainerFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectNoOfContainer(null);
            setForm({ ...form, noOfContainer: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectNoOfContainer([name]);
            setForm({
                ...form,
                noOfContainer: name
            });
        }
        else {
            setSelectNoOfContainer([opt[0].value]);
            setForm({
                ...form,
                noOfContainer: opt[0].label
            });
        }
    }
    const setSelectPortOfDischargeFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectPortOfDischarge(null);
            setForm({ ...form, portOfDischarge: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectPortOfDischarge([name]);
            setForm({
                ...form,
                portOfDischarge: name
            });
        }
        else {
            setSelectPortOfDischarge([opt[0].value]);
            setForm({
                ...form,
                portOfDischarge: opt[0].label
            });
        }
    }
    const setSelectPortOfLoadingFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectPortOfLoading(null);
            setForm({ ...form, portOfLoading: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectPortOfLoading([name]);
            setForm({
                ...form,
                portOfLoading: name
            });
        }
        else {
            setSelectPortOfLoading([opt[0].value]);
            setForm({
                ...form,
                portOfLoading: opt[0].label
            });
        }
    }
    const setSelectShippingLineFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectShippingLine(null);
            setForm({ ...form, shippingLine: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectShippingLine([name]);
            setForm({
                ...form,
                shippingLine: name
            });
        }
        else {
            setSelectShippingLine([opt[0].value]);
            setForm({
                ...form,
                shippingLine: opt[0].label
            });
        }
    }
    const setSelectVesselFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectVessel(null);
            setForm({ ...form, vessel: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectVessel([name]);
            setForm({
                ...form,
                vessel: name
            });
        }
        else {
            setSelectVessel([opt[0].value]);
            setForm({
                ...form,
                vessel: opt[0].label
            });
        }
    }

    //============= INSERT ============
    const insertFunc = () => {
        const jobDTO = {
            jobAssignId: 0,
            createdDate: new Date(),
            jobId: "",
            userId: 1,
            userName: "",
            isActive: true,
        };
        dispatch(insertJobAssign(jobDTO, loadStates, resetFormControls));
    }

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
    const layout = {
        labelCol: { span: 16 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: `${label} is required!`,
        types: {
            email: `${label} is not a valid email!`,
            number: `${label} is not a valid number!`,
        },
        number: {
            range: `${label} must be between ${min} and ${max}`,
        },
    };

    const onFinish = (values: any) => {
        insertFunc();
        // alert("Submited!");
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const dateFormat = 'YYYY/MM/DD';

    const [forms] = Form.useForm();

    const resetFormControls = () => forms.resetFields();

    return (
        <Content style={{ margin: '0 16px' }}>

            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h5>Job Assign</h5>
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
                    form={forms}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Job No">
                                <Input readOnly value={maxId} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Date">
                                <DatePicker defaultValue={dayjs(formatDate(new Date()), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="SI Cutt Of Date">
                                <DatePicker defaultValue={dayjs(formatDate(form.cuttDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Cutt Of Date Vessel">
                                <DatePicker defaultValue={dayjs(formatDate(form.vesselDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Job Type']} label="Job Type" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    options={jobTypeOpt || []}
                                    value={selectJobType}
                                    onChange={setSelectJobTypeFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="ETD POL">
                                <DatePicker defaultValue={dayjs(formatDate(form.polDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="ETA-POD">
                                <DatePicker defaultValue={dayjs(formatDate(form.podDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Customer']} label="Customer" rules={[{ required: true }]}>
                                <Select
                                    allowClear
                                    mode="tags"
                                    maxTagCount={1}
                                    style={{ width: '100%' }}
                                    tokenSeparators={[',']}
                                    variant="underlined"
                                    placeholder="Type to find a customer..."
                                    options={customerOpt || []}
                                    value={selectCustomer}
                                    onChange={setSelectCustomerFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Cargo Details']} label="Cargo Details" rules={[{ required: true }]}>
                                <Select
                                    allowClear
                                    showSearch
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    options={cargoOpt || []}
                                    value={selectCargo}
                                    onChange={setSelectCargoFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Gross Weight']} label="Gross Weight">
                                <Select
                                    allowClear
                                    showSearch
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    options={grossWeightOpt || []}
                                    value={selectGrossWeight}
                                    onChange={setSelectGrossWeightFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Net Weight']} label="Net Weight">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={netWeightOpt || []}
                                    value={selectNetWeight}
                                    onChange={setSelectNetWeightFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'No Of Container']} label="No Of Container">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={noOfContainerOpt || []}
                                    value={selectNoOfContainer}
                                    onChange={setSelectNoOfContainerFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Port Of Loading']} label="Port Of Loading-POL">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={portOfLoadingOpt || []}
                                    value={selectPortOfLoading}
                                    onChange={setSelectPortOfLoadingFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Port Of Discharge']} label="Port Of Discharge-POD">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={portOfDischargeOpt || []}
                                    value={selectPortOfDischarge}
                                    onChange={setSelectPortOfDischargeFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Loading Term']} label="Loading Term">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={loadingTermOpt || []}
                                    value={selectLoadingTerm}
                                    onChange={setSelectLoadingTermFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Shipping Line']} label="Shipping Line">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={shippingLineOpt || []}
                                    value={selectShippingLine}
                                    onChange={setSelectShippingLineFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Vessel']} label="Vessel">
                                <Select
                                    mode="tags"
                                    maxTagCount={1}
                                    placeholder="Choose Option"
                                    showSearch={{ optionFilterProp: 'label' }}
                                    options={vesselOpt || []}
                                    value={selectVessel}
                                    onChange={setSelectVesselFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Transit Time-Days']} label="Transit Time-Days">
                                <Input value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name={['user', 'Free Days At POD']} label="Free Days At POD" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                <InputNumber value={form.freeDays} onChange={(e) => setForm({ ...form, freeDays: e })} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name={['user', 'Comments']} label="Comments">
                                <Input.TextArea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
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