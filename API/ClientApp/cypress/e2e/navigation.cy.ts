describe("Navigate and succesfully login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const env = process.env.NODE_ENV;
  it("Should navigate to Movie Diary landing page, register and login", () => {
    cy.get("h4").contains("MOVIE D I A R Y");
    cy.contains("Register").click();
    cy.url().should("include", "/register");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
  });

  it("Should succesfully login", () => {
    cy.contains("Sign In").click();
    cy.get("input[name=username]").type(
      env === "development" ? Cypress.env("username") : "Johny"
    );
    cy.get("input[name=password]").type(
      env === "development" ? Cypress.env("password") : "Pa$$word1",
      {
        log: false,
      }
    );
    cy.contains("Login").click();
    cy.url().should("include", "/home");
  });
});

// Logged in state
describe("Navigate in logged in state", () => {
  beforeEach(() => cy.login());

  it("Should be logged in", () => {
    cy.visit("/home");
    cy.url().should("include", "/home");
  });
});

describe("Add movie", () => {
  beforeEach(() => cy.login());
  it("Should navigate to add movie page", () => {
    cy.visit("/add-movie");
    cy.url().should("include", "/add-movie");
  });
});
