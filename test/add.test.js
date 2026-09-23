const { add } = require('../src/add');

describe('add', () => {
  test('suma dos numeros positivos', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('suma con negativos', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
