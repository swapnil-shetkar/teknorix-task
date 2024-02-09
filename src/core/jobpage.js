import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { fetchJobs, fetchDepartments, fetchLocations, fetchJobFunctions } from './apicore';

const JobPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadDepartments = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
      setIsError(true);
    }
  };

  const loadLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data);
    } catch (error) {
      console.error('Error loading locations:', error);
      setIsError(true);
    }
  };

  const loadFunctions = async () => {
    try {
      const data = await fetchJobFunctions();
      setFunctions(data);
    } catch (error) {
      console.error('Error loading job functions:', error);
      setIsError(true);
    }
  };

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        await Promise.all([loadDepartments(), loadLocations(), loadFunctions(), loadJobs()]);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Job Openings</h1>
      <Form.Control
        type="text"
        placeholder="Search by job title"
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DropdownButton title="Department" className="mb-3" onClick={(e) => setDepartment(e.target.value)}>
        <Dropdown.Item value="" disabled>All Departments</Dropdown.Item>
        {!isLoading &&
          departments.map((department) => (
            <Dropdown.Item key={department.id} eventKey={department.id}>
              {department.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <DropdownButton title="Location" className="mb-3" onClick={(e) => setLocation(e.target.value)}>
        <Dropdown.Item value="" disabled>All Locations</Dropdown.Item>
        {!isLoading &&
          locations.map((location) => (
            <Dropdown.Item key={location.id} eventKey={location.id}>
              {location.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <DropdownButton title="Function" className="mb-3" onClick={(e) => setJobFunction(e.target.value)}>
        <Dropdown.Item value="" disabled>All Functions</Dropdown.Item>
        {!isLoading &&
          functions.map((func) => (
            <Dropdown.Item key={func.id} eventKey={func.id}>
              {func.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching jobs!</p>}
      {!isLoading && !isError && jobs.length > 0 &&
        jobs.map((job) => (
          <div key={job.id} className="mb-3">
            <h3>{job.title}</h3>
            <p>{job.department.title}</p>
            <p>{job.location.title}</p>
            <Button variant="primary" href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              Apply
            </Button>
            <Link to={`/jobview/${job.id}`} >
              View
            </Link>
          </div>
        ))
      }
    </Container>
  );
};

export default JobPage;
