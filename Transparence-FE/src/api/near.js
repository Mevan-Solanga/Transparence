import { initContract } from './near-config';

let walletConnection;
let contract;
let accountId;

export async function initializeNear() {
  const near = await initContract();
  walletConnection = near.walletConnection;
  contract = near.contract;
  accountId = near.accountId;
}

export async function createVerificationRequest(applicant, employer) {
  await contract.createVerificationRequest({ applicant, employer });
}

export async function confirmVerificationRequest(applicant, employer) {
  await contract.confirmVerificationRequest({ applicant, employer });
}

export async function getVerificationStatus(applicant, employer) {
  return await contract.getVerificationStatus({ applicant, employer });
}

export function getAccountId() {
  return accountId;
}
