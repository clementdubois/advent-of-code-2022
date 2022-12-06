import fs from "fs";
import {CalorieInputParser} from "./CalorieInputParser";
import {CaloriesCounter} from "./CalorieCounter";
import {CalorieCountingSolver} from "./CalorieCountingSolver";

export const solve = () => {
    const calorieInputParser = new CalorieInputParser();
    const calorieCounter = new CaloriesCounter();
    const calorieCountingSolver = new CalorieCountingSolver(calorieInputParser, calorieCounter);

    const puzzleInput1 = fs.readFileSync("./day-1-calorie-counting/src/calorieCountingInput.txt").toString()
    console.log("Day 1 - Part 1 : ", calorieCountingSolver.solve(puzzleInput1));
    console.log("Day 1 - Part 2 : ", calorieCountingSolver.solve(puzzleInput1, 3));
}

