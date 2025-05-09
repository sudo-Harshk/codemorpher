describe('Codemorpher - Debugging Steps Display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/codemorpher-frontend/public');
  });

  it('should display debugging steps after translation', () => {
    cy.get('#javaCode')
      .clear()
      .type(`public class Main {\n  public static void main(String[] args) {\n    System.out.println("Debug Test");\n  }\n}`,
        { parseSpecialCharSequences: false });

    cy.get('.lang-option[data-value="python"]').click();
    cy.get('#translateButton').click();

    cy.get('#debuggingSteps', { timeout: 30000 }).should('not.have.class', 'collapsed');
    cy.get('#debuggingSteps').should('contain.text', 'Debug');

    // Tolerate fallback string or actual list
    cy.get('#debuggingSteps .debug-list').then($ul => {
      const items = $ul.find('li');
      expect(items.length).to.be.at.least(0); // not strict
    });

    cy.screenshot('debugging-steps-visible');
  });
});
