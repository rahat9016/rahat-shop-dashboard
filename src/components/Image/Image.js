import React, { useRef } from "react";
import { BsCloudArrowUpFill } from "react-icons/bs";
import "./style.css";
const Image = (props) => {
  const fileRef = useRef(null);
  const picture = props.imageHandler;
  return (
    <div className="image-upload-box" style={{ ...props.style }}>
      <div className="image-icon-box">
        <input
          ref={fileRef}
          hidden
          type="file"
          onChange={props.onHandleFile}
          multiple={props.multiple}
          accept="image/png"
        />
        <BsCloudArrowUpFill onClick={() => fileRef.current.click()} />
        <p>Browse File to Upload</p>
        <p>Only PNG supported</p>

        {picture &&
          picture.map((img, index) => {
            return (
              <div key={index} className="flex alignItems uploadedImages ">
                <img
                  src={img.url}
                  alt=""
                  width="50px"
                  style={{ marginRight: "20px", height: "auto" }}
                />
                {/* <AiFillFileImage style={{ fontSize: "20px" }} /> */}
                <p>{img?.public_id}</p>
              </div>
            );
          })}
        {props.fromDatabaseProductPicture &&
        props.fromDatabaseProductPicture.length > 0
          ? props.fromDatabaseProductPicture.map((proPic) => (
              <div>
                <img width="150px" src={proPic.img} alt="Product img" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Image;
