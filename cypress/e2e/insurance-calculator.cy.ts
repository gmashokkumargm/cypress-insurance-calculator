import { faker } from "@faker-js/faker";
import { PriceCalculatorPage } from "../pages";

describe('Contribution price calculator', () => {
    const priceCalculator = new PriceCalculatorPage();

    const employerCoverRate = `0.${faker.datatype.number({min: 5, max: 9})}`;
    const employerCoverRateForFamily = `0.${faker.datatype.number({min: 1, max: 5})}`;
    const insuranceName = `${faker.company.name()} Medical Insurance`;
    const price = faker.datatype.number({ min: 10000, max: 99999});
    const priceForFamily = faker.datatype.number({min: 1000, max: 9999});
    const familyMember = faker.datatype.number(length = 10);
    let id: number;

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: '/api/insurances',
            body: {
                "currency": "GBP",
                "employer_cover_rate": employerCoverRate,
                "employer_cover_rate_for_family_member": employerCoverRateForFamily,
                "name": insuranceName,
                "price": price,
                "price_for_family_member": priceForFamily
            },
        }).then((res) => {
            id = res.body.id
        })
    });

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `/api/insurances/${id}`
        })
    });

    it('Verify the values for the employer and employee pays', () => {
        cy.visit('/');
        cy.get(priceCalculator.insurancePicker).select(insuranceName);
        cy.get(priceCalculator.priceValue).should('have.text', price);
        cy.get(priceCalculator.employerCoverRate).should('have.text', employerCoverRate);
        cy.get(priceCalculator.employerCoverRate).should('have.text', employerCoverRate);
        cy.get(priceCalculator.priceForFamily).should('have.text', priceForFamily);
        cy.get(priceCalculator.employerCoverRateForFamily).should('have.text', employerCoverRateForFamily);
        cy.get(priceCalculator.familyNumber).select(familyMember);
        cy.get(priceCalculator.employerPay).should('have.text', Math.round((price * Number(employerCoverRate)) + ( priceForFamily * familyMember * Number(employerCoverRateForFamily))));
        cy.get(priceCalculator.employeePay).should('have.text', Math.round((price) + (familyMember * priceForFamily)) - (Math.round((price * Number(employerCoverRate)) + ( priceForFamily * familyMember * Number(employerCoverRateForFamily)))));
    });
});