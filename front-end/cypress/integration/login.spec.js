/// <reference types="Cypress" />

describe("login-logout test", () => {
  it("navigates to site and logs in", () => {
    cy.visit("http://localhost:3001/splash");
    cy.get("button").contains("Sign In").click();
    cy.location("pathname").should("contain", "signin");
    cy.get('input[type="email"]').type(Cypress.env("USERNAME"));
    cy.get('input[type="password"]').type(Cypress.env("PASSWORD"));
    cy.get("button").contains("Sign In").click();
    cy.location("href").should("eq", "http://localhost:3001/splash");
    cy.get("h1").contains("Your Projects").should("be.visible");
  });
  it("logs out", () => {
    cy.get("li").contains("Sign Out").click();
    cy.location("pathname").should("contain", "splash");
  });
});
