import * as wikipedia from './wikipedia.mjs';
import * as calculate from './calculate.mjs';

export default function getPlugin(name) {
  switch (name) {
    case wikipedia.name:
      return wikipedia;
    case calculate.name:
      return calculate;
    default:
      throw new Error(`Unknown plugin: ${name}`);
  }
}