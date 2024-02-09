import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { fetchJob } from './apicore';

const JobView = () => {
  const { jobId } = useParams(); // Extract job ID from URL parameters
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const init = async () => {
    try {
      const data = await fetchJob(jobId);
      setJob(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [jobId]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching job!</p>;

  return (
    <Container>
      <h1>Job Details</h1>
      <Card>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Text>
            <p>Industry: {job.industry}</p>
            <p>Posted Date: {new Date(job.postedDate).toLocaleDateString()}</p>
            <p>Location: {job.location.city}, {job.location.state}, {job.location.country}</p>
            <p>Company: {job.company}</p>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </Card.Text>
          <Button variant="primary" href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobView;
