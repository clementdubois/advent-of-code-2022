export type FoodCaloriesPerElf = number[][];

export class CaloriesCounter {
    constructor() {
    }

    countMaxCalories(caloriesPerElves: FoodCaloriesPerElf): number {
        const totalCaloriesPerElf = this.getTotalCaloriesPerElf(caloriesPerElves);
        return CaloriesCounter.getMaxCalories(totalCaloriesPerElf)
    }

    private getTotalCaloriesPerElf(caloriesPerElves: FoodCaloriesPerElf) {
        return caloriesPerElves.map((elfFoodCalories) => CaloriesCounter.getTotalCaloriesForOneElf(elfFoodCalories));
    }

    private static getMaxCalories(totalCaloriesPerElf: number[]) {
        return totalCaloriesPerElf.reduce((maxCalories, currentCalories) => maxCalories > currentCalories ? maxCalories : currentCalories, 0);
    }

    private static getTotalCaloriesForOneElf(elfFoodCalories: number[]) {
        return elfFoodCalories.reduce((totalCalories, currentCalory) => totalCalories + currentCalory, 0);
    }
}