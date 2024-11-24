import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import "../Styles/Checkout.css";
import { FaCheck, FaEdit } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const Checkout = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const data = location?.state;
  const address = JSON.parse(localStorage.getItem("address"));
  const addresstype = localStorage.getItem("addresstype");
  const Carts = JSON.parse(localStorage.getItem("cart"))
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  
  const [delivarychargetype, setdelivarychargetype] = useState(0);
  const [delivaryaddress, setdelivaryaddress] = useState();
  const [slotdata, setslotdata] = useState();
  const [payid, setpayid] = useState("pay001");
  const [Cutlery, setCutlery] = useState(0);
  const [paymentmethod, setpaymentmethod] = useState("offline");

  const [name, setname] = useState();
  const [buildingaddress, setbuildingaddress] = useState();
  const [pincode, setpincode] = useState();
  const [mobilenumber, setmobilenumber] = useState();



  const [selectedOption, setSelectedOption] = useState("");

  const handleSelection = (deliveryCharge, option) => {
    setdelivarychargetype(deliveryCharge);  // Sets the delivery charge
    setSelectedOption(option);              // Sets the selected option
  };


  //scroll window top
  useEffect(() => {});
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const d = new Date();

  const formattedProducts = Carts?.map((item) => ({
    foodItemId: item.foodItemId,
    totalPrice: item.totalPrice,
    quantity: item.Quantity, // Using Quantity as per the structure
  }));
  const clearCart = async () => {
    // Log to confirm the action
    console.log("Clearing all items from cart");
  
    // Clear the cart in localStorage
    localStorage.removeItem("cart");
  
    // Optional: reload the page to reflect changes
    window.location.reload();
  };
  const [slotsdata, setslotsdata] = useState([]);
  const getslotsdata = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getavailableslots");
      if (res.status === 200) {
        setslotsdata(res.data.Newaddress);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getslotsdata();
  }, []);

const placeorder = async () => {
  try {
    if (!delivarychargetype) {
      return  alert('Please select the Delivary Type!')
    
    } if(!delivaryaddress){
      return  alert('Please select the Delivary address!')
    } if(!slotdata){
      return  alert('Please select slot data!')
    } 
    const config = {
      url: '/admin/addfoodorder',
      method: "post",
      baseURL: "http://dailydishbangalore.com/api/",
      header: { "content-type": "application/json" },
      data: {
        customerId:user?._id,
        allProduct:formattedProducts,
        Placedon:d,  
        delivarylocation:delivaryaddress,
        username:user?.Fname,
        Mobilenumber:Number(user?.Mobile),
        paymentmethod:paymentmethod,
        delivarytype:Number(delivarychargetype),
        payid:payid,
        addressline:user?.Address,
        subTotal:Number(data?.subtotal),
        foodtotal:Number(data?.total),
        allTotal:Number(data?.total+delivarychargetype+Number(Cutlery)),
        tax:Number(data?.tax),
        slot:slotdata,
        Cutlery:Number(Cutlery),
        approximatetime:address?.approximatetime,
        orderdelivarytype:addresstype,
        orderstatus:"inprocess"
      },
    };
    const res = await axios(config);
    if (res.status === 200) {
      alert('Order Placed Successfully') 
      navigate("/orders");
      clearCart()
      window.location.reload(true);
    }
  } catch (error) {
    console.log(error);
    alert('Unable to place Order')
  }
};


const Savedaddressdata = JSON.parse(sessionStorage.getItem("Savedaddress"));

