import {test,expect} from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Grouping the tests",()=>{

    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders:{
            "Authorization": `Bearer ${process.env.PET_AUTH_TOKEN}`,
        }
    });

    test("Update profile image",async ({request})=>{
        const filePath = path.resolve(__dirname, 'C:/Users/Sritam kumar/playwrightAutomation/tests/files/logo.png');
        const fileStream = fs.createReadStream(filePath);

        const response = await request.put("/spree/api/update_image?store_name=pet%20cure%20zone",{

            multipart:{
                profile_image : fileStream
            },

        })
    
       expect(response.status()).toBe(200);
       console.log(await (response).json());
       console.log("------------------------------------------------------------------------");
       const responseData= await response.json();
       console.log(responseData.data.attributes.profile_detail);

    })
})
