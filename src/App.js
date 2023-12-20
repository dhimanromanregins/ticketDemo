import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"; // Import CSS

function App() {
  const [registerForm, setRegisterForm] = useState({
    tnumber: "",
    ttitle: "",
    description: "",
    tclass: "",
    tDeparture: "",
    tarrival: "",
    tdtime: "",
    tatime: "",
    pname: "",
    page: "",
  });
  const [GetData, SetData] = useState([]);
  const [getsearch, SetSearch] = useState("");
  const OnFormChange = (e) => {
    let { name, value } = e.target;
    setRegisterForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const HandleSearch = (event) => {
    const data = event.target.value;
    SetSearch(data);
  };
  const GetTicketData = async () => {
    console.log("search button in clicked");
    const GetProfileUrl = "http://127.0.0.1:8000/get-ticket-data";
    const ProfileData = {
      ticket_number: getsearch,
    };
    try {
      const response = await axios.post(GetProfileUrl, ProfileData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.status, "=========================>");
      if (response.data) {
        toast("Data fetched Successful..!");
        document.getElementById('show-data').style.display = "block";
        document.getElementById('submit-model').style.display = "none";
        console.log(response.data);
        SetData(response.data)
      } else if (response.data.status === 400) {
        toast("Ticket Not Found");
      }
    } catch (error) {
      console.log("Registration Failed...!", error);
    }
  };

  const PostRegisterForm = async () => {
    let RegisterUrl = "http://127.0.0.1:8000/tickets-post/";
    const RegisterData = {
      ticket_number: registerForm.tnumber,
      title: registerForm.ttitle,
      description: registerForm.description,
      train_class: registerForm.tclass,
      departure_station: registerForm.tDeparture,
      arrival_station: registerForm.tarrival,
      departure_time: registerForm.tdtime,
      arrival_time: registerForm.tatime,
      passenger_name: registerForm.pname,
      passenger_age: registerForm.page,
    };
    try {
      const response = await axios.post(RegisterUrl, RegisterData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data, "=========================>");
      if (response.data) {
        toast("Data saved Successful..!");
        
        // resetForm()
        const timeoutId = setTimeout(() => {
          // navigate('/');
        }, 3000);
      } else if (response.data.status === 400) {
        toast("Invalid username/password");
      }
    } catch (error) {
      console.log("Registration Failed...!", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1">
                  Priceing
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                name="search"
                onChange={HandleSearch}
                value={getsearch}
                className="form-control me-2"
                type="search"
                placeholder="Enter Ticket Number"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                onClick={GetTicketData}
                type="button"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="modal-details text-center" id="show-data">
        <h3>Ticket Details</h3>
        <div className="modal-div">
          <div className="mb-3">
            <label className="form-label" for="tnumber">
              Ticket Number:
            </label>
            <input disabled
              className="form-control"
              type="text"
              id="tnumber"
              name="tnumber"
              value={GetData.ticket_number}
              placeholder="Ticket Number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" for="ttitle">
              Title:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="ttitle"
              name="ttitle"
              value={GetData.title}
              placeholder="Title"
            />
          </div>
        </div>

        <div className="modal-div">
          <div className="mb-3">
            <label className="form-label" for="description">
              Description:
            </label>
            <input
            disabled
            value={GetData.description}
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label" for="tclass">
              Train Class:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="tclass"
              name="tclass"
              value={GetData.train_class}
              placeholder="Train Class"
            />
          </div>
        </div>

        <div className="modal-div">
          <div className="mb-3">
            <label className="form-label" for="tDeparture">
              Departure Station:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="tDeparture"
              name="tDeparture"
              value={GetData.departure_station}
              placeholder="Departure Station"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" for="tarrival">
              Arrival Station:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="tarrival"
              name="tarrival"
              value={GetData.arrival_station}
              placeholder="Arrival Station"
            />
          </div>
        </div>

        <div className="modal-div">
          <div className="mb-3">
            <label className="form-label" for="tdtime">
              Departure Time:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="tdtime"
              name="tdtime"
              value={GetData.departure_time}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" for="tatime">
              Arrival Time:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="tatime"
              name="tatime"
              value={GetData.arrival_time}
            />
          </div>
        </div>

        <div className="modal-div">
          <div className="mb-3">
            <label className="form-label" for="pname">
              Passenger Name:
            </label>
            <input
            disabled
              className="form-control"
              type="text"
              id="pname"
              name="pname"
              value={GetData.passenger_name}
              placeholder="Passenger Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" for="page">
              Passenger Age:
            </label>
            <input
            disabled
              className="form-control"
              type="number"
              id="page"
              name="page"
              value={GetData.passenger_age}
              placeholder="Passenger Age"
            />
          </div>
        </div>
      </div>

      <div className="App" id="submit-model">
        <div className="headering">
          <h3>Enter Ticket Information</h3>
        </div>
        <div className="div">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Ticket Number
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tnumber}
              name="tnumber"
              type="text"
              className="form-control"
              id="ticket_number"
              placeholder="Ticket Number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.ttitle}
              name="ttitle"
              type="text"
              className="form-control"
              id="ticket_title"
              placeholder="Title"
            />
          </div>
        </div>

        <div className="div">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Description
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.description}
              name="description"
              type="text"
              className="form-control"
              id="ticket_description"
              placeholder="Ticket Description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Train Class
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tclass}
              name="tclass"
              type="text"
              className="form-control"
              id="ticket_class"
              placeholder="Ticket Class"
            />
          </div>
        </div>

        <div className="div">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Departure Station
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tDeparture}
              name="tDeparture"
              type="text"
              className="form-control"
              id="departure_station"
              placeholder="Departure Station"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Arrival Station
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tarrival}
              name="tarrival"
              type="text"
              className="form-control"
              id="ticket_station"
              placeholder="Arrival Station"
            />
          </div>
        </div>

        <div className="div">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Departure Time
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tdtime}
              name="tdtime"
              type="datetime-local"
              className="form-control"
              id="time"
              placeholder="Departure Time"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Arrival Time
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.tatime}
              name="tatime"
              type="datetime-local" // Use datetime-local for date and time input
              className="form-control"
              id="arrival_time"
              placeholder="Arrival Time"
            />
          </div>
        </div>

        <div className="div">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Passenger Name
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.pname}
              name="pname"
              type="text"
              className="form-control"
              id="name"
              placeholder="Passenger Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Passenger Age
            </label>
            <input
              onChange={OnFormChange}
              value={registerForm.page}
              name="page"
              type="text"
              className="form-control"
              id="time"
              placeholder="Passenger Age"
            />
          </div>
        </div>
        <div className="btn">
          <button
            type="button"
            onClick={PostRegisterForm}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
