import React, { useState } from 'react'
import '../styles/upload-files.css';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function previewImage(e, previewId) {
    const file = e.target.files[0];
    const preview = document.getElementById(previewId);

    // Validate file type
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
        const reader = new FileReader();
        reader.onload = function () {
            preview.innerHTML = `<img src="${reader.result}" alt="Preview Image">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "Invalid file type.";
    }
};

export const UploadFiles = () => {
    const [formdata, setFormdata] = useState({
            customerphoto: null,
            customersignature: null,
            aadharcardimage: null,
            typeof_addressproof: '',
            addressproof: null,
            otherdocuments: null,
            additionalcomments: '',
            profile_image:null,
    });
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        if(file){
            const blob = new Blob([file], { type: file.type });
            setFormdata((prev) => ({ ...prev, [name]: blob }));
        }
    }

    const handleNonFileInputChange = (e) => {
        const value = e.target.value
        const name = e.target.name
            setFormdata((prev) => ({ ...prev, [name]: value }));
    }

    const handleuploadData = async () => {
        try {
            // First save personal details
            const personalDetails = localStorage.getItem('personalDetails');
            const alternateDetails = localStorage.getItem('alternateDetails');
            const nomineeDetails = localStorage.getItem('nomineeDetails');
            const savedImage = localStorage.getItem('profile_image');
            
            if(!personalDetails || !alternateDetails || !nomineeDetails){
                throw new Error("Required details not found in localStorage");
            }
    
            const details = {
                ...JSON.parse(personalDetails),
                ...JSON.parse(alternateDetails),
                ...JSON.parse(nomineeDetails)
            };
    
            console.log("details",details)
            console.log("profileImage", savedImage)
            // Save user details first
            const userResponse = await fetch("http://localhost:3001/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
    
            if (!userResponse.ok) {
                console.log("response",userResponse);
                throw new Error("Failed to save user details");
            }
    
            const userData = await userResponse.json();
            console.log("userdata: ", userData);
            // Create FormData for files
            if (savedImage) {
                setFormdata((prev) => ({ ...prev, [formdata.profile_image]: savedImage }));
            }
            const formDataToSend = new FormData();
            
            // Append files and other data
            for (const [key, value] of Object.entries(formdata)) {
                if (value instanceof Blob) {
                    // For files, append with a filename
                    const fileExtension = value.type.split('/')[1];
                    formDataToSend.append(key, value, `${key}.${fileExtension}`);
                } else {
                    // For non-file data
                    formDataToSend.append(key, value);
                }
            }

            console.log("formdatatosend: ", formDataToSend);
    
            // Upload documents
            const docResponse = await fetch(`http://localhost:3001/document/${userData.id}`, {
                method: "POST",
                body: formDataToSend
            });
    
            if (!docResponse.ok) {
                throw new Error("Failed to upload documents");
            }
    
            const result = await docResponse.json();
            console.log('Upload successful:', result);
            alert('Documents uploaded successfully!');
            localStorage.clear()
            // Redirect to success page
            navigate('/success');
    
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
                const savedData = localStorage.getItem('uploadFiles');
                console.log("loaded data",savedData);
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
//     <title>ICICI Bank - Upload Files</title>
//     <link rel="stylesheet" href="upload-files.css">
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
                <li className="active">
                    <span>✓</span>
                    <p>Nominee Details</p>
                </li>
                <li className="current">
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
            <h2>Upload Files</h2>

            <div id="uploadFilesForm">
                <div className="form-row">
                    <p>Please upload the  documents below. Ensure files are in PDF, JPG, or PNG format and do not exceed 2MB.</p>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Customer Photo:<span>*</span></label>
                        <input 
                        type="file" 
                        accept=".pdf, .jpg, .png" 
                        name="customerphoto" 
                        onChange={(e) => {
                            previewImage(e, 'photoPreview');
                            handleFileChange(e);
                        }}
                        />
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group"></div>
                    <div className="form-group">
                    <div className="image-preview" id="photoPreview"></div>
                </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="form-group">
                        <label>Customer Signature:<span>*</span></label>
                        <input 
                        type="file" 
                        accept=".pdf, .jpg, .png" 
                        name="customersignature"
                        onChange={(e) => {
                            previewImage(e, 'signaturePreview');
                            handleFileChange(e);
                        }}
                        />
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group"></div>
                    <div className="form-group">
                    <div className="image-preview" id="signaturePreview"></div>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="form-group">
                        <label>Aadhar Card Image:<span>*</span></label>
                        <input 
                        type="file" 
                        accept=".pdf, .jpg, .png" 
                        name="aadharcardimage" 
                        onChange={(e) => {
                            previewImage(e, 'aadharPreview');
                            handleFileChange(e);
                        }}
                        />
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group"></div>
                    <div className="form-group">
                    <div className="image-preview" id="aadharPreview"></div>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="form-group">
                        <label>Address Proof:</label>
                        <select id="address-proof" name="typeof_addressproof" 
                        value={formdata.typeof_addressproof}
                        onInput={handleNonFileInputChange}
                        >
                            <option value="">--SELECT ADDRESS PROOF--</option>
                            <option value="AADHAR">AADHAR</option>
                            <option value="ELECTRICTY BILL">ELECTRICITY BILL</option>
                            <option value="WATER BILL">WATER BILL</option>
                            <option value="PASSPORT">PASSPORT</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Upload Address Proof <span>*</span></label>
                        <input 
                        type="file" 
                        accept=".pdf, .jpg, .png" 
                        name="addressproof"
                        onChange={(e) => {
                            previewImage(e, 'addressProofPreview');
                            handleFileChange(e);
                        }}
                        />
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group">
                    <div className="image-preview" id="addressProofPreview"></div>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="form-group">
                        <label>Other Supporting Documents:</label>
                        <input 
                        type="file" 
                        accept=".pdf, .jpg, .png" 
                        name="otherdocuments" 
                        onChange={(e) => {
                            previewImage(e, "supportingDocsPreview");
                            handleFileChange(e);
                        }}
                        />
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group"></div>
                    <div className="form-group">
                    <div className="image-preview" id="supportingDocsPreview"></div>
                    </div>
                </div>
                <br/>
                <div className="form-row">
                    <div className="form-group">
                        <label>Additional Comments (if any):</label>
                        <textarea rows="4" placeholder="Enter any comments or notes here..." name="additionalcomments"
                        value={formdata.additionalcomments}
                        onInput={handleNonFileInputChange}
                        ></textarea>
                    </div>
                </div>
                <center><a href="/nominee-details"><button type="button" className="btn">Previous</button></a></center>
                <div className="form-actions">
                    <button type="submit" onClick={handleuploadData} className="btn">Save</button> 
                    <button type="button" className="btn">Print</button>
                    <button type="button" className="btn" onClick={()=>setFormdata({})}>Clear</button>
                </div>
            </div>
            </div>
    </div>
</div>
  )
}
