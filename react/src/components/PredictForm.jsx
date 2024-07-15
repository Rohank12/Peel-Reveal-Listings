import React, { useState, useEffect } from 'react';

const PredictForm = () => {
    const [prediction, setPrediction] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [location, setLocation] = useState('');
    const [jobOptions, setJobOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    useEffect(() => {
        // Fetch job options from /jobs endpoint
        fetch('http://localhost:3000/employees/jobs')
            .then(response => response.json())
            .then(data => setJobOptions(data));

        // Fetch location options from /locations endpoint
        fetch('http://localhost:3000/employees/locations')
            .then(response => response.json())
            .then(data => setLocationOptions(data));
    }, []);

    const handlejobRoleChange = (event) => {
        setJobRole(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Make a POST request to /predict route handler with jobRole and location
        fetch('http://localhost:3000/predict', {
            method: 'POST',
            body: JSON.stringify({ jobRole, location }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                setPrediction(data)
                console.log(data); // want this to be stored
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Job Title:
                    <select value={jobRole} onChange={handlejobRoleChange}>
                        <option value="">Select a job title</option>
                        {jobOptions.map((job, index) => (
                            <option key={index} value={job}>{job}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Location:
                    <select value={location} onChange={handleLocationChange}>
                        <option value="">Select a location</option>
                        {locationOptions.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Predict</button>
            </form>
            <div>Prediction: {prediction}</div>
        </div>
    );
};

export default PredictForm;