import { test, expect } from "@playwright/test";
import FormData from "form-data";
import fs from "fs";
import path from "path";

test.describe("File upload test", () => {

    test.use({
        baseURL: process.env.TMS_BASE_URL,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${process.env.TMS_AUTH_TOKEN}`
        }
    });

    test("Upload a file using form data", async ({ request }) => {
        // Define the file path
        const filePath = path.resolve(__dirname, 'C:/Users/Sritam kumar/playwrightAutomation/tests/files/GA-TMS Sample file (1).xlsx');
        
        // Ensure the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at ${filePath}`);
        }

        // Create a FormData instance and append the file and other key-value pairs
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath)); // 'file' should be the name expected by the API

        // Send the POST request
        const response = await request.post('tms/api/v1/preview-bulk-upload', {
            multipart: {
                file: fs.createReadStream(filePath)
                // Add other fields if necessary
                // key1: 'value1',
                // key2: 'value2'
            }
        });

        // Validate the response
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log(responseBody);
    });
});






