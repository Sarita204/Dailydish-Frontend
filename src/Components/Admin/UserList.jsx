import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { BsFillEyeFill } from "react-icons/bs";
import { PiBasketFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { FaAngleRight } from "react-icons/fa";
import { MdOutlineFileCopy } from "react-icons/md";
import axios from "axios";
import * as XLSX from "xlsx";
import moment from "moment";

const UserList = () => {
  // Block modal
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // ORDER HISTORY modal
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ORDER Invoices modal
  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //User list get method Integration
  const [Adduser, setAdduser] = useState([]);
  const getAdduser = async () => {
    try {
      let res = await axios.get(
        "http://dailydishbangalore.com/api/User/registeruser"
      );
      if (res.status === 200) {
        setAdduser(res.data.success.reverse());
        setNoChangeData(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdduser();
  }, []);


  //user list Block and Unblock integartion
  const handleBlockUnblock = async (userId) => {
    try {
      const config = {
        url: `/User/blockuser/${userId?._id}`,
        method: "put",
        baseURL: "http://dailydishbangalore.com/api",
        headers: { "Content-Type": "application/json" },
      };

      const res = await axios(config);
      if (res.status === 200) {
        alert(
          userId?.BlockCustomer === true
            ? "Successfully blocked"
            : "Successfully Unblocked"
        );
        getAdduser();
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "An error occurred.");
    }
  };


  //Pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 10;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Adduser.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Adduser.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== firstIndex) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== lastIndex) {
      setCurrentpage(currenpage + 1);
    }
  }

  // Search filter
  const [nochangedata, setNoChangeData] = useState([]);
  const [searchH, setSearchH] = useState("");

  const handleFilterH = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchH(searchTerm);
    if (searchTerm !== "") {
      const filteredData = nochangedata.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      setAdduser(filteredData);
    } else {
      setAdduser(nochangedata);
    }
  };

  // ==============DATE FILTER======================//

  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

  const filterData = () => {
    if (!startDate) return alert("Please select a 'from' date");
    if (!endDate) return alert("Please select a 'to' date");

    // Convert input dates to moment objects
    const startDateObj = moment(startDate, "YYYY-MM-DD");
    const endDateObj = moment(endDate, "YYYY-MM-DD");

    // Ensure the end date is not before the start date
    if (endDateObj.isBefore(startDateObj)) {
      return alert("End date cannot be before the start date");
    }

    // Filter Addregister array based on the date range
    const filteredData = Adduser.filter((item) => {
      const itemDate = moment(item?.updatedAt, "YYYY-MM-DD");


      return (
        itemDate.isValid() &&
        itemDate.isSameOrAfter(startDateObj) &&
        itemDate.isSameOrBefore(endDateObj)
      );
    });
    // Update the state with the filtered data
    if (filteredData.length > 0) {
      setAdduser(filteredData);
    } else {
      alert("No records found within the selected date range");
      setAdduser([]); // Optionally, clear the data if no records found
    }
  };

  function clearbutton() {
    setendDate("");
    setstartDate("");
    getAdduser();
  }

  // Export Excel
  const handleExportExcel = () => {
    // Create a custom mapping for the column headers
    const customHeaders = Adduser.map((item) => ({
      "Date / Time": moment(item.updatedAt).format("MM/DD/YYYY, hh:mm A"),
      "User ID": item._id,
      Name: item.Fname,
      "MObile Number": item.Mobile,
      "Email ID": item.Email,
      "Total Order": item.Nooforders,
      "Latest Order": item.Lastorderdate,
      "Total Amount": item.lastorderamount,
      Address: item.Address,
    }));

    // Convert your custom data to an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(customHeaders);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User List ");

    // Download the Excel file
    XLSX.writeFile(workbook, "UserList.xlsx");
  };

  return (
    <div>
      <div className="d-flex gap-3 mb-2">
        <div className="col-lg-3 d-flex justify-content-center">
          <div class="input-group ">
            <span class="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleFilterH}
              value={searchH}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="input-group">
            <label htmlFor="" className="m-auto">
              From: &nbsp;
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="date-filter"
              value={startDate}
              onChange={(e) => setstartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="input-group">
            <label htmlFor="" className="m-auto">
              To: &nbsp;
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="date-filter"
              value={endDate}
              onChange={(e) => setendDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button variant="" className="modal-add-btn" onClick={filterData}>Submit</Button>
        </div>
        <div>
          <Button variant="danger" onClick={clearbutton}>
            Clear
          </Button>
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">User List</h2>
          <Button variant="success" onClick={handleExportExcel}>
            Export Excel
          </Button>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>Registered Date</th>
                <th>User ID</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>Total Orders</th>
                <th>Lastest Order</th>
                <th>Total Amount</th>


                {/* <th>Order History</th> */}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td style={{ paddingTop: "20px" }}>{i + 1 + firstIndex}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {moment(item?.updatedAt).format("MM/DD/YYYY h:mm A")}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item?._id}</td>
                    <td style={{ paddingTop: "20px" }}>
                      <img
                        src={`http://dailydishbangalore.com/Customer/${item?.profileImage}`}
                        alt="pic"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td style={{ paddingTop: "20px" }}>{item?.Fname}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.Mobile}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.Email}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.Address}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.Nooforders}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.Lastorderdate}</td>
                    <td style={{ paddingTop: "20px" }}>{item?.lastorderamount}</td>

                    <td style={{ paddingTop: "20px" }}>
                      {item?.BlockCustomer === true ? (
                        <Button variant="danger" onClick={() => handleBlockUnblock(item)}>
                          Block
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => handleBlockUnblock(item)}
                        >
                          UnBlocked
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div>
            <nav>
              <ul className="pagination">
                <li className="not-allow">
                  <span>
                    <li className="next-prev">
                      <a
                        onClick={() => {
                          prevpage();
                        }}
                      >
                        &lt;
                      </a>{" "}
                    </li>
                  </span>
                </li>
                {numbers?.map((n, i) => {
                  return (
                    <li className="active-next" key={i}>
                      <a
                        href="#"
                        className="inactive"
                        onClick={() => changePage(n)}
                      >
                        {n}
                      </a>
                    </li>
                  );
                })}

                <li className="not-allow">
                  <span>
                    <li
                      className="next-prev"
                      onClick={() => {
                        nextpage();
                      }}
                    >
                      &gt;{" "}
                    </li>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* order Histry modal  */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Order History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="row p-2 mt-3 mb-2">
                <div className="col-md-10">
                  <div className="order-icond-text">
                    <div>
                      <span>
                        <PiBasketFill style={{ fontSize: "25px" }} />
                      </span>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <b>
                        ORD926439268 · <span>₹213</span>
                      </b>{" "}
                      <br />
                      <span>Placed on friday, 14 jun 2024, 11:24 am</span>
                    </div>

                    <div>
                      <Button variant="" className="delivered-btn">
                        Delivered
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 mt-3">
                  <Button
                    variant=""
                    style={{
                      backgroundColor: "white",
                      color: "green",
                      border: "1px solid green",
                    }}
                  >
                    <BsFillEyeFill
                      style={{ fontSize: "20px" }}
                      onClick={handleShow2}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delet modal  */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure?
                  <br /> you want to Block this Customer?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose4}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
            // onClick={Deleteuserlist}
            >
              Block
            </Button>
          </Modal.Footer>
        </Modal>

        {/* View Order Summary  */}
        <Modal
          show={show2}
          onHide={handleClose2}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <h4>Order Summary</h4>
                <div>Arrived at 1-10 PM </div>
                <div>
                  <b>4 Items in this Order</b>
                </div>
                <hr />
              </div>

              <div>
                <div className="row m-2 align-items-center">
                  <div className="col-md-10">
                    <div className="order-icond-text">
                      <div className="col-md-2">
                        <img
                          src="../Assets/leafies.jpg"
                          alt=""
                          style={{ width: "90px", height: "80px" }}
                        />
                      </div>

                      <div style={{ textAlign: "left" }}>
                        <b>Spinach</b> <br />
                        <span>200 g x 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <b>₹ 29</b>
                    </p>
                  </div>
                </div>

                <div className="row m-2 align-items-center">
                  <div className="col-md-10">
                    <div className="order-icond-text">
                      <div className="col-md-2">
                        <img
                          src="../Assets/leafies.jpg"
                          alt=""
                          style={{ width: "90px", height: "80px" }}
                        />
                      </div>

                      <div style={{ textAlign: "left" }}>
                        <b>Spinach</b> <br />
                        <span>200 g x 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <b>₹ 29</b>
                    </p>
                  </div>
                </div>

                <div className="row m-2 align-items-center">
                  <div className="col-md-10">
                    <div className="order-icond-text">
                      <div className="col-md-2">
                        <img
                          src="../Assets/leafies.jpg"
                          alt=""
                          style={{ width: "90px", height: "80px" }}
                        />
                      </div>

                      <div style={{ textAlign: "left" }}>
                        <b>Spinach</b> <br />
                        <span>200 g x 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <b>₹ 29</b>
                    </p>
                  </div>
                </div>

                <div className="row m-2 align-items-center">
                  <div className="col-md-10">
                    <div className="order-icond-text">
                      <div className="col-md-2">
                        <img
                          src="../Assets/leafies.jpg"
                          alt=""
                          style={{ width: "90px", height: "80px" }}
                        />
                      </div>

                      <div style={{ textAlign: "left" }}>
                        <b>Spinach</b> <br />
                        <span>200 g x 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p>
                      <b>₹ 29</b>
                    </p>
                  </div>
                </div>

                <div className="row m-2 mt-3 align-items-center">
                  <b>Bill Details</b>
                  <div className="col-md-10 mb-2">
                    <div>
                      <div>MRP</div>
                      <div>Product discount</div>
                      <div>Item total</div>
                      <div>Handling charge</div>
                      <div>Delivery charges</div>
                      <div>Feeding India donation</div>
                      <div>
                        <b>Bill total</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 mb-2">
                    <div style={{ textAlign: "left" }}>
                      <div>₹237</div>
                      <div>- ₹40</div>
                      <div>₹230</div>
                      <div>+ ₹2</div>
                      <div>+25</div>
                      <div>+ ₹1</div>
                      <div>
                        <b>₹246</b>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row m-2 mt-3 align-items-center">
                  <b>Order details</b>
                  <div>
                    <div className="mt-2 mb-2">
                      <p style={{ margin: "0" }}>Order ID</p>
                      <p style={{ margin: "0" }}>
                        ORD45623595262{" "}
                        <span>
                          <MdOutlineFileCopy />
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 mb-2">
                      <p style={{ margin: "0" }}>Payment</p>
                      <p style={{ margin: "0" }}>Paid Online</p>
                    </div>

                    <div className="mt-2 mb-2">
                      <p style={{ margin: "0" }}>Deliver to</p>
                      <p style={{ margin: "0" }}>
                        Singapura layout, Ms palya , Vidyaranyapura, Bangalore,
                        karntaks 560097
                      </p>
                    </div>

                    <div className="mt-2 mb-2">
                      <p style={{ margin: "0" }}>Order placed</p>
                      <p style={{ margin: "0" }}>
                        placed on Fri, 14 Jun'24, 11:24 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row m-2 align-items-center">
                <b>Need help with your order?</b>
                <div className="col-md-10 mt-2 mb-2">
                  <div className="order-icond-text">
                    <div>
                      <TiMessages style={{ fontSize: "25px" }} />
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <b>Chat with us</b> <br />
                      <span>About any issues related to your order</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 mt-2 mb-2">
                  <p>
                    <FaAngleRight />
                  </p>
                </div>
              </div>

              <div className="d-flex gap-4 justify-content-end mt-3 mb-3">
                <div>
                  <Button
                    variant=""
                    style={{
                      background: "white",
                      color: "green",
                      border: "1px solid green",
                    }}
                    onClick={handleClose2}
                  >
                    Close
                  </Button>
                </div>
                <div>
                  <Button
                    variant=""
                    style={{
                      background: "green",
                      color: "white",
                      border: "1px solid white",
                    }}
                  >
                    Download Invoice
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;