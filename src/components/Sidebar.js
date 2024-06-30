import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Button, Space } from "antd";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const handleLogOut = () => {
    // Xóa dữ liệu người dùng từ localStorage
    localStorage.removeItem("user");
    // Chuyển hướng người dùng về trang "/" (trang đăng nhập)
    window.location.href = "/";
  };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <h1 style={{ color: "#eee" }}>SGU TOOL</h1>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <ul className="sidebar-list" style={{ display: "flex" }}>
          <li className="sidebar-list-item">
            <a href="/key">
              <BsFillArchiveFill className="icon" /> Quản lý khóa
            </a>
          </li>
          <li className="sidebar-list-item">
            <a href="encode">
              <BsFillGrid3X3GapFill className="icon" /> Mã hóa file
            </a>
          </li>
          <li className="sidebar-list-item">
            <a href="decode">
              <BsPeopleFill className="icon" /> Kiểm chứng file
            </a>
          </li>
        </ul>
        <Button onClick={handleLogOut}>Đăng xuất</Button>
      </Space>
    </aside>
  );
}

export default Sidebar;
