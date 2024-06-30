import React, { useState, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { Input, Select, Space } from "antd";
import axios from "axios";
import { Button, Modal } from "antd";
import "./style.css";
import toast from "react-hot-toast";
import PdfComp from "./PdfComp";
const { Option } = Select;
const Uploader = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user")) || [];
  const token = userData.token || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Assuming you're sending JSON data
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

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const openPdfInNewTab = (pdfPath) => {
    // Tạo đường link dựa trên đường dẫn
    const link = `http://localhost:3003/${pdfPath}`;

    // Mở đường link trong tab mới
    window.open(link, "_blank");
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("keyId", selectedValue);
    formData.append("password", password);
    formData.append("file", file);

    const result = await axios.post(
      "http://localhost:3003/upload-files",
      formData,
      {
        headers: headers,
      }
    );
    if (result.data.downloadLink) {
      openPdfInNewTab(result.data.downloadLink);
    } else {
      toast.error("Sai thông tin khóa hoặc mật khẩu");
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:3003/files/${pdf}`);
  };

  return (
    <main
      style={{ justifyContent: "center", alignItems: "center" }}
      className="main-container"
    >
      <form className="formStyle" onSubmit={submitImage}>
        <Space style={{ width: "100%" }} direction="horizontal">
          <Space direction="vertical">
            <h3 style={{ color: "#333" }}>Chọn loại khóa</h3>
            <Select
              value={selectedValue}
              defaultValue=""
              style={{ width: 320 }}
              onChange={handleChange}
            >
              {data.map((itemData) => (
                <Option key={itemData.signatureId} value={itemData.signatureId}>
                  {itemData.signatureNames}
                </Option>
              ))}
            </Select>
          </Space>
          <Space direction="vertical">
            <h3 style={{ color: "#333" }}>Mật khẩu</h3>
            <Input
              style={{ width: 320 }}
              value={password}
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Space>
        </Space>
        <h4>Upload Pdf in React</h4>
        <br />

        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit" style={{ width: "100%" }}>
          Mã hóa file
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      {/* <PdfComp pdfFile={pdfFile} /> */}
    </main>
  );
};

export default Uploader;
