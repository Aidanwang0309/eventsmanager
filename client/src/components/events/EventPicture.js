import React, { useState } from "react";
import { Upload, Icon } from "antd";

const EventPicture = ({ handlePicture }) => {
  const [upload, setUpload] = useState({
    loading: false,
    url: "",
    fileName: ""
  });

  // const beforeUpload = file => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt5M = file.size / 1024 / 1024 < 5;
  //   if (!isLt5M) {
  //     message.error("Image must smaller than 5MB!");
  //   }
  //   return isJpgOrPng && isLt5M;
  // };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = info => {
    if (info.file.status === "uploading") {
      setUpload({ ...upload, loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const result = info.file.response;
      const fileName = result.document.imageName;
      handlePicture(fileName);
      getBase64(info.file.originFileObj, imageUrl =>
        setUpload({
          url: imageUrl,
          fileName,
          loading: false
        })
      );
    }
  };

  const uploadButton = (
    <div>
      <Icon type={upload.loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { url } = upload;

  return (
    <Upload
      // name="avatar"
      accept="image/*" /*只接收图片格式*/
      name="image" /*请求参数名*/
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/img/upload"
      // beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {url ? (
        <img src={url} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default EventPicture;
