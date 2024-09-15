///<reference types="cypress"/>

const requestBody = {
  name: "space1",
  multiple_assignees: true,
  features: {
    due_dates: {
      enabled: true,
      start_date: false,
      remap_due_dates: true,
      remap_closed_due_date: false,
    },
    time_tracking: {
      enabled: false,
    },
    tags: {
      enabled: true,
    },
    time_estimates: {
      enabled: true,
    },
    checklists: {
      enabled: true,
    },
    custom_fields: {
      enabled: true,
    },
    remap_dependencies: {
      enabled: true,
    },
    dependency_warning: {
      enabled: true,
    },
    portfolios: {
      enabled: true,
    },
  },
};

describe("Scenario 1 tests", () => {
 beforeEach(() => {
    cy.request({
      method: "GET",
      url: Cypress.env("apiUrl") + "/v2/team",
      headers: {
        Authorization: ` ${Cypress.env("apiToken")}`,
        "Content-Type": "application/json",
      }
    }).then((response)=>{
  const teamId=response.body.teams[0].id


      cy.request({
        method: "POST",
        url: Cypress.env("apiUrl") + `/v2/team/${teamId}/space`,
        headers: {
          Authorization: ` ${Cypress.env("apiToken")}`,
          "Content-Type": "application/json",
        },
        body: requestBody,
      }).then((response) => {
        const spaceId=response.body.id;
        cy.wrap(spaceId).as('spaceID')
        cy.log(spaceId)
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("space1");
      });    });
  });


  afterEach(() => {
    cy.get('@spaceID').then((aliasedSpaceId) => {
      cy.request({
        method: "DELETE",
        url: Cypress.env("apiUrl") + `/v2/space/${aliasedSpaceId}`,
        headers: {
          Authorization: ` ${Cypress.env("apiToken")}`,
          "Content-Type": "application/json",
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    });
  });


  it("navigate to clickup",()=>{
    cy.visit(` ${Cypress.env("baseUrl")}`)
    cy.get('[data-test="login-email-input"]').type("baksay.mindgeek@gmail.com")
    cy.get('[data-test="login-password-input"]').type("fenerBahce?6")
  })
});

