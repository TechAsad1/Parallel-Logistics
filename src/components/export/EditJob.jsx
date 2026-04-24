
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Typography, Row, Col, DatePicker } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { formatDate } from '../Helper';
import { useDispatch, useSelector } from 'react-redux';
import { getCargo, getCustomer, getGrossWeight, getJobType, getLoadingTerm, getNetWeight, getNoOfContainer, getPortOfDischarge, getPortOfLoading, getShippingLine, getVessel, insertJob, jobById, maxIdJob, updateJob } from '../../redux/Action';
import { Navigate } from "react-router-dom";
import SideBar from '../SideBar.jsx'

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
    const singleJobArrs = useSelector((state) => state.singleJobArr);
    const { id } = useParams();

    const [forms] = Form.useForm();

    const initialForm = {
        jobId: "",
        cuttOfDate: new Date(),
        cuttOfDateVessel: new Date(),
        etdPol: new Date(),
        etaPod: new Date(),
        jobType: "",
        customerId: 0,
        customerName: "",
        cargoDetail: "",
        grossWeight: "",
        netWeight: "",
        numberOfContainer: "",
        portOfLoading: "",
        portOfDischarge: "",
        loadingTerm: "",
        shippingLine: "",
        vessel: "",
        transitTimeDays: 0,
        freeDaysAtPod: 0,
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
                value: x.cargoDetailDesc,
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
                value: x.jobTypeDesc,
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
    const [selectCustomer, setSelectCustomer] = useState([]);

    const [form, setForm] = useState(initialForm);

    const [jobId, setJobId] = useState("");

    //Select Func
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

    //Fetch Data
    useEffect(() => {
        if (singleJobArrs) {
            let customer = [];
            if (singleJobArrs.customerId)
                customer = customerArrs.find((i) => i.customerId === singleJobArrs.customerId);

            if (customerOpt) {
                const opt = customerOpt.find((i) => i.value === customer.customerId);
                setSelectCustomer(opt);
                forms.setFieldsValue({
                    Customer: opt?.label
                });

                setForm({
                    ...form,
                    customerId: singleJobArrs.customerId,
                    customerName: opt?.label
                });
            }

            forms.setFieldsValue({
                JobType: singleJobArrs.jobType ? [singleJobArrs.jobType] : undefined,
                CargoDetail: singleJobArrs.cargoDetail ? [singleJobArrs.cargoDetail] : undefined,
                Comments: singleJobArrs.comment ? [singleJobArrs.comment] : undefined,
                GrossWeight: singleJobArrs.grossWeight ? [singleJobArrs.grossWeight] : undefined,
                LoadingTerm: singleJobArrs.loadingTerm ? [singleJobArrs.loadingTerm] : undefined,
                NetWeight: singleJobArrs.netWeight ? [singleJobArrs.netWeight] : undefined,
                NoOfContainer: singleJobArrs.numberOfContainer ? [singleJobArrs.numberOfContainer] : undefined,
                PortOfDischarge: singleJobArrs.portOfDischarge ? [singleJobArrs.portOfDischarge] : undefined,
                PortOfLoading: singleJobArrs.portOfLoading ? [singleJobArrs.portOfLoading] : undefined,
                ShippingLine: singleJobArrs.shippingLine ? [singleJobArrs.shippingLine] : undefined,
                Vessel: singleJobArrs.vessel ? [singleJobArrs.vessel] : undefined,

                TransitTimeDays: singleJobArrs.transitTimeDays ? singleJobArrs.transitTimeDays : undefined,
                FreeDaysAtPod: singleJobArrs.freeDaysAtPod ? singleJobArrs.freeDaysAtPod : undefined,

                EtaPod: singleJobArrs?.etaPod ? dayjs(singleJobArrs?.etaPod) : dayjs(new Date().toISOString()),
                EtdPol: singleJobArrs?.etdPol ? dayjs(singleJobArrs?.etdPol) : dayjs(new Date().toISOString()),
                CuttOfDate: singleJobArrs?.cuttOfDate ? dayjs(singleJobArrs?.cuttOfDate) : dayjs(new Date().toISOString()),
                CuttOfDateVessel: singleJobArrs?.cuttOfDateVessel ? dayjs(singleJobArrs?.cuttOfDateVessel) : dayjs(new Date().toISOString()),
                Dates: singleJobArrs?.createdDate ? dayjs(singleJobArrs?.createdDate) : dayjs(new Date().toISOString()),
            });
        }
    }, [singleJobArrs]);

    //============= Update ============
    const updateFunc = (x) => {
        const jobDTO = {
            jobId: "0",
            createdBy: 1,
            cargoDetail: x.CargoDetail?.[0] ?? "",
            portOfLoading: x.PortOfLoading?.[0] ?? "",
            portOfDischarge: x.PortOfDischarge?.[0] ?? "",
            loadingTerm: x.LoadingTerm?.[0] ?? "",
            vessel: x.Vessel?.[0] ?? "",
            date: x.Dates ? x.Dates.toISOString() : new Date().toISOString(),
            cuttOfDate: x.CuttOfDate ? x.CuttOfDate.toISOString() : new Date().toISOString(),
            cuttOfDateVessel: x.CuttOfDateVessel ? x.CuttOfDateVessel.toISOString() : new Date().toISOString(),
            etaPod: x.EtaPod ? x.EtaPod.toISOString() : new Date().toISOString(),
            etdPol: x.EtdPol ? x.EtdPol.toISOString() : new Date().toISOString(),
            jobType: x.JobType?.[0] ?? "",
            grossWeight: x.GrossWeight?.[0] ?? "",
            netWeight: x.NetWeight?.[0] ?? "",
            numberOfContainer: x.NoOfContainer?.[0] ?? "",
            shippingLine: x.ShippingLine?.[0] ?? "",
            transitTimeDays: x.TransitTimeDays ?? 0,
            freeDaysAtPod: x.FreeDaysAtPod ?? 0,
            comment: x.Comments ?? "",
            customerId: form.customerId,
            customerName: form.customerName ?? "",
            status: "",
            isActive: true
        };
        dispatch(updateJob(id, jobDTO, loadStates, recordUpdatedMessage));
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values: any) => {
        updateFunc(values);
    }

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const dateFormat = 'YYYY/MM/DD';
    const user = localStorage.getItem("user");
    if (!user) return <Navigate to="/login" />;


    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar />
                <Content style={{ margin: '0 16px' }}>

                    <div className="header d-flex justify-content-between align-items-center">
                        <div>
                            <h5>Update Job</h5>
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
                                        <DatePicker format={dateFormat} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item name="CuttOfDate" label="SI Cutt Of Date">
                                        <DatePicker format={dateFormat} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item name="CuttOfDateVessel" label="Cutt Of Date Vessel">
                                        <DatePicker format={dateFormat} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="JobType" label="Job Type" rules={[{ required: true }]}>
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            options={jobTypeOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item name="EtdPol" label="ETD POL">
                                        <DatePicker format={dateFormat} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>

                                <Col span={6}>
                                    <Form.Item name="EtaPod" label="ETA-POD">
                                        <DatePicker format={dateFormat} style={{ width: "100%" }} />
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
                                            onChange={setSelectCustomerFunc}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="CargoDetail" label="Cargo Details" rules={[{ required: true }]}>
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            maxCount={1}
                                            placeholder="Choose Option"
                                            options={cargoOpt || []}
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
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="NetWeight" label="Net Weight">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={netWeightOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="NoOfContainer" label="No Of Container">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={noOfContainerOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="PortOfLoading" label="Port Of Loading-POL">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={portOfLoadingOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="PortOfDischarge" label="Port Of Discharge-POD">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={portOfDischargeOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="LoadingTerm" label="Loading Term">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={loadingTermOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="ShippingLine" label="Shipping Line">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={shippingLineOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="Vessel" label="Vessel">
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
                                            placeholder="Choose Option"
                                            showSearch={{ optionFilterProp: 'label' }}
                                            options={vesselOpt || []}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="TransitTimeDays" label="Transit Time-Days">
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="FreeDaysAtPod" label="Free Days At POD" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                        <InputNumber style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item name="Comments" label="Comments">
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>

                            </Row>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Update</Button>
                            </Form.Item>
                        </Form>

                    </div>
                </Content>
            </Layout>
        </>
    )
}
export default EditJob;