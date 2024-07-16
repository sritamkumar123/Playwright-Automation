import {test,expect} from "@playwright/test";

test.skip("Api mocking",async({page})=>{

    await page.route("",async route=>{
        const json =[{
            "name": "QA",
            "id":"21"
        }];

    await route.fulfill({json});
    })

    await page.goto("https://pet-cure-api-qa.green-apex.com/spree/api/collections?store_name=pet%20cure%20zone");

    await expect(page.getByText("QA")).toBeVisible();

    await page.waitForTimeout(3000);

});

test("Auth API mocking test",async ({page})=>{

    // Intercept the request and mock the response

    await page.route("**",async route=>{ // here I am not adding the endpoint because after hitting url, it is bydefault redirected to the login page 

        const headers = {
            'Authorization': `Bearer ${process.env.PET_AUTH_TOKEN}`
        }

        const jsonData = {
            name :"Auth Testing",
            id :1
        }

        await route.fulfill({

            status:400,
            contentType:'application/json', // for content type
            headers:headers,
            body: JSON.stringify(jsonData) //convert the jsondata object to json string 

        });
       
    })

    let responseStatus = null;

    page.on('response',response=>{
        if(response.url().includes('/spree/api/user_show?store_name=pet%20cure%20zone')){
            responseStatus = response.status();
        }
    })

    await page.goto("https://pet-cure-api-qa.green-apex.com/spree/api/user_show?store_name=pet%20cure%20zone");

    await page.waitForTimeout(4000);

    await expect(page.getByText('Auth testing')).toBeVisible();

    await expect(page.getByText(1)).toBeVisible();

    expect(responseStatus).toBe(400);

    console.log(responseStatus);
})
