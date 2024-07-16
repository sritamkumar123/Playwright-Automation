import{test,expect} from "@playwright/test";

const {DateTime} = require ("luxon");

import {faker} from "@faker-js/faker";

let ids=[];

test.describe("Grouping of the test",()=>{

    test.use({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders:{
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`,
            "Content-Type": process.env.CONTENT_TYPE
        }
    });

    test("Automate event dates",async({request})=>{

        let currentStartDate = DateTime.fromISO('2026-10-01T09:00:00');
        let currentEndDate = DateTime.fromISO('2026-10-01T14:00:00');

        for(let i=0; i<5;i++){
            currentStartDate = currentStartDate.plus({ days: 1 });
            currentEndDate = currentEndDate.plus({ days: 1 });

            const body={

                "startDate": currentStartDate.toMillis(),
                "endDate": currentEndDate.toMillis(),
                "startTime": DateTime.fromISO('2025-06-20T09:08:12').toMillis(),
                "endTime": DateTime.fromISO('2025-06-21T09:08:12').toMillis(),
                "registrationStartDate": DateTime.fromISO('2025-06-20T09:08:12').toMillis(),
                "registrationEndDate": DateTime.fromISO('2025-06-21T09:08:12').toMillis(),
                "title": faker.word.noun(10)

            }

            const response = await request.post('/comex/api/v1/event/form',{
                data: body,
    
            })

            expect(response.status()).toBe(200);

            const data= await response.json();

            console.log(await data);

            expect(data).toHaveProperty("message","Event created successfully.")

            ids.push(data.result.id);
        }

        console.log("Capture ids:", ids);

    })
})