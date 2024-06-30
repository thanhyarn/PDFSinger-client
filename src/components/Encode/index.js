import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Uploader from "../Uploader";
import { Space } from "antd";
import { useEffect } from "react";
import axios from "axios";
const Encode = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const token = userData.token || "";

    // Kiểm tra token và gọi API check-token nếu token tồn tại
    if (token) {
      // Định nghĩa headers
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Gọi API
      axios
        .post("http://localhost:3003/user/check-token", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          // Xử lý phản hồi từ server nếu cần
        })
        .catch((error) => {
          console.error("Error:", error);
          // Xử lý lỗi từ server hoặc lỗi mạng
        });
    } else {
      console.log("Token không tồn tại");
      window.location.href = "/login";
      // Xử lý trường hợp token không tồn tại (ví dụ: chuyển hướng người dùng đến trang đăng nhập)
    }
  }, []); // Thêm dependencies nếu cần

  return (
    <div className="">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        style={{
          justifyContent: "center",
          margin: "auto",
          alignItems: "center",
        }}
        className="main-container"
      >
        <Uploader />
      </div>
    </div>
  );
};

export default Encode;
