import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [middleName, setMiddleName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [confirmPassword, setconfirmPassword] = useState(" ");

  const [isPasswordNotEqual, setIsPasswordNotEqual] = useState(false);

  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);


  const handleSubmit = () => {
    let flag = false;
    if (firstName === "" || firstName === " ") {
      flag = true;
    }

    if (lastName === "" || lastName === " ") {
      flag = true;
    }

    if (email === "" || email === " ") {
      flag = true;
    }

    if (password === "" || password === " ") {
      flag = true;
    }

    if (confirmPassword === "" || confirmPassword === " ") {
      flag = true;
    }

    if (isFirstNameEmpty || isLastNameEmpty || isPasswordEmpty || isEmailEmpty || isPasswordNotEqual) {
      flag = true;
    }

    if(flag) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = {
      FirstName: firstName,
      LastName: lastName,
      MiddleName: middleName,
      Email: email,
      Password: password,
    };
    // const data = {
    //   FirstName: "HAMZA",
    //   LastName: "NASIR",
    //   MiddleName: "",
    //   Email: "abc@eas.cpm",
    //   Password: "123",
    // };
    console.log(data);
    axios
      .post("https://localhost:7236/Home/Create", data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        })
      .then((response) => {
        console.log("User created successfully");
        toast.success(response.data.message);
      }).catch((error) => {
        console.log(error.response);
        toast.error("An error occured");
      });
  }


  useEffect(() => {
    if (password !== confirmPassword) {
      setIsPasswordNotEqual(true);
    } else {
      setIsPasswordNotEqual(false);
    }

  }, [password, confirmPassword]);

  useEffect(() => {
    if (firstName === "") {
      setIsFirstNameEmpty(true);
    } else {
      setIsFirstNameEmpty(false);
    }

  }, [firstName]);

  useEffect(() => {
    if (lastName === "") {
      setIsLastNameEmpty(true);
    } else {
      setIsLastNameEmpty(false);
    }

  }, [lastName]);

  useEffect(() => {
    if (email === "") {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
    }

  }, [email]);

  useEffect(() => {
    if (password === "") {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
    }

  }, [password]);



  return (
    <>
      <div><Toaster /></div>
      <div class="nav-md">

        <div class="row">
          <div class="col-md-12 col-sm-12 ">
            <div class="x_panel">
              <div class="x_title">
                <h2>CREATE USER</h2>
                <ul class="nav navbar-right panel_toolbox">
                </ul>
                <div class="clearfix"></div>
              </div>
              <div class="x_content">
                <br />
                <form class="form-horizontal form-label-left">

                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" >First Name <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" id="first-name" required="required" class="form-control " onChange={(e) => setFirstName(e.target.value)} onFocus={() => {
                        if (firstName === " ") setIsFirstNameEmpty(true);
                        else setIsFirstNameEmpty(false);
                      }} />
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                      {
                        isFirstNameEmpty && (<span style={{ color: "red" }}>Please fill out this field.</span>)
                      }
                    </div>
                  </div>
                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align" >Last Name <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 ">
                      <input type="text" required="required" class="form-control " onChange={(e) => setLastName(e.target.value)} onFocus={() => {
                        if (lastName === " ") setIsLastNameEmpty(true);
                        else setIsLastNameEmpty(false);
                      }} />
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                      {
                        isLastNameEmpty && (<span style={{ color: "red" }}>Please fill out this field.</span>)
                      }
                    </div>
                  </div>
                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Middle Name / Initial</label>
                    <div class="col-md-6 col-sm-6 ">
                      <input class="form-control" type="text" onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                  </div>
                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Email</label>
                    <div class="col-md-6 col-sm-6 ">
                      <input class="form-control" type="email" onChange={(e) => setEmail(e.target.value)} onFocus={() => {
                        if (email === " ") setIsEmailEmpty(true);
                        else setIsEmailEmpty(false);
                      }} />
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                      {
                        isEmailEmpty && (<span style={{ color: "red" }}>Please fill out this field.</span>)
                      }
                    </div>
                  </div>
                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Password</label>
                    <div class="col-md-6 col-sm-6 ">
                      <input class="form-control" type="password" onChange={(e) => setPassword(e.target.value)} onFocus={() => {
                        if (password === " ") setIsPasswordEmpty(true);
                        else setIsPasswordEmpty(false);
                      }} />
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                      {
                        isPasswordEmpty && (<span style={{ color: "red" }}>Please fill out this field.</span>)
                      }
                    </div>
                  </div>
                  <div class="item form-group">
                    <label class="col-form-label col-md-3 col-sm-3 label-align">Confirm Password</label>
                    <div class="col-md-6 col-sm-6 ">
                      <input class="form-control" type="password" onChange={(e) => setconfirmPassword(e.target.value)} />
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                      {
                        isPasswordNotEqual && (<span style={{ color: "red" }}>Password and confirm password must be equal.</span>)
                      }
                    </div>
                  </div>
                  <div class="ln_solid"></div>
                </form>
                <div class="item form-group">
                  <div class="col-md-6 col-sm-6 offset-md-3">
                    <button class="btn btn-success" onClick={handleSubmit}>Create User</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >

      </div >
    </>
  );
}

export default App;
