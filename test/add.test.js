const { add, subtract } = require('../src/add');

describe('add', () => {
  test('suma dos numeros positivos', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('suma con negativos', () => {
    expect(add(-1, 1)).toBe(0);
  });
});

describe('subtract', () => {
  test('resta dos numeros positivos', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('resta con negativos', () => {
    expect(subtract(-1, 1)).toBe(-2);
  });
});
