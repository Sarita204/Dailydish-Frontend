import React, { useEffect, useState } from "react";
import {
  Card,
  Carousel,
  Container,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Button, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import { IoTrashBin } from "react-icons/io5";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaCheck, FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import "../Styles/Home.css";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const Navigate = useNavigate();

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
  };

 

  const [cartCount, setCartCount] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleShow = () => {
    setCartCount(cartCount + 1);
    setIsCartVisible(true);
  };

  //scroll window top
  useEffect(() => {});
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [show4, setShow4] = useState(false);
  
  const handleShow4 = () => setShow4(true);
  const handleClose4 = () => setShow4(false);
  // otp
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [fooditemdata, setfooditemdata] = useState([]);
  const getfooditems = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getFoodItems");
      if (res.status === 200) {
        setfooditemdata(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfooditems();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const addCart = async (item) => {
    const newCartItem = {
      foodItemId: item._id,
      price: item?.foodprice,
      totalPrice: item?.totalprice,
      image:item?.Foodgallery[0]?.image2,
      unit:item?.unit,
      foodname:item?.foodname,
      quantity:item?.quantity,
      Quantity:1,
      gst:item?.gst,
      discount:item?.discount,
    };
  
    // Retrieve existing cart data or initialize as an empty array
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartArray = Array.isArray(cart) ? cart : [];
  
    // Check if item already exists to avoid duplicates
    const itemIndex = cartArray.findIndex(cartItem => cartItem.foodItemId === newCartItem.foodItemId);
  
    if (itemIndex === -1) {
      cartArray.push(newCartItem); // Only add if it doesn't already exist
      localStorage.setItem("cart", JSON.stringify(cartArray));
      window.location.reload();
    } else {
      console.log("Item already in cart");
    }
  };
  
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
  
  const addCart1 = async (item) => {
    const newCartItem = {
      foodItemId: item._id,
      price: item?.foodprice,
      totalPrice: item?.totalprice,
      image:item?.Foodgallery[0]?.image2,
      unit:item?.unit,
      foodname:item?.foodname,
      quantity:item?.quantity,
      Quantity:1,
      gst:item?.gst,
      discount:item?.discount,
    };
  
    // Retrieve existing cart data or initialize as an empty array
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartArray = Array.isArray(cart) ? cart : [];
  
    // Check if item already exists to avoid duplicates
    const itemIndex = cartArray.findIndex(cartItem => cartItem.foodItemId === newCartItem.foodItemId);
  
    if (itemIndex === -1) {
      cartArray.push(newCartItem); // Only add if it doesn't already exist
    
      localStorage.setItem("cart", JSON.stringify(cartArray));
      window.location.reload();
      handleShow()
    } else {
      console.log("Item already in cart");
    }
  };
  
 
  const removeFromCart1 = async (foodItemId) => {
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
  const Carts = JSON.parse(localStorage.getItem("cart"));
  useEffect(()=>{
    if(Carts?.length>0){
      handleShow()
    }
      },[])
  
      const d = new Date();
      let subtotal = 0;
      let total = 0;
      let tax = 0;
    
  if (Carts?.length !== 0) {
    for (let i = 0; i < Carts?.length; i++) {
      subtotal = subtotal + (Carts[i]?.totalPrice * Carts[i]?.Quantity - (Math.round(Number((Carts[i]?.price) * Carts[i]?.Quantity) * (Carts[i]?.gst / 100))))
      total = total + Carts[i]?.totalPrice * Carts[i]?.Quantity
      tax = tax + (Math.round(Number((Carts[i]?.price) * Carts[i]?.Quantity) * (Carts[i]?.gst / 100)))
    }
  }
      const goToCheckout = () => {
        navigate("/checkout", {
          state: {
            subtotal,
            total,
            tax,
          },
        });
      };

      const currentTime = new Date();
const cutoffTime = new Date();
cutoffTime.setHours(12, 30, 0);

  //Registration modal
  const [Fname, setFname] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Address, setAddress] = useState("");
  const [Flatno, setFlatno] = useState("");
  const [OTP, setOTP] = useState(["", "", "", ""]);
  const [PasswordShow, setPasswordShow] = useState(false);
  const [admindata, setadmindata] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow1 = () => setShow(true);
  
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
        handleClose4();
        loginAdmin();
        handleShow2();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
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
       alert("OTP verified successfully");
        handleClose2()
        setOTP("")
        setMobile(" ");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
  return (
    <div>
      <div>
        <Banner />
      </div>

      <Container>
        <div className="row mt-5 mb-4 products-section">
          {fooditemdata?.map((item) => {
            return (
              <div className="col-md-3 mb-2 mt-3" style={{ cursor: "pointer" }}>
                <Card className="product-crd ">
                  <div>
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={`http://dailydishbangalore.com/Products/${item?.Foodgallery[0]?.image2}`}
                        className="product-crd-img"
                      />
                      <div className="stock-available">
                        {item?.foodcategory === "Veg" ? (
                          <>
                            <span className="green-dot"></span>
                          </>
                        ) : (
                          <>
                            <span className="red-dot"></span>
                          </>
                        )}
                      </div>
                      <Button
                        className="stock-bar-container"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <div className="progress flex-grow-1">
                            <div
                              style={{
                                backgroundColor: "#ff4500", // Total stock background
                                width: "100%",
                                overflow: "hidden",
                                position: "relative",
                                height: "5px", // Set your desired height
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "black", // Remaining stock foreground
                                  width: `${
                                    (item?.Remainingstock / item?.totalstock) *
                                    100
                                  }%`,
                                  height: "100%",
                                }}
                                aria-valuenow={item?.Remainingstock}
                                aria-valuemin="0"
                                aria-valuemax={item?.totalstock}
                              ></div>
                            </div>
                          </div>
                          <span>
                            {" "}
                            {item?.Remainingstock}/{item?.totalstock}
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-3 mt-2">
                      <div>
                        <Card.Title style={{ fontSize: "1rem" }}>
                          {item?.foodname}
                        </Card.Title>
                        <Card.Text
                          style={{ color: "#777", fontSize: "0.9rem" }}
                        >
                          {item?.quantity} {item?.unit}
                        </Card.Text>
                      </div>
                      <div>
                        <span className="badge">₹ {item?.totalprice}</span>
                      </div>
                    </div>
                    {item?.blocked === true ? (<>
                      <Button
                      variant=""
                      className="add-to-cart-btn"
                      style={{ width: "100%" }}
                    >
                      Not Available
                    </Button>
                    </>):(<>
                    {Carts?.filter(
                          (items) => items?.foodItemId === item._id
                        )?.length ? (
                          <Button
                          variant=""
                          className="add-to-cart-btn"
                          style={{ width: "100%" }}
                          onClick={() => removeFromCart(item?._id)}
                        >
                          Remove from Cart
                        </Button>
                        ) : (
                          <Button
                      variant=""
                      className="add-to-cart-btn"
                      style={{ width: "100%" }}
                      onClick={() => addCart(item)}
                    >
                      Add to Cart
                    </Button>
                        )}
                   </>)}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mobile-product-box" style={{ marginBottom: "70px" }}>
          <div
            className="d-flex gap-3 mb-2"
            style={{ backgroundColor: "lightblue", padding: "5px" }}
          >
            <div>
              <img
                src="../Assets/cookingss.gif"
                alt=""
                className="praparing-food"
              />
            </div>

            <div>

 {currentTime < cutoffTime ? (
      <div className="prepare-food-text">
        Food is getting prepared. Orders placed now will be delivered from 12:30 PM.
      </div>
    ) : (
      <div className="prepare-food-text">
        Food is being prepared. Orders will be delivered soon.
      </div>
    )}
            </div>
          </div>

          <div className="d-flex gap-2 mb-4">
          {fooditemdata?.map((item) => {
           return (
            <div className="mobl-product-card">
              <div className="prduct-box">
                <Button variant="" className="mbl-processbar">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="mbl-progress flex-grow-1">
                      <div
                        className="mbl-progress-bar"
                        role="progressbar"
                       style={{
                          backgroundColor: "black", // Remaining stock foreground
                          width: `${
                            (item?.Remainingstock / item?.totalstock) *
                            100
                          }%`,
                          height: "100%",
                        }}
                        aria-valuenow={item?.Remainingstock}
                        aria-valuemin="0"
                        aria-valuemax={item?.totalstock}
                      ></div>
                    </div>
                    <span>  {item?.Remainingstock}/{item?.totalstock}</span>
                  </div>
                 </Button>

                <div style={{ position: "relative" }}>
                  <img
                   src={`http://dailydishbangalore.com/Products/${item?.Foodgallery[0]?.image2}`}
                    alt=""
                    className="mbl-product-img"
                  />
                  <div className="mbl-product-corner-price">
                    <b>₹ {item?.totalprice}</b>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <div className="veg"></div>
                <div>
                  <div className="mbl-product-name mb-1"> {item?.foodname}</div>
                  <div>{item?.quantity} {item?.unit}</div>
                </div>
              </div>

              <div className="mt-2">
              {item?.blocked === true ? (
                    <Button
                      variant=""
                      className="add-to-cart-btn"
                      style={{
                        border: "2px solid orangered",
                        fontSize: "16px",
                        width: "100%",
                        padding: "5px",
                      }}
                    >
                      Not Available
                    </Button>
                  ) : (
                    <>
                      {Carts?.filter((items) => items?.foodItemId === item._id)?.length ? (
                        <Button
                          variant=""
                          className="add-to-cart-btn"
                          style={{
                            border: "2px solid orangered",
                            fontSize: "16px",
                            width: "100%",
                            padding: "5px",
                          }}
                          onClick={() => removeFromCart1(item?._id)}
                        >
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button
                          variant=""
                          className="add-to-cart-btn"
                          style={{
                            border: "2px solid orangered",
                            fontSize: "16px",
                            width: "100%",
                            padding: "5px",
                          }}
                          onClick={() => addCart1(item)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </>
                  )}
              {isCartVisible && (
                  <div
                    style={{
                      position: "fixed",
                      bottom: "20px",
                      left: "20px",
                      right: "20px",
                      backgroundColor: "orangered",
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      fontSize: "18px",
                      borderRadius: "10px",
                      zIndex: 1000,
                    }}
                  >
                        {Carts?.map((item) => {
                return (
                  <div className="cart-bx">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-1">
                        <div>
                          <img
                            src={`http://dailydishbangalore.com/Products/${item?.image}`}
                            alt="ProductImage"
                            className="checkout-block-img"
                            style={{width:48,height:42,borderRadius:10}}
                          />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <p style={{ margin: "0px",fontSize:"12px",fontWeight:"bold" }}>{item?.foodname}</p>
                          <p style={{ margin: "0px",fontSize:"8px",fontWeight:"bold" }}>{item?.quantity
                          } {item?.unit}</p>
                          <p style={{ margin: "0px",fontSize:"12px",fontWeight:"bold" }}>₹ {item?.totalPrice}</p>
                        </div>
                      </div>
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
                              color: "white",
                              fontSize: "20px",
                              margin: "auto",
                              textAlign: "center",
                              alignItems: "center",
                              display: "flex",
                              marginTop:"10px",
                              justifyContent: "center",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                );
              })}
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-0">
                        <div>| Rs.{total}</div>
                      </div>
                  

       {user?(<>
                  <a
                     onClick={()=>goToCheckout()}
                    style={{ color: "unset", textDecoration: "none" }}
                  >
                  <div className="d-flex gap-0">
                        <div>View Cart</div>
                        </div>
                        </a>
                  
                </>):(<>
                  <div
                        className="d-flex gap-2"
                        onClick={() => {
                          handleShow4();
                        }}
                      >
                        <div>View Cart</div>
                        </div>
                </>)}
                </div>
                  </div>
                )}
              </div>
            </div>
             );
            })}
          </div>
        </div>
      </Container>

      <Modal show={show4} onHide={handleClose4} style={{ zIndex: "99999" }}>
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

export default Home;
