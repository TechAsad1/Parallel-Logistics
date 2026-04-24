import { Result, Button } from "antd";
import { FrownOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f2f5, #d6e4ff)"
      }}
    >
      <Result
        icon={<FrownOutlined style={{ color: "#ff4d4f" }} />}
        status="404"
        title={<span style={{ fontSize: "48px", fontWeight: "bold" }}>404</span>}
        subTitle="Oops! The page you're looking for doesn't exist or has been moved."
        extra={[
          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        ]}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      />
    </div>
  );
};

export default PageNotFound;