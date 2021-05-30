describe('Homepage', () => {
  it('should display six team member cards', () => {
    cy.visit('http://localhost:3000');
    cy.getElement('team-member-cards').children().should('have.length', 6);
  });
});
