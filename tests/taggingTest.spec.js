import{test,expect}from "@playwright/test";

test("test1@sanity",async()=>{

console.log("first test");


});

test("test2@reg",async()=>{
    console.log("2nd test");
});

test("test3@smoke",async()=>{
    console.log("3rd test");
});

test("test4@sanity@reg@smoke",async()=>{
    console.log("4th test");
}); 

//npx playwright test tests/taggingTest.spec.js --project=chromium --grep '@sanity@reg'

//npx playwright test tests/taggingTest.spec.js --project=chromium --grep '@sanity' --grep-invert '@smoke'