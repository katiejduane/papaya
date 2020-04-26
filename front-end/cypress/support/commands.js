Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3001/splash");
  cy.get("button").contains("Sign In").click();
  cy.location("pathname").should("contain", "signin");
  cy.get('input[type="email"]').type(Cypress.env("USERNAME"));
  cy.get('input[type="password"]').type(Cypress.env("PASSWORD"));
  cy.get("button").contains("Sign In").click();
});

Cypress.Commands.add("logout", () => {
  cy.get("li").contains("Sign Out").click();
  cy.location("pathname").should("contain", "splash");
});
