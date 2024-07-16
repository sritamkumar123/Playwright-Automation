import{test,expect} from "@playwright/test";

import {faker} from '@faker-js/faker';

let ids=[];

test.describe.serial("Group all tests",()=>{

    test.setTimeout(60000);
    test.use({

        baseURL: process.env.COMEX_BASE_URL,
        extraHTTPHeaders : {
            "Authorization": `Bearer ${process.env.COMEX_AUTH_TOKEN}`,
            "Content-Type": "application/json"
        }
    });

    test("Create multiple locations",async({request})=>{

        const numberOfLocations = 100;

        for(let i=0; i<numberOfLocations; i++){

            const randomCity= faker.person.firstName();

            const body = {

                "locationName": `${randomCity} ${faker.location.city()}`,
            }
    
            const response =await  request.post('/comex/api/v1/managesecurityguard/add-location',
                {
                    data: body
                }
            );
    
             expect(await response.status()).toBe(200);
             
             console.log(await response.json());
        }
    })

    test.only("Get all location ids",async ({request})=>{

        const queryParams = '?offSet=0&size=100';
        const response = await request.get(`/comex/api/v1/managesecurityguard/view-location${queryParams}`);

        const data= await response.json();

         ids = data.result.objectList.map(object => object.id); // map method call the callback function for each element in the array and returns a array of items
                                                                // The map method creates a new array by calling a function on every element of the original array.
                                                                // In this case, the function extracts the id property from each object.

         console.log("Extracted Ids", ids);

         console.log(`Total number of ids are: ${ids.length}`)

        
    })

    test.skip("Edit all targeted locations",async ({request})=>{



        for(let id of ids){

            const randomCity = faker.location.city();

            const body =
                {
                    "id" : id,
                    "locationName": `${randomCity} ${faker.location.city()}`
                }
            const response =await  request.put('comex/api/v1/managesecurityguard/update-location',
                {
                    data: body
                }
            );

            expect(response.status()).toBe(200);

        }
    })

    test("Delete All Ids",async({request})=>{

        for(let id of ids){

            const response = await request.delete(`/comex/api/v1/managesecurityguard/delete-location-by-id/${id}`);

            expect(response.status()).toBe(200);

            console.log(`Deleted id:${id}`);
        }
    })
})