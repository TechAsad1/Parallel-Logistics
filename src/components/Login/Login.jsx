import React from "react";
import { Row, Col, Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logistic from '../images/logistic.png';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Action';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [onSuccess, setOnSuccess] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(
      login(
        {
          userName: values.username,
          password: values.password,
        },
        (data) => {
          setOnSuccess("Login Successfully")
          setError("");
          localStorage.setItem("user", JSON.stringify(data.userId));
          localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
          const user = localStorage.getItem("user");
          setTimeout(() => {
            navigate("/job");
          }, 800);
        },
        (errMsg) => {
          setError(errMsg);
        }
      )
    );
  };

  return (
    <Row style={{ minHeight: "100vh", background: "#f5f7fa" }}>

      {/* LEFT SIDE */}
      <Col xs={0} md={12} style={styles.left}>
        <div style={styles.leftContent}>
          <img
            src={logistic}
            alt="logo"
            style={{ width: "100%", marginBottom: 20 }}
          />

          <Title style={{ color: "#fff", marginBottom: 10 }}>
            Parallel Logistics
          </Title>

          <Text style={{ color: "#e6f4ff", fontSize: 16 }}>
            Manage your shipments, jobs, and customers in one place.
          </Text>
        </div>
      </Col>

      {/* RIGHT SIDE */}
      <Col xs={24} md={12} style={styles.right}>
        <Card style={styles.card} bordered={false}>
          <Title level={3} style={{ textAlign: "center" }}>
            Welcome Back 👋
          </Title>

          <Text type="secondary" style={styles.subtitle}>
            Please login to continue
          </Text>

          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item
              name="username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={styles.button}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center" }}>
            {(() => {
              if (onSuccess) {
                return (
                  <Text type="success">{onSuccess}</Text>
                )
              }
              if (error) {
                return (
                  <Text type="danger">{error}</Text>
                )
              }
            })()}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;

const styles = {
  left: {
    background: "linear-gradient(135deg, #1677ff, #69c0ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContent: {
    textAlign: "center",
    padding: "0 40px",
  },
  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    width: 350,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  subtitle: {
    display: "block",
    textAlign: "center",
    marginBottom: 25,
  },
  button: {
    height: 45,
    borderRadius: 8,
  },
};