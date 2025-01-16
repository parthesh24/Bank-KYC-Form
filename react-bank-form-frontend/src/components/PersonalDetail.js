import React from 'react'
import '../styles/personal-details.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import previewImage from './UploadFiles';

const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\+91\d{10}$/; // +91 followed by exactly 10 digits
    return mobileRegex.test(mobileNumber);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Strict email validation
    return emailRegex.test(email);
  };
  
  const validateAadhaarNumber = (aadhaarNumber) => {
    const aadhaarRegex = /^\d{12}$/; // Exactly 12 digits
    return aadhaarRegex.test(aadhaarNumber);
  };

const PersonalDetail = () => {
        const [formData, setFormData] = useState({
              accountType: '',
              mobilenumber: '',
              email: '',
              aadharnumber: '',
              fullname: '',
              gender: '',
              dob: '',
              fathername: '',
              mothername: '',
              careof: '',
              street: '',
              locality: '',
              postoffice: '',
              country: '',
              state: '',
              city: '',
              pincode: '',
              preferredbranch: '',
              pannumber: '',
              panholdername: '',
              drivinglicensenumber: '',
              drivinglicensedob: '',
              drivinglicensename: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
        });
        const [profile_image, setProfile_image] = useState(null);
        const [errors, setErrors] = useState({});
        const navigate = useNavigate();
        const [emailOtpVisible, setEmailOtpVisible] = useState(false);
        const [aadharOtpVisible, setAadharOtpVisible] = useState(false);
        const [emailVerified, setEmailVerified] = useState('');
        const [aadharVerified, setAadharVerified] = useState('');

        const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                  const base64String = event.target.result;
                  setProfile_image(base64String); // Save the Base64 string in the state
              };
              reader.readAsDataURL(file); // Convert file to Base64 string
          }
        };      
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
          setErrors((prev) => ({ ...prev, [name]: '' })); // Clear the error on input change
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          let hasErrors = false;
          const newErrors = {};
      
          if (!validateMobileNumber(formData.mobilenumber)) {
            newErrors.mobilenumber = 'Invalid mobile number. Format: +91XXXXXXXXXX';
            hasErrors = true;
          }
      
          if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address.';
            hasErrors = true;
          }
      
          if (!validateAadhaarNumber(formData.aadharnumber)) {
            newErrors.aadharnumber = 'Aadhaar number must be exactly 12 digits.';
            hasErrors = true;
          }
      
          setErrors(newErrors); 
          console.log(hasErrors);
          if (!hasErrors) {
            try {
                // Save form data to localStorage
                localStorage.setItem('personalDetails', JSON.stringify(formData));
                if (profile_image) {
                  localStorage.setItem('profile_image', profile_image);
                }
                console.log(formData);
                console.log(profile_image);
                navigate('/alternate-details');
            } catch (error) {
                console.error('Error:', error);
                alert('Error saving data. Please try again.');
            }
        }
        };

        const verifyAadhar = () => {
          const otpField = document.getElementById('aadhar-otp');
          if (otpField.value === '987654') {
            setAadharVerified("Aadhaar verified successfully");
          } else {
            setAadharVerified("Invalid OTP");
          }
        };
        
        const verifyEmail = () => {
          const otpField = document.getElementById('otp');
          if (otpField.value === '654321') {
            setEmailVerified("Email verified successfully");
          } else {
            setEmailVerified("Invalid OTP");
          }
        };        
      

        useEffect(() => {
            const savedData = localStorage.getItem('personalDetails');
            if (savedData) {
                setFormData(JSON.parse(savedData));
            };
        }, []);
        
  return (
    // <html lang="en">
        // <head>
        // <meta charset="UTF-8">
        // <meta name="viewport" content="width=device-width, initial-scale=1.0">
        // <title>Personal Details Form</title>
        // {/* <link rel="stylesheet" href="personal-details.css"/> */}
        // </head>
        <div>
        <div className="navbar">
            <div className="nav-container">
            <div className="nav-logo">ICICI BANK</div>
        </div>
        </div>

        <div className="container">
            
        <div className="progress-bar">
          <ul>
            <li className="active">
              <span>1</span>
              <p>Personal Details</p>
            </li>
            <li>
              <span>2</span>
              <p>Alternate Details</p>
            </li>
            <li>
              <span>3</span>
              <p>Nominee Details</p>
            </li>
            <li>
              <span>4</span>
              <p>Upload Files</p>
          </li>
            <li>
              <span>5</span>
              <p>Success</p>
            </li>
          </ul>
        </div>
    <div className="form-container">
    <div>
        <button className="track-link">View/Track Submitted Application</button>
    </div>
    <h2>Verify Aadhaar/Pan Card</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="account-type">Account Type: <span>*</span></label>
        <select id="account-type" name="accountType" required 
        value={formData.accountType}
        onChange={handleInputChange}
        >
          <option value="">--SELECT ACCOUNT TYPE--</option>
          <option value="SAVINGS">Savings</option>
          <option value="CURRENT">Current</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="mobile-number">Mobile Number: <span>*</span></label>
        <input
              type="text"
              id="mobile-number"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleInputChange}
              required
            />
            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
      </div>
      <div className="form-group">
  <center><label>Profile Image:</label></center>
  <div>
    <input
      accept=".pdf, .jpg, .png"
      type="file"
      name="profile_image"
      id="uploadInput"
      onChange={(e) => {
        previewImage(e, 'photoPreview');
        handleFileChange(e);
      }}
      style={{ display: 'none' }} // Hide the default file input
    />
    <button
      type="button"
      className="upload-button"
      onClick={() => document.getElementById('uploadInput').click()}
    >
      Upload Image
    </button>
  </div>
