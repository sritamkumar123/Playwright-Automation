import {test,expect} from "@playwright/test";

test.describe("Grouping of the tests",()=>{
    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders:{
            "Authorization": process.env.PET_AUTH_TOKEN
        }
    });

    test("Get the wishlist records",async ({request})=>{

        const response = await request.get("/spree/api/get_wishlist_details");

        expect(await(response).status()).toBe(201);
        console.log(await(response).json())
        const responseData= await response.json();
        console.log("----------------------------------------------------------");
        console.log(responseData.data.attributes.products);
        console.log("----------------------------------------------------------");
        console.log(responseData.data.attributes.products.data[0].attributes);
    })
})