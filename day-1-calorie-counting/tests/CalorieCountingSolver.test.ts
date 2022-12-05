import {CalorieInputParser} from "../src/CalorieInputParser";
import {CaloriesCounter} from "../src/CalorieCounter";
import {CalorieCountingSolver} from "../src/CalorieCountingSolver";

describe("Calorie counting solver", () => {
    let calorieCountingSolver: CalorieCountingSolver;
    beforeEach(() => {
        const calorieInputParser = new CalorieInputParser();
        const calorieCounter = new CaloriesCounter();
        calorieCountingSolver  = new CalorieCountingSolver(calorieInputParser, calorieCounter)
    })
   test("Should return 0 if no calorie input", () => {
       // GIVEN
       const input = "";

       // WHEN
       const result = calorieCountingSolver.solve(input)

       // THEN
       expect(result).toEqual(0)
   })

    test("Should return total calories for one elf", () => {
        // GIVEN
        const input = "1000\n2000";

        // WHEN
        const result = calorieCountingSolver.solve(input)

        // THEN
        expect(result).toEqual(3000)
    })

    test("Should return max calories for multiple elves", () => {
        // GIVEN
        const elf1 = "1000\n2000"; // 3000
        const elf2 = "3000\n4000\n5000"; // 12000
        const elf3 = "100"; // 100
        const elf4 = "10000\n1000"; // 11000
        const input = `${elf1}\n\n${elf2}\n\n${elf3}\n\n${elf4}`;

        // WHEN
        const result = calorieCountingSolver.solve(input)

        // THEN
        expect(result).toEqual(12000)
    })

    test("Should return total calories of three elves", () => {
        // GIVEN
        const elf1 = "1000\n2000"; // 3000
        const elf2 = "3000\n4000\n5000"; // 12000
        const elf3 = "100"; // 100
        const elf4 = "10000\n1000"; // 11000
        const input = `${elf1}\n\n${elf2}\n\n${elf3}\n\n${elf4}`;

        // WHEN
        const result = calorieCountingSolver.solve(input, 3)

        // THEN
        expect(result).toEqual(26000)
    })
});