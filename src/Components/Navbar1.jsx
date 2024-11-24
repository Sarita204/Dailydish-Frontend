import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../Styles/Navbar.css";
import { Button, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import { BiMessageDetail } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";
import { FaMapMarkerAlt, FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
const Navbar1 = () => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const address = JSON.parse(localStorage.getItem("address"))
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // otp
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [PasswordShow, setPasswordShow] = useState(false);
  const [admindata, setadmindata] = useState({});

  // Integration Profile Update
  const user = JSON.parse(localStorage.getItem("user"));

  //Registration modal
  const [Fname, setFname] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Address, setAddress] = useState("");
  const [Flatno, setFlatno] = useState("");
  const [OTP, setOTP] = useState(["", "", "", ""]);


  const d = new Date();
  let subtotal = 0;
  let total = 0;
  let tax = 0;


  const handleRegister = async () => {
    try {
      if (!Fname) {
        return alert("Enter Your Name")
      }
      if (!Mobile) {
        return alert("Enter Your Mobile Number")
      }
      if (!Address) {
        return alert("Enter Your Address")
      }
      if (!Flatno) {
        return alert("Enter Your Flat Number")
      }
      const config = {
        url: "/User/registercustomer",
        method: "post",
        baseURL: "http://dailydishbangalore.com/api",

        headers: { "content-type": "application/json" },
        data: {
          Fname: Fname,
          Address: Address,
          Mobile: Mobile,
          Flatno: Flatno,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.details));
        setFname(" ");
        setAddress(" ");
        setFlatno(" ");
        handleClose();
        loginAdmin();
        handleShow2();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
//logout
const logOut = () => {
  swal({
    title: "Yeah!",
    text: "Successfully Logged Out",
    icon: "success",
    button: "Ok!",
  });
  setTimeout(() => {
    window.location.assign("/");
  }, 5000);
  localStorage.removeItem("user");
};
  const loginAdmin = async () => {
    try {
      const config = {
        url: "/User/Sendotp",
        method: "post",
        baseURL: "http://dailydishbangalore.com/api",
        headers: { "content-type": "application/json" },
        data: {
          Mobile: Mobile,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("OTP Sent to Your Mobile Number");
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log(error);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      if (!OTP) {
        return alert("Enter a valid OTP");
      }
      const config = {
        url: "User/mobileotpverification",
        method: "post",
        baseURL: "http://dailydishbangalore.com/api/",
        header: { "content-type": "application/json" },
        data: {
          Mobile: Mobile,
          otp: OTP,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        setadmindata(res.data.success);
        // localStorage.setItem("user", JSON.stringify(res.data.details));
        // localStorage.setItem("user", JSON.stringify(res.data.details));
        alert("OTP verified successfully");
        window.location.assign("/checkout", {
          state: {
            subtotal,
            total,
            tax,
          }})
        setOTP("")
        setMobile(" ");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };


  const Carts = JSON.parse(localStorage.getItem("cart"))
  const removeFromCart = async (foodItemId) => {
    // Retrieve existing cart data or initialize as an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Log to confirm item to be removed
    console.log("Removing item with ID:", foodItemId);

    // Filter out the item with the specified foodItemId
    const updatedCart = cart.filter((cartItem) => cartItem.foodItemId !== foodItemId);

    // Log the cart after removal attempt
    console.log("Updated Cart:", updatedCart);

    // Update localStorage with the updated cart array
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Optional: reload the page to reflect changes
    window.location.reload();
  };

 


  if (Carts?.length !== 0) {
    for (let i = 0; i < Carts?.length; i++) {
      subtotal = subtotal + (Carts[i]?.totalPrice * Carts[i]?.Quantity - (Math.round(Number((Carts[i]?.price) * Carts[i]?.Quantity) * (Carts[i]?.gst / 100))))
      total = total + Carts[i]?.totalPrice * Carts[i]?.Quantity
      tax = tax + (Math.round(Number((Carts[i]?.price) * Carts[i]?.Quantity) * (Carts[i]?.gst / 100)))
    }
  }

  const increaseQuantity = (foodItemId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(cartItem => cartItem.foodItemId === foodItemId);

    if (itemIndex !== -1) {
      cart[itemIndex].Quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    }
  };

  const decreaseQuantity = (foodItemId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(cartItem => cartItem.foodItemId === foodItemId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].Quantity > 1) {
        cart[itemIndex].Quantity -= 1;
      } else {
        // Remove item if Quantity is 1 and user wants to decrease
        cart?.splice(itemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    }
  };

  const goToCheckout = () => {
    navigate("/checkout", {
      state: {
        subtotal,
        total,
        tax,
      },
    });
  };
  return (
    <div className="headers">
      <div>
        {["xl"].map((expand) => (
          <Navbar key={expand} expand={expand} className="navbar">
            <Container fluid>
              <Nav.Link href="/" className="tail-text m-1">
                <a href="/">
                  <img
                    src="../Assets/dailydishlogo.jpeg"
                    alt=""
                    className="logo"
                  />
                </a>
              </Nav.Link>

              <div className="location-input-container d-flex align-items-center">
                <FaMapMarkerAlt
                  style={{ marginRight: "5px", color: "orangered" }}
                />
                {address?.Address?(<>
                <div>
                <span>{address?.apartmentname}</span>,<br />
                <span>{address?.Address}</span>
                </div>
                </>):(<>
                  <span>Please Select Apartment/Corporate Address</span></>)}
              </div>

              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                className="custom-offcanvas-size"
              >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body style={{ padding: "2px 0px" }}>
                  <Nav
                    className="justify-content-end flex-grow-1 pe-3"
                    style={{ alignItems: "center" }}
                  >
                    <Nav.Link href="/" className="tail-text">
                      {user ? (
                        <>
                          <div className="side-nav-img">
                            My Profile <br />
                            {user?.profileImage ? (
                              <img
                                src={`http://dailydishbangalore.com/Customer/${user?.profileImage}`}
                                alt=""
                                style={{ width: "100px", borderRadius: "50%" }}
                              />
                            ) : (
                              <FaRegUserCircle
                                style={{
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                }}
                              />
                            )}
                            <div className="mt-2 mb-2">{user?.Fname}</div>
                            <div>{user?.Mobile}</div>
                            <Nav.Link href="/chats" className="tail-text">
                              <div className="d-flex gap-3 align-items-center">
                                <div>
                                  <span className="iocn">
                                    <BiMessageDetail className="fabicon" />
                                  </span>{" "}
                                </div>
                                <div>Chat with Us</div>
                              </div>
                            </Nav.Link>
                            <Nav.Link href="/livestreams" className="tail-text">
                              <div className="d-flex gap-3 align-items-center">
                                <div>
                                  <span className="iocn">
                                    <IoLogoYoutube className="fabicon" />{" "}
                                  </span>{" "}
                                </div>
                                <div>Live Stream </div>
                              </div>
                            </Nav.Link>
                            <Nav.Link href="/orders" className="tail-text">
                              <div className="d-flex gap-3 align-items-center">
                                <div>
                                  <span className="iocn">
                                    <ImSpoonKnife className="fabicon" />{" "}
                                  </span>{" "}
                                </div>
                                <div>My Orders </div>
                              </div>
                            </Nav.Link>
                            <Nav.Link href="/profile" className="tail-text">
                              <div className="d-flex gap-3 align-items-center">
                                <div>
                                  <span className="iocn">
                                    <FaUser className="fabicon" />{" "}
                                  </span>{" "}
                                </div>
                                <div>My Profile </div>
                              </div>
                            </Nav.Link>
                            <Nav.Link
                              href="/"
                              onClick={() => logOut()}
                              className="tail-text"
                            >
                              Log out
                            </Nav.Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="side-nav-img">
                            My Profile <br />
                            <img
                              src="../Assets/user.jpg"
                              alt=""
                              style={{ width: "100px", borderRadius: "50%" }}
                            />
                            <div>
                              <Nav.Link
                                href="/livestreams"
                                className="tail-text"
                              >
                                <div className="d-flex gap-3 align-items-center">
                                  <div>
                                    <span className="iocn">
                                      <IoLogoYoutube className="fabicon" />{" "}
                                    </span>{" "}
                                  </div>
                                  <div>Live Stream </div>
                                </div>
                              </Nav.Link>
                            </div>
                          </div>
                        </>
                      )}
                    </Nav.Link>

                    <Dropdown
                      className="mbl"
                      variant=""
                      style={{ backgroundColor: "unset" }}
                    >
                      <Dropdown.Toggle
                        className="align-items-center"
                        style={{
                          cursor: "pointer",
                          color: "black",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        {user ? (
                          <>
                            {user?.profileImage ? (
                              <img
                                src={`http://dailydishbangalore.com/Customer/${user?.profileImage}`}
                                alt=""
                                style={{ width: "50px", borderRadius: "50%" }}
                              />
                            ) : (
                              <FaRegUserCircle
                                style={{
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                }}
                              />
                            )}{" "}
                            &nbsp;
                            <span className="mt-2 mb-2">{user?.Fname}</span>
                            <Dropdown.Menu className="mt-2">
                              <Dropdown.Item href="/chats">
                                <BiMessageDetail className="fabicons" /> Chat
                                with Us
                              </Dropdown.Item>
                              <Dropdown.Item href="/livestreams">
                                <IoLogoYoutube className="fabicons" /> Live
                                Stream
                              </Dropdown.Item>
                              <Dropdown.Item href="/orders">
                                <ImSpoonKnife className="fabicons" /> My Orders
                              </Dropdown.Item>
                              <Dropdown.Item href="/profile">
                                <FaUser className="fabicons" /> My Profile
                              </Dropdown.Item>
                              <Nav.Link href="/" onClick={() => logOut()}>
                                &nbsp; &nbsp; &nbsp; Log out
                              </Nav.Link>{" "}
                            </Dropdown.Menu>
                          </>
                        ) : (
                          <>
                            <FaRegUserCircle
                              style={{ fontSize: "24px", marginRight: "5px" }}
                            />
                            <Dropdown.Menu className="mt-2">
                              <Dropdown.Item href="/livestreams">
                                <IoLogoYoutube className="fabicons" /> Live
                                Stream
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </>
                        )}
                      </Dropdown.Toggle>
                    </Dropdown>
                    <Nav.Link href="#" className="tail-text">
                      <div
                        variant=""
                        className="mycrt"
                        onClick={handleShowCart}
                        style={{ padding: "0 15px" }}
                      >
                        <BsCart3
                          style={{ fontSize: "24px", color: "orangered" }}
                        />
                        <div className="cartvalue">
                          <span>{Carts?.length}</span>
                        </div>
                      </div>
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
        <hr style={{ margin: "0" }} />
      </div>

      {/* Offcanvas for Cart */}
      <Offcanvas
        show={showCart}
        onHide={handleCloseCart}
        placement="end"
        id="checkout"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row">
          {Carts?.length > 0 ? (
              <>
            <div className="cartbox">
              {/* Sample Cart Item */}
              {Carts?.map((item) => {
                return (
                  <div className="cart-bx">
                    <div className="d-flex justify-content-between mb-2 mt-2">
                      <div className="d-flex gap-3">
                        <div>
                          <img
                            src={`http://dailydishbangalore.com/Products/${item?.image}`}
                            alt="ProductImage"
                            className="checkout-block-img"
                          />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <p style={{ margin: "0px" }}>{item?.foodname}</p>
                          <p style={{ margin: "0px" }}>{item?.quantity
                          } {item?.unit}</p>
                          <b>₹ {item?.totalPrice}</b>
                        </div>
                      </div>

                      <div>
                        <div
                          className="mb-2"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "orangered",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          <Button
                            variant=""
                            style={{ background: "orangered", color: "white" }}
                            onClick={() => decreaseQuantity(item?.foodItemId)}
                          >
                            -
                          </Button>
                          <span>{item?.Quantity}</span>
                          <Button
                            variant=""
                            style={{ background: "orangered", color: "white" }}
                            onClick={() => increaseQuantity(item?.foodItemId)}
                          >
                            +
                          </Button>
                        </div>
                        <div onClick={() => removeFromCart(item?.foodItemId)}>
                          <IoTrashBin
                            style={{
                              color: "red",
                              fontSize: "20px",
                              margin: "auto",
                              textAlign: "center",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Bill Details */}
              <div>
                <h6>
                  <b>Bill Details</b>
                </h6>
                <div className="d-flex justify-content-between mb-2 align-items-center">
                  <div className="mb-2">
                    <div>
                      <div>Sub Total</div>
                      <div>Tax</div>
                      <div>
                        <b>Bill total</b>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div style={{ textAlign: "left" }}>
                      <div>₹ {subtotal}</div>
                      <div>₹ {tax}</div>
                      <div>
                        <b>₹ {total}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between">
                <div className="mb-2" style={{ textAlign: "end" }}>
                {user?(<>
                  <a
                     onClick={()=>goToCheckout()}
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                  <Button
                    variant=""
                    style={{ backgroundColor: "orangered", color: "white" }}
                 >
                    Checkout
                  </Button>
                  </a>
                </>):(<>
                  <Button
                    variant=""
                    style={{ backgroundColor: "orangered", color: "white" }}
                    onClick={() => handleShow()}
                  >
                    Checkout
                  </Button>
                </>)}
                </div>
              </div>
            </div>
            </>
            ) : (
              <>
                <p style={{ textAlign: "center" }}>Your Cart is empty</p>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>


      {/* Register  */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Register Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              style={{ marginTop: "18px" }}
              onChange={(e) => setFname(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              style={{ marginTop: "18px" }}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Form.Control
              type="Address"
              placeholder="Enter Address"
              style={{ marginTop: "18px" }}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Control
              type="Flatno"
              placeholder="Enter Flatno"
              style={{ marginTop: "18px" }}
              onChange={(e) => setFlatno(e.target.value)}
            />

            <Button variant=""
              style={{
                width: "100%",
                marginTop: "24px",
                backgroundColor: "orangered",
                color: "white",
              }}
              onClick={handleRegister}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* OTP  */}
      <Modal
        show={show2}
        onHide={handleClose2}
        size="sm"
        style={{
          zIndex: "99999",
          position: "absolute",
          top: "30%",
          left: "0%",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ fontSize: "13px" }}>
            An OTP has been sent to your Phone Number
          </span>
          <div className="d-flex gap-1 mt-3 mb-3">
            {/* {OTP.map((digit, index) => (
              <div className="col-sm-2" key={index}>
                <input
                  type="text"
                  className="vi_0"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{ textAlign: "center" }}
                />
              </div>
            ))} */}

            <InputGroup className="mb-2" style={{ background: "white" }}>
              <Form.Control
                type={PasswordShow ? "text" : "password"}
                className="login-input"
                placeholder="Enter OTP"
                aria-describedby="basic-addon1"
                // value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
              <Button
                variant=""
                style={{ borderRadius: "0px", border: "1px solid black" }}
                onClick={() => setPasswordShow(!PasswordShow)}
                className="passbtn"
              >
                {PasswordShow ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </InputGroup>
          </div>
          <div>
            <Button
              variant=""
              className="modal-add-btn w-100"
              onClick={verifyOTP}
            >
              Continue
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar1;

