import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoIosEye } from "react-icons/io";
import axios from "axios";
import * as XLSX from "xlsx";
import moment from "moment";

const BookingList = () => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const [data, setdata] = useState();
  const handleShow = (item) => 
  {
    setdata(item)
    setShow(true);
  }
    

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show3, setShow3] = useState(false);
  const [dataa, setdataa] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (items) => {
    setShow3(true);
    setdataa(items)
  }

  //Get method Integration
  const [ApartmentOrder, setApartmentOrder] = useState([]);
  const getApartmentOrder = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getallorders");
      if (res.status === 200) {
        setApartmentOrder(res.data.order.reverse());
        setNoChangeData(res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApartmentOrder();
  }, []);

  //integrating get method
  const [Addproducts, setAddproducts] = useState([]);
  const getAddproducts = async () => {
    try {
      let res = await axios.get("http://dailydishbangalore.com/api/admin/getFoodItems");
      if (res.status === 200) {
        setAddproducts(res.data.data);
        setNoChangeData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [delData, setdelData] = useState();
  let deleteBooking = async (data) => {
    try {
      let res = await axios.delete(
        `http://dailydishbangalore.com/api/admin/deletefoodorder/${data}`
      );
      if (res) {
        alert(`Bookings Data Deleted Successfully`);
        window.location.reload()
        handleClose4();
        getAddproducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getAddproducts();
  }, []);

  //Pagination
  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 10;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = ApartmentOrder.slice(firstIndex, lastIndex);
  const npages = Math.ceil(ApartmentOrder.length / recordsperpage);
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
      setApartmentOrder(filteredData);
    } else {
      setApartmentOrder(nochangedata);
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
    const filteredData = (item) => {
      const itemDate = moment(item?.createdAt, "YYYY-MM-DD");

      return (
        itemDate.isValid() &&
        itemDate.isSameOrAfter(startDateObj) &&
        itemDate.isSameOrBefore(endDateObj)
      );
    };
    // Update the state with the filtered data
    if (filteredData.length > 0) {
      // setAdduser(filteredData);
    } else {
      alert("No records found within the selected date range");
      // setAdduser([]); // Optionally, clear the data if no records found
    }
  };

  function clearbutton() {
    setendDate("");
    setstartDate("");
    // getAdduser();
  }

  // Export Excel
  const handleExportExcel = () => {
    // Create a custom mapping for the column headers
    const customHeaders = ApartmentOrder.filter(item=>item?.orderdelivarytype==="apartment").map((item,i) => ({
      "S.No":i + 1,
      "Date":moment(item?.Placedon).format("MM/DD/YYYY, hh:mm A"),
      "Order ID":item?.orderId,
      "Order Status":item?.status,
      "Slotsdata":item?.slot,
      "Category Name":item?.allProduct[0]?.foodItemId?.foodcategory,
      "Product Name":item?.allProduct[0]?.foodItemId?.foodname,
      "Unit":item?.allProduct[0]?.foodItemId?.unit,
      "Quantity":item?.allProduct[0]?.quantity,
      "Address":item?.delivarylocation,
      "Delivery Type":item?.delivarytype,
    }));

    // Convert your custom data to an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(customHeaders);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User List ");

    // Download the Excel file
    XLSX.writeFile(workbook, "Apartmentbookings.xlsx");
  };
  const [statusdata, setstatusdata] = useState("");
  const changestatus = async (item) => {
    try {
      const config = {
        url: '/admin/updateOrderStatus/' + item._id,
        method: 'put',
        baseURL: 'http://dailydishbangalore.com/api',
        headers: {'Content-Type': 'application/json'},
        data: {
          newStatus:statusdata,
        },
      };
      
      const res = await axios(config);
      
      if (res.status === 200) {
        handleClose3()
        getApartmentOrder();
        window.location.reload()
      } else {
        alert('Failed to Update Order');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating Order');
    }
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
          <Button variant="" className="modal-add-btn" onClick={filterData}>
            Submit
          </Button>
        </div>
        <div>
          <Button variant="danger" onClick={clearbutton}>
            Clear
          </Button>
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Apartment Booking List</h2>
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
                <th>S.No</th>
                <th>Date</th>
                <th>Order ID</th>
                <th style={{ padding: "30px" }}>Order Status</th>
                <th>Slotsdata</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Delivery Type</th>
                <th>Invoice</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.filter(item=>item?.orderdelivarytype==="apartment")?.map((items, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {moment(items?.createdAt).format("MM/DD/YYYY, h:mm A")}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{items?.orderId}</td>
                    <td style={{ paddingTop: "20px", width: "400px" }}>
                      {items?.status}
                      <Button
                        className="modal-add-btn mt-2"
                        variant=""
                        style={{ fontSize: "" }}
                        onClick={() => handleShow3(items)}
                      >
                        Change Status
                      </Button>
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.slot}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.allProduct[0]?.foodItemId?.foodcategory}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.allProduct[0]?.foodItemId?.foodname}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.allProduct[0]?.foodItemId?.unit}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{items?.allProduct[0]?.quantity}</td>
                    <td style={{ paddingTop: "20px" }}>
                     {items?.username} {items?.delivarylocation},{items?.addressline},{items?.Mobilenumber}
                    </td>
                  
                    <td style={{ paddingTop: "20px" }}>
                      {items?.delivarytype}
                    </td>

                    <td style={{ paddingTop: "20px" }}>
                      <IoIosEye
                        style={{ fontSize: "20px" }}
                        onClick={() => handleShow(items)}
                      ></IoIosEye>
                    </td>
                    <td>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4();
                              setdelData(items?._id);
                            }}
                          />{" "}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Delete booking */}
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
                <br /> you want to delete this data?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="" onClick={()=>deleteBooking(delData)} className="modal-add-btn">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Invoice */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div>
              <h4>Order Summary</h4>
              <b>{data?.allProduct?.length} Items</b>
              <hr />

              <div className="row m-2 align-items-center">
                <div className="col-md-10">
                  <div className="order-icond-text">
                  {data?.allProduct?.map(Item => {
                     return(
                      <>
                    <div className="col-md-2">
                      <img
                         src={`http://dailydishbangalore.com/Products/${Item?.foodItemId?.Foodgallery[0]?.image2}`}
                        alt=""
                        style={{ width: "90px", height: "80px" }}
                      />
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <b>{Item?.foodItemId?.foodname}</b> <br />
                      <span>{Item?.foodItemId?.quantity}{Item?.foodItemId?.unit}</span><br />
                      <b>{Item?.foodItemId?.totalprice}</b> <br />
                    </div>
                    </>
  )})}
                  </div>
                </div>
                <div className="col-md-2">
                  <p>
                    <b>₹ {data?.foodtotal}</b>
                  </p>
                </div>
              </div>

              <div className="row m-2 mt-3 align-items-center">
                <b>Bill Details</b>
                <div className="col-md-10 mb-2">
                  <div>
                    <div>Sub Total</div>
                    <div>Tax</div>
                    <div>Delivery charges</div>
                    <div>
                      <b>Bill total</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 mb-2">
                  <div style={{ textAlign: "left" }}>
                    <div>
                      <div>₹ {data?.subTotal}</div>
                      <div>₹ {data?.tax}</div>
                      <div>₹ {data?.delivarytype}</div>

                      <div>
                        <b>₹ {data?.allTotal}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                onClick={handleClose}
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
                onClick={handleClose}
              >
                Download Invoice
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* status change  */}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-12 mb-2">
          <select
            name="status"
            id="status"
            className="vi_0"
            onChange={(e) => {
              console.log("Selected Value:", e.target.value); // To verify the value
              setstatusdata(e.target.value);
            }}
          >
            <option value="">Select Status</option>
            <option value="Cooking">Cooking</option>
            <option value="Packing">Packing</option>
            <option value="Ontheway">On the way</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="" className="modal-add-btn" onClick={()=>changestatus(dataa)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingList;
