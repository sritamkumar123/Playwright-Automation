import{test,expect} from "@playwright/test";
import{SearchKeyWords} from "C:/Users/Sritam kumar/playwrightAutomation/testData/searchKeyWord.json";

test.describe("Grouping the tests",()=>{

    test.use({
        baseURL: process.env.PET_BASE_URL,
        extraHTTPHeaders:{
            "Authorization": process.env.PET_AUTH_TOKEN,
            "Content-Type":"application/json"
        }
    });

    test("Data driven testing on order search api",async ({request})=>{

        for (let [key,value] of Object.entries(SearchKeyWords)) {

            //const response = await request.get(`/spree/api/my_orders?store_name=pet%20cure%20zone&order_number=${SearchKeyWords.order1}`);
            const response = await request.get(`/spree/api/my_orders?store_name=pet%20cure%20zone&order_number=${value}`);
            expect(await(response).status()).toBe(200);
            const responseData=await  response.json();
            console.log(responseData);
            console.log("--------------------------------------------------------------")
            console.log(responseData.data[0].attributes);
            console.log(`${value} iteration done congras.............................`);
            
        }


        
    })
})