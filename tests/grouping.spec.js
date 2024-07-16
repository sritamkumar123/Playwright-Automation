import {test,expect}from "@playwright/test";

test.beforeAll(async()=>{
    console.log("Executed before all test")
});

test.afterAll(()=>{

    console.log("Executed after all test")

});

test.beforeEach(async()=>{
    console.log("Executed before each test");
})

test.afterEach(()=>{
    console.log("Executed after each test");
})

//test.describe.only('group 1',()=>{

test.describe.skip('group 1',()=>{

    test("Test 1",async()=>{
        console.log("This is test 1")
    });
    
    test("Test 2",async()=>{
        console.log("This is test 2")
    });

});



test.describe("group 2",()=>{

    test("Test 3",async()=>{
        console.log("This is test 3")
    })
    
    test("Test 4",async()=>{
        console.log("This is test 4")
    })

});

