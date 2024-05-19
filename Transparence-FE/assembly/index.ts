import { context, storage, PersistentMap } from "near-sdk-as";

// A PersistentMap to store verification requests
const verificationRequests = new PersistentMap<string, Request>("requests");

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

export function createVerificationRequest(applicant: string, employer: string): void {
  const requestId = `${applicant}:${employer}`;
  const request = new Request(applicant, employer);
  verificationRequests.set(requestId, request);
}

export function confirmVerificationRequest(applicant: string, employer: string): void {
  const requestId = `${applicant}:${employer}`;
  const request = verificationRequests.getSome(requestId);
  request.verified = true;
  verificationRequests.set(requestId, request);
}

export function getVerificationStatus(applicant: string, employer: string): bool {
  const requestId = `${applicant}:${employer}`;
  const request = verificationRequests.getSome(requestId);
  return request.verified;
}
