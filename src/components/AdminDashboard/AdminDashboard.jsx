import React from "react";
import { Layout, Card, Row, Col, Typography, Table, Space, DatePicker, Progress, Tag, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts";
import { lineClasses } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { labelMarkClasses } from "@mui/x-charts/ChartsLabel";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, GetJobProgressAsync, GetJobProgressByUserIdAsync, GetJobSummaryMonthWiseAsync, GetJobSummaryMonthWiseByUserIdAsync, GetJobSummaryCountAsync, GetJobSummaryCountByUserIdAsync } from '../../redux/Action';
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import SideBar from '../SideBar.jsx'


import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

const { RangePicker } = DatePicker;
const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {

  const dispatch = useDispatch();
  const jobProgressArrs = useSelector((state) => state.jobProgressArr);
  const jobSummaryMonthWiseArrs = useSelector((state) => state.jobSummaryMonthWiseArr);
  const jobSummaryCountArrs = useSelector((state) => state.jobSummaryCountArr);
  const userArrs = useSelector((state) => state.userArr);

  const [fromDate, setFromDate] = useState(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [userId, setUserId] = useState(0);
  const [userOpt, setUserOpt] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    setUserOpt([]); // Reset
    setUserOpt(() => [
      ...userArrs.map((x) => ({
        value: x.userId,
        label: x.userName,
      }))
    ]);
  }, [userArrs]);

  useEffect(() => {
    if (userId > 0) {
      dispatch(GetJobProgressByUserIdAsync(userId, fromDate, toDate));
      dispatch(GetJobSummaryMonthWiseByUserIdAsync(userId, fromDate, toDate));
      dispatch(GetJobSummaryCountByUserIdAsync(userId, fromDate, toDate));
    }
    else {
      dispatch(GetJobProgressAsync(fromDate, toDate));
      dispatch(GetJobSummaryMonthWiseAsync(fromDate, toDate));
      dispatch(GetJobSummaryCountAsync(fromDate, toDate));
    }
  }, [userId, fromDate, toDate]);

  // 📊 Line Data
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

  const xLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"
  ];

  // 🥧 Pie Data
  const pieData = [
    { id: 0, value: jobSummaryCountArrs?.totalJobs, label: "Total" },
    { id: 1, value: jobSummaryCountArrs?.activeJobs, label: "In Progress" },
    { id: 2, value: jobSummaryCountArrs?.completedJobs, label: "Completed" },
  ];

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      // No value to display
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="red" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="red"
          strokeWidth={3}
        />
      </g>
    );
  }

  const formatSteps = (steps) => {
    return steps.map((step, index) => {
      if (index === 0) return { ...step, diff: 0 };

      const prev = new Date(steps[index - 1].date);
      const curr = new Date(step.date);

      const diff = (curr - prev) / (1000 * 60 * 60 * 24);

      return { ...step, diff };
    });
  };

  const rawData = [
    {
      id: 1,
      jobId: "JOB-001",
      steps: [
        { name: "Filling", date: "2026-04-01" },
        { name: "Invoice", date: "2026-04-03" },
        { name: "CustomGD", date: "2026-04-06" },
        { name: "Final", date: "2026-04-07" },
      ],
    },
  ];

  const columns = [
    {
      title: "Job ID",
      dataIndex: "jobId",
    },
    {
      title: "Timeline",
      dataIndex: "steps",
      render: (steps) => renderTimeline(steps),
    },
    {
      title: "%",
      dataIndex: "completedPercentage",
      fixed: "right",
      width: 120,
      render: (value) => (
        <Progress
          percent={parseFloat(value)}
          size="small"
        />
      ),
    },
    {
      title: "JobStatus",
      dataIndex: "completed",
      fixed: "right",
      width: 90,
      render: (status) => {
        const color =
          status === "Completed"
            ? "green"
            : status === "InProgress"
              ? "blue"
              : "default";

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const renderTimeline = (steps) => {
    const data = formatSteps(steps);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.map((step, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>

            {/* STEP BOX */}
            <div
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                background: "#f5f7ff",
                border: "1px solid #d6e4ff",
                textAlign: "center",
                minWidth: 100,
                fontSize: 12,
              }}
            >
              <strong>{step.name}</strong>
              <div style={{ color: "#666" }}>{step.date}</div>
            </div>

            {/* CONNECTOR */}
            {index !== data.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", margin: "0 8px" }}>
                <div style={{ borderTop: "2px dashed #999", width: 40 }} />

                <span style={{ fontSize: 11, color: "#1677ff", margin: "0 6px" }}>
                  {data[index + 1].diff}d
                </span>

                <ArrowRightOutlined style={{ fontSize: 10 }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };


  const transformJobs = (data) => {
    const stepMap = [
      { key: "filling", label: "Filling", dateKey: "fillingDate" },
      { key: "invoice", label: "Invoice", dateKey: "invoiceDate" },
      { key: "documentCheck", label: "Document Check", dateKey: "documentCheckDate" },
      { key: "edi", label: "EDI", dateKey: "ediDate" },
      { key: "customGD", label: "Custom GD", dateKey: "customGDDate" },
      { key: "testToAppointment", label: "Test To Appointment", dateKey: "testToAppointmentDate" },
      { key: "cargoEntryConfirmation", label: "Cargo Entry", dateKey: "cargoEntryConfirmationDate" },
      { key: "scanningInspection", label: "Scanning", dateKey: "scanningInspectionDate" },
      { key: "customPayment", label: "Custom Payment", dateKey: "customPaymentDate" },
      { key: "finalClearance", label: "Final Clearance", dateKey: "finalClearanceDate" },
      { key: "loadPermit", label: "Load Permit", dateKey: "loadPermitDate" },
    ];

    return data.map((job, index) => {
      const steps = stepMap
        .filter(step => job[step.key] && job[step.dateKey]) // only completed steps
        .map(step => ({
          name: step.label,
          date: job[step.dateKey]?.split("T")[0], // format date
        }));

      return {
        id: index + 1,
        jobId: job.jobId,
        completedPercentage: job.completedPercentage,
        completed: job.completed,
        steps,
      };
    });
  };


  const steps2 = [
    "Filling",
    "Invoice",
    "DocumentCheck",
    "EDI",
    "CustomGD",
    "TestoAppointment",
    "CargoEntryConfirmation",
    "ScanningInspection",
    "CustomPayment",
    "FinalClearance",
    "LoadPermit"
  ];

  const getStepFromPercent = (percent) => {
    const index = Math.floor(percent / 10);
    return steps2[index] || steps2[steps2.length - 1];
  };

  const chartData = jobProgressArrs.map(job => {
    const progress = parseFloat(job.completedPercentage);

    return {
      jobId: job.jobId,
      progress: progress, // used for bar length
      stepLabel: getStepFromPercent(progress) // used for axis label
    };
  });

  const months = jobSummaryMonthWiseArrs.map(d => d.monthShort);
  const totalJobs = jobSummaryMonthWiseArrs.map(d => d.totalJobs);
  const completedJobs = jobSummaryMonthWiseArrs.map(d => d.completedJobs);
  const activeJobs = jobSummaryMonthWiseArrs.map(d => d.activeJobs);

  const setSelectUserFunc = (val) => {
    if (!val) {
      setSelectUser(null);
      return;
    }
    const usr = userOpt.find(x => x.value == val);
    setSelectUser(usr);
    setUserId(usr.value);
  }

  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" />;

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <SideBar />

      <Content>

        {/* Header */}
        <Header style={{ background: "#fff", padding: "0 16px", height: "auto", }}>
          <Row gutter={[16, 16]} align="middle" justify="space-between">

            {/* TITLE */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={3}>
                Dashboard
              </Title>
            </Col>

            <Col xs={24} sm={12} md={16} lg={8}>
              <Row justify="space-between" align="bottom" gutter={16}>
                <Col xs={24} sm={12} md={16} lg={12}>
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
                </Col>
                {/* DATE RANGE */}
                <Col xs={24} sm={12} md={16} lg={12}>
                  <RangePicker
                    style={{ width: "100%" }}   // 👈 full width on mobile
                    defaultValue={[dayjs().subtract(1, "month"), dayjs()]}
                    onChange={(dates) => {
                      if (!dates) return;

                      const fromDate = dates[0].format("YYYY-MM-DD");
                      const toDate = dates[1].format("YYYY-MM-DD");

                      setFromDate(fromDate);
                      setToDate(toDate);
                    }}
                  />
                </Col>
              </Row>
            </Col>

          </Row>
        </Header>

        <Content style={{ padding: 20 }}>
          {/* KPI Cards */}
          <Row gutter={[16, 16]}>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Row gutter={[16, 16]}>

                <Col span={24}>
                  <Card>
                    <Row align="middle" justify="space-between">

                      <Col>
                        <Title level={5}>Current Job</Title>
                        {(() => {
                          if (jobProgressArrs[0]?.currentStep) {
                            return (
                              <p>{jobProgressArrs[0]?.currentStep} completed → Next: {jobProgressArrs[0]?.nextStep} • {jobProgressArrs[0]?.completedPercentage}%</p>
                            )
                          }
                          else {
                            return (
                              <p>{jobProgressArrs[0]?.nextStep} • {jobProgressArrs[0]?.completedPercentage}%</p>
                            )
                          }
                        })()}
                      </Col>

                      <Col>
                        <GaugeContainer
                          width={90}
                          height={90}
                          startAngle={-110}
                          endAngle={110}
                          value={jobProgressArrs[0]?.completedPercentage}
                        >
                          <GaugeReferenceArc />
                          <GaugeValueArc />
                          <GaugePointer />
                        </GaugeContainer>
                      </Col>

                    </Row>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card>
                    <Title level={5}>Total Jobs</Title>
                    <h2>{jobSummaryCountArrs?.totalJobs ? jobSummaryCountArrs?.totalJobs : 0}</h2>
                  </Card>
                </Col>

                <Col span={24}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card>
                        <Title level={5}>Active Jobs</Title>
                        <h2>{jobSummaryCountArrs?.activeJobs}</h2>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <Title level={5}>Completed Jobs</Title>
                        <h2>{jobSummaryCountArrs?.completedJobs}</h2>
                      </Card>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Col>

            {/* //Pie Chart */}
            <Col xs={24} sm={12} md={12} lg={12}>
              <Card title="Job Status" style={{ height: "100%" }}>
                <PieChart
                  height={300}
                  series={[{ data: pieData }]}
                />
              </Card>
            </Col>

          </Row>

          {/* Charts */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>

            <Col span={24}>
              <Card title="Sales Overview">
                {/* <LineChart
                height={300}
                series={[
                  {
                    data: pData,
                    label: "Revenue",
                    id: "rev",
                    showMark: true,
                  },
                  {
                    data: uData,
                    label: "Orders",
                    id: "ord",
                    showMark: true,
                  },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                sx={{
                  [`& .${lineClasses.line}[data-series="rev"]`]: {
                    strokeDasharray: "5 5",
                  },
                  [`& .${lineClasses.line}[data-series="ord"]`]: {
                    strokeDasharray: "3 3",
                  },
                }}
              /> */}

                <LineChart
                  height={300}
                  xAxis={[
                    {
                      scaleType: "point",
                      data: months,
                    },
                  ]}
                  series={[
                    {
                      data: totalJobs,
                      label: "Total Jobs",
                      id: "total",
                      showMark: true,
                    },
                    {
                      data: completedJobs,
                      label: "Completed Jobs",
                      id: "completed",
                      showMark: true,
                    },
                    {
                      data: activeJobs,
                      label: "Active Jobs",
                      id: "active",
                      showMark: true,
                    },
                  ]}
                  sx={{
                    [`& .${lineClasses.line}[data-series="total"]`]: {
                      strokeDasharray: "5 5",
                    },
                    [`& .${lineClasses.line}[data-series="completed"]`]: {
                      strokeDasharray: "3 3",
                    },
                    [`& .${lineClasses.line}[data-series="active"]`]: {
                      strokeDasharray: "3 3",
                    },
                  }}
                />

              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <BarChart
                  height={400}
                  dataset={chartData}
                  layout="horizontal"
                  yAxis={[{ scaleType: "band", dataKey: "jobId" }]}

                  xAxis={[
                    {
                      scaleType: "linear",
                      min: 0,
                      max: 100,
                      tickNumber: steps2.length,
                      valueFormatter: (value) => {
                        const index = Math.floor(value / 10);
                        return steps2[index] || "";
                      }
                    }
                  ]}

                  series={[
                    {
                      dataKey: "progress",
                      label: "Job Progress"
                    }
                  ]}
                />
              </Card>
            </Col>

          </Row>

          {/* Current Job Progress Timeline Grid */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={Array.isArray(jobProgressArrs) ? transformJobs(jobProgressArrs) : []}
                rowKey="id"
                scroll={{ x: "max-content" }}
              />
            </Col>
          </Row>

        </Content>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;