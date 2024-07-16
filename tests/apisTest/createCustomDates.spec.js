import {test,expect} from "@playwright/test";

const {DateTime} = require ('luxon'); // datetime class from luxon

import {faker} from "@faker-js/faker";

test.describe("Grouping the tests",()=>{

    test.use({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders:{
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
            'Content-Type': process.env.CONTENT_TYPE
        }

    })

    test("Create custom dates",async({request})=>{

        const now = DateTime.now() // create a object using method now()

        console.log(now.toString());

        const customDates = DateTime.fromObject({

            year: 2025,
            month: 11,
            day: 20,
            hour: 12,
            minute: 12
        })

        //console.log(customDates.toString());
        console.log(customDates.toISODate());


        const isoDate = DateTime.fromISO('2025-06-12T16:30:00');
        console.log(isoDate.toString());

         function isoTomillis (isoString){
           const datetime = DateTime.fromISO(isoString);
           return datetime.toMillis();
        }

         const isoDates = '2025-06-24T15:30:00';

         const miliseconds = isoTomillis(isoDates);

         console.log(miliseconds);

         const currentMillis = DateTime.now().toMillis();

         console.log(`Current date in milli sec is: ${currentMillis}`);

         const unixDates = DateTime.fromMillis(1717667368643);

         console.group(unixDates.toString());

         const customFormattedDates = DateTime.fromFormat('03/06/2025 16:30','dd/MM/yyyy HH:mm');

         console.log(customFormattedDates.toString());

         const futureDate = DateTime.now().plus({day:5});

         console.log(`future dates: ${futureDate}`);

         const pastMonth = DateTime.now().minus({month:2});

         console.log(`Past month is: ${pastMonth}`);



         function isoToMills (isoString){
            const isoDate = DateTime.fromISO(isoString);
            return isoDate.toMillis();
         }

         const startDate = isoToMills('2025-07-01T00:00:00');
         const endDate= isoToMills('2025-07-01T23:59:59');
         const startTime= isoToMills('2025-06-24T09:00:00');
         const endTime= isoToMills('2025-06-25T20:00:00');
         const registrationStart = isoToMills('2025-06-23T08:00:00');
         const registrationEnd = isoToMills('2025-06-24T20:00:00')


         console.log(startDate , endDate, startTime, endTime,registrationStart,registrationEnd);

         const body ={
            "startDate": startDate,
            "endDate": endDate,
            "startTime": startTime,
            "endTime": endTime,
            "registrationStartDate": registrationStart,
            "registrationEndDate": registrationEnd,
            "title": faker.word.noun(10)
        }

        const response = await request.post('/comex/api/v1/event/form',{
            data:body
        });

        expect(response.status()).toBe(200);

       const responseBody = await response.json();

       expect(await responseBody).toHaveProperty('message','Event created successfully.');
    })

})