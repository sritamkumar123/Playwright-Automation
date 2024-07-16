import {test,expect} from "@playwright/test";
import fs from 'fs';
import dotenv from "dotenv";

let auth_token;

dotenv.config(); // Load existing environment variables from .env


// Function to update .env file
const updateEnvVariable = (key, value) => {
    const envConfig = dotenv.parse(fs.readFileSync('.env')); // read env file and parse in the object evnConfig

    envConfig[key] = value; // Update the value

    const envContent = Object.keys(envConfig) // get all the keys in array
        .map(k => `${k}=${envConfig[k]}`) // map function implemenet 
        .join('\n');

    fs.writeFileSync('.env', envContent); // write the updated key value pair in the .env file
};

test.describe("grouping test",()=>{

    test.use({
        baseURL: process.env.TMS_BASE_URL,
        extraHTTPHeaders:{
            'token': 'pNhKD0Roq+XoDGNLxpMycA==',
            'Content-Type': process.env.CONTENT_TYPE
        },

    });  

    test("Get Auth Token",async({request})=>{

       const response = await request.post('tms/api/v1/tms/authenticate');

       expect(response.status()).toBe(200);

       console.log( response);

       const body= await response.json();

       auth_token = body.result.accessToken;

       console.log(auth_token);

       updateEnvVariable('TMS_AUTH_TOKEN', auth_token);

       dotenv.config();

       console.log('Auth token updated in .env file');

    });
})




