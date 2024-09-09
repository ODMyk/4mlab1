import {
  NEWTHON_TYPE,
  NEWTHON_START,
  RELAXATION_START,
  RELAXATION_COEFFICIENT,
} from "./constants.js";

export const f = (x) => x * x * x + 3 * x * x - x - 3;
const fDeriv = (x) => 3 * x * x + 6 * x - 1;

export const calculateIterationsCount = (type, accuracy) => {
  if (type === NEWTHON_TYPE) {
    return calculateNewthonIterationsCount(accuracy);
  }
  return calculateRelaxationIterationsCount(accuracy);
};

const calculateNewthonIterationsCount = (accuracy) =>
  1 +
  Math.ceil(Math.log2(1 + Math.log(7 / (12 * accuracy)) / Math.log(1 / 0.412)));
const calculateRelaxationIterationsCount = (accuracy) =>
  Math.floor(
    Math.log(Math.abs(RELAXATION_START) / accuracy) / Math.log(5 / 3),
  ) + 1;

export const getFunction = (type) => {
  if (type === NEWTHON_TYPE) {
    return newthonFunction;
  }
  return relaxationFunction;
};

export const getStart = (type) => {
  if (type === NEWTHON_TYPE) {
    return NEWTHON_START;
  }
  return RELAXATION_START;
};

const newthonFunction = (x) => x - f(x) / fDeriv(x);
const relaxationFunction = (x) => x + RELAXATION_COEFFICIENT * f(x);
