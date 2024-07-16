import { test, expect } from "@playwright/test";

// Define the list of IDs to be deleted
let ids = [
  '664dcabb98eb6f308286693e', '664dcb7198eb6f308286693f', '664ef7d8caf1991f3c658f17',
  '6655676cc35b5764052439a9', '665c74d1c35b5764052439ac', '665c898ac35b5764052439ad',
  '665c89cec35b5764052439ae', '665c8e76c35b5764052439af', '665c8ea1c35b5764052439b0',
  '665c8ee1c35b5764052439b1', '665c8f0bc35b5764052439b2', '665cbb07c35b5764052439b3',
  '665cbb3cc35b5764052439b4', '665cbbbfc35b5764052439b5', '665cbc3fc35b5764052439b6',
  '665cbc6ac35b5764052439b7', '665cbd5ac35b5764052439b8', '665cdaddc35b5764052439b9',
  '665d7bdbc35b5764052439ba', '665d81cac35b5764052439bb', '665d829bc35b5764052439bc',
  '665d831cc35b5764052439bd', '665d834ac35b5764052439be', '665d8f3bc35b5764052439bf',
  '665d8f5bc35b5764052439c0', '665da282c35b5764052439c1', '665da34fc35b5764052439c2',
  '665da3cec35b5764052439c3', '665da445c35b5764052439c4', '665dd264c35b5764052439cd'
];

// Define the baseURL and auth token from environment variables
const BASE_URL = process.env.BASE_URL;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// Group all tests
test.describe("Group all tests", () => {

  // Use the request fixture with baseURL and auth token
  test.use({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  // Create a separate test for each ID
  ids.forEach(id => {
    test(`Delete ID: ${id}`, async ({ request }) => {
      const response = await request.delete(`/comex/api/v1/managesecurityguard/delete-guard-by-id/${id}`);
      expect(response.status()).toBe(200);
    });
  });

});
