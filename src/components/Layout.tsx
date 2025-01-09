import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  Content,
  Navbar,
  Nav,
  Sidebar,
  Sidenav,
  HStack,
  IconButton,
  Stack,
} from "rsuite";
import {
  MdGroup,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdAdminPanelSettings,
  MdOutlineFirstPage,
} from "react-icons/md";
import { Icon } from "@rsuite/icons";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";

interface BrandProps {
  expand: boolean;
}

interface NavToggleProps {
  expand: boolean;
  onChange: () => void;
}
interface LayoutProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const Brand: React.FC<BrandProps> = ({ expand }) => (
    <HStack className="page-brand" spacing={12}>
      <img src="/src/assets/react.svg" alt="" />
      {!isSmallScreen && expand && (
        <h1 className="!text-white text-xl">Dashboard</h1>
      )}
    </HStack>
  );

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => (
    <Stack
      className="nav-toggle mb-3 mr-3"
      justifyContent={expand ? "flex-end" : "center"}
    >
      <IconButton
        onClick={onChange}
        appearance="subtle"
        size="lg"
        icon={
          expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />
        }
      />
    </Stack>
  );

  return (
    <Container className="h-screen">
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        width={isSmallScreen ? 56 : expand ? 270 : 56}
        collapsible={!isSmallScreen}
        className="bg-violet-700"
      >
        <Sidenav.Header
          className="flex items-center justify-center mb-3"
          style={{ height: 56 }}
        >
          <Brand expand={expand} />
        </Sidenav.Header>
        <Sidenav
          expanded={!isSmallScreen && expand}
          defaultOpenKeys={["2"]}
          appearance="subtle"
          className="flex-auto"
          style={{ padding: !isSmallScreen && expand ? "12px" : "0" }}
        >
          <Sidenav.Body>
            <Nav defaultActiveKey="1">
              <Nav.Item
                eventKey="1"
                as={Link}
                to="/user"
                icon={<Icon as={MdGroup} />}
                className="text-white !mb-2"
              >
                User register
              </Nav.Item>
              {isAdmin && (
                <Nav.Item
                  eventKey="2"
                  as={Link}
                  to="/admin"
                  icon={<Icon as={MdAdminPanelSettings} />}
                >
                  Admin
                </Nav.Item>
              )}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        {!isSmallScreen && (
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        )}
      </Sidebar>

      <Container className="overflow-auto">
        <Header>
          <Navbar appearance="inverse" className="!bg-transparent shadow-lg">
            <Nav pullRight>
              <Nav.Menu
                icon={<Icon as={IoMdSettings} />}
                title="Setting"
                className="!bg-transparent"
              >
                <Nav.Item
                  as={Link}
                  to="/"
                  icon={
                    <Icon as={MdOutlineFirstPage} className="font-semibold" />
                  }
                  className="!font-semibold"
                >
                  Langing
                </Nav.Item>
                {isAdmin && (
                  <Nav.Item
                    icon={<Icon as={IoIosLogOut} className="font-semibold" />}
                    onClick={handleLogout}
                    className="!font-semibold"
                  >
                    Logout
                  </Nav.Item>
                )}
              </Nav.Menu>
            </Nav>
          </Navbar>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Container>
    </Container>
  );
};

export default Layout;
