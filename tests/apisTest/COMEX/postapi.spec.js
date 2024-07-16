import{test,expect} from "@playwright/test";

const faker = require('faker');

//const fetch = require('node-fetch');

let guardId;
let location1;
let location2;
let event1;
let event2;
let ids;

test.describe("Token and URL added",()=>{

    test.use({

        baseURL:'https://comex-apist.greenapex.in',
        extraHTTPHeaders: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyZXNldFBhc3N3b3JkIjpmYWxzZSwic3ViIjoiYWRtaW5AY29tZXgub20iLCJleHAiOjE3MzE4MjIzNzYsImlhdCI6MTcxNzMwNzE3NiwiaXNTZWN1cml0eUd1YXJkIjpmYWxzZX0.a75SwkyttxMHzCbv7Y7FdbwIVUD3X6av8tExuH42i_8', // Replace with your actual auth token
            'Content-Type': 'application/json'
          }
    });

    test("Create guard",async ({request})=>{

        const randomEmail= faker.internet.email();
        const randomPassword= faker.internet.password();
       // const randomName= faker.name.firstName();
      // const randomName= faker.name.lastName();
      

        const payload = {
            "emailId": randomEmail,
            "location": [
              "664de86498eb6f308286694f"
            ],
            "event": "66548dcdc35b576405243929",
            "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "password": randomPassword
        };

        const headers = {

            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyZXNldFBhc3N3b3JkIjpmYWxzZSwic3ViIjoiYWRtaW5AY29tZXgub20iLCJleHAiOjE3MzE4MjIzNzYsImlhdCI6MTcxNzMwNzE3NiwiaXNTZWN1cml0eUd1YXJkIjpmYWxzZX0.a75SwkyttxMHzCbv7Y7FdbwIVUD3X6av8tExuH42i_8', // Replace with your actual auth token
            'Content-Type': 'application/json'

        };
        const response = await request.post("/comex/api/v1/managesecurityguard/create-member",{
                                            data: payload,
                                            headers: headers
        });

        expect(response.status()).toBe(200);
        
        const data = await response.json();

        console.log(data);

        guardId= await data.result.id;

        expect(await guardId).toBeDefined();



        expect(data.result).toHaveProperty("emailId",randomEmail);

       // expect(data.result).toHaveProperty("name",`${faker.name.firstName()} ${faker.name.lastName()}`) --> it will fail because both  name are not same 

        const postAttributes = [
            'id',
            'emailId',
            'name',
            'password',
            'location',
            'event']

            function checkAttributes(data, attributes){

                attributes.forEach(attribute => {

                    expect(data.result).toHaveProperty(attribute);
                    
                });

            }

            checkAttributes(data,postAttributes);


    });

    test("Get All locations",async ({request})=>{

        const queryParams = '?offSet=0&size=20';

        const response = await request.get(`/comex/api/v1/managesecurityguard/view-location${queryParams}`);

        expect(response.status()).toBe(200);

        const data = await response.json();

        console.log(data);

        location1= data.result.objectList[0].id;

        location2= data.result.objectList[1].id;

        console.log(location1,location2);

    })

    test("Get all event",async({request})=>{

        const queryParam= '?offSet=0&size=50';
        const response = await request.get(`/comex/api/v1/event/list/${queryParam}`);

        expect(response.status()).toBe(200);

        const data= await response.json();

       console.log(data);

       event1= data.result.eventRegDtoList[0].id;
       event2=data.result.eventRegDtoList[1].id;

       console.log(event1,event2);

    })

    test("Update guard details",async({request})=>{

        const payload= {
            "emailId": "test123@yopmail.com",
            "id": guardId,
            "location": [location1,location2],
           "name":`${faker.name.firstName()} ${faker.name.lastName()}`,
           "event": event1,
            "password": "NewPassword"
        };

        const response= await request.put("/comex/api/v1/managesecurityguard/update",{
            data:payload
        })

        expect( response.status()).toBe(200);

        const data= await response.json();

        console.log(data);

        console.log(guardId,location1,location2,event1,event2);

    })

    test("get all guards",async({request})=>{
        const queryParams = "?size=50&offSet=0";

        const response = await request.get(`/comex/api/v1/managesecurityguard/view-guards${queryParams}`);

        expect(response.status()).toBe(200);

        const data = await response.json();

        console.log(data);

        function extractIds(response) {
             ids=[];
            const objectList = response.result.objectList;
            
            objectList.forEach(object=>{
                ids.push(object.id);
            })

            return ids;
        }

        console.log(extractIds(data));


    })

     test("delete latest guard id",async ({request})=>{

        const id = ids[ids.length-1];

         const response = await request.delete(`/comex/api/v1/managesecurityguard/delete-guard-by-id/${id}`);

         expect( response.status()).toBe(200);

         console.log(`${id} this id record deleted from the guard list`);


     });

        
    

    // for random values we need to use faker-js library 

    // set the fullyParallel as false for serial execution


});