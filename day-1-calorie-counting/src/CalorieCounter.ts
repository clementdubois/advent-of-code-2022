export type FoodCaloriesPerElf = number[][];

export class CaloriesCounter {
    constructor() {
    }

    countMaxCalories(caloriesPerElves: FoodCaloriesPerElf, options: { numberOfElves: number } = {numberOfElves: 1}): number {
        const totalCaloriesPerElf = this.getTotalCaloriesPerElf(caloriesPerElves);
        return CaloriesCounter.getMaxCalories(totalCaloriesPerElf, options.numberOfElves)
    }

    private getTotalCaloriesPerElf(caloriesPerElves: FoodCaloriesPerElf) {
        return caloriesPerElves.map((elfFoodCalories) => CaloriesCounter.getTotalCaloriesForOneElf(elfFoodCalories));
    }

    private static getMaxCalories(totalCaloriesPerElf: number[], numberOfElvesToCount = 1) {
        const sortedTotalCaloriesPerElf = this.sortTotalCaloriesByElf(totalCaloriesPerElf)
        return this.sumTotalCaloriesForNumberOfElvesToCount(sortedTotalCaloriesPerElf, numberOfElvesToCount);
    }

    private static sumTotalCaloriesForNumberOfElvesToCount(sortedTotalCaloriesPerElf: number[], numberOfElvesToCount: number) {
        return sortedTotalCaloriesPerElf.slice(0, numberOfElvesToCount).reduce((totalCalories, currentCalories) => totalCalories + currentCalories, 0);
    }

    private static sortTotalCaloriesByElf(totalCaloriesPerElf: number[]) {
        return totalCaloriesPerElf.slice().sort((a, b) => b - a);
    }

    private static getTotalCaloriesForOneElf(elfFoodCalories: number[]) {
        return elfFoodCalories.reduce((totalCalories, currentCalory) => totalCalories + currentCalory, 0);
    }
}