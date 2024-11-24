import React, { useState,useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../Styles/Myorders.css";
import { FaCheckCircle } from "react-icons/fa";
import { IoFastFoodSharp, IoLocation } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
const OrderHistory = () => {
  const navigate=useNavigate();
  const [Ongoing, setOngoing] = useState(true);
  const [Previous, setPrevious] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setorders] = useState([]);
  const getorders = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getallorders");
      if (res.status === 200) {
        setorders(res.data.order.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getorders();
  }, []);

  const [Data1, setData1] = useState({});
  const [Data12, setData12] = useState({});
  const handleShow4 = (item) => {
    setData1(item);
  }

const handleShow45 = (item) =>{
  setData12(item);
}

// console.log("data====>",Data1)

const d = new Date();

const placeorder = async () => {
  try {
    const config = {
      url: '/admin/addfoodorder',
      method: "post",
      baseURL: "http://dailydishbangalore.com/api/",
      header: { "content-type": "application/json" },
      data: {
        customerId:user?._id,
        allProduct:Data12?.allProduct,
        Placedon:d,
        delivarylocation:Data12?.delivarylocation,
        username:user?.Fname,
        Mobilenumber:Number(user?.Mobile),
        paymentmethod:Data12?.paymentmethod,
        delivarytype:Number(Data12?.delivarytype),
        payid:Data12?.payid,
        addressline:user?.Address,
        subTotal:Number(Data12?.subTotal),
        foodtotal:Number(Data12?.foodtotal),
        allTotal:Number(Data12?.allTotal+Data12?.delivarytype),
        tax:Number(Data12?.tax),
        slot:"2/2/2024",
        approximatetime:Number(Data12?.approximatetime),
        orderdelivarytype:Data12?.addresstype,
        orderstatus:"inprocess"
      },
    };
    const res = await axios(config);
    if (res.status === 200) {
      alert('Order Placed Successfully') 
      navigate("/orders");
      window.location.reload(true);
    }
  } catch (error) {
    console.log(error);
    alert('Unable to place Order')
  }
};

  return (
    <div>
      <Container>
        <div className="web-screen">
          {Ongoing ? (
            <>
              <div className="row mt-3 mb-3">
                <div className="mt-3 mb-3">
                  <h4>My Orders</h4>
                </div>
                <div className="d-flex gap-3 ">
                  <div
                    onClick={() => {
                      setOngoing(true);
                      setPrevious(false);
                    }}
                  >
                    <Button variant="" className="modal-close-btn">
                      Ongoing
                    </Button>
                  </div>

                  <div
                    onClick={() => {
                      setOngoing(false);
                      setPrevious(true);
                    }}
                  >
                    <Button variant="" className="modal-close-btn ">
                      Previous
                    </Button>
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  {orders?.filter((item)=>item?.customerId===user?._id && item?.orderstatus==="inprocess").map((items)=>{
                    return(
                      <div className="order-card">
                         {items?.allProduct?.map(Item => {
                     return(
                      <div className="d-flex gap-3" onClick={() => {
                        handleShow4(items);
                      }}>
                        <div>
                          <img
                             src={`http://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                            rounded
                            className="orderspage-img"
                            alt=""
                          />
                        </div>
                        <div>
                          <h5>{Item?.foodItemId?.foodname}</h5>
                          <span>{Item?.foodItemId?.quantity}{Item?.foodItemId?.unit}</span>
  
                          <h6>
                             &nbsp; Total = <b> ₹ {Item?.foodItemId?.totalprice} </b>
                          </h6>
                        </div>
                      </div>
                          )})}
                    </div>
                    )
                  })}
                 
                </div>
        {Data1 && Object.keys(Data1).length?(<>
                <div className="col-md-6 mb-2">
                  <div>
                    <h4 style={{ textDecoration: "underline" }}>
                      Order Information
                    </h4>

                    <div className="d-flex">
                      <div>
                        <img src="../Assets/bike.png" alt="" className="bike" />
                      </div>
                      <div>
                        <div className="road"></div>
                      </div>
                    </div>

                    <div>
                      <b>{(Data1?.approximatetime)} minutes</b>
                    </div>

                    <div className="delivery-status mt-3">
                      <h6 style={{ fontWeight: "bold", color: "red" }}>
                        Delivery Status
                      </h6>
                      <div className="status-container mt-3">
                        {/* Step 1: Cooking */}
                        <div>
                          {Data1?.status==="Cooking"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}
                         

                          <p className="status-label">Cooking</p>
                        </div>

                        {/* Step 2: Packing */}
                        <div>
                            {Data1?.status==="Packing"?(<>  
                          <div className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}

                          <p className="status-label">Packing</p>
                        </div>

                        {/* Step 3: On the way */}
                        <div>
                            {Data1?.status==="Ontheway"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}
                          <p className="status-label">On the way</p>
                        </div>

                        {/* Step 4: Delivered */}
                        <div>
                        {Data1?.status==="Delivered"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                          </div>
                            </>)}
                          <p className="status-label">Delivered</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <p style={{ color: "green", textAlign: "center" }}>
                      <img
                        src="../Assets/hotfood.avif"
                        alt=""
                        style={{ width: "40px" }}
                      />{" "}
                      &nbsp; Status: {Data1?.status}
                    </p>
                    <hr />

                    {/* <p style={{ marginTop: "18px" }}>
                      Order details sent on SMS
                    </p> */}
                    <p style={{ marginTop: "18px", fontWeight: "bold" }}>
                      Order ID : {Data1?.orderId}
                    </p>
                    <hr />
                    <Button
                      variant="light"
                      style={{
                        backgroundColor: "white",
                        borderColor: "orange",
                      }}
                      onClick={() => navigate('/Invoice', { state: { item: Data1} })}
                    >
                      Download Invoice
                    </Button>
                    {/* <Button
                      variant=""
                      className="modal-add-btn"
                      style={{ marginLeft: "10px" }}
                    >
                      Order Again
                    </Button> */}
                  </div>
                </div>
                </>):(<>
                <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
                </div>
                </>)}
              </div>
            </>
          ) : (
            <></>
          )}

          {Previous ? (
            <>
              <div>
                <div className="row mt-3 mb-3">
                  <div className="mt-3 mb-3">
                    <h4>My Orders</h4>
                  </div>
                  <div className="d-flex gap-3 ">
                    <div
                      onClick={() => {
                        setOngoing(true);
                        setPrevious(false);
                      }}
                    >
                      <Button variant="" className="modal-close-btn" >
                        Ongoing
                      </Button>
                    </div>

                    <div
                      onClick={() => {
                        setOngoing(false);
                        setPrevious(true);
                      }}
                    >
                      <Button variant="" className="modal-close-btn ">
                        Previous
                      </Button>
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                  {orders?.filter((item)=>item?.customerId===user?._id && item?.status==="Delivered").map((items)=>{
                    return(
                      <div className="order-card">
                         {items?.allProduct?.map(Item => { 
                     return(
                      <div className="d-flex gap-3" onClick={() => {
                        handleShow45(items);
                      }}>
                        <div>
                          <img
                             src={`http://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                            rounded
                            className="orderspage-img"
                            alt=""
                          />
                        </div>
                        <div>
                          <h5>{Item?.foodItemId?.foodname}</h5>
                          <span>{Item?.foodItemId?.quantity}{Item?.foodItemId?.unit}</span>
  
                          <h6>
                             &nbsp; Total = <b> ₹ {items?.allTotal} </b>
                          </h6>
                        </div>
                      </div>
                          )})}
                    </div>
                    )
                  })}
                  </div>
              {Data12 && Object.keys(Data12).length?(<>
                  <div className="col-md-6 mb-2">
                    <div>
                      <h4 style={{ textDecoration: "underline" }}>
                        Order Information
                      </h4>
                      <h6>
                        {" "}
                        <FaCheckCircle style={{ color: "green" }} /> Food has
                        been Delivered
                      </h6>

                      <div className="mt-3">
                        {/* <h6>How Satisfied are Our driver bservice?</h6> */}
                        <div className="d-flex gap-2">
                          {/* <div>
                            <img
                              src="../Assets/delivaryboy.jpg"
                              alt=""
                              className="orderspage-img"
                            />
                          </div> */}
                          {/* <div>
                            <b>John Das</b>
                            <div>Driver</div>
                            <div>
                              <img
                                src="../Assets/rating.png"
                                alt=""
                                className="rating-img"
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <hr />

                      <h6>
                        <b>Delivery Details</b>
                      </h6>
                      <div className="d-flex gap-2 mb-2">
                        <IoFastFoodSharp
                          style={{ fontSize: "20px", color: "orangered" }}
                        />
                        <div className="">
                          <p>Restaurant Address</p>
                          <p style={{ fontWeight: "bold" }}>Dailydish Hotel</p>
                          <p>{Data12?.approximatetime} min reached</p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mb-2">
                        <IoLocation
                          style={{ fontSize: "20px", color: "orangered" }}
                        />
                        <div className="">
                          <p>Delivery Address</p>
                          <h6>{Data12?.delivarylocation
                          },{Data12?.addressline}</h6>
                        </div>
                      </div>
                      <hr />
                      <h6>
                        <b>Payment Summary</b>
                      </h6>
                      <Row>
                        <Col xs={5} style={{ fontSize: "15px" }}>
                          <div>Order Total:</div>
                          <div>Delivery Charges:</div>
                          <div>GST, Services Tax:</div>
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            Total:
                          </div>
                        </Col>
                        <Col xs={3} style={{ fontSize: "15px" }}>
                          <div>₹ {Data12?.subTotal}</div>
                          <div>₹ {Data12?.delivarytype}</div>
                          <div>₹ {Data12?.tax}</div>
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            ₹ {Data12?.allTotal}
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          style={{
                            backgroundColor: "white",
                            borderColor: "orange",
                          }}
                          onClick={() => navigate('/Invoice',{ state: { item: Data12 } })}
                        >
                          Download Invoice
                        </Button>
                        <Button variant="" className="modal-add-btn" onClick={()=>placeorder()}>
                          Order Again
                        </Button>
                      </div>
                    </div>
                  </div>
                  </>):(<>
                    <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
                </div>
                  </>)}
                </div>
              </div>
            </>
          ) : (
            <>
            
            </>
          )}
        </div>

        <div className="mobile-view-orderlist">
          <div>
            <div>
              {Ongoing ? (
                <>
                  {/* <div className="my-order-first-tab">
                    <div>
                      <MdOutlineNotificationsActive
                        style={{ color: "orangered", fontSize: "20px" }}
                      />
                    </div>
                    <div>Dinner order starts from 7 PM</div>
                  </div> */}

                  <div className="row mt-3 mb-3">
                    <div className="mt-3 mb-3">
                      <h4>My Orders</h4>
                    </div>
                    <div className="d-flex gap-3 ">
                      <div
                        onClick={() => {
                          setOngoing(true);
                          setPrevious(false);
                        }}
                      >
                        <Button variant="" className="modal-close-btn">
                          Ongoing
                        </Button>
                      </div>

                      <div
                        onClick={() => {
                          setOngoing(false);
                          setPrevious(true);
                        }}
                      >
                        <Button variant="" className="modal-close-btn ">
                          Previous
                        </Button>
                      </div>
                    </div>

                    <div className="col-md-6 mb-2">
                         {orders?.filter((item)=>item?.customerId===user?._id && item?.orderstatus==="inprocess").map((items)=>{
                    return(
                      <div className="order-card">
                         {items?.allProduct?.map(Item => {
                     return(
                      <div className="d-flex gap-3" onClick={() => {
                        handleShow4(items);
                      }}>
                        <div>
                          <img
                             src={`http://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                            rounded
                            className="orderspage-img"
                            alt=""
                          />
                        </div>
                        <div>
                          <h5>{Item?.foodItemId?.foodname}</h5>
                          <span>{Item?.foodItemId?.quantity}{Item?.foodItemId?.unit}</span>
  
                          <h6>
                             &nbsp; Total = <b> ₹ {Item?.foodItemId?.totalprice} </b>
                          </h6>
                        </div>
                      </div>
                          )})}
                    </div>
                    )
                  })}
                    </div>
                    {Data1 && Object.keys(Data1).length?(<>
                    <div className="col-md-6 mb-2">
                      <div>
                        <h4 style={{ textDecoration: "underline" }}>
                          Order Information
                        </h4>

                        <div className="mb-2">
                          <div>
                            <div className="d-flex">
                              <div>
                                <img
                                  src="../Assets/couriorbikemove.gif"
                                  alt=""
                                  className="bike"
                                />
                              </div>
                              <div>
                                <div className="road"></div>
                              </div>
                            </div>

                            <div></div>

                            <div className="mb-2">
                              <h4 style={{ textAlign: "center" }}>
                                Ariving at Slot
                              </h4>
                            </div>
                            <div>
                              <h5
                                style={{
                                  textAlign: "center",
                                  color: "#34b934",
                                }}
                              >
                                Delivery Status
                              </h5>
                            </div>

                            <div className="status-container mt-3">
                        {/* Step 1: Cooking */}
                        <div>
                          {Data1?.status==="Cooking"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}
                         

                          <p className="status-label">Cooking</p>
                        </div>

                        {/* Step 2: Packing */}
                        <div>
                            {Data1?.status==="Packing"?(<>  
                          <div className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}

                          <p className="status-label">Packing</p>
                        </div>

                        {/* Step 3: On the way */}
                        <div>
                            {Data1?.status==="Ontheway"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                            <div className="line"></div>
                          </div>
                            </>)}
                          <p className="status-label">On the way</p>
                        </div>

                        {/* Step 4: Delivered */}
                        <div>
                        {Data1?.status==="Delivered"?(<>  
                          <div  className="status-step completed">
                          <img
                              src="../Assets/hotfood.avif"
                              alt=""
                              style={{ width: "25px" }}
                            />
                           <div className="line"></div>
                            </div>
                            {" "}</>):(<>
                              <div className="status-step completed" >
                            <div className="circle">✔</div>
                          </div>
                            </>)}
                          <p className="status-label">Delivered</p>
                        </div>
                      </div>
                            <div
                              style={{ color: "green", textAlign: "center" }}
                            >
                              <img
                                src="../Assets/hotfood.avif"
                                alt=""
                                style={{ width: "40px" }}
                              />{" "}
                              &nbsp; <b>Status: {Data1?.status}</b>
                            </div>
                            <b>Delivery Time {(Data1?.approximatetime)} minutes</b>
                            <p
                              style={{
                                marginTop: "18px",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              Order ID : {Data1?.orderId}
                            </p>

                            <div className="mt-3 text-center">
                              <Button
                                variant="light"
                                style={{
                                  backgroundColor: "white",
                                  borderColor: "orange",
                                }}
                                onClick={() => navigate('/Invoice', { state: { item: Data1 } })}
                              >
                                Download Invoice
                              </Button>
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>):(<>
                <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
                </div>
                </>)}
                  </div>
                </>
              ) : (
                <></>
              )}

              {Previous ? (
                <>
                  <div>
                    <div className="row mt-3 mb-3">
                      <div className="mt-3 mb-3">
                        <h4>My Orders</h4>
                      </div>
                      <div className="d-flex gap-3 ">
                        <div
                          onClick={() => {
                            setOngoing(true);
                            setPrevious(false);
                          }}
                        >
                          <Button variant="" className="modal-close-btn">
                            Ongoing
                          </Button>
                        </div>

                        <div
                          onClick={() => {
                            setOngoing(false);
                            setPrevious(true);
                          }}
                        >
                          <Button variant="" className="modal-close-btn ">
                            Previous
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-6 mb-2">
                      {orders?.filter((item)=>item?.customerId===user?._id && item?.status==="Delivered").map((items)=>{
                    return(
                      <div className="order-card">
                         {items?.allProduct?.map(Item => { 
                     return(
                      <div className="d-flex gap-3" onClick={() => {
                        handleShow45(items);
                      }}>
                        <div>
                          <img
                             src={`http://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                            rounded
                            className="orderspage-img"
                            alt=""
                          />
                        </div>
                        <div>
                          <h5>{Item?.foodItemId?.foodname}</h5>
                          <span>{Item?.foodItemId?.quantity}{Item?.foodItemId?.unit}</span>
  
                          <h6>
                             &nbsp; Total = <b> ₹ {items?.allTotal} </b>
                          </h6>
                        </div>
                      </div>
                          )})}
                    </div>
                    )
                  })}
                      </div>
                      {Data12 && Object.keys(Data12).length?(<>
                  <div className="col-md-6 mb-2">
                    <div>
                      <h4 style={{ textDecoration: "underline" }}>
                        Order Information
                      </h4>
                      <h6>
                        {" "}
                        <FaCheckCircle style={{ color: "green" }} /> Food has
                        been Delivered
                      </h6>

                      <div className="mt-3">
                        {/* <h6>How Satisfied are Our driver bservice?</h6> */}
                        <div className="d-flex gap-2">
                          {/* <div>
                            <img
                              src="../Assets/delivaryboy.jpg"
                              alt=""
                              className="orderspage-img"
                            />
                          </div> */}
                          {/* <div>
                            <b>John Das</b>
                            <div>Driver</div>
                            <div>
                              <img
                                src="../Assets/rating.png"
                                alt=""
                                className="rating-img"
                              />
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <hr />

                      <h6>
                        <b>Delivery Details</b>
                      </h6>
                      <div className="d-flex gap-2 mb-2">
                        <IoFastFoodSharp
                          style={{ fontSize: "20px", color: "orangered" }}
                        />
                        <div className="">
                          <p>Restaurant Address</p>
                          <p style={{ fontWeight: "bold" }}>Dailydish Hotel</p>
                          <p>{Data12?.approximatetime} min reached</p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mb-2">
                        <IoLocation
                          style={{ fontSize: "20px", color: "orangered" }}
                        />
                        <div className="">
                          <p>Delivery Address</p>
                          <h6>{Data12?.delivarylocation
                          },{Data12?.addressline}</h6>
                        </div>
                      </div>
                      <hr />
                      <h6>
                        <b>Payment Summary</b>
                      </h6>
                      <Row>
                        <Col xs={5} style={{ fontSize: "15px" }}>
                          <div>Order Total:</div>
                          <div>Delivery Charges:</div>
                          <div>GST, Services Tax:</div>
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            Total:
                          </div>
                        </Col>
                        <Col xs={3} style={{ fontSize: "15px" }}>
                          <div>₹ {Data12?.subTotal}</div>
                          <div>₹ {Data12?.delivarytype}</div>
                          <div>₹ {Data12?.tax}</div>
                          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                            ₹ {Data12?.allTotal}
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          style={{
                            backgroundColor: "white",
                            borderColor: "orange",
                          }}
                          onClick={() => navigate('/Invoice', { state: { item: Data12 } })}
                        >
                          Download Invoice
                        </Button>
                        <Button variant="" className="modal-add-btn" onClick={()=>placeorder()}>
                          Order Again
                        </Button>
                      </div>
                    </div>
                  </div>
                  </>):(<>
                    <div div className="col-md-6 mb-2">
                <h2>Please Select Your Order</h2>
                </div>
                  </>)}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>


      </Container>
    </div>
  );
};

export default OrderHistory;
