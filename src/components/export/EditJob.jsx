
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Typography, Row, Col, DatePicker } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { formatDate } from '../Helper';
import { useDispatch, useSelector } from 'react-redux';
import { getCargo, getCustomer, getGrossWeight, getJobType, getLoadingTerm, getNetWeight, getNoOfContainer, getPortOfDischarge, getPortOfLoading, getShippingLine, getVessel, insertJob, jobById, maxIdJob, updateJob } from '../../redux/Action';
// import { format } from "date-fns";

const { Content } = Layout;

const { Text } = Typography;

function EditJob() {
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
    const jobArr = useSelector((state) => state.jobArr);
    const { id } = useParams();

    const [forms] = Form.useForm();

    const initialForm = {
        id: "",
        cuttDate: new Date(),
        vesselDate: new Date(),
        polDate: new Date(),
        podDate: new Date(),
        jobTypeId: 0,
        jobType: "",
        customerId: 0,
        customerName: "",
        cargoDetailId: 0,
        cargoDetailName: "",
        grossWeight: "",
        netWeight: "",
        noOfContainer: "",
        portOfLoading: "",
        portOfDischarge: "",
        loadingTerm: "",
        shippingLine: "",
        vessel: "",
        days: 0,
        freeDays: 0,
        comment: "",
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
    }

    useEffect(() => {
        loadStates();
    }, []);

    //CargoDetail
    useEffect(() => {
        setCargoOpt(() => [
            ...cargoDetailArrs.map((x) => ({
                value: x.cargoId,
                label: x.cargoDetailDesc,
            }))
        ]);
    }, [cargoDetailArrs]);

    //Customer
    useEffect(() => {
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

    //Job-Id
    useEffect(() => {
        setJobId(id);
        if (id)
            dispatch(jobById(id));
    }, [id]);

    //Options
    const [cargoOpt, setCargoOpt] = useState([]);
    const [customerOpt, setCustomerOpt] = useState([]);
    const [grossWeightOpt, setGrossWeightOpt] = useState([]);
    const [jobTypeOpt, setJobTypeOpt] = useState([]);
    const [loadingTermOpt, setLoadingTermOpt] = useState([]);
    const [netWeightOpt, setNetWeightOpt] = useState([]);
    const [noOfContainerOpt, setNoOfContainerOpt] = useState([]);
    const [portOfDischargeOpt, setPortOfDischargeOpt] = useState([]);
    const [portOfLoadingOpt, setPortOfLoadingOpt] = useState([]);
    const [shippingLineOpt, setShippingLineOpt] = useState([]);
    const [vesselOpt, setVesselOpt] = useState([]);

    //Select State
    const [selectCargo, setSelectCargo] = useState([]);
    const [selectCustomer, setSelectCustomer] = useState([]);
    const [selectGrossWeight, setSelectGrossWeight] = useState([]);
    const [selectJobType, setSelectJobType] = useState([]);
    const [selectLoadingTerm, setSelectLoadingTerm] = useState([]);
    const [selectNetWeight, setSelectNetWeight] = useState([]);
    const [selectNoOfContainer, setSelectNoOfContainer] = useState([]);
    const [selectPortOfDischarge, setSelectPortOfDischarge] = useState([]);
    const [selectPortOfLoading, setSelectPortOfLoading] = useState([]);
    const [selectShippingLine, setSelectShippingLine] = useState([]);
    const [selectVessel, setSelectVessel] = useState([]);

    const [form, setForm] = useState(initialForm);
    const resetForm = () => setForm(initialForm);

    const [jobId, setJobId] = useState("");

    //Select Func
    const setSelectCargoFunc = (val, opt) => {
        if (!val || val?.length === 0) {
            setSelectCargo([]);
            setForm({ ...form, cargoDetailId: 0, cargoDetailName: "" });
            return;
        }
        if (!opt[0].value) {
            const name = val[0];
            setSelectCargo([name]);
            setForm({ ...form, cargoDetailId: 0, cargoDetailName: name });
        }
        else {
            setSelectCargo([opt[0].value]);
            setForm({ ...form, cargoDetailId: opt[0].value, cargoDetailName: opt[0].label });
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

    //Fetch Data
    useEffect(() => {
        if (jobArr) {
            let job = [];
            let cargo = [];
            let customer = [];
            console.log(jobArr);
            if (jobArr.jobTypeId > 0)
                job = jobTypeArrs.find((i) => i.jobTypeId === jobArr.jobTypeId);
            if (jobArr.cargoDetailId > 0)
                cargo = cargoDetailArrs.find((i) => i.cargoId === jobArr.cargoDetailId);
            if (jobArr.customerId > 0)
                customer = customerArrs.find((i) => i.customerId === jobArr.customerId);

            if (jobTypeOpt) {
                const opt = jobTypeOpt.find((i) => i.label === job.jobTypeDesc);
                setSelectJobType(opt);
                forms.setFieldsValue({
                    JobType: [opt]
                });
            }

            if (customerOpt) {
                const opt = customerOpt.find((i) => i.value === customer.customerId);
                setSelectCustomer(opt);
                forms.setFieldsValue({
                    Customer: [opt]
                });
            }

            if (cargoOpt) {
                const opt = cargoOpt.find((i) => i.label === cargo.cargoDetailDesc);
                setSelectCargo(opt);
                forms.setFieldsValue({
                    CargoDetail: [opt]
                });
            }

            forms.setFieldsValue({
                Comments: jobArr.comment,
                GrossWeight: jobArr.grossWeight,
                LoadingTerm: jobArr.loadingTerm,
                NetWeight: jobArr.netWeight,
                NoOfContainer: jobArr.numberOfContainer,
                PortOfDischarge: jobArr.portOfDischarge,
                PortOfLoading: jobArr.portOfLoading,
                ShippingLine: jobArr.shippingLine,
                TransitTimeDays: jobArr.transitTimeDays,
                Vessel: jobArr.vessel,
                FreeDaysAtPod: jobArr.freeDaysAtPod,
                EtaPod: jobArr?.etaPod ? dayjs(jobArr.etaPod) : null,
                EtdPol: jobArr?.etdPol ? dayjs(jobArr.etdPol) : null,
                CuttOfDate: jobArr?.cuttOfDate ? dayjs(jobArr.cuttOfDate) : null,
                CuttOfDateVessel: jobArr?.cuttOfDateVessel ? dayjs(jobArr.cuttOfDateVessel) : null,
                Dates: jobArr?.date ? dayjs(jobArr.date) : null,
            });

            setForm({
                ...form,
                cargoDetailId: jobArr.cargoDetailId,
                cargoDetailName: cargo.cargoDetailDesc,
                cuttDate: form.cuttDate,
                vesselDate: form.vesselDate,
                polDate: form.polDate,
                podDate: form.podDate,
                date: new Date(),
                jobTypeId: jobArr.jobTypeId,
                jobType: job.jobTypeDesc,
                customerId: customer.customerId,
                customerName: customer.customerName,
                grossWeight: jobArr.grossWeight,
                netWeight: jobArr.netWeight,
                noOfContainer: jobArr.numberOfContainer,
                portOfLoading: jobArr.portOfLoading,
                portOfDischarge: jobArr.portOfDischarge,
                loadingTerm: jobArr.loadingTerm,
                shippingLine: jobArr.shippingLine,
                vessel: jobArr.vessel,
                days: jobArr.transitTimeDays,
                freeDays: jobArr.freeDaysAtPod,
                comment: jobArr.comment
            });
        }
    }, [jobArr]);

    //============= INSERT ============
    const updateFunc = () => {
        const jobDTO = {
            id: "0",
            userId: "0",
            cargoDetailId: form.cargoDetailId,
            cargoDetailName: form.cargoDetailName,
            portOfLoading: form.portOfLoading,
            portOfDischarge: form.portOfDischarge,
            loadingTerm: form.loadingTerm,
            vessel: form.vessel,
            date: new Date().toISOString(),
            cuttOfDate: form.cuttDate.toISOString(),
            cuttOfDateVessel: form.vesselDate.toISOString(),
            etaPod: form.podDate.toISOString(),
            etdPol: form.polDate.toISOString(),
            jobTypeId: form.jobTypeId,
            jobType: form.jobType,
            grossWeight: form.grossWeight,
            netWeight: form.netWeight,
            numberOfContainer: form.noOfContainer,
            shippingLine: form.shippingLine,
            transitTimeDays: form.days,
            freeDaysAtPod: form.freeDays,
            comment: form.comment,
            customerId: form.customerId,
            customerName: form.customerName,
        };
        dispatch(updateJob(id, jobDTO, loadStates));
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
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => updateFunc();

    const handleChange = value => {
        console.log(`selected ${value}`);
    };

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

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
                    form={forms}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Job No">
                                <Input readOnly value={jobId} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="Dates" label="Date">
                                <DatePicker defaultValue={dayjs(formatDate(new Date()), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="CuttOfDate" label="SI Cutt Of Date">
                                <DatePicker defaultValue={dayjs(formatDate(form.cuttDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="CuttOfDateVessel" label="Cutt Of Date Vessel">
                                <DatePicker defaultValue={dayjs(formatDate(form.vesselDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="JobType" label="Job Type" rules={[{ required: true }]}>
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
                            <Form.Item name="EtdPol" label="ETD POL">
                                <DatePicker defaultValue={dayjs(formatDate(form.polDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="EtaPod" label="ETA-POD">
                                <DatePicker defaultValue={dayjs(formatDate(form.podDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="Customer" label="Customer" rules={[{ required: true }]}>
                                <Select
                                    labelInValue
                                    allowClear
                                    mode="tags"
                                    maxCount={1}
                                    maxTagCount={1}
                                    style={{ width: '100%' }}
                                    variant="underlined"
                                    placeholder="Type to find a customer..."
                                    options={customerOpt || []}
                                    value={selectCustomer}
                                    onChange={setSelectCustomerFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="CargoDetail" label="Cargo Details" rules={[{ required: true }]}>
                                <Select
                                    labelInValue
                                    allowClear
                                    showSearch
                                    mode="tags"
                                    maxTagCount={1}
                                    maxCount={1}
                                    placeholder="Choose Option"
                                    options={cargoOpt || []}
                                    value={selectCargo}
                                    onChange={setSelectCargoFunc}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="GrossWeight" label="Gross Weight">
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
                            <Form.Item name="NetWeight" label="Net Weight">
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
                            <Form.Item name="NoOfContainer" label="No Of Container">
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
                            <Form.Item name="PortOfLoading" label="Port Of Loading-POL">
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
                            <Form.Item name="PortOfDischarge" label="Port Of Discharge-POD">
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
                            <Form.Item name="LoadingTerm" label="Loading Term">
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
                            <Form.Item name="ShippingLine" label="Shipping Line">
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
                            <Form.Item name="Vessel" label="Vessel">
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
                            <Form.Item name="TransitTimeDays" label="Transit Time-Days">
                                <Input value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="FreeDaysAtPod" label="Free Days At POD" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                <InputNumber value={form.freeDays} onChange={(e) => setForm({ ...form, freeDays: e })} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="Comments" label="Comments">
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
export default EditJob;