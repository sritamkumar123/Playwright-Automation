import {test,expect} from "@playwright/test";

test.describe("Grouping the tests",()=>{

    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders:{
            "Authorization" : process.env.PET_AUTH_TOKEN,
            "Content-Type": "application/json"
        }
    })

    test("Update user details",async ({request})=>{

        const body = {
        
                "data": {
                    "first_name": "sample test edited",
                    "last_name": "account created edited",
                    "country_code": "+1",
                    "phone_num": "6787865490",
                    "profile_detail_attributes": {
                        "street_name": "sample city edited",
                        "landmark": "address added with example",
                        "pincode": "789765",
                        "bio": "details are updated on bio from playwright edited with details are added with low label details with example added with sample example added with new details are added into it with sample example"
                    }
                }
        };

        const response= await request.put('/spree/api/user_edit?store_name=pet%20cure%20zone',{
            data: body

        });

        expect(await(response).status()).toBe(200);
        const jsonResponse = await response.json();

        console.log(jsonResponse);
        console.log("---------------------------------------------------");
        console.log(await jsonResponse.data.attributes.profile_detail);
    })
})