import {SHAPE} from "./RPSScoreCalculator";

class RPSInputParser {
    parse(input: string) {
        return input.length ? [[SHAPE.ROCK]] : []
    }
}

describe("RPSInputParser", () => {
   test("Should return empty array for no input", () => {
       const input = "";
       const rpsInputParser = new RPSInputParser()

       const rounds = rpsInputParser.parse(input)

       expect(rounds).toEqual([])
   })

    test("Should return Rock shape for 'A'", () => {
        const input = "A";
        const rpsInputParser = new RPSInputParser()

        const rounds = rpsInputParser.parse(input)

        expect(rounds[0][0]).toEqual(SHAPE.ROCK)
    })
});