</div>
<div className="form-group">
  <div className="image-container">
  <div className="image-preview" id="photoPreview">
    {/* The previewed image will appear here */}
    </div>
  </div>
</div>
      <div className="form-group">
        <label htmlFor="email-id">Email Id: <span>*</span></label>
        <input
              type="text"
              id="email-id"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <button type="button" className="btn" id="get-otp-btn" onClick={()=>setEmailOtpVisible(!emailOtpVisible)}>Get OTP</button>
        {emailOtpVisible && <p>OTP is 654321</p>}
      </div>
      <div className="form-group">
        <label htmlFor="otp">Email OTP: <span>*</span></label>
        <input type="text" id="otp" name="otp" required 
        />
      </div>
      <div className="form-group">
        <button type="button" className="btn" id="verify-btn" onClick={verifyEmail}>Verify</button>
        <div id="message">
          {emailVerified}
        </div>
      </div>     

      <div className="form-group">
        <label htmlFor="aadhaar-number">Aadhaar Number: <span>*</span></label>
        <input
              type="text"
              id="aadhaar-number"
              name="aadharnumber"
              value={formData.aadharnumber}
              onChange={handleInputChange}
              required
        />
        {errors.aadhaarNumber && <p className="error">{errors.aadhaarNumber}</p>}
      </div>
      <div className="form-group">
        <button type="button" className="btn" onClick={()=>setAadharOtpVisible(!aadharOtpVisible)}>Generate OTP</button>
        {aadharOtpVisible && <p>OTP is 987654</p>}
      </div>
      <div className="form-group">
        <label htmlFor="otp">OTP: <span>*</span></label>
        <input type="text" id="aadhar-otp" name="otp" required
        />
      </div>
      <div className="form-group">
        <button type="button" id="verify-btn" className="btn" onClick={verifyAadhar}>Verify</button>
        <div id="message">
          {aadharVerified}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="aadhaar-number">Aadhaar Number: <span>*</span></label>
        <input type="text" id="aadhaar-number" name="aadharnumber" readOnly
        value={formData.aadharnumber}
        /> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="full-name">Full Name: <span>*</span></label>
        <input type="text" id="full-name" name="fullname" required
        value={formData.fullname}
        onChange={handleInputChange}
        /> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender: <span>*</span></label>
        <input type="text" id="gender" name="gender" required
        value={formData.gender}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group"></div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth: <span>*</span></label>
        <input type="date" id="dob" name="dob" required
        value={formData.dob}
        onChange={handleInputChange}
        /> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="father-name">Father Name: <span>*</span></label>
        <input type="text" id="father-name" name="fathername" required
        value={formData.fathername}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="mother-name">Mother Name: <span>*</span></label>
        <input type="text" id="mother-name" name="mothername" required
        value={formData.mothername}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group"></div>
      <div className="form-group">
        <label htmlFor="care-of">Care Of <span>*</span></label>
        <input type="text" id="care-of" name="careof" required
        value={formData.careof}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="street-house">Street/House/landmark:<span>*</span></label>
        <input type="text" id="street-house" name="street" required
        value={formData.street}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:<span>*</span></label>
        <input type="text" id="location" name="locality" required
        value={formData.locality}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="post-office">Post Office <span>*</span></label>
        <input type="text" id="post-office" name="postoffice" required
        value={formData.postoffice}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      
      <div className="form-group">
        <label htmlFor="country">Country:<span>*</span></label>
        <input type="text" id="country" name="country" required
        value={formData.country}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="state">State:<span>*</span></label>
        <input type="text" id="state" name="state" required
        value={formData.state}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="city">City:<span>*</span></label>
        <input type="text" id="city" name="city" required
        value={formData.city}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      <div className="form-group">
        <label htmlFor="pin-code">Pincode:<span>*</span></label>
        <input type="text" id="pin-code" name="pincode" required
        value={formData.pincode}
        onChange={handleInputChange}/> {/*readOnly*/}
      </div>
      
      <div className="form-group">
        <label htmlFor="preferred-branch">Preferred Branch:<span>*</span></label>
        <select id="preferred-branch" name="preferredbranch" required
        value={formData.preferredbranch}
        onChange={handleInputChange}
        >
          <option value="">--SELECT PREFERRED BRANCH--</option>
          <option value="nagpur">Nagpur</option>
          <option value="pune">Pune</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="pan-number">Pan Number:<span>*</span></label>
        <input type="text" id="pan-number" name="pannumber" required
        value={formData.pannumber}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pan-holder">Pan Holder Name:<span>*</span></label>
        <input type="text" id="pan-holder" name="panholdername" required
        value={formData.panholdername}
        onChange={handleInputChange}
        /> {/*readOnly*/}
      </div>

      <div className="form-group"></div>
      <div className="form-group">
        <label htmlFor="driving-license">Driving Licence Number:</label>
        <input type="text" id="driving-license" name="drivinglicensenumber"
        value={formData.drivinglicensenumber}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="driving-license-dob">Driving Licence DOB:</label>
        <input type="date" id="driving-license-dob" name="drivinglicensedob" required
        value={formData.drivinglicensedob}
        onChange={handleInputChange}
        /> {/*readOnly*/}
      </div>
      <div className="form-group">
        <button type="button" className="btn">Verify</button>
      </div>
      <div className="form-group">
        <label htmlFor="driving-license-name">Driving Licence Name:</label>
        <input type="text" id="driving-license-name" name="drivinglicensename" required
        value={formData.drivinglicensename}
        onChange={handleInputChange}
        /> {/*readOnly*/}
      </div>
      <div className="verification-summary">
        <center><button type="submit" className="btn">Continue</button></center>
        <p><span className="label">Name as per the:</span></p>
        <p><span className="label">Aadhaar:</span> <span className="value">{formData.fullname}</span></p>
        <p><span className="label">Pan:</span> <span className="value">{formData.panholdername}</span></p>
        <p><span className="label">Driving Licence:</span> <span className="value">{formData.drivinglicensename}</span></p>
    </div>
      
      <div className="form-actions">
        <button type="button" className="btn" onClick={() => setFormData({})}>Clear</button>
      </div>
    </form>
    </div>
  </div>
</div>

  )
}

export default PersonalDetail;