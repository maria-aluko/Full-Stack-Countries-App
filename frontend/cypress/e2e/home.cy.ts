import "../support/commands";
import "@testing-library/cypress/add-commands";

describe("Countries Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Displays the navigation bar correctly", () => {
    cy.findByRole("banner").should("exist");
    cy.findByRole("link", {name: "Countries"}).should("exist");
  });

  it("Shows a list of countries", () => {
    cy.findByRole("link", {name: "Countries"}).click();
    cy.url().should("include", "/countries");
  });

  it("Renders a list of countries as MUI cards", () => {
    cy.findByRole("link", {name: "Countries"}).click();
    cy.get(".MuiCard-root").should("have.length.greaterThan", 0);
  });

  it("Exactly 20 country cards are displayed on the page at once", () => {
    cy.findByRole("link", {name: "Countries"}).click();
    cy.get(".MuiCard-root").should('have.length', 20);
  });
})