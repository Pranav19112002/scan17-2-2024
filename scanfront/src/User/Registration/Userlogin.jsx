import React, { useState } from 'react'
import Userlogin1 from '../../components/Images/homecover1.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';
import Success from '../../components/Success';
import Error from '../../components/Error';

function Userlogin () {
const [inputs, setInputs] = useState({ "email": '', "password": '' });
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);

const inputHandler = (event) => {
  const { name, value } = event.target;
  setInputs((inputs) => ({ ...inputs, [name]: value }));
  console.log("Input changed:", inputs); 
};

const navigate = useNavigate();

const checkData = async (event) => {
  event.preventDefault();

  try {
    setLoading(true);
    const response = await axios.post("http://localhost:3500/user/login", {
      email: inputs.email,
      password: inputs.password,
    });
    setLoading(false);

    if (response.data.success) {
      setSuccess('Login successful');
      setError(false);
      localStorage.setItem('currentuser', JSON.stringify(response.data));
      console.log("Login successful:", response.data); 
      navigate('/scans');
    } else {
      setError('Invalid email and Password. Please try again.');
      setSuccess(false);
      console.log("Invalid login:", response.data); 
    }
  } catch (err) {
    setError('Error occurred during login. Please try again.');
    setSuccess(false);
    localStorage.removeItem('currentuser');
    console.error("Error during login:", err);
  }
};

  return (
    <div className="userreg-container">
      {loading && <Loader />}
      {success && <Success />}
      {error && <Error />}
      <div className='userreg-image-container'>
        <div className='userreg-text-container'>
          <h1 className='userreg-title'>Drink 3L Water Every Day</h1>
          <p className='userreg-description'>If the disease is precisely identified, a good resolution is far more likely.</p>
        </div>
        <img src={Userlogin1} className='userreg-image' alt="User Login" />
      </div>
      <div className='userreg-form-container'>
        <h1 className='userreg-app-title'>PrivateScanningCentre</h1>
        <div className='userreg-form'>
          <div className='userreg-form-section'>
            <h3 className='userreg-form-heading'>Login</h3>
            <p className='userreg-form-text'>Welcome Back</p>
          </div>

          <div className='userreg-form-section'>
            <input
              type='Email'
              placeholder='Email'
              className='userreg-input'
              name="email" value={inputs.email} onChange={inputHandler} />

            <input
              type='password'
              placeholder='Password'
              className='userreg-input' 
              name="password" value={inputs.password} onChange={inputHandler}/>
          </div>

          <div className='userreg-form-section userreg-checkbox-section'>
            <div className='userreg-checkbox'>
              <input type='checkbox' className='userreg-checkbox-input' />
              <p className='userreg-checkbox-label'>Remember me</p>
            </div>
            <p className='userreg-forgot-password'>Forgot Password?</p>
          </div>

          <div className='userreg-form-section'>
            <button className='userreg-button userreg-register-button' onClick={checkData}> 
              Login 
            </button>
            
            <button className='userreg-button userreg-signin-button' onClick={()=>{navigate('/userreg')}}>
              Register Now
            </button>
          </div>
        </div>

        <div className='userreg-footer'>
          <p className='userreg-footer-text'>Admin? <span className='userreg-footer-link'>Click here</span></p>
        </div>
      </div>
    </div>
  )
}

export default Userlogin