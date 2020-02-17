import React, { useState } from 'react';
import { Upload, Icon } from 'antd';

type EventPictureProps = {
  handlePicture: (props: string) => void;
};

const { REACT_APP_ENV } = process.env
const ImgUrl = REACT_APP_ENV === 'development' ? 'http://localhost:5000/api/img/upload' : `${window.location.protocol}//${window.location.hostname}/api/img/upload`

const EventPicture = (props: EventPictureProps) => {
  const { handlePicture } = props;
  const [upload, setUpload] = useState({
    loading: false,
    url: '',
    fileName: ''
  });

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      console.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUpload({ ...upload, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const result = info.file.response;
      const fileName = result.document.imageName;
      handlePicture(fileName);
      getBase64(info.file.originFileObj, (imageUrl: any) =>
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
      <Icon type={upload.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { url } = upload;

  return (
    <Upload
      accept="image/*"
      name="image"
      listType="picture-card"
      showUploadList={false}
      headers={{ 'x-auth-token': `${localStorage.token}` }}
      action={ImgUrl}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {url ? (
        <img src={url} alt="avatar" style={{ width: '100%' }} />
      ) : (
          uploadButton
        )}
    </Upload>
  );
};

export default EventPicture;
