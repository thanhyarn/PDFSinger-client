import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import TableKey from "../TableKey";
import { Button, Modal, Input, Radio } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const init = ["", "RSA", "DSA", "ECC", "AES-128", "AES-192", "AES-256"];

const CreateKey = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [data, setData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user")) || [];
  const token = userData.token || "";
  // Create headers object with Authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Assuming you're sending JSON data
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const data = {
      title: title,
      password: password,
      confirmPassword: passwordConfirm,
      encryptionType: init[value],
    };
    axios
      .post("http://localhost:3003/key/create", data, { headers: headers })
      .then((response) => {
        // Xử lý khi API thành công
        toast.success("Đăng ký thành công!", { position: "top-right" });
        fetchData(); // Tải dữ liệu mới sau khi đăng ký thành công
      })
      .catch((error) => {
        // Xử lý lỗi
        // Xử lý khi API trả về lỗi
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          console.error("Error:", errorMessage);
          // Hiển thị thông báo lỗi
          toast.error(errorMessage, { position: "top-right" });
        } else {
          // Xử lý các loại lỗi khác
          console.error("Lỗi:", error);
          toast.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.", {
            position: "top-right",
          });
        }
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:3003/key/getsig", { headers: headers })
      .then((response) => {
        console.log(response.data);
        setData(response.data.signatures);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h3>Tiêu đề của khóa</h3>
          <Input
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>Mật khẩu của khóa</h3>
          <Input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3>Xác nhận mật khẩu</h3>
          <Input
            type="password"
            value={passwordConfirm}
            name="paswordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <h3>Chọn loại mã hóa</h3>

          <Radio.Group onChange={onChange} value={value}>
            <Radio style={{ display: "block" }} value={1}>
              RSA (Rivest-Shamir-Adleman)
            </Radio>
            <Radio style={{ display: "block" }} value={2}>
              DSA (Digital Signature Algorithm)
            </Radio>
            <Radio style={{ display: "block" }} value={3}>
              Elliptic Curve Cryptography (ECC)
            </Radio>
          </Radio.Group>
        </Modal>
        <Button onClick={showModal} type="primary">
          Tạo khóa mới
        </Button>
        <TableKey data={data} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default CreateKey;
