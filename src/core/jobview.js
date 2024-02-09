import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchJob } from './apicore';

const JobView = () => {
  const { jobId } = useParams();
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
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching job!</p>;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center mb-4">{job.title}</Card.Title>
              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Industry:</strong> {job.industry}
                </Col>
                <Col xs={4}>
                  <strong>Posted Date:</strong>{' '}
                  {new Date(job.postedDate).toLocaleDateString()}
                </Col>
                <Col xs={4}>
                  <strong>Location:</strong>{' '}
                  {job.location.city}, {job.location.state}, {job.location.country}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <strong>Company:</strong> {job.company}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <strong>Description:</strong>
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={8} className="text-center">
                  <Button
                    variant="primary"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobView;