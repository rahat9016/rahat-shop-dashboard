import React, { useRef } from "react";
import { BsCloudArrowUpFill } from "react-icons/bs";
import "./style.css";
import { AiFillFileImage } from "react-icons/ai";
const Image = (props) => {
  const fileRef = useRef(null);
  const picture = props.imageHandler;
  return (
    <div className="image-upload-box" style={{ ...props.style }}>
      <div className="image-icon-box">
        <input ref={fileRef} hidden type="file" onChange={props.onHandleFile} />
        <BsCloudArrowUpFill onClick={() => fileRef.current.click()} />
        <p>Browse File to Upload</p>
        {picture &&
          picture.map((img, index) => (
            <div key={index} className="flex alignItems uploadedImages">
              <AiFillFileImage style={{ fontSize: "20px" }} />
              <p>{img?.name}</p>
            </div>
          ))}
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
