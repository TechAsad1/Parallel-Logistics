
import Swal from 'sweetalert2';
import { Button, Table, Layout, theme, Select, Checkbox, Typography, Row, Col, Modal, Form, DatePicker, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Search from 'antd/es/transfer/search';
import {
    DeleteFilled,
    EditFilled,
    EyeFilled
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getJobByUserId, getJob, deleteJob, getUser, existsJobAssign, updateJobCheckStatus } from '../../redux/Action';
import { formatDateString } from '../Helper';
import dayjs from 'dayjs';
import { formatDate } from '../Helper';
import { MdSupportAgent } from "react-icons/md";
import { Navigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import logo from '../images/logo.jpeg';
import SideBar from '../SideBar.jsx'

const { Content } = Layout;

const { Text } = Typography;

function Jobs() {

    const dispatch = useDispatch();
    const jobArrs = useSelector((state) => state.jobArr);
    const userArrs = useSelector((state) => state.userArr);
    const user = localStorage.getItem("user");
    const isAdmin = localStorage.getItem("isAdmin");
    const [rawData, setRawData] = useState([]);

    const [selectedJob, setSelectedJob] = useState([]);
    const dateFormat = 'YYYY/MM/DD';

    function setOpenModalFunc(job) {
        setModalOpen(true);
        setSelectedJob(job);
    }

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (isAdmin === 'true')
            dispatch(getJob());
        else
            dispatch(getJobByUserId(user));
    }, [user, isAdmin, dispatch]);

    useEffect(() => {
        setRawData(jobArrs);
    }, [jobArrs]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const showConfirmationAlert = (id) => {
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
                dispatch(deleteJob(id));
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
    const columns = [
        {
            title: "Date",
            dataIndex: "createdDate",
            render: (x) => (<span>{formatDateString(x)}</span>),
            sorter: (a, b) => a.createdDate.length - b.createdDate.length,
        },
        {
            title: "CustomerName",
            dataIndex: "customerName",
            sorter: (a, b) => a.customerName.length - b.customerName.length,
        },
        {
            title: "JobType",
            dataIndex: "jobType",
            sorter: (a, b) => a.jobType.length - b.jobType.length,
        },
        {
            title: "CargoDetail",
            dataIndex: "cargoDetail",
            // render: (x) => {
            //     const r = cargoDetailArrs.find(i => i.cargoId === x);
            //     return r ? r.cargoDetailDesc : "";
            // },
            sorter: (a, b) => a.cargoDetail.length - b.cargoDetail.length,
        },
        {
            title: "UserName",
            dataIndex: "userName",
            sorter: (a, b) => a.userName.length - b.userName.length,
        },
        {
            title: "Filling",
            dataIndex: "filling",
            render: (_, record) => {
                return <Checkbox
                    checked={record.filling === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("filling", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.filling?.localeCompare(b.filling),
        },
        {
            title: "Invoice",
            dataIndex: "invoice",
            render: (_, record) => {
                return <Checkbox
                    checked={record.invoice === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("invoice", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.invoice.length - b.invoice.length,
        },
        {
            title: "DocumentCheck",
            dataIndex: "documentCheck",
            render: (_, record) => {
                return <Checkbox
                    checked={record.documentCheck === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("documentCheck", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.documentCheck.length - b.documentCheck.length,
        },
        {
            title: "EDI",
            dataIndex: "edi",
            render: (_, record) => {
                return <Checkbox
                    checked={record.edi === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("eDI", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.edi.length - b.edi.length,
        },
        {
            title: "CustomGD",
            dataIndex: "customGD",
            render: (_, record) => {
                return <Checkbox
                    checked={record.customGD === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("customGD", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.customGD.length - b.customGD.length,
        },
        {
            title: "TestoAppointment",
            dataIndex: "testoAppointment",
            render: (_, record) => {
                return <Checkbox
                    checked={record.testoAppointment === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("testoAppointment", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.testoAppointment.length - b.testoAppointment.length,
        },
        {
            title: "CargoEntryConfirmation",
            dataIndex: "cargoEntryConfirmation",
            render: (_, record) => {
                return <Checkbox
                    checked={record.cargoEntryConfirmation === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("cargoEntryConfirmation", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.cargoEntryConfirmation.length - b.cargoEntryConfirmation.length,
        },
        {
            title: "ScanningInspection",
            dataIndex: "scanningInspection",
            render: (_, record) => {
                return <Checkbox
                    checked={record.scanningInspection === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("scanningInspection", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.scanningInspection.length - b.scanningInspection.length,
        },
        {
            title: "CustomPayment",
            dataIndex: "customPayment",
            render: (_, record) => {
                return <Checkbox
                    checked={record.customPayment === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("customPayment", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.customPayment.length - b.customPayment.length,
        },
        {
            title: "FinalClearance",
            dataIndex: "finalClearance",
            render: (_, record) => {
                return <Checkbox
                    checked={record.finalClearance === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("finalClearance", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.finalClearance.length - b.finalClearance.length,
        },
        {
            title: "LoadPermit",
            dataIndex: "loadPermit",
            render: (_, record) => {
                return <Checkbox
                    checked={record.loadPermit === true}
                    onChange={(e) =>
                        dispatch(updateJobCheckStatus("loadPermit", record, e.target.checked, updateStatusMessage))
                    }
                />
            },
            sorter: (a, b) => a.loadPermit.length - b.loadPermit.length,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            fixed: "right",
            width: 220,
            render: (_, record) => (
                <div className="action-table-data">
                    <div className="edit-delete-action">
                        <Link className="me-2 p-2" to={`/jobDetail/${record.jobId}`}>
                            <EyeFilled style={{ color: "#444" }} />
                        </Link>
                        <Link className="me-2 p-2" to={`/editJob/${record.jobId}`}>
                            <EditFilled style={{ color: "#444" }} />
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <DeleteFilled onClick={(e) => showConfirmationAlert(record.jobId)} style={{ color: "#444" }} />
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <MdSupportAgent onClick={() => setOpenModalFunc(record)} style={{ fontSize: 17, color: "#444" }} />
                        </Link>
                        <Link className="confirm-text p-2" to="#">
                            <FaFilePdf onClick={() => openPDFModalFunc(record)} style={{ fontSize: 17, color: "#444" }} />
                        </Link>
                    </div>
                </div>
            ),
        },
    ];

    const openPDFModalFunc = (x) => {
        setSelectedJob(x);
        setIsModalOpen(true);
    }

    const updateStatusMessage = () => {
        Swal.fire({
            icon: "success",
            title: "Status Updated",
            text: "Your changes have been saved",
            timer: 1500,
            showConfirmButton: false
        });
    };

    //JobAssign
    //Users
    useEffect(() => {
        setUserOpt([]); // Reset
        setUserOpt(() => [
            ...userArrs.map((x) => ({
                value: x.userId,
                label: x.userName,
            }))
        ]);
    }, [userArrs]);

    const [modalOpen, setModalOpen] = useState(false);

    const handleOk = () => {
        showConfirmationAlertForAssignJob();
    }

    const showConfirmationAlertForAssignJob = () => {
        Swal.fire({
            text: "Are you sure you want to update this record ?",
            // text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#00ff00",
            confirmButtonText: "Yes, update it!",
            cancelButtonColor: "#ff0000",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const dto = {
                    jobAssignId: selectedJob.jobAssignId,
                    jobId: selectedJob.jobId,
                    userId: selectUser.value,
                    createdBy: user,
                    createdDate: new Date(),
                    userName: selectUser.label,
                    isActive: true
                }
                dispatch(existsJobAssign(selectedJob.jobAssignId, dto));
                Swal.fire({
                    title: "Success",
                    text: "Job assign successfully",
                    className: "btn btn-success",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            } else {
                Swal.close();
            }
        });
    };

    const [forms] = Form.useForm();

    const [userOpt, setUserOpt] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const setSelectUserFunc = (val) => {
        if (!val) {
            setSelectUser(null);
            return;
        }
        const usr = userOpt.find(x => x.value === val);
        setSelectUser(usr);
    }

    useEffect(() => {
        if (selectedJob?.jobAssignId > 0) {
            const usr = userOpt.find(x => x.value === selectedJob?.userId);
            setSelectUser(usr);
            forms.setFieldsValue({
                User: [usr]
            });
        }
    }, [forms, userOpt, selectedJob, modalOpen]);


    //PDF
    const printRef = useRef(null);

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
        pdf.save(`job-${selectedJob.jobId}.pdf`);
    };

    const columnsPDF = [
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
                            <h5>Jobs</h5>
                            <Text type="secondary">Manage your records</Text>
                        </div>
                        <Link to="/AddJob"><Button type="primary">Add New Job</Button></Link>
                    </div>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className="searchArea row">
                            <div className="col-lg-3">
                                <Search placeholder="input search text" style={{ width: 200 }} />
                            </div>
                            <div className="col-lg-9 d-flex justify-content-end">
                                <Select
                                    classnameprefix="react-select"
                                    options={oldandlatestvalue}
                                    placeholder="Newest"
                                // onChange={(e) => searchEngine(e.value, "")}
                                />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table columns={columns}
                                dataSource={Array.isArray(rawData) ? rawData : []}
                                rowKey="id"
                                scroll={{ x: 'max-content' }}
                            />
                        </div>
                    </div>
                </Content>
            </Layout>

            <Modal
                title="Job Assign"
                centered
                open={modalOpen}
                onOk={() => handleOk(false)}
                onCancel={() => setModalOpen(false)}
                okText="Update"
                cancelText="Close"
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >

                <Form
                    name="nest-messages"
                    // onFinish={onFinish}
                    // validateMessages={validateMessages}
                    layout="vertical"
                    form={forms}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Job No">
                                <Input readOnly value={selectedJob?.jobId} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item label="Date">
                                <DatePicker defaultValue={dayjs(formatDate(selectedJob?.createdDate), dateFormat)} format={dateFormat} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Job Type">
                                <Input readOnly value={selectedJob?.jobTypeDesc} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Customer">
                                <Input readOnly value={selectedJob?.customerName} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Cargo Details">
                                <Input readOnly value={selectedJob?.cargoDetailDesc} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="User" label="UserName">
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: '100%' }}
                                    variant="underlined"
                                    placeholder="Type to find a user..."
                                    options={userOpt || []}
                                    value={selectUser}
                                    onChange={setSelectUserFunc}
                                    optionFilterProp="label"
                                    filterOption={(input, option) =>
                                        option?.label?.toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal>

            <Modal
                title="Job Invoice Preview"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={900}
                footer={[
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>,
                    <Button type="primary" onClick={handleDownloadPdf}>Download PDF</Button>,
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
                            <p style={{ margin: 0 }}><b>Invoice Date:</b> {dayjs(selectedJob?.createdDate)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>SI Cutt Of Date:</b> {dayjs(selectedJob?.cuttOfDate)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>EtdPol Date:</b> {dayjs(selectedJob?.etD_POL)?.format(dateFormat)}</p>
                        </Col>
                        <Col span={9}>
                            <p style={{ margin: 0 }}><b>Invoice No:</b> {selectedJob?.jobId}</p>
                            <p style={{ margin: 0 }}><b>Cutt Of Date Vessel:</b> {dayjs(selectedJob?.cuttOfDateVessel)?.format(dateFormat)}</p>
                            <p style={{ margin: 0 }}><b>EtdPod Date:</b> {dayjs(selectedJob?.etA_POD)?.format(dateFormat)}</p>
                        </Col>
                    </Row>

                    {/* CUSTOMER */}
                    <Row gutter={24} style={{ marginTop: "10px" }}>
                        <Col span={15}>
                            <b>Customer</b>
                            <p>{selectedJob.customerName}</p>
                        </Col>

                        <Col span={9}>
                            <p style={{ margin: 0 }}>Job Type: {selectedJob?.jobType}</p>
                            <p style={{ margin: 0 }}>Gross Weight: {selectedJob?.grossWeight}</p>
                            <p style={{ margin: 0 }}>Net Weight: {selectedJob?.netWeight}</p>
                            <p style={{ margin: 0 }}>No Of Container: {selectedJob?.numberOfContainer}</p>
                            <p style={{ margin: 0 }}>Port Of Loading: {selectedJob?.portOfLoading}</p>
                            <p style={{ margin: 0 }}>Port Of Discharge: {selectedJob?.portOfDischarge}</p>
                            <p style={{ margin: 0 }}>Loading Term: {selectedJob?.loadingTerm}</p>
                            <p style={{ margin: 0 }}>Shipping Line: {selectedJob?.shippingLine}</p>
                            <p style={{ margin: 0 }}>Vessel: {selectedJob?.vessel}</p>
                            <p style={{ margin: 0 }}>Transit Time Days: {selectedJob?.transitTimeDays}</p>
                            <p style={{ margin: 0 }}>Free Days At Pod: {selectedJob?.freeDaysAtPOD}</p>
                        </Col>
                    </Row>

                    <Divider />

                    {/* TABLE */}
                    <Table
                        columns={columnsPDF}
                        dataSource={[{
                            key: 1,
                            description: selectedJob?.cargoDetail,
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
export default Jobs;