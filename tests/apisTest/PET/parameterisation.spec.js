import {test,expect} from "@playwright/test";

test.describe("Grouping of the tests",()=>{
    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders:{
            "Accept": "application/json"
        }
    });

    const keywords = ["Re","nex","pro","example"];

    test("Parameterization on search API ",async ({request})=>{

        for( let key of keywords){

            const response= await request.get(`/spree/api/search?store_name=pet cure zone&letter=${key}`);
            expect(await(response).status()).toBe(200);
            const responseData = await response.json();
            console.log(responseData);

        }
    })
})