# Local ChatGPT Plugins

This repo contains a simple example of how you could implement ChatGPT plugins into your own app.

The demo has 2 plugins, one to search Wikipedia and another to perform calculations.

Here's an example

```
Question: What is the population of the capital of France raised to the 3rd power?
Answer: The population of the capital of France raised to the 3rd power is 1.848094477184203e+21.
```

### How it works?

The prompting is based on the [Thought/Action/Observation](https://arxiv.org/abs/2210.03629) and [Chain of Thought](https://arxiv.org/abs/2201.11903) techniques.


Long output with the env var `VERBOSE` being true:
```
Question: What is the population of the capital of France raised to the 3rd power?
Thought: I should find the population of the capital of France and raise it to the third power.
Action: wikipedia: What is the capital of France? 
PAUSE
 -- running plugin action wikipedia What is the capital of France? 
Observation: variants of the above close-ended questions which possess specific responses
are: On what day were you born? ("Saturday.") What is the capital of France?
("Paris
Thought: The capital of France is Paris. I should find its population and raise it to the third power.
Action: wikipedia: What is the population of Paris? 
PAUSE
 -- running plugin action wikipedia What is the population of Paris? 
Observation: population of 12.271.794 habitants on January 1, 2023, or about 19% of the
population of France, making the region France's primate city. The Paris Region
Thought: The population of Paris is 12.271.794. I should raise it to the third power.
Action: calculate: 12271794 ** 3 
PAUSE
 -- running plugin action calculate 12271794 ** 3 
Observation: 1.848094477184203e+21
Answer: The population of the capital of France, Paris, raised to the third power is 1.848094477184203e+21.
```
