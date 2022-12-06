import fs from "fs";
import {CalorieInputParser} from "./day-1-calorie-counting/src/CalorieInputParser";
import {CaloriesCounter} from "./day-1-calorie-counting/src/CalorieCounter";
import {CalorieCountingSolver} from "./day-1-calorie-counting/src/CalorieCountingSolver";

/* Day 1 */
const calorieInputParser = new CalorieInputParser();
const calorieCounter = new CaloriesCounter();
const calorieCountingSolver  = new CalorieCountingSolver(calorieInputParser, calorieCounter);

const puzzleInput1 = fs.readFileSync("./day-1-calorie-counting/src/calorieCountingInput.txt").toString()
console.log("Day 1 - Part 1 : ", calorieCountingSolver.solve(puzzleInput1));
console.log("Day 1 - Part 2 : ", calorieCountingSolver.solve(puzzleInput1, 3));

