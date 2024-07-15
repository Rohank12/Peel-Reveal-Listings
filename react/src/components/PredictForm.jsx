import React, { useState, useEffect } from 'react';

const PredictForm = () => {
    const [prediction, setPrediction] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [location, setLocation] = useState('');
    const [jobOptions, setJobOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

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
                setIsLoading(false);
                // Handle the response data
                setPrediction(data);
                console.log(data); // want this to be stored
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', minWidth: '300px', maxWidth: '500px' }}>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Job Title:
                </label>
                <select value={jobRole} onChange={handlejobRoleChange} style={{ width: '100%', marginLeft: '10px', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="">Select a job title</option>
                    {jobOptions.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                </select>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                    Location:
                </label>
                <select value={location} onChange={handleLocationChange} style={{ width: '100%', marginLeft: '10px', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="">Select a location</option>
                    {locationOptions.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            <button type="submit" style={{ width: '100%', marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Predict</button>
        </form>
        <div style={{ marginTop: '20px' }}>Prediction: {isLoading ? 'Loading...' : prediction}</div>
    </div>
    );

};

export default PredictForm;