export const name = 'calculate';

export const example = `
${name}: 2.141 million cubed
Runs "2141000 ** 3" - be sure to format correctly for JavaScript eval. Use floating point syntax if necessary.
`.trim();

export function action(expression) {
  return eval(expression);
}