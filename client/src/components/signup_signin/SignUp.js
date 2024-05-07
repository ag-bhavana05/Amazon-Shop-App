import { Divider } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [udata, setUdata] = useState({
      fname: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: ""
  });
  console.log(udata);

  const addData = (e) => {
      const {name, value} = e.target;

      setUdata(() => {
        return {
          ...udata,
          [name]: value
        }
      })
  };


  const senddata = async(e)=>{
    e.preventDefault();
    const {fname,email,mobile,password,cpassword} = udata;

    if(fname === ""){
      toast.warning("Provide your name",{
        position: "top-center"
      })
    }
    else if(email === ""){
      toast.warning("Provide your email",{
        position: "top-center"
      })
    }
    else{
      const res = await fetch("/register",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body : JSON.stringify({fname,email,mobile,password,cpassword})
      });
  
      const data = await res.json();
      // console.log(data);
  
      if(res.status === 422 || !data){
        //alert("No data")
        toast.warning("Invalid details",{
          position: "top-center"
        })
      }else{
        //alert("data successfully added")
        toast.success("data successfully added",{
          position: "top-center"
        })
        setUdata({...udata, fname:"", email:"", mobile:"", password:"", cpassword:""});
      }
    }
  }

    

  return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="amazonlogo" />
                </div>
                <div className="sign_form">
                    <form action="" method='POST'>
                        <h1>Create account</h1>
                        <div className="form_data">
                          <label htmlFor="fname">Your name</label>
                          <input type="text" name="fname" id="fname" onChange={addData} value={udata.fname} />
                        </div>
                        <div className="form_data">
                          <label htmlFor="email">Email</label>
                          <input type="text" name="email" id="email" onChange={addData} value={udata.email} />
                        </div>
                        <div className="form_data">
                          <label htmlFor="number">Mobile</label>
                          <input type="text" name="mobile" id="mobile" onChange={addData} value={udata.mobile} />
                        </div>
                        <div className="form_data">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" placeholder='At least 6 characters' id="password" onChange={addData} value={udata.password} />
                        </div>
                        <div className="form_data">
                          <label htmlFor="password">Confirm Password</label>
                          <input type="password" name="cpassword" id="cpassword" onChange={addData} value={udata.cpassword} />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>

                        <Divider />
                        
                        <div className="signin_info">
                          <p>Already have an account?</p>
                          <NavLink to="/login">Signin</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
  )
}

export default SignUp
