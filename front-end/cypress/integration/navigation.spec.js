/// <reference types="Cypress" />

describe("navigation test", () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });
  it("asserts essential nav items are visible", () => {
    const navItems = [
      "Add New",
      "View All Projects",
      "View By Status",
      "View By Type",
      "Me",
      "Sign Out",
    ];
    cy.get("nav").within(() => {
      navItems.forEach((item) => {
        cy.get("li").contains(item).should("be.visible");
      });
    });
  });
});
