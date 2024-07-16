import {test,expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

let ids=[];

test.describe("Grouping tests",()=>{

    test.use({
        baseURL: process.env.COMEX_BASE_URL,
        extraHTTPHeaders:{
            "Authorization": `Bearer ${process.env.COMEX_AUTH_TOKEN}`,
            "Content-Type": "application/json"
        }
    })

    test.skip("create gurads",async ({request})=>{
        for (let i=0; i<5 ; i++){

            const body = {
                "emailId": `${faker.person.firstName()}.${faker.person.lastName()}@yopmail.com`,
                "location": ["6671a33b0f01c131972aec1d"],
                "event": "66548dcdc35b576405243929",
                "name": `${faker.person.fullName()}`,
                "password": "Test@123"
        }

        const response= await request.post('/comex/api/v1/managesecurityguard/create-member',{
            data:body
        });

        expect(response.status()).toBe(200);

        const responseBody = await  response.json();
        console.log(await responseBody);
        }
      
    })

    test("Get all the guards id",async ({request})=>{
        const queryparams = '?size=2&offSet=0';
        const response = await request.get(`/comex/api/v1/managesecurityguard/view-guards${queryparams}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        console.log(responseBody);

        ids= await responseBody.result.objectList.map(object => object.id)  //if the values are in a array we can use this function

        console.log(`gurads ids are: ${ids}`);
        console.log(`Total numbers of guards are: ${ids.length}`);
    });

    test.skip("update all the guard details",async ({request})=>{

        for(let id of ids){

            const body={
                "emailId": `${faker.person.firstName()}.${faker.person.lastName()}@yopmail.com`,
                "id": `${id}`,
                "location": ["6671a33b0f01c131972aec1e"],
               "name":`${faker.person.fullName()}`,
               "event": "6661cafa0f01c131972aeb88",
                "password": "NewPassword"
            }
    
            const response = await request.put('/comex/api/v1/managesecurityguard/update',{
                data:body 
            })
    
            expect(response.status()).toBe(200);
    
            const responseBody = await response.json();
    
            console.log( responseBody)

        }

    })

    test("delete guards",async ({request})=>{

        for(let id of  ids){

            const response = await request.delete(`/comex/api/v1/managesecurityguard/delete-guard-by-id/${id}`);

            expect(response.status()).toBe(200);
            
            const responseBody =await  response.json();
            
            console.log(await responseBody);
    
            console.log(`deleted id: ${id}`);

        }
        
    })
})