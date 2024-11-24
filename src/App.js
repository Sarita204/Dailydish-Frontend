import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";

import Header from "./Components/Header";
import Navbar1 from "./Components/Navbar1";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout";
import Invoice from "./Components/Invoice";
import Profile from "./Components/Profile";
import LiveStreams from "./Components/LiveStream";

// Admin panel
import Dashboard from "./Components/Admin/Dashboard";
import Main from "./Components/Admin/Main";
import HomeBanner from "./Components/Admin/HomeBanner";
import Add_Products from "./Components/Admin/Add_Products";
import DeliveryCharge from "./Components/Admin/DeliveryCharge";
import BookingList from "./Components/Admin/BookingList";
import UserList from "./Components/Admin/UserList";
import AdminContactus from "./Components/Admin/AdminContactus";
import AdminLogin from "./Components/Admin/AdminLogin";
import ProductDescription from "./Components/ProductDescription";
import LandingPage from "./Components/LandingPage";
import OrderHistory from "./Components/OrderHistory";
import Slot from "./Components/Admin/Slot";
import SalesReport from "./Components/Admin/SalesReport";
import WebStory from "./Components/Admin/WebStory";
import Statusbar from "./Components/Statusbar";
import CorporateBookings from "./Components/Admin/CorporateBookings";
import ApartmentList from "./Components/Admin/ApartmentList";
import CorporateList from "./Components/Admin/CorporateList";
import LocationAddRequest from "./Components/Admin/LocationAddRequest";
import ChatWithUs from "./Components/ChatWithUs";
import Livestreams from "./Components/Admin/LiveStream";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LandingPage />
                </>
              }
            />

            <Route
              path="/home"
              element={
                <>
                  {/* <Header /> */}
                  <Navbar1 />
                  <Home />
                  <Footer />
                </>
              }
            />

            <Route
              path="/product-description"
              element={
                <>
                  <Navbar1 />
                  <ProductDescription />
                  <Footer />
                </>
              }
            />

            <Route
              path="/Checkout"
              element={
                <>
                  <Checkout />
                  <Footer />
                </>
              }
            />
              <Route
              path="/Invoice"
              element={
                <>
                  <Invoice />
                  <Footer />
                </>
              }
            />

<Route
              path="/chats"
              element={
                <>
                  <ChatWithUs />
                </>
              }
            />

            <Route
              path="/Profile"
              element={
                <>
                  <Profile />
                </>
              }
            />

            <Route
              path="/orders"
              element={
                <>
                  <OrderHistory />
                </>
              }
            />

            <Route
              path="/livestreams"
              element={
                <>
                  <LiveStreams />
                  <Footer />
                </>
              }
            />

            <Route
              path="/foodstatus"
              element={
                <>
                  <Statusbar />
                </>
              }
            />



            {/* ================================ADMIN PANEL================================= */}
            <Route
              path="/dd-admin"
              element={
                <>
                  <AdminLogin />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Main
                  children={
                    <>
                      <Dashboard />
                    </>
                  }
                />
              }
            />

            <Route
              path="/home_banner"
              element={
                <Main
                  children={
                    <>
                      <HomeBanner />
                    </>
                  }
                />
              }
            />

            <Route
              path="/apartmentlist"
              element={
                <Main
                  children={
                    <>
                      <ApartmentList />
                    </>
                  }
                />
              }
            />

            <Route
              path="/corporatelist"
              element={
                <Main
                  children={
                    <>
                      <CorporateList />
                    </>
                  }
                />
              }
            />

            {/* <Route
              path="/location"
              element={
                <Main
                  children={
                    <>
                      <Category />
                    </>
                  }
                />
              }
            /> */}

            <Route
              path="/all-products"
              element={
                <Main
                  children={
                    <>
                      <Add_Products />
                    </>
                  }
                />
              }
            />
            <Route
              path="/available-slots"
              element={
                <Main
                  children={
                    <>
                      <Slot />
                    </>
                  }
                />
              }
            />
            <Route
              path="/delivery-charge"
              element={
                <Main
                  children={
                    <>
                      <DeliveryCharge />
                    </>
                  }
                />
              }
            />
            <Route
              path="/apartment-booking-list"
              element={
                <Main
                  children={
                    <>
                      <BookingList />
                    </>
                  }
                />
              }
            />

            <Route
              path="/corporate-booking-list"
              element={
                <Main
                  children={
                    <>
                      <CorporateBookings />
                    </>
                  }
                />
              }
            />
            <Route
              path="/sales-report"
              element={
                <Main
                  children={
                    <>
                      <SalesReport />
                    </>
                  }
                />
              }
            />
            <Route
              path="/webstory"
              element={
                <Main
                  children={
                    <>
                      <WebStory />
                    </>
                  }
                />
              }
            />
            <Route
              path="/user-list"
              element={
                <Main
                  children={
                    <>
                      <UserList />
                    </>
                  }
                />
              }
            />

<Route
              path="/admin-live-stream"
              element={
                <Main
                  children={
                    <>
                      <Livestreams />
                    </>
                  }
                />
              }
            />

            <Route
              path="/contact-us"
              element={
                <Main
                  children={
                    <>
                      <AdminContactus />
                    </>
                  }
                />
              }
            />
            <Route
              path="/location-add-request"
              element={
                <Main
                  children={
                    <>
                      <LocationAddRequest />
                    </>
                  }
                />
              }
            />
        
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
