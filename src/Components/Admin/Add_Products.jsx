import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import moment from "moment";

const Add_Products = () => {
  // Add modal product for Slider
  const [show3, setShow3] = useState();
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // Delet modal product for  Slider
  const [show5, setShow5] = useState();
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // IMAGE View  modal
  const [View, setView] = useState({});
  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //Delet img  modal
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const [Data, setData] = useState();
  const handleShow = (item) => {
    setData(item);
    setShow(true);
  };

  //Image Add modal
  const [show2, setShow2] = useState();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // --------------Integration------------------

  // Post Method
  const [Category, setCategory] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductImage, setProductImage] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [GST, setGST] = useState("");
  // const [Discount, setDiscount] = useState("");
  // const [OfferPrice, setOfferPrice] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [TotalStock, setTotalStock] = useState("");
  const [RemainingStock, setRemainingStock] = useState("");
  const [Unit, setUnit] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ProductDesc, setProductDesc] = useState("");

  // const [Status, setunit] = useState(0);  block unblock
  const [LoadDate, setLoadDate] = useState("");
  const [LoadTime, setLoadTime] = useState("");
  const [MealType, setMealType] = useState("");

  const Addproductdetails = async (user) => {
    try {
      if (!Category) {
        alert("Please Add Product Category");
      }

      if (!ProductName) {
        alert("Please Add Product Name");
      }

      if (!ProductImage) {
        alert("Please Add Product Image");
      }

      if (!ProductPrice) {
        alert("Please Add Product Price");
      }

      if (!GST) {
        alert("Please Add Product GST");
      }

      // if (!Discount) {
      //   alert("Please Add Product Discount");
      // }

      // if (!OfferPrice) {
      //   alert("Please Add Product Offer Price");
      // }

      if (!TotalAmount) {
        alert("Please Add Total Amount");
      }

      if (!TotalStock) {
        alert("Please Add Product Total Stock");
      }

      if (!RemainingStock) {
        alert("Please Add Product Remaining Stock");
      }

      if (!Unit) {
        alert("Please Add Product Unit");
      }

      if (!Quantity) {
        alert("Please Add Product Quantity");
      }

      if (!ProductDesc) {
        alert("Please Add Product Description");
      }

      if (!LoadDate) {
        alert("Please Add Product Load Date");
      }

      if (!LoadTime) {
        alert("Please Add Product Load Time");
      }

      if (!MealType) {
        alert("Please Add Product Meal Type");
      }

      const formdata = new FormData();
      formdata.append("foodcategory", Category);
      formdata.append("foodname", ProductName);
      formdata.append("Foodgallery", ProductImage);
      formdata.append("foodprice", ProductPrice);
      formdata.append("gst", GST);
      // formdata.append("discount", Discount);
      // formdata.append("offerprice", OfferPrice);
      formdata.append("totalprice", TotalAmount);
      formdata.append("totalstock", TotalStock);
      formdata.append("Remainingstock", RemainingStock);
      formdata.append("unit", Unit);
      formdata.append("quantity", Quantity);
      formdata.append("fooddescription", ProductDesc);
      formdata.append("loaddate", LoadDate);
      formdata.append("loadtime", LoadTime);
      formdata.append("foodmealtype", MealType);
      const config = {
        url: "admin/addFoodItem",
        method: "post",
        baseURL: "http://dailydishbangalore.com/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert("Product Added Successfully");
        handleClose3();
        getAddproducts();
        setCategory(" ");
        setProductName(" ");
        setProductImage(" ");
        setProductPrice(" ");
        setGST(" ");
        // setDiscount(" ");
        // setOfferPrice(" ");
        setTotalAmount(" ");
        setTotalStock(" ");
        setRemainingStock(" ");
        setUnit(" ");
        setQuantity(" ");
        setProductDesc(" ");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // Delete
  const [delData, setdelData] = useState("");
  let deleteProduct = async () => {
    try {
      let res = await axios.delete(
        `http://dailydishbangalore.com/api/admin/deleteFoodItem/${delData._id}`
      );
      if (res) {
        alert(`Products Details Deleted Successfully`);
        handleClose5();
        getAddproducts();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Edit Method
  const [Data1, setData1] = useState({});
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = (item) => {
    setShow4(true);
    setData1(item);
    setCategory(item?.foodcategory);
    setProductImage(item?.Foodgallery);
    setProductPrice(item?.foodprice);
    setTotalStock(item?.totalstock);
    setProductDesc(item?.fooddescription);
    setRemainingStock(item?.Remainingstock);
    setProductName(item?.foodname);
    setTotalAmount(item?.totalprice);
    setUnit(item?.unit);
    setLoadDate(item?.loaddate);
    setLoadTime(item?.loadtime);
    setGST(item?.gst);
    // setDiscount(item?.discount);
    // setOfferPrice(item?.offerprice);
    setQuantity(item?.quantity);
    setMealType(item?.foodmealtype);
  };

  const Editproducts = async (Data1) => {
    try {
      const config = {
        url: `admin/updateFoodItem`,
        method: "put",
        baseURL: "http://dailydishbangalore.com/api/",
        headers: { "content-type": "application/json" },
        data: {
          foodcategory: Category,
          foodname: ProductName,
          foodprice: ProductPrice,
          gst: GST,
          // discount: Discount,
          // offerprice: OfferPrice,
          totalprice: TotalAmount,
          totalstock: TotalStock,
          Remainingstock: RemainingStock,
          unit: Unit,
          quantity: Quantity,
          fooddescription: ProductDesc,
          loaddate: LoadDate,
          loadtime: LoadTime,
          foodmealtype: MealType,
          userid: Data1,
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Successfully updated");
        handleClose4();
        getAddproducts();
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Something went wrong"); // error handling fixed
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
  const records = Addproducts?.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Addproducts?.length / recordsperpage);
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
      const filteredData = nochangedata?.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
      setAddproducts(filteredData);
    } else {
      setAddproducts(nochangedata);
    }
  };

  const handleBlockUnblock = async (items) => {
    try {
      const config = {
        url: `/admin/toggleFoodItemStatus/${items?._id}`,
        method: "put",
        baseURL: "http://dailydishbangalore.com/api",
        headers: { "Content-Type": "application/json" },
      };

      const res = await axios(config);
      if (res.status === 200) {
        alert(
          items?.blocked === false
            ? "Successfully blocked"
            : "Successfully Unblocked"
        );
        getAddproducts();
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div>
      <h2 className="header-c ">Products</h2>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
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
                onChange={handleFilterH}
              />
            </div>
          </div>
          <Button variant="success" onClick={handleShow3}>
            + ADD
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
                <th>Sl. No</th>
                <th>Date</th>
                <th>Category</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Gst</th>
                {/* <th>Discount</th> */}
                {/* <th>Offer Price</th> */}
                <th>Total </th>
                <th>Total Stock </th>
                <th>Remaining Stock</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Load Date</th>
                <th>Load Time</th>
                <th>Meal Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((items, i) => {
                return (
                  <tr key={i}>
                    <td style={{ paddingTop: "20px" }}>{i + 1 + firstIndex}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {moment(items?.createdAt).format("MM/DD/YYYY, h:mm A")}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{items.foodcategory}</td>
                    <td style={{ paddingTop: "20px" }}>{items?.foodname}</td>
                    <td style={{ paddingTop: "20px" }}>
                      <div>
                        <img
                          src={`http://dailydishbangalore.com/Products/${items?.Foodgallery[0]?.image2}`}
                          alt="img"
                          style={{ width: "60px", height: "60px" }}
                        />
                        {/* <Button
                          onClick={() => {
                            handleShow1();
                            setView(items);
                          }}
                          className="mt-2 mb-2"
                          style={{ fontSize: "14px" }}
                        >
                          View
                        </Button> */}
                      </div>
                    </td>

                    <td style={{ paddingTop: "20px" }}>{items?.foodprice}</td>
                    <td style={{ paddingTop: "20px" }}>{items?.gst}</td>

                    {/* <td style={{ paddingTop: "20px" }}>{items.discount}</td> */}
                    {/* <td style={{ paddingTop: "20px" }}>{items?.offerprice}</td> */}

                    <td style={{ paddingTop: "20px" }}>{items?.totalprice} </td>
                    <td style={{ paddingTop: "20px" }}>{items?.totalstock}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.Remainingstock}{" "}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{items?.unit} </td>

                    <td style={{ paddingTop: "20px" }}>{items?.quantity} </td>
                    <td style={{ paddingTop: "20px" }}>
                      <div className="scroller">{items?.fooddescription}</div>
                    </td>

                    <td style={{ paddingTop: "20px" }}>
                      {items?.blocked === true ? (
                        <Button onClick={() => handleBlockUnblock(items)}>
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => handleBlockUnblock(items)}
                        >
                          Block
                        </Button>
                      )}
                    </td>
                    <td style={{ paddingTop: "20px" }}>{items?.loaddate}</td>
                    <td style={{ paddingTop: "20px" }}>{items?.loadtime}</td>
                    <td style={{ paddingTop: "20px" }}>
                      {items?.foodmealtype}
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
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow4(items);
                              setData1(items);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow5();
                              setdelData(items);
                            }}
                          />
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

        {/* Add modal for Products */}
        <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title>Add Products Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Select Category Name </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                  className="vi_0"
                >
                  <option value="">Select Category</option>
                  <option value="Veg">Veg</option>
                  <option value="Nonveg">Nonveg</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Food Name</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  placeholder="Enter Food Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Food Image</label>
                <input
                  type="file"
                  id=""
                  name=""
                  multiple
                  className="vi_0"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Price</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Product Price"
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add GST</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Product GST"
                  onChange={(e) => setGST(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Add Discount</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Product Discount"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div> */}

            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Add Offer Price</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Offer Price"
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>
            </div> */}

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Total Amount</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Total Amount"
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Total Stock</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Total Stock "
                  onChange={(e) => setTotalStock(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Remaining Stock</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter Remaining Stock"
                  onChange={(e) => setRemainingStock(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Unit</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Unit"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Quantity</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Description"
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Load Date</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Product Load Date"
                  onChange={(e) => setLoadDate(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Load Time</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Product Load Time"
                  onChange={(e) => setLoadTime(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Meal Type</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Meal type"
                  onChange={(e) => setMealType(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose3}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={Addproductdetails}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit modal for Products */}
        <Modal
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Edit Product Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Select Category Name </label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                  className="vi_0"
                >
                  <option value="">{Data1?.foodcategory}</option>
                  <option value="Veg">Veg</option>
                  <option value="Nonveg">Nonveg</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Food Name</label>
                <input
                  type="text"
                  name=""
                  className="vi_0"
                  value={ProductName}
                  placeholder={Data1?.foodname}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Edit Food Image</label>
                <input
                  type="file"
                  id=""
                  name=""
                  multiple
                  className="vi_0"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
            </div> */}

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Price</label>
                <input
                  type="number"
                  className="vi_0"
                  value={ProductPrice}
                  placeholder={Data1?.foodprice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add GST</label>
                <input
                  type="number"
                  className="vi_0"
                  value={GST}
                  placeholder={Data1?.gst}
                  onChange={(e) => setGST(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Add Discount</label>
                <input
                  type="number"
                  className="vi_0"
                  value={Discount}
                  placeholder={Data1?.discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div> */}

            {/* <div className="row">
              <div className="do-sear mt-2">
                <label>Add Offer Price</label>
                <input
                  type="number"
                  className="vi_0"
                  value={OfferPrice}
                  placeholder={Data1?.offerprice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>
            </div> */}

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Total Amount</label>
                <input
                  type="number"
                  className="vi_0"
                  value={TotalAmount}
                  placeholder={Data1?.totalprice}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Total Stock</label>
                <input
                  type="number"
                  className="vi_0"
                  value={TotalStock}
                  placeholder={Data1?.totalstock}
                  onChange={(e) => setTotalStock(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Remaining Stock</label>
                <input
                  type="number"
                  className="vi_0"
                  value={RemainingStock}
                  placeholder={Data1?.Remainingstock}
                  onChange={(e) => setRemainingStock(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Unit</label>
                <input
                  type="text"
                  className="vi_0"
                  value={Unit}
                  placeholder={Data1?.unit}
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Quantity</label>
                <input
                  type="text"
                  className="vi_0"
                  value={Quantity}
                  placeholder={Data1?.quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Description</label>
                <input
                  type="text"
                  className="vi_0"
                  value={ProductDesc}
                  placeholder={Data1?.fooddescription}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Load Date</label>
                <input
                  type="text"
                  className="vi_0"
                  value={LoadDate}
                  placeholder={Data1?.loaddate}
                  onChange={(e) => setLoadDate(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Load Time</label>
                <input
                  type="text"
                  className="vi_0"
                  value={LoadTime}
                  placeholder={Data1?.loadtime}
                  onChange={(e) => setLoadTime(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="do-sear mt-2">
                <label>Add Meal Type</label>
                <input
                  type="text"
                  className="vi_0"
                  value={MealType}
                  placeholder={Data1?.foodmealtype}
                  onChange={(e) => setMealType(e.target.value)}
                />
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
              onClick={() => Editproducts(Data1?._id)}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Delet modal for Products */}
        <Modal
          show={show5}
          onHide={handleClose5}
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
              onClick={handleClose5}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={deleteProduct}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Add_Products;