const Handeledata = () => {
  try {
    if (!name) {
      return  alert('Please Enter Name!')
    
    } if(!buildingaddress){
      return  alert('Please Enter Building Address!')
    }   
     if (!pincode) {
      return  alert('Please Enter Pincode!')
    
    } if(!mobilenumber){
      return  alert('Please Enter Mobile Number!')
    } 
     const Savedaddress = {
        name:name,
        buildingaddress:buildingaddress,
        pincode: pincode,
        mobilenumber:mobilenumber,
      };
      // Convert addressData to JSON string and store in localStorage
      sessionStorage.setItem("Savedaddress", JSON.stringify(Savedaddress));
      window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinutes = currentTime.getMinutes();
const currentMinutesSinceMidnight = currentHour * 60 + currentMinutes;

// Define the time ranges in minutes
const openTime = 8 * 60; // 8:00 AM
const closeStart = 23 * 60; // 11:00 PM

const lunchOrderStart = 8 * 60; // 8:00 AM
const lunchOrderEnd = 15 * 60 + 30; // 3:30 PM
const lunchDeliveryStart = 12 * 60; // 12:00 PM
const lunchDeliveryEnd = 16 * 60; // 4:00 PM

const dinnerOrderStart = 15 * 60 + 31; // 3:31 PM
const dinnerOrderEnd = 22 * 60 + 30; // 10:30 PM
const dinnerDeliveryStart = 19 * 60; // 7:00 PM
const dinnerDeliveryEnd = 23 * 60; // 11:00 PM

// Normalize `Mainslots` values for consistent matching
const normalizedSlots = slotsdata?.map(slot => ({
  ...slot,
  Mainslots: slot.Mainslots.trim().replace(/\s+/g, "") // Remove extra spaces
}));

// Determine the available slots based on the current time
let filteredSlots;
let screenMessage = ""; // Message for closed or open status

if (currentMinutesSinceMidnight < openTime || currentMinutesSinceMidnight >= closeStart) {
  filteredSlots = [];
  screenMessage = "We are closed. Operating hours are from 8:00 AM to 11:00 PM.";

} else if (currentMinutesSinceMidnight >= lunchOrderStart && currentMinutesSinceMidnight <= lunchOrderEnd) {
  filteredSlots = normalizedSlots?.filter(slot => slot.Mainslots === "8:00A.Mto3:30P.M");
  screenMessage = "Lunch menu is available for ordering.";
  
} else if (currentMinutesSinceMidnight >= dinnerOrderStart && currentMinutesSinceMidnight <= dinnerOrderEnd) {
  filteredSlots = normalizedSlots?.filter(slot => slot.Mainslots === "3:31to10:30P.M");
  screenMessage = "Dinner menu is available for ordering.";
 
} else if (currentMinutesSinceMidnight >= lunchDeliveryStart && currentMinutesSinceMidnight <= lunchDeliveryEnd) {
  filteredSlots = normalizedSlots?.filter(slot => slot.Mainslots === "12:00P.Mto4:00P.M");
  screenMessage = "Lunch delivery slots are available.";
  
} else if (currentMinutesSinceMidnight >= dinnerDeliveryStart && currentMinutesSinceMidnight <= dinnerDeliveryEnd) {
  filteredSlots = normalizedSlots?.filter(slot => slot.Mainslots === "7:00P.Mto11:00P.M");
  screenMessage = "Dinner delivery slots are available.";

} else {
  filteredSlots = [];
  screenMessage = "No slots available at this time.";
}

return (
    <div>
      <Container>
        <div className="row user-view-ceckout">
          <h3>Delivery & Payment</h3>
          <div className="col-md-6 mb-4 p-3">
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6>Delivery To</h6>
              <Button
                variant=""
                style={{
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  color: "orangered",
                }}
                onClick={handleShow}
              >
                Add new Address +
              </Button>
            </div>
            <div className="Card mt-2 mb-2">
              <div className="d-flex gap-2">
                <div>
                  <input type="radio" name="DeliveryMethod" value="Apartment"  onChange={(e) => setdelivaryaddress(address?.Address)}/>
                </div>
                <div>
                  <div>
                    <h5>{addresstype}</h5>
                  </div>
                  <div className="d-flex">
                  {address?.Address}
                  </div>
                </div>
              </div>
              {Savedaddressdata?(<>
              <div className="d-flex gap-2">
                <div>
                <input
                    type="radio"
                    name="DeliveryMethod"
                    value="Apartment"
                    onChange={() =>
                      setdelivaryaddress(
                        `${Savedaddressdata?.name}, ${Savedaddressdata?.buildingaddress}, ${Savedaddressdata?.mobilenumber}, ${Savedaddressdata?.pincode}`
                      )
                    }
                  />
           </div>
                <div>
                  <div>
                    <h5>{addresstype}</h5>
                  </div>
                  <div className="d-flex">
                  {Savedaddressdata?.name},{Savedaddressdata?.buildingaddress}, {Savedaddressdata?.mobilenumber}, {Savedaddressdata?.pincode}
                  </div>
                </div>
              </div>
              </>):(<></>)}
            </div>

            {/* <div className="Card mt-2 mb-2">
              <div className="d-flex gap-2">
                <div>
                  <input type="radio" name="DeliveryMethod" value="Corporate" />
                </div>
                <div>
                  <div>
                    <h5>Corporate</h5>
                  </div>
                  <div className="d-flex">
                    Rajajinagara, Bangalore
                    <button className="edit-btn" onClick={handleShow}>
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-md-6 mb-4 p-3">
            <h5>Payment Method</h5>
            <div className="Card mt-3 mb-2">
              <div className="d-flex gap-2">
                <div>
                  <BsFillBuildingsFill
                    style={{ fontSize: "20px", color: "orangered" }}
                  />{" "}
                  <input
                    type="radio"
                    name="DeliveryMethod"
                    value="Delivery to Gate/Tower"
                    onChange={(e) => setdelivarychargetype(address?.Delivarycharge)}
                  />
                </div>
                <div>
                  <div>
                    <h5> Delivery to Gate/Tower</h5>
                  </div>
                  <div>
                  {address?.approximatetime} min
                    <div>
                    <b>₹ {address?.Delivarycharge}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         {address?.doordelivarycharge>0?(<>
            <div className="Card mb-2">
              <div className="d-flex gap-2">
                <div>
                  <BsFillDoorOpenFill
                    style={{ fontSize: "20px", color: "orangered" }}
                  />{" "}
                  <input
                    type="radio"
                    name="DeliveryMethod"
                    value="Delivery to Door"
                    onChange={(e) => setdelivarychargetype(address?.doordelivarycharge)}
                  />
                </div>
                <div>
                  <div>
                    <h5> Delivery to Door</h5>
                  </div>
                  <div>
                    {address?.approximatetime} min
                    <div>
                      <b>₹ {address?.doordelivarycharge}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>):(<></>)}
            <div className="Card mb-2">
              <div className="d-flex gap-2" style={{marginLeft:"25px"}}>
                <div>
                  <input
                    type="radio"
                    name="Send Cutley"
                    value="Send Cutley"
                    onChange={(e) => setCutlery("3")}
                  />
                </div>
                <div>
                  <div>
                    <h5> Cutley</h5>
                  </div>
                </div>
              </div>
            </div>
          <h6>Please Select Slots</h6>
          <div className="select-container mt-3 mb-2">
          <select id="slot-select" onChange={(e) => {
            setslotdata(e.target.value);
            }}>
            <option value="slot1">Select Slots</option>
            {filteredSlots?.map((item) => (
              <option key={item._id} value={item.Availableslots}>
                {item.Availableslots}
              </option>
            ))}
          </select>
          </div>
          </div>
        

          <div className="col-md-6 mb-4 p-3">
          <h6>Order Summary</h6>
            {Carts?.map((item)=>{
              return(
                <div className="order-card">
                <div className="d-flex gap-3">
                  <div>
                    <img
                      src={`http://dailydishbangalore.com/Products/${item?.image}`}
                      rounded
                      className="orderspage-img"
                      alt=""
                    />
                  </div>
                  <div>
                    <h5 className="foodcontainer">{item?.foodname}</h5>
                    <span>{item?.quantity
                          } {item?.unit}</span>
  
                    <h6>
                     Total = <b> ₹ {item?.totalPrice} </b>
                    </h6>
                    {/* <div style={{}}>
                      <Button
                        variant=""
                        className="add-to-cart-btn"
                        style={{ width: "fit-content" }}
                      >
                        - 1 +
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
              )
            })}
         
          </div>
          <div className="col-md-6 mb-4 p-3">
            <h6>Payment-Summary</h6>
            <Container>
              <Row className="mb-3">
                <Col xs={6} style={{ fontSize: "18px", color: "grey" }}>
                  <div>Order Total:</div>
                  {delivarychargetype?(<>
                    <div>Delivery Charge:</div>
                  </>):(<></>)}
                 
                  <div>GST and Service Tax:</div>
                  {Cutlery?(<> <div>Cutlery</div></>):(<></>)}
                  <div className="mt-3">
                    <h4 style={{ color: "black" }}>Total:</h4>
                  </div>
                </Col>
                <Col
                  xs={6}
                  style={{
                    textAlign: "right",
                    fontSize: "18px",
                    color: "grey",
                  }}
                >
                  <div>₹ {data?.subtotal}</div>
                
                  {delivarychargetype?(<>
                  <div>₹ {delivarychargetype}</div>
                  </>):(<></>)}
                  <div>₹ {data?.tax}</div>
                  {Cutlery?(<> <div> ₹ {Cutlery}</div></>):(<></>)}
                  {delivarychargetype?(<>
                  <div className="mt-3">
                    <h4 style={{ color: "black" }}>₹  {(data?.total)+(delivarychargetype)+Number(Cutlery)}</h4>
                  </div>
                  </>):(<>
                    <div className="mt-3">
                    <h4 style={{ color: "black" }}>₹  {data?.total}</h4>
                  </div>
                  </>)}
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Button
                    variant=""
                    style={{
                      width: "100%",
                      backgroundColor: "orangered",
                      color: "white",
                    }}
                    onClick={() => placeorder()}
                  >
                    Order Now
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <div className="mobile-checkout">
        {Carts?.map((item) => {
                return (
          <div>
            <div className="d-flex justify-content-between mb-2">
              <div>
                <div className="d-flex gap-2">
                  <div className="veg"></div>
                  <div className="chekout-p-name">{item?.foodname} </div>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <div className="d-flex gap-2">
                        <span>{item?.price} *{" "}{item?.Quantity}</span>
                  </div>
                </div>
                <div>₹  {item?.totalPrice*item?.Quantity}</div>
              </div>
            </div>
          </div>
             );
            })}
            
            <div>
              View Price Breakups &nbsp; <IoIosEye style={{color:"green", fontSize:"20px"}} onClick={() => handleShow1()}/>

            </div>
          <div className="mt-3 ">
            <div className="d-flex justify-content-between">
              <div className="add-address-text">Add New Address</div>
              <div className="add-icon" onClick={() => handleShow()}>
                <span>+</span>
              </div>
            </div>
          </div>
          <div className="Card mt-2 mb-2">
              <div className="d-flex gap-2">
                <div>
                  <input type="radio" name="DeliveryMethod" value="Apartment"  onChange={(e) => setdelivaryaddress(address?.Address)}/>
                </div>
                <div>
                  <div>
                    <h5>{addresstype}</h5>
                  </div>
                  <div className="d-flex">
                  {address?.Address}
                  </div>
                </div>
              </div>
              {Savedaddressdata?(<>
              <div className="d-flex gap-2">
                <div>
                <input
                    type="radio"
                    name="DeliveryMethod"
                    value="Apartment"
                    onChange={() =>
                      setdelivaryaddress(
                        `${Savedaddressdata?.name}, ${Savedaddressdata?.deliveryaddress}, ${Savedaddressdata?.mobilenumber}, ${Savedaddressdata?.pincode}`
                      )
                    }
                  />
           </div>
                <div>
                  <div>
                    <h5>{addresstype}</h5>
                  </div>
                  <div className="d-flex">
                  {Savedaddressdata?.name},{Savedaddressdata?.delivaryaddress}, {Savedaddressdata?.mobilenumber}, {Savedaddressdata?.pincode}
                  </div>
                </div>
              </div>
              </>):(<></>)}
            </div>
          <div>
            <div>
              <h4
                style={{
                  textAlign: "center",
                  // color: "gray",
                  padding: "5px 0px",
                }}
              >
                Delivery Type
              </h4>
            </div>

            <div className="d-flex justify-content-between mt-2 mb-2">
              <div
                style={{ width: "100%" }}
                variant={selectedOption === "apartment" ? "white" : ""}
                className={`selection-tab ${
                  selectedOption === "apartment" ? "active" : ""
                }`}
                onClick={() => handleSelection(address?.Delivarycharge,"apartment")}
              >
                {selectedOption === "apartment" && (
                  <div className="top-right-icon">
                    <FaCheck />
                  </div>
                )}
                <img src="../Assets/Tower.jpg" alt="" className="tower-img" />
                <div className="tower-charge">₹ {address?.Delivarycharge}</div>
                <div className="delivery-type">Delivery to Gate/Tower</div>
              </div>

              <div className="verticle"></div>
              {address?.doordelivarycharge>0?(<>
              <div
                style={{ width: "100%" }}
                variant={selectedOption === "corporate" ? "white" : ""}
                className={`selection-tab ${
                  selectedOption === "corporate" ? "active" : ""
                }`}
                onClick={() => handleSelection(address?.doordelivarycharge,"corporate")}
              >
                {selectedOption === "corporate" && (
                  <div className="top-right-icon">
                    <FaCheck />
                  </div>
                )}
                <img src="../Assets/Door.jpg" alt="" className="tower-img" />
                <div className="tower-charge">₹ {address?.doordelivarycharge}</div>
                <div className="delivery-type">Delivery to Door</div>
              </div>
              </>):(<></>)}
            </div>
          </div>

          {/* <div className="select-container mt-3 mb-2"> */}

          {/* <select id="slot-select">
                <option value="slot1">Select Slots</option>
                <select id="slot-select">
                  <option value="slot1">Select Slots</option>
                  {filteredSlots?.map((item) => (
                    <option key={item._id} value={item.Availableslots}>
                      {item.Availableslots}
                    </option>
                  ))}
                </select>
              </select> */}

         <h6>Please Select Slots</h6>
          <div className="select-container mt-3 mb-2">
          <select id="slot-select"  onChange={(e) => {
            setslotdata(e.target.value);
            }}>
            <option value="slot1" >Select Slots</option>
            {filteredSlots?.map((item) => (
              <option key={item._id} value={item.Availableslots}>
                {item.Availableslots}
              </option>
            ))}
          </select>
          </div>
          {/* </div> */}
        {delivaryaddress?(<>
          <div>
            <h4>Delivery To: </h4>
            <div className="d-flex gap-3 mt-3">
              <div>
                <img
                  src="../Assets/dlocaton.png"
                  alt=""
                  style={{ width: "50px" }}
                />
              </div>
              <div className="delivr-location">
                {delivaryaddress}
              </div>
            </div>
          </div>
          </>):(<></>)}
          <div>
            {Cutlery?(<>
            <Button
                    variant=""
                    style={{
                      width: "100%",
                      backgroundColor: "orangered",
                      color: "white",
                    }}
                    onClick={() => placeorder()}
                  >
                    Continue to Pay | {data?.total+(delivarychargetype)+Number(Cutlery)}
                  </Button>
                  </>):(<>
                    <Button
                    variant=""
                    style={{
                      width: "100%",
                      backgroundColor: "orangered",
                      color: "white",
                    }}
                    onClick={() => placeorder()}
                  >
                    Continue to Pay | {(data?.total+delivarychargetype)}
                  </Button>
                  </>)}
          </div>
        </div>
      </Container>

      {/* New address  */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              style={{ marginTop: "18px" }}
              onChange={(e) => setname(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Enter Flat No, Building Name ,Address"
              style={{ marginTop: "18px" }}
              onChange={(e) => setbuildingaddress(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Enter Pincode"
              style={{ marginTop: "18px" }}
              onChange={(e) => setpincode(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              style={{ marginTop: "18px" }}
              onChange={(e) => setmobilenumber(e.target.value)}
            />
            <Button
              variant=""
              className="modal-add-btn"
              style={{ width: "100%", marginTop: "24px" }}
              onClick={()=>Handeledata()}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

{/* price brakup  */}
      <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton>
          <Modal.Title>Price Breakups </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
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
                      <div>₹ {data?.subtotal}</div>
                      <div>₹ {data?.tax}</div>
                      <div>
                      <b>₹ {data?.total}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Checkout;
