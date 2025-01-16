import React, { useState, useEffect } from 'react';
import '../styles/alternate-details.css';
import { useNavigate } from 'react-router-dom';

const AlternateDetails = () => {
    const [sameAsPersonal, setSameAsPersonal] = useState(false);
    const [formdata, setFormdata] = useState({
            commaddr_careof: '',
            commaddr_street: '',
            commaddr_locality: '',
            commaddr_postoffice: '',
            commaddr_city: '',
            commaddr_state: '',
            commaddr_country: '',
            commaddr_pincode: '',
            occupation: '',
            religion: '',
            caste: '',
            annualincome: '',
            sourceofincome: '',
            networth: '',
            placeofbirth: '',
            countryofbirth: '',
            maritalstatus: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setSameAsPersonal(e.target.checked);
        
        if (e.target.checked) {
          // Load data from localStorage when checkbox is checked
          const personalDetails = JSON.parse(localStorage.getItem('personalDetails'));
          console.log(personalDetails);
          if (personalDetails) {
            setFormdata({
              commaddr_careof: personalDetails.careof || '',
              commaddr_street: personalDetails.street || '',
              commaddr_locality: personalDetails.locality || '',
              commaddr_postoffice: personalDetails.postoffice || '',
              commaddr_city: personalDetails.city || '', // Assuming city is used as district
              commaddr_state: personalDetails.state || '',
              commaddr_country: personalDetails.country || '',
              commaddr_pincode: personalDetails.pincode || '',
            });
          }
        } else {
          // Clear form when checkbox is unchecked
          setFormdata({
            commaddr_careof: '',
            commaddr_street: '',
            commaddr_locality: '',
            commaddr_postoffice: '',
            commaddr_city: '',
            commaddr_state: '',
            commaddr_country: '',
            commaddr_pincode: '',
          });
        }
      };

    const handleSubmit = async (e) => {
            //   e.preventDefault();
                try {
                    // Save form data to localStorage
                    localStorage.setItem('alternateDetails', JSON.stringify(formdata));
                    console.log(formdata);
                    navigate('/nominee-details');
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error saving data. Please try again.');
                }
        };

        useEffect(() => {
            const savedData = localStorage.getItem('alternateDetails');
            if (savedData) {
                setFormdata(JSON.parse(savedData));
            }
        }, []);

        const handlePrevious = () => {
            navigate('/');
        };

  return (
    <div>
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
            <li className="current">
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
    <h2>Communication Address</h2>
    <div>
      
    <div className="checkbox-container">
        <input type="checkbox" id="same-address" onChange={handleCheckboxChange} value={sameAsPersonal}/>
        <label htmlFor="same-address">Same as Personal Address</label>
    </div>
      <div className="form-group">
        <label htmlFor="co">C/O :<span>*</span></label>
        <input type="text" id="co" name="commaddr_careof" required
        value={formdata.commaddr_careof}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="street-house">Street/House/landmark:<span>*</span></label>
        <input type="text" id="street-house" name="commaddr_street" required
        value={formdata.commaddr_street}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="area-locality">Area/Locality:<span>*</span></label>
        <input type="text" id="area-locality" name="commaddr_locality" required
        value={formdata.commaddr_locality}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="post-office">P.O. :<span>*</span></label>
        <input type="text" id="post-office" name="commaddr_postoffice" required
        value={formdata.commaddr_postoffice}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="district">District :<span>*</span></label>
        <input type="email" id="district" name="commaddr_city" required
        value={formdata.commaddr_city}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="state">State:<span>*</span></label>
        <input type="text" id="state" name="commaddr_state" required
        value={formdata.commaddr_state}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:<span>*</span></label>
        <input type="text" id="country" name="commaddr_country" required
        value={formdata.commaddr_country}
        onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pin-code">Pincode:<span>*</span></label>
        <input type="text" id="pin-code" name="commaddr_pincode" required
        value={formdata.commaddr_pincode}
        onChange={handleInputChange}
        />
      </div>
    
    <h2>Other Details</h2>
    <br/>
    <div className="form-group"></div>
    <div className="form-group"></div>
      <div className="form-group">
        <label htmlFor="occupation">Occupation :<span>*</span></label>
        <input type="text" id="occupation" name="occupation" required
        value={formdata.occupation}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="religion">Religion :<span>*</span></label>
        <select id="religion" name="religion" required
        value={formdata.religion}
        onChange={handleInputChange}>
            <option value="">--SELECT PREFERRED RELIGION--</option>
            <option value="HINDU">HINDU</option>
            <option value="MUSLIM">MUSLIM</option>
            <option value="JAIN">JAIN</option>
            <option value="SIKH">SIKH</option>
            <option value="PARSI">PARSI</option>
            <option value="BUDDHIST">BUDDHIST</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="caste">Caste :<span>*</span></label>
        <select id="caste" name="caste" required
        value={formdata.caste}
        onChange={handleInputChange}>
            <option value="">--SELECT PREFERRED CASTE--</option>
            <option value="OPEN">OPEN</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="NONE">NONE</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="annual-income">Annual Income :<span>*</span></label>
        <select id="annual-income" name="annualincome" required
        value={formdata.annualincome}
        onChange={handleInputChange}>
            <option value="">--SELECT INCOME RANGE--</option>
            <option value="LESS THAN 100000">LESS THAN 100000</option>
            <option value="100001 TO 500000">100001 TO 500000</option>
            <option value="500001 TO 1000000">500001 TO 1000000</option>
            <option value="MORE THAN 1000001">MORE THAN 1000001</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="source-of-income">Source of Income :<span>*</span></label>
        <select id="source-of-income" name="sourceofincome" required
        value={formdata.sourceofincome}
        onChange={handleInputChange}>
            <option value="">--SELECT INCOME SOURCE--</option>
            <option value="SALARY">SALARY</option>
            <option value="BUSINESS">BUSINESS</option>
            <option value="SELF EMPLOYEED">SELF EMPLOYEED</option>
            <option value="STUDENT">STUDENT</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="net-worth">Net Worth :<span>*</span></label>
        <select id="net-worth" name="networth" required
        value={formdata.networth}
        onChange={handleInputChange}>
            <option value="">--SELECT NETWORTH RANGE--</option>
            <option value="LESS THAN 100000">LESS THAN 100000</option>
            <option value="100001 TO 500000">100001 TO 500000</option>
            <option value="500001 TO 1000000">500001 TO 1000000</option>
            <option value="MORE THAN 1000001">MORE THAN 1000001</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="place-of-birth">Place of Birth :<span>*</span></label>
        <input type="text" id="place-of-birth" name="placeofbirth" required
        value={formdata.placeofbirth}
        onChange={handleInputChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="county-of-birth">Country of Birth :<span>*</span></label>
        <select id="county-of-birth" name="countyofbirth" required
        value={formdata.countryofbirth}
        onChange={handleInputChange}>
            <option value="">--SELECT COUNTRY OF BIRTH--</option>
            <option value="INDIA">INDIA</option>
            <option value="USA">USA</option>
            <option value="CHINA">CHINA</option>
            <option value="GERMANY">GERMANY</option>
            <option value="OTHER">OTHER</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="marital-status">Marital Status :<span>*</span></label>
        <select id="marital-status" name="maritalstatus" required
        value={formdata.maritalstatus}
        onChange={handleInputChange}>
            <option value="">--SELECT MARITAL STATUS--</option>
            <option value="MARRIED">MARRIED</option>
            <option value="DIVORCED">DIVORCED</option>
            <option value="SINGLE">SINGLE</option>
        </select>
      </div>
      <div className="form-group"></div>
      <div className="verification-summary">
        <center><button type="button" className="btn" onClick={handlePrevious}>Previous</button>
        <button type="button" className="btn" onClick={handleSubmit}>Continue</button></center>
    </div>
      
      <div className="form-actions">
        <button type="submit" className="btn">Save</button>
        <button type="button" className="btn">Print</button>
        <button type="button" className="btn" onClick={() => setFormdata({})}>Clear</button>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>
  )
}

export default AlternateDetails