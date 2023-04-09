import axios from 'axios';
import { compile } from 'html-to-text';

export const name = 'wikipedia'

export const example = `
${name}: New York City
Returns a summary from searching Wikipedia
`.trim();

const compiledConvert = compile();

export async function action(srsearch) {
  const response = await axios.get("https://en.wikipedia.org/w/api.php", {
    params: {
      srsearch,
      action: "query",
      list: "search",
      format: "json",
    },
  });
  return compiledConvert(response.data.query.search[0].snippet);
}