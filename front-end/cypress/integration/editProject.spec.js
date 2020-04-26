/// <reference types="Cypress" />

import { getNewOption } from "../support/hooks";

describe("add new project", () => {
  let status;
  let option;
  before(() => {
    cy.login();
  });
  after(() => {
    cy.logout();
  });

  it("selects project to edit and clicks to view", () => {
    cy.get("div.MiniCard_MiniCard__bkFqW")
      .contains("Test Project")
      .within(() => {
        cy.find("button").contains("View").click();
      });
    cy.location("pathname").should("contain", "view");
    cy.get("div.DetailCard_DetailCardStatus__2hyiW")
      .invoke("text")
      .then((text) => {
        status = text.slice(0, 7);
      });
    cy.get("button").contains("Update").click();
    cy.location("pathname").should("contain", "update");
  });

  it("makes edits and submits", () => {
    const options = [
      "Idea",
      "Research",
      "In Progress",
      "Revision",
      "Finished",
      "Submitted",
      "Accepted",
    ];
    option = getNewOption(status, options);
    cy.get("select").contains(status).select(option);
    cy.get("button").contains("Submit Edits").click();
  });

  it("asserts edits were made", () => {
    cy.get("div.MiniCard_MiniCard__bkFqW")
      .contains("Test Project")
      .within(() => {
        cy.get("div").contains(option);
      });
  });
});
