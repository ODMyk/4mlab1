import {intro, select, group, text, outro, cancel, log} from "@clack/prompts";
import {printTable} from "console-table-printer";
import {
  INTRO1,
  INTRO2,
  INTRO3,
  OUTRO1,
  OUTRO2,
  OUTRO3,
  RELAXATION_LABEL,
  RELAXATION_TYPE,
  NEWTHON_LABEL,
  NEWTHON_TYPE,
  INITIAL_ACCURACY,
} from "./src/constants.js";
import {
  calculateIterationsCount,
  getFunction,
  f,
  getStart,
} from "./src/calculations.js";

intro(INTRO1);
outro(OUTRO1);

intro(INTRO2);
const answers = await group(
  {
    method: () =>
      select({
        message: "Select method for finding root",
        options: [
          {label: RELAXATION_LABEL, value: RELAXATION_TYPE},
          {label: NEWTHON_LABEL, value: NEWTHON_TYPE},
        ],
        initialValue: RELAXATION_TYPE,
      }),
    accuracy: () =>
      text({
        message: "Choose accuracy",
        initialValue: INITIAL_ACCURACY,
        defaultValue: INITIAL_ACCURACY,
        placeholder: INITIAL_ACCURACY.toString(),
        validate: (s) => {
          if (isNaN(Number(s))) {
            return "Not a number";
          }
        },
      }),
  },
  {
    onCancel: () => {
      cancel("Operation cancelled");
      process.exit(0);
    },
  },
);
outro(OUTRO2);

intro(INTRO3);

const N = calculateIterationsCount(answers.method, answers.accuracy);
log.info(`We will need ${N} iterations`);
const improve = getFunction(answers.method);
let x = getStart(answers.method);
let y = f(x);
const results = [];

log.info(`z = ${x}`);
log.info(`f(z) = ${y}`);

outro(OUTRO3);

for (let i = 1; i <= N; ++i) {
  x = improve(x);
  y = f(x);
  results.push({n: i, z: x, "f(x)": y});
}

printTable(results);

log.success(`Result: ${x}`);
