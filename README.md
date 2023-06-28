Hello Ben Team, I hope you all are doing good!

I have done with coding challenge for the insurance calculation, I hope you will like it and there are some information regarding the project and how to run the test.

TechStack:
 - Cypress
 - Typescript
 - Faker - for test data creation

Project Architecture:
* e2e Folder -> This folder contains all spec files
* fixtures -> This folder contails all test data and files which require for the tests
* Pages -> This folder is for store all the element locators
* TsConfig file -> To support typescript 
* Cypress.config.js -> All cypress configuration goes under this config file
* Packet.json -> Dependency management

To Execute the coding:
* Install npm dependencies using `npm i` or `npm install`
* To run the test headless mode use `npm test` command
* To see the test visually with cypress test run, use `npm run open` 
    -> Configure E2E testing
    -> Select the browser and click start E2E test
    -> Wait for the browser to launch and click any spec file

Logic used in spec file: 
* Before Each -> Creating new insurance by API Request 
* After Each -> Deleting the created insurance by API Request
* Test -> Validate the values by selecting number of family members
* Bug -> There is some calculation mismatch while selecting family member more than 5 members. 