import React, { useState, useEffect } from "react";
import "../Styles/Banner.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { SelectPicker } from "rsuite";
import { MdApartment, MdBuild } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Banner = ({ corporatedatas, apartmentdatas }) => {
//   const location = useLocation();
//   const data = location.state;
// console.log("data",data);
const addresstype = localStorage.getItem("addresstype");
  //Address save modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [Apartment, setApartment] = useState("");

  const handleChange = (event) => {
    setApartment(event.target.value);
    if (event.target.value !== "") {
      setShow(true);
    }
  };

  //OTP save modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //integrating get method
  const [AddBanner, setAddBanner] = useState([]);
  const getAddBanner = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getbanner");
      if (res.status === 200) {
        setAddBanner(res.data.getbanner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddBanner();
  }, []);

  const [apartmentdata, setapartmentdata] = useState([]);
  const getapartmentd = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getapartment");
      if (res.status === 200) {
        setapartmentdata(res.data.corporatedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getapartmentd();
  }, []);
  const [corporatedata, setcorporatedata] = useState([]);
  const getcorporate = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getcorporate");
      if (res.status === 200) {
        setcorporatedata(res.data.corporatedata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcorporate();
  }, []);

  const Handeledata = (ab) => {
    try {
      if (ab) {
        let data = JSON.parse(ab);
        const addressData = {
          Address: data?.Address,
          Delivarycharge: data?.apartmentdelivaryprice,
          doordelivarycharge: data?.doordelivaryprice,
          apartmentname: data?.Apartmentname,
          pincode: data?.pincode,
          approximatetime: data?.approximatetime,
          prefixcode: data?.prefixcode
        };
  
        // Convert addressData to JSON string and store in localStorage
        localStorage.setItem("address", JSON.stringify(addressData));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const address = JSON.parse(localStorage.getItem("address"))
// console.log("address====>",address);

  // mobile
  const [selectedCorporate, setSelectedCorporate] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleDataChange = (value) => {
    // Do something with the selected value
    console.log("Selected value:", value);
  };

  //Request Location
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState("");
  const [ApartmentName, setApartmentName] = useState("");
  const [Message, setMessage] = useState("");

  const Requestaddress = async () => {
    try {
      if (!Name) {
        return alert("Please Add Your Name");
      }
      if(!address){
        return alert("Please Select Address Type");
      }
      if (!Number) {
        return alert("Please Add Your Contact Number");
      }
      if (!ApartmentName) {
        return alert("Please Add Apartment Name");
      }
      if (!Message) {
        return alert("Please Add Your Message");
      }
      const config = {
        url: "User/EnquiryEnquiry",
        method: "post",
        baseURL: "http://dailydishbangalore.com/api/",
        header: { "content-type": "application/json" },
        data: {
          Name: Name,
          Number: Number,
          ApartmentName: ApartmentName,
          Message: Message,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert("Location Add Request Sent. We'll Update You Soon..!");
        handleClose2();
        setName("");
        setNumber("");
        setApartmentName("");
        setMessage("");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentTime = new Date();
  const cutoffTime = new Date();
  cutoffTime.setHours(12, 30, 0);


const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const currentMinutes = hours * 60 + minutes; // Convert time to minutes since midnight

// Define time slots in minutes
const openTime = 8 * 60; // 8:00 AM
const lunchMenuEnd = 15 * 60 + 30; // 3:30 PM
const lunchDeliveryStart = 12 * 60; // 12:00 PM
const lunchDeliveryEnd = 16 * 60; // 4:00 PM
const dinnerMenuStart = 15 * 60 + 31; // 3:31 PM
const dinnerDeliveryStart = 19 * 60; // 7:00 PM
const dinnerDeliveryEnd = 23 * 60; // 11:00 PM
const closeTime = 23 * 60; // 11:00 PM
const reopenTime = 8 * 60; // 8:00 AM

// Determine which message or menu to show
let displayMessage = "";
if (currentMinutes >= closeTime || currentMinutes < openTime) {
  displayMessage = "We are currently closed. Please check back after 8:00 AM.";
} else if (currentMinutes >= openTime && currentMinutes <= lunchMenuEnd) {
  displayMessage = "Lunch menu is loaded. You can place orders until 3:30 PM.";
  if (currentMinutes >= lunchDeliveryStart && currentMinutes <= lunchDeliveryEnd) {
    displayMessage += " Lunch orders are now being delivered.";
  } else if (currentMinutes < lunchDeliveryStart) {
    displayMessage += " Orders placed before 12:00 PM will be delivered between 12:00 PM and 12:30 PM.";
  }
} else if (currentMinutes > lunchMenuEnd && currentMinutes <= dinnerDeliveryEnd) {
  displayMessage = "Dinner menu is loaded. You can place orders until 10:30 PM.";
  if (currentMinutes >= dinnerDeliveryStart && currentMinutes <= dinnerDeliveryEnd) {
    displayMessage += " Dinner orders are now being delivered.";
  }
}
  return (
    <div>
      {AddBanner?.map((banner, i) => {
        return (
          <div className="banner-container">
            <img
              src={`http://dailydishbangalore.com/HomeBanner/${banner?.BannerImage}`}
              alt="Banner"
              className="homebanner"
            />
            <div className="content-container">
              <h3 className="banner-title mb-3"> {banner.BannerText}</h3>
              <h6 className="banner-tagline mb-5">{banner.BannerDesc}</h6>
              {addresstype === "corporate" ? (
                <>
                  <div>
                    <select
                      name="corporate"
                      id="corporate"
                      className="vi_0"
                      onChange={(e) => Handeledata(e.target.value)}
                    >
                      <option value="">Select corporate</option>
                      {corporatedata?.map((item) => {
                        return (
                          <option value={JSON.stringify(item)}>
                            {item?.Apartmentname}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <select
                      name="apartment"
                      id="apartment"
                      className="vi_0"
                      onChange={(e) => Handeledata(e.target.value)}
                    >
                      <option value="">Select Apartment</option>
                      {apartmentdata?.map((item) => {
                        return (
                          <option value={JSON.stringify(item)}>
                            {item?.Apartmentname}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </>
              )}
              <div style={{ textAlign: "left" }}>
                <Button
                  variant=""
                  className="modal-add-btn mt-3"
                  onClick={() => handleShow2()}
                >
                  Request for Add Address
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mobile-banner">
        <div className="screen-2 mb-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3">
              <div>
                <FaUser className="mobile-user-screen2" />
              </div>
              <div>
                <div className="mobile-user-screen2-title">
                  <h6>
                  {displayMessage}
                  </h6>
                </div>
              </div>
            </div>

            <div>
              <div>
                <a href="/foodstatus">
                  <img
                    src="../Assets/status.png"
                    alt=""
                    className="mobile-user-status-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="location-selector">
          {addresstype === "corporate" ? (
                  <>
                    <div>
                      <select
                        name="corporate"
                        id="corporate"
                        className="vi_0"
                        onChange={(e) => Handeledata(e.target.value)}
                      >
                        <option value="">Select Corporate</option>
                        {corporatedata?.map((item) => (
                          <option key={item.id} value={JSON.stringify(item)}>
                            {item?.Apartmentname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <select
                        name="apartment"
                        id="apartment"
                        className="vi_0"
                        onChange={(e) => Handeledata(e.target.value)}
                      >
                        <option value="">Select Apartment</option>
                        {apartmentdata?.map((item) => (
                          <option key={item.id} value={JSON.stringify(item)}>
                            {item?.Apartmentname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

            <div>
              <Button
                variant=""
                className="modal-add-btn"
                onClick={() => handleShow2()}
                style={{
                  fontSize: "12px",
                  padding: "10px",
                }}
              >
                Add
              </Button>
            </div>
            <div>
            <div>{address?.apartmentname}</div>
            <div>{address?.Address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Aprtment modal */}
      <Modal show={show2} onHide={handleClose2} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Request Add {addresstype}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Name *"
              style={{ marginTop: "18px" }}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Enter Contact Number *"
              style={{ marginTop: "18px" }}
              required
              onChange={(e) => setNumber(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Enter Apartment Name *"
              style={{ marginTop: "18px" }}
              required
              onChange={(e) => setApartmentName(e.target.value)}
            />

            <Form.Control
              type="text"
              placeholder="Enter Message *"
              style={{ marginTop: "18px" }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              style={{
                width: "100%",
                marginTop: "24px",
                backgroundColor: "orangered",
                color: "white",
              }}
              onClick={() => {
                Requestaddress();
              }}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Banner;
