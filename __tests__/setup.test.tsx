/**
 * Basic setup test to verify testing infrastructure
 */
describe('Testing Infrastructure', () => {
  it('should run tests with Jest', () => {
    expect(true).toBe(true);
  });

  it('should have proper TypeScript support', () => {
    const testValue: string = 'test';
    expect(typeof testValue).toBe('string');
  });
});
