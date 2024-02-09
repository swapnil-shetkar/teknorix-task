import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
} from "react-bootstrap";
import {
  fetchJobs,
  fetchDepartments,
  fetchLocations,
  fetchJobFunctions,
  searchJobs,
} from "./apicore";

const JobPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      const jobsData = await fetchJobs();
      setJobs(jobsData);
      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData);
      const locationsData = await fetchLocations();
      setLocations(locationsData);
      const functionsData = await fetchJobFunctions();
      setFunctions(functionsData);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const searchData = await searchJobs(
        searchTerm,
        selectedLocation ? selectedLocation.id : "",
        selectedDepartment ? selectedDepartment.id : "",
        "",
        selectedFunction ? selectedFunction.id : ""
      );
      setJobs(searchData);
    } catch (error) {
      console.error("Error searching jobs:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Job Openings</h1>
      <Form.Group className="d-flex">
        <Form.Control
          type="text"
          placeholder="Search by job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </Form.Group>
      <DropdownButton
        title={selectedDepartment ? selectedDepartment.title : "Department"}
        className="mb-3"
      >
        <Dropdown.Item onClick={() => setSelectedDepartment("")}>
          All Departments
        </Dropdown.Item>
        {!isLoading &&
          departments.map((department) => (
            <Dropdown.Item
              key={department.id}
              onClick={() => setSelectedDepartment(department)}
            >
              {department.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <DropdownButton
        title={selectedLocation ? selectedLocation.title : "Location"}
        className="mb-3"
      >
        <Dropdown.Item onClick={() => setSelectedLocation("")}>
          All Locations
        </Dropdown.Item>
        {!isLoading &&
          locations.map((location) => (
            <Dropdown.Item
              key={location.id}
              onClick={() => setSelectedLocation(location)}
            >
              {location.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <DropdownButton
        title={selectedFunction ? selectedFunction.title : "Function"}
        className="mb-3"
      >
        <Dropdown.Item onClick={() => setSelectedFunction("")}>
          All Functions
        </Dropdown.Item>
        {!isLoading &&
          functions.map((func) => (
            <Dropdown.Item
              key={func.id}
              onClick={() => setSelectedFunction(func)}
            >
              {func.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching jobs!</p>}

      {!isLoading && !isError && (
        <ListGroup>
          {jobs.map((job) => (
            <ListGroup.Item
              key={job.id}
              className="d-flex justify-content-between"
            >
              <div>
                <h3>{job.title}</h3>
                <p>{job.location.title}</p>
              </div>
              <div className="d-flex align-items-center">
                <Button
                  variant="primary"
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  Apply
                </Button>
                <Link to={`/jobview/${job.id}`}>View</Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default JobPage;
