/// <reference types="Cypress" />

describe("add new project", () => {
  before(function () {
    cy.login();
    cy.fixture(newProject.json).then((project) => {
      this.project = project;
    });
  });
  after(() => {
    cy.logout();
  });

  it("creates new project and submits", function () {
    cy.get("li").contains("Add New").click();
    cy.get("form").within(() => {
      cy.get('input[placeholder="Project title"]').type(this.project.name);
      cy.get("select").contains("Choose Type").select(this.project.type);
      cy.get("select").contains("Choose Status").select(this.project.status);
      cy.get("textarea").type(this.project.note);
      cy.get("button").contains("Add Project").click();
    });
  });

  it("verifies project exists", function () {
    cy.get("div.MiniCard_MiniCard__bkFqW")
      .contains(this.project.title)
      .within(() => {
        cy.get("div").contains(this.project.type);
        cy.get("div").contains(this.project.status);
        cy.get("button").contains("View");
      });
  });
});
