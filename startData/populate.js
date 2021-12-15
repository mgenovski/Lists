const { chromium } = require('playwright-chromium');

async function populate() {
    let browser, page;
    let clientUrl = 'http://localhost:3000/';
    const interval = 600;

    browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto(clientUrl);
    await page.waitForTimeout(interval);
    page.click('text=Register');

    // await page.waitForSelector('td');
    // page.click('#loadBooks')

    //Create account 1
    console.log('Creating account 1...')
    await page.fill('[name="email"]', 'gosho@abv.bg');
    await page.fill('[name="name"]', 'Gosho');
    await page.fill('[name="password"]', '123456');
    await page.fill('[name="password-confirm"]', '123456');
    page.click('.normal');

    await page.waitForTimeout(interval);

    //Create list 1
    console.log('Creating list 1...');
    page.click('#root > div > header > nav > span > a:nth-child(2)');
    await page.waitForTimeout(interval);
    await page.fill('[name="title"]', 'Snowboard Trip Packlist');
    await page.fill('#description', 'The most important items to bring on a snowboarding trip.');
    await page.selectOption('[name="category"]', { label: 'Packing List' });
    await page.selectOption('[name="shared"]', { label: 'Public List' });
    
    console.log('-Adding item 1 to list 1...');
    await page.fill('[name="item"]', 'Board');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 2 to list 1...');
    await page.fill('[name="item"]', 'Helmet');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 3 to list 1...');
    await page.fill('[name="item"]', 'Bindings');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 4 to list 1...');
    await page.fill('[name="item"]', 'Boots');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 5 to list 1...');
    await page.fill('[name="item"]', 'Jacket');
    page.click('.small');
    await page.waitForTimeout(interval);

    page.click('.normal');
    await page.waitForTimeout(interval);

    //Create list 2
    console.log('Creating list 2...');
    page.click('#root > div > header > nav > span > a:nth-child(2)');
    await page.waitForTimeout(interval);
    await page.fill('[name="title"]', 'Christmass Dinner');
    await page.fill('#description', 'Shopping list for this year\'s Christmass dinner party.');
    await page.selectOption('[name="category"]', { label: 'Shopping List' });
    await page.selectOption('[name="shared"]', { label: 'Public List' });
    
    console.log('-Adding item 1 to list 2...');
    await page.fill('[name="item"]', 'Flour');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 2 to list 2...');
    await page.fill('[name="item"]', 'Cheese');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 3 to list 2...');
    await page.fill('[name="item"]', 'Eggs');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 4 to list 2...');
    await page.fill('[name="item"]', 'Wine');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 5 to list 2...');
    await page.fill('[name="item"]', 'Steaks');
    page.click('.small');
    await page.waitForTimeout(interval);

    page.click('.normal');
    await page.waitForTimeout(interval);

    page.click('text=Logout');
    await page.waitForTimeout(interval);

    
    //Create account 2
    page.click('text=Register');
    await page.waitForTimeout(interval);
    console.log('Creating account 2...')
    await page.fill('[name="email"]', 'pesho@abv.bg');
    await page.fill('[name="name"]', 'Pesho');
    await page.fill('[name="password"]', '123456');
    await page.fill('[name="password-confirm"]', '123456');
    page.click('.normal');

    await page.waitForTimeout(interval);

    //Create list 3
    console.log('Creating list 3...');
    page.click('#root > div > header > nav > span > a:nth-child(2)');
    await page.waitForTimeout(interval);
    await page.fill('[name="title"]', '2022 Resolutions');
    await page.fill('#description', 'Some of my goals for the new year.');
    await page.selectOption('[name="category"]', { label: 'Todo List' });
    await page.selectOption('[name="shared"]', { label: 'Public List' });
    
    console.log('-Adding item 1 to list 3...');
    await page.fill('[name="item"]', 'Lose weight');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 2 to list 3...');
    await page.fill('[name="item"]', 'Get organized');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 3 to list 3...');
    await page.fill('[name="item"]', 'Quit smoking');
    page.click('.small');
    await page.waitForTimeout(interval);

    page.click('.normal');
    await page.waitForTimeout(interval);

    //Create list 4
    console.log('Creating list 4...');
    page.click('#root > div > header > nav > span > a:nth-child(2)');
    await page.waitForTimeout(interval);
    await page.fill('[name="title"]', 'Ultimate Bucket List');
    await page.fill('#description', 'Shopping list for this year\'s Christmass dinner party.');
    await page.selectOption('[name="category"]', { label: 'Other Checklist' });
    await page.selectOption('[name="shared"]', { label: 'Public List' });
    
    console.log('-Adding item 1 to list 4...');
    await page.fill('[name="item"]', 'Visit Antartica');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 2 to list 4...');
    await page.fill('[name="item"]', 'Make pasta in Italy');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 3 to list 4...');
    await page.fill('[name="item"]', 'Go in a hot air balloon');
    page.click('.small');
    await page.waitForTimeout(interval);

    console.log('-Adding item 4 to list 4...');
    await page.fill('[name="item"]', 'Build a house by myself');
    page.click('.small');
    await page.waitForTimeout(interval);

    page.click('.normal');
    await page.waitForTimeout(interval);


    //Like a list
    console.log('Liking a list...')
    page.click('#root > div > header > nav > a');
    await page.waitForTimeout(interval);
    page.click('#root > div > div > div > article:nth-child(1) > div > a');
    await page.waitForTimeout(interval);
    page.click('#root > div > div > div > div.info > div > button.delete-list');
    await page.waitForTimeout(2000);

    console.log('Data added successfully!');
    await page.close();
    await browser.close();
}

populate();