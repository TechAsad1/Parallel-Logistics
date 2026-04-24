import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { Card, Table, Typography, Button, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

export default function Invoice() {
    const printRef = React.useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("examplepdf.pdf");
    };

const columns = [
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      align: "right",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "Total",
      dataIndex: "total",
      align: "right",
    },
  ];

  const data = [
    {
      key: 1,
      description: "Web Design Service",
      qty: 1,
      price: "$1,500.00",
      total: "$1,500.00",
    },
    {
      key: 2,
      description: "Hosting Setup",
      qty: 1,
      price: "$250.00",
      total: "$250.00",
    },
  ];

    return (
        <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
            <Card
                style={{ maxWidth: 800, margin: "0 auto" }}
            >
                <div ref={printRef} style={{ padding: 24, background: "#fff" }}>

                    {/* Header */}
                    <Row justify="space-between" align="top">
                        <Col>
                            <Title level={2} style={{ marginBottom: 0 }}>
                                INVOICE
                            </Title>
                            <Text type="secondary">Invoice #INV-2024-001</Text>
                        </Col>

                        <Col style={{ textAlign: "right" }}>
                            <Title level={5} style={{ marginBottom: 0 }}>
                                Company Name
                            </Title>
                            <Text type="secondary">
                                123 Business Street <br />
                                City, State 12345
                            </Text>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Bill To */}
                    <div style={{ marginBottom: 20 }}>
                        <Title level={5}>Bill To:</Title>
                        <Text>
                            Client Name <br />
                            Client Address <br />
                            City, State ZIP
                        </Text>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />

                    {/* Totals */}
                    <Row justify="end" style={{ marginTop: 20 }}>
                        <Col span={8}>
                            <Row justify="space-between">
                                <Text>Subtotal:</Text>
                                <Text>$1,750.00</Text>
                            </Row>

                            <Row justify="space-between">
                                <Text>Tax (10%):</Text>
                                <Text>$175.00</Text>
                            </Row>

                            <Divider style={{ margin: "10px 0" }} />

                            <Row justify="space-between">
                                <Text strong>Total:</Text>
                                <Text strong>$1,925.00</Text>
                            </Row>
                        </Col>
                    </Row>

                    {/* Button */}
                    <Row justify="center" style={{ marginTop: 30 }}>
                        <Button type="primary" onClick={handleDownloadPdf}>
                            Download PDF
                        </Button>
                    </Row>

                </div>
            </Card>
        </div>
    );
}