import {test,expect} from "@playwright/test";

test.only("File Upload Action",async ({page})=>{

  await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');

  await page.locator("input[name='upfile']").setInputFiles(""); //  most important change the back \ to forward /
 
  // await page.waitForTimeout(3000);

  await page.fill("input[name='note']",'my name is Sritam Kumar Upload');

  await page.getByRole('button', { name: 'Press' }).click();

  await expect(await page.locator("body p:nth-child(2)")).toHaveText("You've uploaded a file. Your notes on the file were:");

  await expect(await page.locator("body blockquote")).toHaveText("my name is Sritam Kumar Upload");

  await page.waitForTimeout(5000);

  await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html");

  await page.locator("input[name='upfile']").setInputFiles([]); // for blank file set the setInputFiles params as blank array

  await page.fill("input[name='note']",'my name is Sritam Kumar Upload');

  await page.getByRole('button', { name: 'Press' }).click();

  await page.waitForTimeout(3000);

});

// parallel execution happens when two test function executed simultaneously

test("Multiple file upload",async({page})=>{ // can use .only to excute signle test function

  await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

  await page.locator("#filesToUpload").setInputFiles(["tests/files/qr-code(1).png","tests/files/Scanned_Entries_data (4).csv"])

  await expect(await page.locator("//li[text()='qr-code(1).png']")).toHaveText("qr-code(1).png");

  await page.waitForTimeout(3000);

  await page.locator("#filesToUpload").setInputFiles([]); // for no file upload

  await expect(await page.locator("ul[id='fileList'] li")).toHaveText("No Files Selected");


  await page.waitForTimeout(5000);

})