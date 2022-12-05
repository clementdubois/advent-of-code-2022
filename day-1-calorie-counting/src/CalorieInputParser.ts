import { FoodCaloriesPerElf} from "./CalorieCounter";

export class CalorieInputParser {
    caloriesSeparator = "\n";
    elvesSeparator = "\n\n";
    constructor() {

    }

    parse(input: string): FoodCaloriesPerElf {
        const splittedByElves = this.splitInputByElves(input)
        const splittedByCalories = this.splitElvesInputByCalories(splittedByElves)
        return CalorieInputParser.convertInputCaloriesIntoNumbers(splittedByCalories)
    }

    private static convertInputCaloriesIntoNumbers(splittedByCalories: string[][]) {
        return splittedByCalories.map(CalorieInputParser.getCaloriesAsNumbers);
    }

    private splitElvesInputByCalories(splittedByElves: string[]) {
        return splittedByElves.map((elfInput) => this.splitInputsInListOfCalories(elfInput));
    }

    private splitInputByElves(input: string) {
        return CalorieInputParser.removeEmpty(input.split(this.elvesSeparator));
    }

    private static getCaloriesAsNumbers(splittedInput: string[]) {
        return CalorieInputParser.removeEmpty(splittedInput).map(Number);
    }

    private splitInputsInListOfCalories(input: string) {
        return input.split(this.caloriesSeparator);
    }

    private static removeEmpty(inputs: string[]) {
        return inputs.filter(input => input)
    }

}