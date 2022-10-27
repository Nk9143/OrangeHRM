describe("OrangeHRM page", function(){
    let username = `Nvaeen${Math.floor(Math.random() * 9999)}`;
    it("login to orangeHRM", async function(){
        await browser.maximizeWindow();
        await browser.url('/');
        await (await $('h5')).waitForDisplayed();
        await expect((await (await $('h5')).getText())).equals("Login");
        const username = await $('[name="username"]');
        const password = await $('[name="password"]');
        await username.setValue("Admin");
        await password.setValue("admin123");
        const loginButton = await $('[type="submit"]');
        await loginButton.click();
        await (await $('h6')).waitForDisplayed();
        await expect(await (await $('h6')).getText()).equals("PIM");
    });

    it("Add Employee", async function(){
        const firstName = "Naveen";
        const lastName = "Kumar";
        await (await $('//a[text()="Add Employee"]')).click();
        await expect(await (await $('h6.orangehrm-main-title')).getText()).equals('Add Employee');
        await (await $('[name="firstName"]')).setValue(firstName);
        await (await $('[name="lastName"]')).setValue(lastName);
        await browser.pause(2000);
        await (await $('//button[@type="submit"]')).click();
        await (await $('div.orangehrm-edit-employee-name h6')).waitForDisplayed();
        await expect(await (await $('div.orangehrm-edit-employee-name h6')).isDisplayed()).equals(true);
        await browser.pause(1000);
    });

    it("Add User", async function(){
        await (await $('ul.oxd-main-menu span')).click();
        await expect(await (await $('span.oxd-topbar-header-breadcrumb')).getText()).equals("Admin\nUser Management");
        await (await $('//button[@class="oxd-button oxd-button--medium oxd-button--secondary"]')).click();
        await expect(await (await $('h6.orangehrm-main-title')).getText()).equals("Add User");
        await (await $('//label[text()="User Role"]//..//following-sibling::div')).click();
        //console.log(await (await $('//div[@role="listbox"]')).selectByVisibleText("Admin"));
        await (await $('//label[text()="User Role"]//..//following-sibling::div //*[text()="Admin"]')).click();
        await (await $('//label[text()="Status"]//..//following-sibling::div')).click();
        await (await $('//label[text()="Status"]//..//following-sibling::div //*[text()="Enabled"]')).click();
        await (await $('//input[@placeholder="Type for hints..."]')).setValue("Naveen");
        await (await $('//*[contains(text(),"Naveen")]')).click();
        await (await $('//label[text()="Username"]//..//following-sibling::div/input')).setValue(username);
        await (await $('//label[text()="Password"]//..//following-sibling::div/input')).setValue("Abcd@123");
        await (await $('//label[text()="Confirm Password"]//..//following-sibling::div/input')).setValue("Abcd@123");
        await browser.pause(5000);
        await (await $('//button[text()=" Save "]')).click();
        browser.pause(1000);
        await expect(await (await $('h5.oxd-table-filter-title')).getText()).equals("System Users");
        browser.pause(2000);

    });

    it("Edit User and Delete User", async function(){
        await (await $('//label[text()="Username"]//..//following-sibling::div/input')).setValue(username);
        await browser.pause(1000);
        await (await $('//button[@type="submit"]')).click();
        await browser.pause(3000);
        await (await $('//i[@class="oxd-icon bi-pencil-fill"]//parent::button')).click();
        await browser.pause(2000);
        await (await $('//label[text()="User Role"]//..//following-sibling::div')).click();
        await (await $('//label[text()="User Role"]//..//following-sibling::div //*[text()="ESS"]')).click();
        await browser.pause(2000);
        await (await $('//button[text()=" Save "]')).click();
        await browser.pause(2000);
        await (await $('//label[text()="Username"]//..//following-sibling::div/input')).setValue(username);
        await browser.pause(2000);
        await (await $('//button[@type="submit"]')).click();
        await browser.pause(2000);
        await (await $('//i[@class="oxd-icon bi-trash"]')).click();
        await browser.pause(2000);
        await (await $('//button[text()=" Yes, Delete "]')).click();
    });

});
