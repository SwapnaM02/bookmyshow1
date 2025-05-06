import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ShowLoading, HideLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const navItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "user",
      label: user?.name || "",
      icon: <UserOutlined />,
      children: [
        {
          key: "profile",
          label: (
            <span
              onClick={() => {
                if (user?.role === "admin") {
                  navigate("/admin");
                } else if (user?.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          key: "logout",
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    // Update selected keys based on current route
    const path = location.pathname;
    if (path === "/") {
      setSelectedKeys(["home"]);
    } else if (path === "/admin" || path === "/partner" || path === "/profile") {
      setSelectedKeys(["profile"]);
    } else {
      setSelectedKeys([]);
    }
  }, [location]);

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetCurrentUser();
        dispatch(SetUser(response.data));
        dispatch(HideLoading());
      } catch (err) {
        dispatch(HideLoading());
        message.error(err.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const { Header, Content } = Layout;

  return (
    user && (
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "white", margin: 0 }}>Book My Show</h3>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            selectedKeys={selectedKeys}
            onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
            style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
          />
        </Header>
        <Content style={{ padding: "24px", minHeight: "380px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    )
  );
}

export default ProtectedRoute;