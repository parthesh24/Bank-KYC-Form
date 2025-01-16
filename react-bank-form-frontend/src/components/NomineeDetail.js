import React, { useEffect, useState } from 'react'
import '../styles/nominee-details.css';
import { useNavigate } from 'react-router-dom';

export const NomineeDetail = () => {
    const [nomineeForm, setNomineeForm] = useState("false");
    const [minorForm, setMinorForm] = useState("false");
    const [sameAsCommunication, setSameAsCommunication ] = useState();
    const [formdata, setFormdata] = useState({
            nomineeadded:'',
            nomineename: '',
            nomineerelation: '',
            nominee_careof: '',
            nominee_street: '',
            nominee_locality: '',
            nominee_postoffice: '',
            nominee_city: '',
            nominee_state: '',
            nominee_country: '',
            nominee_pincode: '',
            is_nominee_minor:'',
            minor_dob: '',
            minor_guardian: '',
            minor_guardian_name: '',
            nominee_name_on_passbook:'',
            nominee_atm:'',
            nominee_mobilebank:'',
            nominee_smsbank:'',
            nominee_chequebook:''
    });
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setSameAsCommunication(e.target.checked);
        
        if (e.target.checked) {
          // Load data from localStorage when checkbox is checked
          const personalDetails = JSON.parse(localStorage.getItem('alternateDetails'));
          console.log(personalDetails);
          if (personalDetails) {
            setFormdata({
              nominee_careof: personalDetails.commaddr_careof || '',
              nominee_street: personalDetails.commaddr_street || '',
              nominee_locality: personalDetails.commaddr_locality || '',
              nominee_postoffice: personalDetails.commaddr_postoffice || '',
              nominee_city: personalDetails.commaddr_city || '', // Assuming city is used as district
              nominee_state: personalDetails.commaddr_state || '',
              nominee_country: personalDetails.commaddr_country || '',
              nominee_pincode: personalDetails.commaddr_pincode || '',
            });
          }
        } else {
          // Clear form when checkbox is unchecked
          setFormdata({
            nominee_careof: '',
            nominee_street: '',
            nominee_locality: '',
            nominee_postoffice: '',
            nominee_city: '',
            nominee_state: '',
            nominee_country: '',
            nominee_pincode: '',
          });
        }
      };

    const toggleNomineeForm = (e) => {
        let isNominee = "false";
        if(e.target.value==="true"){
            isNominee="true";
        }
        setNomineeForm(isNominee);
    };

    const toggleMinorForm = (e) => {
        let isMinor = "false";
        if(e.target.value==="true"){
            isMinor="true";
        }        
        setMinorForm(isMinor);    
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckedInputChange = (e) => {
        const { name, checked } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: checked }));
    };

    const handlePrevious = () => {
        navigate('/alternate-details');
    };

    const handleSubmit = async (e) => {
        //   e.preventDefault();
            try {
                // Save form data to localStorage
                localStorage.setItem('nomineeDetails', JSON.stringify(formdata));
                navigate('/upload-files');
            } catch (error) {
                console.error('Error:', error);
                alert('Error saving data. Please try again.');
            }
    };

    useEffect(() => {
            const savedData = localStorage.getItem('nomineeDetails');
            console.log(savedData);
                if (savedData) {
                    setFormdata(JSON.parse(savedData));
                }
                
            },[]);

  return (
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>ICICI Bank - Nominee Details</title>
//     <link rel="stylesheet" href="nominee-details.css">
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
                    <span>✓</span>
                    <p>Personal Details</p>
                </li>
                <li className="active">
                    <span>✓</span>
                    <p>Alternate Details</p>
                </li>
                <li className="current">
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

    <div className="form-content">
            <h2>Nominee Details</h2>
            
            <div id="nomineeForm">
                <div className="form-row">
                    <div className="radio-group">
                        <div className="radio-options">
                        <label>Do you want to add a nominee :*</label>
                            <label><input type="radio" name="nomineeadded" value={"true"} onChange={toggleNomineeForm} onClick={handleInputChange}/> Yes</label>
                            <label><input type="radio" name="nomineeadded" value={"false"} onChange={toggleNomineeForm} onClick={handleInputChange}/> No</label>
                        </div>
                    </div>
                </div>
                {nomineeForm==="true" ? (
                    <div>
                <div id="nomineeFormContent">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nominee name :*</label>
                            <input type="text" id="nomineename" name="nomineename"
                            value={formdata.nomineename}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label>Nominee Relation :*</label>
                            <select id="nomineerelation" name="nomineerelation"
                            value={formdata.nomineerelation}
                            onChange={handleInputChange}>
                                <option value="">--SELECT RELATION--</option>
                                <option value="FATHER">FATHER</option>
                                <option value="MOTHER">MOTHER</option>
                                <option value="SON">SON</option>
                                <option value="DAUGHTER">DAUGHTER</option>
                                <option value="GUARDIAN">GUARDIAN</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Nominee Address :*</label>
                            <div className="checkbox-group" id="same-address">
                                <label><input type="checkbox" 
                                checked={sameAsCommunication === true}
                                value={sameAsCommunication}
                                onChange={handleCheckboxChange}
                                /> Same as Communication Address</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>C/O :*</label>
                            <input type="text" id="co" name='nominee_careof'
                            value={formdata.nominee_careof}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Street/ House/ Landmark :*</label>
                            <input type="text" id="street-house" name='nominee_street'
                            value={formdata.nominee_street}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Area/ Locality :*</label>
                            <input type="text" id="area-locality" name='nominee_locality'
                            value={formdata.nominee_locality}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>P.O :*</label>
                            <input type="text" id="post-office" name="nominee_postoffice"
                            value={formdata.nominee_postoffice}
                            onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>District :*</label>
                            <select id="district" name='nominee_city' 
                            value={formdata.nominee_city}
                            onChange={handleInputChange}>
                                <option value="">--SELECT CITY--</option>
                                <option value="NAGPUR">NAGPUR</option>
                                <option value="MUMBAI">MUMBAI</option>
                                <option value="PUNE">PUNE</option>
                                <option value="BANGALORE">BANGALORE</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>State :*</label>
                            <select id="state" name='nominee_state'
                            value={formdata.nominee_state}
                            onChange={handleInputChange}>
                                <option value="">--SELECT STATE--</option>
                                <option value="MAHARASHTRA">MAHARASHTRA</option>
                                <option value="KARNATAKA">KARNATAKA</option>
                                <option value="GUJARAT">GUJARAT</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Country :*</label>
                            <select id="country" name='nominee_country'
                            value={formdata.nominee_country}
                            onChange={handleInputChange}>
                                <option value="">--SELECT COUNTRY--</option>
                                <option value="INDIA">INDIA</option>
                                <option value="BANGLADESH">BANGLADESH</option>
                                <option value="USA">USA</option>
                                <option value="CHINA">CHINA</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pincode :*</label>
                            <input type="text" id="pin-code" name='nominee_pincode'
                            value={formdata.nominee_pincode}
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="radio-group">
                            <div className="radio-options">
                                <label>Is nominee a minor? :</label>
                                <label><input type="radio" name="is_nominee_minor" value={"true"} onChange={toggleMinorForm} onClick={handleInputChange}/> Yes</label>
                                <label><input type="radio" name="is_nominee_minor" value={"false"} onChange={toggleMinorForm} onClick={handleInputChange}/> No</label>
                            </div>
                        </div>
                    </div>
                    {minorForm==="true" ?(
                        <div>
                    <div id="minorFormContent">
                        <p className="minor-text">As Nominee is minor please fill details below :</p>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Date of Birth :*</label>
                                <input type="date" name='minor_dob'
                                value={formdata.minor_dob}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Guardian Name</label>
                                <input type="text" name='minor_guardian_name'
                                value={formdata.minor_guardian_name}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Relationship</label>
                                <select name='minor_guardian' 
                                value={formdata.minor_guardian}
                                onChange={handleInputChange}>
                                    <option value="">--SELECT NOMINEE RELATION--</option>
                                    <option value="SON">SON</option>
                                    <option value="DAUGHTER">DAUGHTER</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    </div>
                    ):<></>}
                    <div className="form-row">
                        <div className="radio-group full-width">
                            <div className="radio-options">
                                <label>Name of the nominee to be print on passbook :</label>
                                <label><input type="radio" name="nominee_name_on_passbook" 
                                value={"true"}
                                onChange={handleInputChange}/> Yes</label>
                                <label><input type="radio" name="nominee_name_on_passbook"
                                value={"false"}
                                onChange={handleInputChange}
                                /> No</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="checkbox-group facilities">
                            <label>Other facilities :</label>
                            <div className="facility-options">
                                <label><input type="checkbox" name="nominee_atm" checked={formdata.nominee_atm} onChange={handleCheckedInputChange}/> ATM (Debit Card)</label>
                                <label><input type="checkbox" name="nominee_mobilebank" checked={formdata.nominee_mobilebank} onChange={handleCheckedInputChange}/> Mobile Banking</label>
                                <label><input type="checkbox" name="nominee_smsbank" checked={formdata.nominee_smsbank} onChange={handleCheckedInputChange}/> SMS Banking</label>
                                <label><input type="checkbox" name="nominee_chequebook" checked={formdata.nominee_chequebook} onChange={handleCheckedInputChange}/> Cheque book</label>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                ):<></>}
                <div className="verification-summary">
                    <center><button type="button" className="btn" onClick={handlePrevious}>Previous</button>
                    <button type="button" className="btn" onClick={handleSubmit}>Continue</button></center>
                </div>
                  <div className="form-actions">
                    <button type="button" className="btn">Save</button>
                    <button type="button" className="btn" onClick={() => setFormdata({})}>Clear</button>
                </div>
        </div>
    </div>
    </div>
</div>
  )
}
