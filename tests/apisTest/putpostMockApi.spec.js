// import {test,expect} from "@playwright/test";

// import { faker } from "@faker-js/faker";

// test.describe("Group the tests",()=>{

//     test.use({

//         baseURL: process.env.BASE_URL,
//         extraHTTPHeaders:{
//             'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
//             "Content-Type":'application/json'
//         }

//     });

//     test("mock create loaction",async({page})=>{

//         await page.route("**/comex/api/v1/managesecurityguard/add-location",async (route)=>{

//             jsonData={
//                 message:"Location created successfully",
//                 id:1
//             }

//             route.fulfill({
//                 status:201,
//                 contentType:'application/json',
//                 body:JSON.stringify(jsonData)
//             })

//         });

//         const payload={
//             "locationName":`${faker.location.city()}`
//         }

//         const response =  page.request.post('/comex/api/v1/managesecurityguard/add-location',{
//             data: payload     
//         });


//      expect((await response).status()).toBe(201);

//     })
// })


import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Group the tests", () => {

    test.use({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
            "Content-Type": 'application/json'
        }
    });

    test("mock create location", async ({ page }) => {
        await page.route("**/comex/api/v1/managesecurityguard/add-location", async (route) => {
            
            const jsonData = {
                message: "Location created successfully",
                id: 1
            };

            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify(jsonData)
            });
        });

        const payload = {
            "locationName": `${faker.location.city()}`
        };

        const response = await page.request.post('/comex/api/v1/managesecurityguard/add-location', {
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.message).toBe("Location created successfully");
        expect(responseBody.id).toBe(1);
    });
});

