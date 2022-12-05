import {CaloriesCounter, FoodCaloriesPerElf} from "../src/CalorieCounter";

describe("Calorie Counting", () => {
    let caloriesCounter: CaloriesCounter;

    beforeEach(()=> {
         caloriesCounter = new CaloriesCounter()
    })

    test("No elves return 0 calories", () => {
        // GIVEN
        const caloriesPerElves: FoodCaloriesPerElf = [];
        // WHEN
        const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves);
        // THEN
        expect(maxCalories).toEqual(0)
    })

    test("One elve with one food return the food calorie", () => {
        // GIVEN
        const caloriesPerElves: FoodCaloriesPerElf = [[1000]];
        // WHEN
        const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves);
        // THEN
        expect(maxCalories).toEqual(1000)
    })

    test("One elve with two foods return the sum of the calories", () => {
        // GIVEN
        const caloriesPerElves: FoodCaloriesPerElf = [[1000, 2000]];

        // WHEN
        const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves);
        // THEN
        expect(maxCalories).toEqual(3000)
    })

    test("two elves with one food return the max calories", () => {
        // GIVEN
        const caloriesPerElves: FoodCaloriesPerElf = [[1000], [2000]];

        // WHEN
        const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves);
        // THEN
        expect(maxCalories).toEqual(2000)
    })

    test("two elves with two foods return the max total calories", () => {
        // GIVEN
        const caloriesPerElves: FoodCaloriesPerElf = [[1000, 3000], [3000, 2000]];

        // WHEN
        const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves);
        // THEN
        expect(maxCalories).toEqual(5000)
    })
})