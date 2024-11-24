import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const SalesReport = () => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show4, setShow4] = useState();
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  return (
    <div>
      <div>
        <div className="col-lg-4 d-flex justify-content-center">
          <div class="input-group ">
            <span class="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="customerhead p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="header-c ">Sales Report</h2>
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
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Order</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>

                  <td style={{ paddingTop: "20px" }}>Item Name</td>
                  <td style={{ paddingTop: "20px" }}>Price</td>
                  <td style={{ paddingTop: "20px" }}>Quantity</td>
                  <td style={{ paddingTop: "20px" }}>Total Order</td>
                  <td style={{ paddingTop: "20px" }}>Total Amount</td>
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
                            // setData(item?._id);
                          }}
                        />{" "}
                      </div>
                    </div>
                  </td>
                </tr>
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
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose4}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SalesReport;
