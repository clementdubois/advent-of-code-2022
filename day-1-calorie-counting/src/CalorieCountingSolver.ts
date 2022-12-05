import {CalorieInputParser} from "./CalorieInputParser";
import {CaloriesCounter} from "./CalorieCounter";

export class CalorieCountingSolver {
    constructor(private calorieInputParser: CalorieInputParser, private calorieCounter: CaloriesCounter) {

    }

    solve(input: string, numberOfElvesToCount: number = 1): number {
        const parsedInput = this.calorieInputParser.parse(input);
        return this.calorieCounter.countMaxCalories(parsedInput, {numberOfElves:numberOfElvesToCount});
    }
}