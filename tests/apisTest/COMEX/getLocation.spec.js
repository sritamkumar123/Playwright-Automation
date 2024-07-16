// import{test,expect} from "@playwright/test";

// let ids;

// test.describe("Grouping test cases",()=>{

//     test.use({
//         baseURL:  process.env.BASE_URL,
//         extraHTTPHeaders:{
//             'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
//             'Content-Type': 'application/json'

//         }
//     });

//     test.beforeEach("get all locations",async ({request})=>{

//         const url= process.env.BASE_URL;
//         const token = process.env.AUTH_TOKEN;
//         const queryParams = "?offSet=0&size=20"
//         const header= {
//             "Authorization": `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }


//         const response = await request.get(`${url}/comex/api/v1/managesecurityguard/view-location${queryParams}`, {
//          headers: header
    
//           });

//         expect(response.status()).toBe(200);

//         const data =await  response.json();


//         async function extractAllIds(jsondata){
//             ids=[];
//             const objectList = jsondata.result.objectList;

//             objectList.forEach(object=>{
//                 ids.push(object.id);
//             })

//             return ids;                
        
            
//         }

//         console.log(await extractAllIds(data));
//         //  by using env variable , we can able to srt dynamic values
//         // install dotenv 
//         // add configuretaion as require('dotenv').config(); in to the config file

//     });


//         // test('Delete all ids',async(request)=>{

//         //     for(const id of ids){

//         //         const response =  await request.delete(`/comex/api/v1/managesecurityguard/delete-location-by-id/${id}`);

//         //         expect(await  response.status()).toBe(200);

//         //     }

//         //     console.log(ids);

//         // })





// });



import { test, expect } from "@playwright/test";

let ids;

test.describe("Grouping test cases", () => {
    // Set the base URL and authorization header globally for all tests
    test.use({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    // Test to fetch all IDs
    test("Fetch all locations and extract IDs", async ({ request }) => {
        const url = process.env.BASE_URL;
        const queryParams = "?offSet=0&size=30";

        const response = await request.get(`/comex/api/v1/managesecurityguard/view-location${queryParams}`);
        expect(response.status()).toBe(200);

        const data = await response.json();

        // Extract all IDs
        ids = data.result.objectList.map(object => object.id);
        console.log("Extracted IDs:", ids);
    });

   //Test to delete all fetched IDs
    test("Delete all fetched IDs", async ({ request }) => {
        for (const id of ids) {
            const response = await request.delete(`/comex/api/v1/managesecurityguard/delete-location-by-id/${id}`);
            expect(response.status()).toBe(200);
        }
    });
});
