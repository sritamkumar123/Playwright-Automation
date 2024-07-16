import{test,expect} from "@playwright/test";

test.describe('API tests with auth token', () => {
    // Use the request fixture to create a new API context with the auth token
    test.use({
      baseURL: 'https://comex-apist.greenapex.in', // Replace with your API base URL
      extraHTTPHeaders: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyZXNldFBhc3N3b3JkIjpmYWxzZSwic3ViIjoic3RhZ2VAeW9wbWFpbC5jb20iLCJleHAiOjE3MzEzMzEzMjIsImlhdCI6MTcxNjgxNjEyMiwiaXNTZWN1cml0eUd1YXJkIjpmYWxzZX0.hEkNUm-dfgwxUQc1iFyQVxHG5LcKvAVscdwj289MrOo', // Replace with your actual auth token
        'Content-Type': 'application/json'
      }
    });



test("should fetch data from API with auth token",async({request})=>{

    const queryParams = '?filter=USER&email=stage@yopmail.com&offSet=0&size=20'; 

    const response = await request.get(`/comex/api/v1/v2/get-myfavourites${queryParams}`);

    expect(response.status()).toBe(200);

    const data= await response.json();

    console.log(data);

    expect(await data.result.INVESTOR[0]).toHaveProperty("name","15 may new data entry");

   expect(await data.result).toHaveProperty("TotalUser",3);

    const targetedAttributesToCheck = [
        'result.INVESTOR',
        'result.ORGANIZER',
        'result.TotalUser',
        'result.VISITOR'
      ];

          // Function to validate presence of attributes
    function validateAttributesPresence(data, attributes) {
        attributes.forEach(attribute => {        //This method is used to iterate over each element in the array.
                                                 //attribute => { ... }: This is an arrow function that defines the action to be taken for each element in the array. attribute is the parameter that represents the current element being processed in the array.
          expect(data).toHaveProperty(attribute);
        });
      }

        // Validate presence of targeted attributes
    validateAttributesPresence(data, targetedAttributesToCheck);

    console.log(data.result.INVESTOR.length);

    const investorAttributes = [
        'favouriteUserId',
        'communityMemberId',
        'name',
        'designation',
        'companyName',
        'userType',
        'profileLogo',
        'vip',
        'favourite'
      ];

    function validateNestedAttributesPresence(data,attributes){
        attributes.forEach(attribute =>{
            expect(data.result.INVESTOR[0]).toHaveProperty(attribute);
        } );
    }

    validateNestedAttributesPresence(data,investorAttributes);

    const organizerAttributes = [
        'favouriteUserId',
        'communityMemberId',
        'name',
        'designation',
        'companyName',
        'userType',
        'profileLogo',
        'vip',
        'favourite'
      ];

      if(data.result.ORGANIZER.length>0){
        organizerAttributes.forEach(attribute=>{
            expect(data.result.ORGANIZER[0]).toHaveProperty(attribute);
        })

      }
});

});