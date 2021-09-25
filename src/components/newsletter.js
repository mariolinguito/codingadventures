/**
 *
 * Newsletter component that subscribe users to Codsletter.
 *
 */

import React from "react"
import axios from "axios";
import { useState } from "react";
import { rhythm } from "../utils/typography"

const Newsletter = () => {

  const codsletterURL = "https://codsletter.herokuapp.com/api/SORN5rc2tggHC/subscribe";

  const initialFormData = Object.freeze({
  	email: "",
  });

  const [data, setData] = useState([]);

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    	updateFormData({
      		...formData,

      		// Trimming any whitespace
      		[e.target.name]: e.target.value.trim()
    	});
  };
  
  const handleSubmit = (e) => {
	e.preventDefault();
  	axios.post(codsletterURL, formData)
        	.then(response => {
			setData(response.data.status, null, 2);
		});
  }

  return (
	<form
		style={{
			display: 'flex',
			flexDirection: 'column',
		}}>

    		<input id="email" name="email" type="email" onChange={handleChange} placeholder="Insert your e-mail without fear..." 
			style={{
				border: '2px solid #007acc',
				padding: '10px',
				flex: 'auto',
				outline: 'none',
			}}
	  	required />

	 	<button onClick={handleSubmit} form="newsletter" type="submit" 
			style={{
				borderRadius: '0',
				border: '2px solid #007acc',
				backgroundColor: '#007acc',
				color: '#fff',
				padding: '10px',
				flex: 'auto',
				cursor: 'pointer',
			}}
	  	>Subscribe to my Codsletter</button>

	  	<p 	
	        	style={{
				display: data.length > 0 ? 'block' : 'none',
            			backgroundColor: 'antiquewhite',
            			borderRadius: '10px',
            			padding: '15px',
            			marginTop: '10px',
				textAlign: 'center',
          		}}
	        >{data}</p>
  	</form>
  )
}

export default Newsletter
