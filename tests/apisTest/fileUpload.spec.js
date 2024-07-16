import { test, expect } from "@playwright/test";
import FormData from "form-data";
import fs from 'fs';
import path from 'path';

test.describe("File upload test",()=>{

    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders: {
            'Authorization':`Bearer ${process.env.PET_AUTH_TOKEN}`,
        }
    
    })

    test("Upload multiple form data files",async ({request})=>{

        const queryParams = '?store_name=pet%20cure%20zone';

        const formdata = new FormData();

        formdata.append('profile_image',fs.createReadStream(path.resolve(__dirname,"C:/Users/Sritam kumar/playwrightAutomation/tests/files/qr-code(1).png")));

         // Add other fields as key-value pairs
         // formdata.append('location', 'Some location description');
         //formdata.append('other_key', 'Other value');

         const headers = {
             ...formdata.getHeaders(),
            //"Authorization": `Bearer ${process.env.PET_AUTH_TOKEN}`,
         }

         const response = await request.put(`/spree/api/update_image${queryParams}`,{
            data:formdata,
            headers: headers
         });

         expect(response.status()).toBe(200);

         const responseBody =await  response.json();

         console.log(responseBody);

    })
})
