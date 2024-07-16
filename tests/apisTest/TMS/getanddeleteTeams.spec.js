import{test,expect} from "@playwright/test";

let ids =[];

test.describe.serial("Grouping test",()=>{

    test.use({
        baseURL:process.env.TMS_BASE_URL,
        extraHTTPHeaders:{
            "Authorization": `Bearer ${process.env.TMS_AUTH_TOKEN}`,
            "Content-Type": process.env.CONTENT_TYPE

        }
    });

    test("Get all the group id",async ({request})=>{
        const queryParams = '?offset=0&size=20';

        const response = await request.get(`/api/v1/team/allTeams?${queryParams}`);

        expect(response.status()).toBe(200);

        const jsonData =await  response.json();

        console.log(jsonData);

        ids=jsonData.result.teamDtoList.map(eachid=> eachid.id);

        console.log(ids);
    })

    test.skip("Delete all teams",async ({request})=>{

        for(let id of ids){
            const response = await request.delete(`/api/v1/team/delete-team?objectId=${id}`);

            console.log(`Deleted Id:${id}`);

        };

    });
});