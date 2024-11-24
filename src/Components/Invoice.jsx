import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Table from "react-bootstrap/Table";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import { useLocation } from "react-router-dom";
function Invoice() {
  let location = useLocation();
  const { item } = location.state;
  
  const createPDF = async () => {
    // setRotate(360);
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Invoice.pdf");
  };

  return (
    <div style={{ backgroundColor: "white", padding: "5%" }}>
      <div id="pdf" style={{}}>
        <div style={{ textAlign: "center" }}>ORDER ID : {item?.orderId}</div>
        <div>
          <span
            style={{
              color: "#00a354",
              fontWeight: "bold",
            }}
          >
            SHIP TO
          </span>
        </div>
        <span>Name:{item?.username}</span>
        <br></br>
       <span>
          Address:{item?.delivarylocation},{item?.addressline}
        </span>
        <br></br>
        <span>Contact:{item?.Mobilenumber}</span>

        <Row>
          <Col md={"12"}>
            <Row>
              <Col md={"6"}>
                <h6>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ORDER DATE :
                  </span>{" "}
                  {moment(item?.Placedon).format("DD/MM/YYYY")}
                </h6>
              </Col>
              <Col md={"6"}>
                <h6 style={{ textAlign: "right" }}>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    PAYMENT TYPE :{" "}
                  </span>
                  {item?.paymentmethod}
                </h6>
              </Col>
            </Row>
            <Table striped responsive>
              <thead  >
                <tr
                  style={{
                    backgroundColor: "rgb(216 29 74)",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <th style={{ fontSize: "12px" }}>Foodname</th>
                  <th style={{ fontSize: "12px" }}>Volumetype</th>
                  <th style={{ fontSize: "12px" }}>Qty</th>
                  <th style={{ fontSize: "12px" }}>Unitprice</th>
                  <th style={{ fontSize: "12px" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {item?.allProduct?.map((items) => {
                  return (
                    <tr style={{ textAlign: "center" }}>
                      <td style={{ fontSize: "12px", textAlign: "center" }}>
                        {items?.foodItemId.foodname}
                      </td>
                      <td style={{ fontSize: "12px", textAlign: "center" }}>
                        {items?.foodItemId.quantity}
                        {items?.foodItemId.unit}
                      </td>
                      <td style={{ fontSize: "12px", textAlign: "center" }}>
                        {items?.quantity}
                      </td>
                      <td style={{ fontSize: "12px", textAlign: "center" }}>
                        {items?.foodItemId.foodprice}{" "}
                      </td>
                      <td style={{ fontSize: "12px", textAlign: "center" }}>
                        {items?.quantity * items?.foodItemId.foodprice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Row>
              <Col md={"7"}> Thank you for your business!</Col>
              <Col md={"5"}>
                <Row>
                  <Table>
                    <thead></thead>
                    <tbody>
                      {item?.delivarytype <= 0 ? (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            Delivery Charge
                          </td>
                          <td style={{ textAlign: "center" }}> Free</td>
                        </tr>
                      ) : (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            Delivery Charge
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {" "}
                            ₹ {item?.delivarytype}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ textAlign: "center" }}>TAX</td>
                        <td style={{ textAlign: "center" }}> ₹ {item?.tax}</td>
                      </tr>
                      {item?.Cutlery > 0 ? (
                        <>
                          <tr>
                            <td style={{ textAlign: "center" }}>Cutley</td>
                            <td style={{ textAlign: "center" }}>
                              {" "}
                              ₹ {item?.Cutlery}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                      <tr>
                        <td style={{ textAlign: "center" }}>TOTAL</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          ₹ {item?.allTotal}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            textAlign: "center",
            cursor: "pointer",
            marginTop: "30px",
            backgroundColor: "rgb(216 29 74)",
            color: "white",
            border: "none",
            padding: "15px",
            border: "1px solid white",
          }}
          onClick={createPDF}
        >
          PRINT INVOICE
        </button>
      </div>
    </div>
  );
}

export default Invoice;
