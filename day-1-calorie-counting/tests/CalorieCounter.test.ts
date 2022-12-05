import {CaloriesCounter, FoodCaloriesPerElf} from "../src/CalorieCounter";

describe("Calorie Counting", () => {
    let caloriesCounter: CaloriesCounter;

    beforeEach(() => {
        caloriesCounter = new CaloriesCounter()
    })

    describe("Find the max calories transported by on elfe", () => {

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

    describe("Find the total max calories of multiple elves", () => {

        test("should return the added total calories of the two elves that carry the most calories", () => {
            // GIVEN
            const caloriesPerElves: FoodCaloriesPerElf = [[1000, 3000], [3000, 2000],[100],[50000]];
            // WHEN
            const maxCalories = caloriesCounter.countMaxCalories(caloriesPerElves, {numberOfElves: 2});
            // THEN
            expect(maxCalories).toEqual(55000)
        })
    });
})