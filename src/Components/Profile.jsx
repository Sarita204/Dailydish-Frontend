import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "../Styles/Profile.css";
import { Row, Modal } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import axios from "axios";

const Profile = () => {
  // Edit Profile modal
  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // Integration Profile Update
  const user = JSON.parse(localStorage.getItem("user"));

  const formdata = new FormData();
  const [Fname, setFname] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Mobile, setMobile] = useState("");

  const editRegUser = async () => {
    try {
      const config = {
        url: "/User/updateuser",
        method: "put",
        baseURL: "http://dailydishbangalore.com/api",

        headers: { "content-type": "application/json" },
        data: {
          Fname: Fname,
          Email: Email,
          Address: Address,
          Mobile: Mobile,
          userId: user?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Profile Details Successfully Updated");
        localStorage.setItem("user", JSON.stringify(res.data.userdata));
        setFname("");
        setEmail("");
        setAddress("");
        setMobile("");
        handleClose5();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  //Profile image Update
  const editprofileRegUser = async (img) => {
    
    try {
      const config = {
        url: "/User/profileimg",
        method: "put",
        baseURL: "http://dailydishbangalore.com/api",
        headers: { "content-type": "multipart/form-data" },
        data: {
          profileImage: img,
          userid: user?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Successfully Updated");
        localStorage.setItem("user", JSON.stringify(res.data.success));
        handleClose5();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <div className="add-gr">
        <div>
          <div className="myaccount-component">
            <div className="profile-container mt-2">
              <div style={{ position: "relative" }}>
                {user?.profileImage ? (
                  <img
                    src={`http://dailydishbangalore.com/Customer/${user?.profileImage}`}
                    alt="User Profile"
                    className="user-picture"
                  />
                ) : (
                  <img
                    src="../Assets/user.jpg"
                    alt="Default User"
                    className="user-picture"
                  />
                )}

                {/* Edit icon */}
                <div className="edit-icon">
                  <label htmlFor="file-input">
                    <RiImageEditFill style={{ cursor: "pointer" }} />
                  </label>

                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => editprofileRegUser(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>

            <div className="profile-container-2 mt-2">
              <div className="profile-content-display">
                <div className="profile-user-deatils">
                  <p className="profile-user-subtitle">Name: {user?.Fname}</p>
                  <p className="profile-user-subtitle">
                    Email ID: {user?.Email}
                  </p>
                  <p className="profile-user-subtitle">
                    Phone Number: {user?.Mobile}{" "}
                  </p>
                  <p className="profile-user-subtitle">
                    Address: {user?.Address}
                  </p>
                </div>
              </div>
              <br />
              <div>
                <div className="edit-change-button">
                  <Button
                    variant=""
                    className="header-search"
                    onClick={handleShow5}
                    style={{ background: "black", color: "white" }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Edit profile modal */}
          <Modal
            show={show5}
            onHide={handleClose5}
            style={{ zIndex: "9999999" }}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <h4 style={{ textAlign: "center", color: "balck" }}>
                Edit Your Profile
              </h4>
              <Row>
                <div className="col-lg-6 mt-3 mb-3" name="edit-profile-details">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.Fname}
                    value={Fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <div className="col-lg-6 mt-3 mb-3" name="edit-profile-details">
                  <label htmlFor="">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.Email}
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.Mobile}
                    value={Mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 mb-3" name="edit-profile-details">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user?.Address}
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Row>

              <div className="mb-4">
                <Button
                  variant=" "
                  className="header-search"
                  style={{ background: "black", color: "white", width: "100%" }}
                  onClick={editRegUser}
                >
                  Update
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
