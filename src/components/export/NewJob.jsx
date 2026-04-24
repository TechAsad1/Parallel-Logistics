
import Swal from 'sweetalert2';
import { Button, Layout, theme, Select, Row, Col, DatePicker, Modal, Divider, Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCargo, getCustomer, getGrossWeight, getJobType, getLoadingTerm, getNetWeight, getNoOfContainer, getPortOfDischarge, getPortOfLoading, getShippingLine, getVessel, insertJob, maxIdJob } from '../../redux/Action';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { Navigate } from "react-router-dom";
import logo from '../images/logo.jpeg';
import { FaEye } from "react-icons/fa";
import SideBar from '../SideBar.jsx'

const { Content } = Layout;

function NewJob() {
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

    const user = localStorage.getItem("user");

    const [forms] = Form.useForm();


    const initialForm = {
        jobId: "",
        createdBy: 1,
        customerId: "",
        cargoDetail: "",
        jobType: "",
        customerName: "",
        portOfLoading: "",
        portOfDischarge: "",
        loadingTerm: "",
        vessel: "",
        cuttDate: new Date(),
        vesselDate: new Date(),
        polDate: new Date(),
        podDate: new Date(),
        grossWeight: "",
        netWeight: "",
        noOfContainer: "",
        shippingLine: "",
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
        dispatch(maxIdJob());
    }

    useEffect(() => {
        forms.setFieldsValue({
            Dates: dayjs(),
            CuttOfDate: dayjs(),
            CuttOfDateVessel: dayjs(),
            EtdPol: dayjs(),
            EtaPod: dayjs()
        });
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
    }, [forms, dispatch]);


    //CargoDetail
    useEffect(() => {
        setCargoOpt([]); // Reset
        setCargoOpt(() => [
            ...cargoDetailArrs.map((x) => ({
                value: x.cargoDetailDesc,
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

    //Max-Id
    useEffect(() => {
        setMaxId(maxIdState);
    }, [maxIdState]);


    //Options
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
    const [selectCustomer, setSelectCustomer] = useState(setCustomerOpt);

    const [form, setForm] = useState(initialForm);

    const [maxId, setMaxId] = useState("");
    const [insertJobArr, setInsertJobArr] = useState([]);

    //Select Func
    const setSelectCustomerFunc = (val, opt) => {
        if (!val || val.length === 0) {
            setSelectCustomer(null);
            setForm({ ...form, customerId: "", customerName: "" });
            return;
        }
        if (val.length > 1) return;
        if (!opt[0].value) {
            const name = val[0];
            setSelectCustomer([name]);
            setForm({
                ...form,
                customerId: "",
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

    //============= INSERT ============
    const insertFunc = (x) => {
        const jobDTO = {
            jobId: "0",
            createdBy: user,
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
        };
        dispatch(insertJob(jobDTO, loadStates, resetFormControls, recordInsertedMessage, setInsertJobArr));
    }

    const [isPDFBtnEnabled, setIsPDFBtnEnabled] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
        insertFunc(values);
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

    const resetFormControls = () => forms.resetFields();

    const recordInsertedMessage = () => {
        setIsPDFBtnEnabled(true);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Record Inserted Successfully",
            timer: 1500,
            showConfirmButton: false
        });
    };

    //PDF
    const printRef = React.useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`job-${insertJobArr.jobId}.pdf`);
    };
    const columns = [
        {
            title: "Cargo Description",
            dataIndex: "description",
        },
        {
            title: "Quantity",
            dataIndex: "qty",
            align: "right",
        },
    ];

    if (!user) return <Navigate to="/login" />;

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar />
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
                                        <Input readOnly value={maxId} />
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
                                    <Form.Item name="CargoDetail" label="Cargo Details" rules={[{ required: true }]}>
                                        <Select
                                            allowClear
                                            showSearch
                                            mode="tags"
                                            maxTagCount={1}
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
                                <Space>
                                    <Button type="primary" htmlType="submit">Insert</Button>
                                    <Button color="primary" variant="dashed" disabled={!isPDFBtnEnabled} onClick={() => setIsModalOpen(true)}> Preview PDF
                                        <FaEye />
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>

                    </div>
                </Content>
            </Layout>
            <Modal
                title="Job Invoice Preview"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={900}
                footer={[
                    <Button onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>,
                    <Button type="primary" onClick={handleDownloadPdf}>
                        Download PDF
                    </Button>,
                ]}
            >

                <div ref={printRef} style={{ padding: 20, background: "#fff", fontSize: 12 }}>

                    {/* HEADER */}
                    <div style={{ textAlign: "center", marginBottom: 10 }}>
                        <Row justify={'space-between'}>
                            <Col span={8}>
                                <img src={logo} alt="" width="100%" height="120" />
                            </Col>
                            <Col span={16} style={{ paddingTop: "20px" }}>
                                <h2 style={{ color: "#2d4b33" }}>PARALLEL LINE TRADING EST</h2>
                                <h5 style={{ color: "#2d4b33" }}>
                                    مؤسسة الخط المتوازي التجارية
                                </h5>
                            </Col>
                        </Row>
                    </div>
                    <Divider />

                    {/* Dates */}
                    <Row gutter={24} justify="space-between">
                        <Col span={15}>
                            <p style={{ margin: 0 }}><b>Invoice Date:</b> {dayjs(insertJobArr?.createdDate)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>SI Cutt Of Date:</b> {dayjs(insertJobArr?.cuttOfDate)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>EtdPol Date:</b> {dayjs(insertJobArr?.etdPol)?.format(dateFormat)}</p>
                        </Col>
                        <Col span={9}>
                            <p style={{ margin: 0 }}><b>Invoice No:</b> {insertJobArr.jobId}</p>
                            <p style={{ margin: 0 }}><b>Cutt Of Date Vessel:</b> {dayjs(insertJobArr?.cuttOfDateVessel)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>EtdPod Date:</b> {dayjs(insertJobArr?.etaPod)?.format(dateFormat)}</p>
                        </Col>
                    </Row>

                    {/* CUSTOMER */}
                    <Row gutter={24} style={{ marginTop: "10px" }}>
                        <Col span={15}>
                            <b>Customer</b>
                            <p>{insertJobArr?.customerName}</p>
                        </Col>

                        <Col span={9}>
                            <p style={{ margin: 0 }}>Job Type: {insertJobArr?.jobType}</p>
                            <p style={{ margin: 0 }}>Gross Weight: {insertJobArr?.grossWeight}</p>
                            <p style={{ margin: 0 }}>Net Weight: {insertJobArr?.netWeight}</p>
                            <p style={{ margin: 0 }}>No Of Container: {insertJobArr?.numberOfContainer}</p>
                            <p style={{ margin: 0 }}>Port Of Loading: {insertJobArr?.portOfLoading}</p>
                            <p style={{ margin: 0 }}>Port Of Discharge: {insertJobArr?.portOfDischarge}</p>
                            <p style={{ margin: 0 }}>Loading Term: {insertJobArr?.loadingTerm}</p>
                            <p style={{ margin: 0 }}>Shipping Line: {insertJobArr?.shippingLine}</p>
                            <p style={{ margin: 0 }}>Vessel: {insertJobArr?.vessel}</p>
                            <p style={{ margin: 0 }}>Transit Time Days: {insertJobArr?.transitTimeDays}</p>
                            <p style={{ margin: 0 }}>Free Days At Pod: {insertJobArr?.freeDaysAtPOD}</p>
                        </Col>
                    </Row>

                    <Divider />

                    {/* TABLE */}
                    <Table
                        columns={columns}
                        dataSource={[{
                            key: 1,
                            description: insertJobArr?.cargoDetail,
                            qty: 1,
                        }]}
                        pagination={false}
                        bordered
                    />

                    <Divider />
                    <center>
                        <h6 style={{ margin: 0 }}>Office #214B Advanced Business Center Khalid Bin Waleed Road Jeddah</h6>
                        <span>Jeddah 22234 Saudi Arabia</span><br />
                        <p style={{ margin: 0, marginTop: "-5px" }}>www.trade-parallel.com</p>
                    </center>

                </div>

            </Modal>
        </>
    )
}
export default NewJob;