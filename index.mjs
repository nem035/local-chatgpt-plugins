import readline from 'readline';
import ChatBot from './chatbot.mjs';
import prompt from './prompt.mjs';
import getPlugin from './plugins/index.mjs';

const VERBOSE = process.env.VERBOSE;

const ACTION_REGEX = /^Action: (\w+): (.*)$/;

async function ask(question, turnLimit = 10) {
  const bot = new ChatBot(prompt([getPlugin('wikipedia'), getPlugin('calculate')]));

  let loopCount = 0;
  while (loopCount < turnLimit) {
    loopCount += 1;

    const result = await bot.execute(question);
    if (VERBOSE || result.startsWith("Answer:")) {
      console.log(result);
    }

    const actions = result
      .split("\n")
      .map((a) => ACTION_REGEX.exec(a)).filter((a) => a);

    if (actions.length === 0) {
      return;
    }

    const [_, pluginName, pluginInput] = actions[0];
    const plugin = getPlugin(pluginName);

    if (VERBOSE) {
      console.log(` -- running plugin action ${plugin.name} ${pluginInput}`);
    }
    const observation = `Observation: ${await plugin.action(pluginInput)}`;

    if (VERBOSE) {
      console.log(observation);
    }

    question = observation;
  }
}

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    `Question: `,
    async (question) => {
      rl.close();
      await ask(question);
    }
  );
})();