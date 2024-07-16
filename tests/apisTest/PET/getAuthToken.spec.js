import {test,expect} from "@playwright/test";
import fs from "fs";
import dotenv from "dotenv";

let auth_token;
dotenv.config();

const updateEnvVariable = (key, value) => {
    const envConfig = dotenv.parse(fs.readFileSync('.env')); // read env file and parse in the object evnConfig

    envConfig[key] = value; // Update the value

    const envContent = Object.keys(envConfig) // get all the keys in array
        .map(k => `${k}=${envConfig[k]}`) // map function implemenet 
        .join('\n');

    fs.writeFileSync('.env', envContent); // write the updated key value pair in the .env file
};


test.describe("Groupimg test",()=>{

    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHttpHeaders: {
            "Content-Type": "application/json"
        }
    });

        test("Get Auth Token",async ({request})=>{
            for(let i=0; i<=50; i++){
    
            const reqBody={
                "data": {
                    "email": "samplemail111@yopmail.com",
                    "password": "Test@1234",
                    "store_name": "pet cure zone"
                  }
            };
            const response= await request.post('/spree/api/login_user',{
                data: reqBody
            });
    
            expect(await(response).status()).toBe(200);
            const responsedata = await response.json();
            console.log(responsedata);
            auth_token = responsedata.meta.token;
            console.log(`The auth token is: ${auth_token}`)
    
            updateEnvVariable('PET_AUTH_TOKEN', auth_token);
            dotenv.config();
            console.log('Auth token updated in .env file');

            }
    
        })

});

