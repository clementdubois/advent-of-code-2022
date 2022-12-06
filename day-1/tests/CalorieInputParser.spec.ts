import {CalorieInputParser} from "../src/CalorieInputParser";

describe("calorie-input-parser", () => {
    let calorieInputParser: CalorieInputParser;
    beforeEach(() => {
        calorieInputParser = new CalorieInputParser()
    })
    test("Should return empty array for empty input", () => {// WHEN
        const parsedInput = calorieInputParser.parse("");
        // THEN
        expect(parsedInput).toEqual([])
    })

    test("Should return FoodCaloriesPerElf for one elf with one food", () => {
        // WHEN
        const parsedInput = calorieInputParser.parse("1000");
        // THEN
        expect(parsedInput).toEqual([[1000]])
    })

    test("Should return FoodCaloriesPerElf for one elf with two food", () => {
        // WHEN
        const parsedInput = calorieInputParser.parse("1000\n2000");
        // THEN
        expect(parsedInput).toEqual([[1000, 2000]])
    })

    test("Should return FoodCaloriesPerElf for two elves with one food", () => {
        // WHEN
        const parsedInput = calorieInputParser.parse("1000\n\n2000");
        // THEN
        expect(parsedInput).toEqual([[1000], [2000]])
    })

    test("Should return FoodCaloriesPerElf for three elves with foods", () => {
        // WHEN
        const parsedInput = calorieInputParser.parse("1000\n2000\n\n2000\n3000\n1000\n\n250\n250");
        // THEN
        expect(parsedInput).toEqual([[1000, 2000], [2000, 3000, 1000], [250, 250]])
    })
});