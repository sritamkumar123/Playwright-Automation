import{test,expect} from "@playwright/test";
import{faker} from '@faker-js/faker';

test.describe('Grouping tests',()=>{

    test.use({
        baseURL: process.env.SSO_BASE_URL,
        extraHTTPHeaders:{
            'Authorization': `Bearer ${process.env.TMS_AUTH_TOKEN}`,
            'Content-Type':process.env.CONTENT_TYPE
        }
    });

    test("Create multiple users",async ({request})=>{

        for(let i=0; i<5;i++){

            const body ={
                "ssoId": `AAAAA0${faker.number.int({min: 100, max:999})}`,
                "firstName": `${faker.person.firstName()}`,
                "lastName": `${faker.person.lastName()}`,
                "email": `${faker.word.noun()}@yopmail.com`,
                "role": "USER"
                //"role": "ADMIN"
            }
    
            const response = await request.post('/v1/admin/users/create',{
                data: body
            });
    
            expect(response.status()).toBe(200);
    
            console.log(await(response).json());

        }



    })

    test.skip("Add users",async ({request})=>{

        const body= {
            'roleId': '661fa93a6b4ef44de66b13fe', //member
            'userId': '66666ea94f10565f215245cb'
        }

        const response= await request.post('/api/v1/assign-user',{
            data:body
        })

        expect(response.status()).toBe(200);

        console.log(await(response).json());

    })
})