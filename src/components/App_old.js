import React, { Suspense, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";
// import "antd/dist/antd.css";
import "./App.less";
// import ListOfEntries from "./views/ListOfEntries/ListOfEntries";
import InwardRegistration from "./views/InwardRegistration/InwardRegistration";
import Visitors from "./views/Visitors";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Footer from "./views/Footer/Footer";
import Loadable from "react-loadable";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const Loading = () => <div>Loading...</div>;
const ListOfEntries = Loadable({
  loader: () => import("./views/ListOfEntries/ListOfEntries"),
  loading: Loading,
});

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}> */}
        <Sider collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src={require("../assets/logo.png")} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              <Link to="/list-of-entries">Entries</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              <Link to="/inward">Inward</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
              <Link to="/visitor">Visitors</Link>
            </Menu.Item>
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <NavBar className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div style={{ minHeight: "calc(100vh - 220px)" }}>
                <Switch>
                  <Route exact path="/" component={Auth(ListOfEntries, true)} />
                  {/* <Route
                    path="/dashboard"
                    component={Auth(LandingPage, true)}
                  />
                  <Route
                    path="/list-of-entries"
                    component={Auth(ListOfEntries, true)}
                  />
                  <Route
                    path="/inward"
                    component={Auth(InwardRegistration, true)}
                  />
                  <Route path="/visitor" component={Auth(Visitors, true)} />
                  <Route path="/login" component={Auth(LoginPage, false)} />
                  <Route
                    path="/register"
                    component={Auth(RegisterPage, false)}
                  />
                  <Route
                    path="/video/upload"
                    component={Auth(VideoUploadPage, true)}
                  />
                  <Route
                    path="/video/:videoId"
                    component={Auth(VideoDetailPage, null)}
                  />
                  <Route
                    path="/subscription"
                    component={Auth(SubscriptionPage, null)}
                  /> */}
                </Switch>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Suspense>
  );
}

export default App;
