import React from 'react'
import '../styles/success.css'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
  return (
    <div>
        {/* <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ICICI Bank - Upload Files</title>
    <link rel="stylesheet" href="success.css">
</head> */}

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
                <li className="active">
                    <span>✓</span>
                    <p>Upload Files</p>
                </li>
                <li className="active">
                    <span>✓</span>
                    <p>Success</p>
                </li>
            </ul>
        </div>
        <center>
    <h1>SUCCESS!</h1>        
    <button type="button" className="btn" onClick={()=>navigate('/')}>Home Page</button>
        </center>

    </div>
</div>
  )
}

export default Success