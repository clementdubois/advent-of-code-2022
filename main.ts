import {CalorieInputParser} from "./day-1-calorie-counting/src/CalorieInputParser";
import {CaloriesCounter} from "./day-1-calorie-counting/src/CalorieCounter";
import {CalorieCountingSolver} from "./day-1-calorie-counting/src/CalorieCountingSolver";
import {puzzleInput} from "./day-1-calorie-counting/src/calorieCountingInput";


/* Day 1 */
const calorieInputParser = new CalorieInputParser();
const calorieCounter = new CaloriesCounter();
const calorieCountingSolver  = new CalorieCountingSolver(calorieInputParser, calorieCounter);

console.log("Day 1 - Part 1 : ", calorieCountingSolver.solve(puzzleInput));
console.log("Day 1 - Part 2 : ", calorieCountingSolver.solve(puzzleInput, 3));

