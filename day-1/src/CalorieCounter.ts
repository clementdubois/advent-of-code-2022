export type FoodCaloriesPerElf = number[][];

export class CaloriesCounter {
    private elvesToCountCalculator: ElvesToCountCalculator;
    private caloriesCalculator: CaloriesCalculator;
    constructor() {
        this.elvesToCountCalculator = new ElvesToCountCalculator()
        this.caloriesCalculator = new CaloriesCalculator()
    }

    countMaxCalories(caloriesPerElves: FoodCaloriesPerElf, options?: CalorieCounterOptions): number {
        const totalCaloriesPerElf = this.getTotalCaloriesPerElf(caloriesPerElves);
        const elvesToCount = this.elvesToCountCalculator.getElvesToCount(totalCaloriesPerElf, options);
        return this.caloriesCalculator.sumTotalCaloriesForElves(elvesToCount);
    }

    private getTotalCaloriesPerElf(caloriesPerElves: FoodCaloriesPerElf) {
        return caloriesPerElves.map((elfFoodCalories) => CaloriesCounter.getTotalCaloriesForOneElf(elfFoodCalories));
    }

    private static getTotalCaloriesForOneElf(elfFoodCalories: number[]) {
        return elfFoodCalories.reduce((totalCalories, currentCalory) => totalCalories + currentCalory, 0);
    }
}

class CalorieCounterOptions {
    public numberOfElves: number = 1;

    constructor(options?: { numberOfElves: number } ) {
        this.numberOfElves = options?.numberOfElves || 1;
    }
}

class ElvesToCountCalculator {
    public getElvesToCount(totalCaloriesPerElf: number[],  options: { numberOfElves: number } = {numberOfElves: 1}): number[] {
        const sortedTotalCaloriesPerElf = this.sortTotalCaloriesByElf(totalCaloriesPerElf);
        return sortedTotalCaloriesPerElf.slice(0, options.numberOfElves);
    }

    private sortTotalCaloriesByElf(totalCaloriesPerElf: number[]): number[] {
        return totalCaloriesPerElf.slice().sort((a, b) => b - a);
    }
}

class CaloriesCalculator {
    public sumTotalCaloriesForElves(elvesToCount: number[]): number {
        return elvesToCount.reduce((totalCalories, currentCalories) => totalCalories + currentCalories, 0);
    }
}
