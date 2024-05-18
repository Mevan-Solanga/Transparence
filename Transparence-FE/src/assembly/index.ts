import { context, storage, logging } from "near-sdk-as";

// Define a unique key prefix for storing requests
const REQUEST_PREFIX = "request-";

// Request structure
@nearBindgen
class Request {
  applicant: string;
  employer: string;
  verified: bool;

  constructor(applicant: string, employer: string) {
    this.applicant = applicant;
    this.employer = employer;
    this.verified = false;
  }
}

// Function to create a verification request
export function createVerificationRequest(employer: string): void {
  const applicant = context.sender;
  const requestId = REQUEST_PREFIX + applicant + "-" + employer;
  const request = new Request(applicant, employer);
  storage.set<Request>(requestId, request);
  logging.log("Verification request created by: " + applicant);
}

// Function to confirm a verification request
export function confirmVerificationRequest(applicant: string): void {
  const employer = context.sender;
  const requestId = REQUEST_PREFIX + applicant + "-" + employer;
  const request = storage.getSome<Request>(requestId);

  if (request.employer == employer && !request.verified) {
    request.verified = true;
    storage.set<Request>(requestId, request);
    logging.log("Verification request confirmed by: " + employer);
  } else {
    logging.log("Request verification failed or already verified.");
  }
}

// Function to get the verification status
export function getVerificationStatus(
  applicant: string,
  employer: string
): bool {
  const requestId = REQUEST_PREFIX + applicant + "-" + employer;
  const request = storage.get<Request>(requestId);
  return request != null ? request.verified : false;
}
