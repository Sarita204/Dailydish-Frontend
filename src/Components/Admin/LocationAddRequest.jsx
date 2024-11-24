import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";

const LocationAddRequest = () => {
  // Delete modal
  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // get method Integration
  const [Enquiry, setEnquiry] = useState([]);
  const getEnquiry = async () => {
    try {
      let res = await axios.get(
        "http://dailydishbangalore.com/api/User/getEnquiryenquiry"
      );
      if (res.status === 200) {
        setEnquiry(res.data.getdata.reverse());
        setNoChangeData(res.data.getdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const [contactListId, setcontactListId] = useState();
  let DeleteEnquiry = async () => {
    try {
      let res = await axios.delete(
        `http://dailydishbangalore.com/api/User/DeleteEnquiryList/${contactListId}`
      );
      if (res.status === 200) {
        alert(` Successfully Deleted..!`);
        handleClose4();
        getEnquiry();
      } else {
        alert(` not deleted..`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  //Pagination

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 10;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Enquiry.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Enquiry.length / recordsperpage);
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
      setEnquiry(filteredData);
    } else {
      setEnquiry(nochangedata);
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
    const filteredData = Enquiry.filter((item) => {
      const itemDate = moment(item?.createdAt, "YYYY-MM-DD");
      // Check if itemDate falls between startDate and endDate

      return (
        itemDate.isValid() &&
        itemDate.isSameOrAfter(startDateObj) &&
        itemDate.isSameOrBefore(endDateObj)
      );
    });
    // Update the state with the filtered data
    if (filteredData.length > 0) {
      setEnquiry(filteredData);
    } else {
      alert("No records found within the selected date range");
      setEnquiry([]); // Optionally, clear the data if no records found
    }
  };

  function clearbutton() {
    setendDate("");
    setstartDate("");
    getEnquiry();
  }

  // Export Excel
  const handleExportExcel = () => {
    // Create a custom mapping for the column headers
    const customHeaders = Enquiry.map((items) => ({
      "Date / Time": moment(items.createdAt).format("MM/DD/YYYY, h:mm A"),
      "User Name": items.Name,
      "Phone Number": items.Number,
      "Apartment Name": items.ApartmentName,
      Description: items.Message,
    }));

    // Convert your custom data to an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(customHeaders);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LocationAddRequest");

    // Download the Excel file
    XLSX.writeFile(workbook, "LocationaddRequest.xlsx");
  };

  return (
    <div>
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
            <h2 className="header-c ">Add Location Request</h2>
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
                  <th>Request Date</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Apartment Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {records?.map((items, i) => {
                  return (
                    <tr>
                      <td style={{ paddingTop: "20px" }}>
                        {i + 1 + firstIndex}
                      </td>
                      <td style={{ paddingTop: "20px" }}>
                        {moment(items?.createdAt).format("MM/DD/YYYY h:mm A")}
                      </td>
                      <td style={{ paddingTop: "20px" }}>{items?.Name}</td>
                      <td style={{ paddingTop: "20px" }}>{items?.Number}</td>
                      <td style={{ paddingTop: "20px" }}>
                        {items?.ApartmentName}
                      </td>
                      <td style={{ paddingTop: "20px" }}> {items?.Message}</td>

                      <td style={{ paddingTop: "20px" }}>
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
                                setcontactListId(items?._id);
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
                    <br /> you want to delete this data?
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
                onClick={DeleteEnquiry}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LocationAddRequest;
