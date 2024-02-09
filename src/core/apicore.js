const apiBaseUrl = "https://teknorix.jobsoid.com/api/v1";

export const searchJobs = async (
  searchTerm,
  location,
  department,
  division,
  func
) => {
  let url = `${apiBaseUrl}/jobs?q=${searchTerm}`;

  console.log("API request URL:", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
};

export const fetchJobs = async () => {
  let url = `${apiBaseUrl}/jobs`;

  console.log("API request URL:", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
};

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

export const fetchLocations = async () => {
  const url = `${apiBaseUrl}/locations`;
  return fetchData(url);
};

export const fetchDepartments = async () => {
  const url = `${apiBaseUrl}/departments`;
  return fetchData(url);
};

export const fetchDivisions = async () => {
  const url = `${apiBaseUrl}/divisions`;
  return fetchData(url);
};

export const fetchJobFunctions = async () => {
  const url = `${apiBaseUrl}/functions`;
  return fetchData(url);
};

export const fetchJob = async (jobId) => {
  const url = `${apiBaseUrl}/jobs/${jobId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }

  return response.json();
};
