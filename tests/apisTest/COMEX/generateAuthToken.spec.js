import{test,expect} from "@playwright/test";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const updateEnvVariable = (key, value) => {
    const envConfig = dotenv.parse(fs.readFileSync('.env')); // read env file and parse in the object evnConfig

    envConfig[key] = value; // Update the value

    const envContent = Object.keys(envConfig) // get all the keys in array
        .map(k => `${k}=${envConfig[k]}`)    // map function implemenet 
        .join('\n');

    fs.writeFileSync('.env', envContent);   // write the updated key value pair in the .env file
    console.log(`Updated ${key} in .env file`)
};

test.describe("Grouping tests",()=>{

    test.use({
        baseURL: process.env.COMEX_BASE_URL
    });

    test("Get Auth Token",async ({request})=>{

        const body ={
             "adminEmail":"admin@comex.om",
             "adminPassword":"Green123$"
        }

        const response = await request.post('/comex/api/v1/cms-authenticate',{
            data:body
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const  token = await responseBody.jwt;
        console.log(`Get COMEX_AUTH_TOKEN: ${token}`);

        updateEnvVariable('COMEX_AUTH_TOKEN',token);
        dotenv.config();
        console.log(`Updated COMEX_AUTH_TOKEN: ${process.env.COMEX_AUTH_TOKEN}`);
    });
})

