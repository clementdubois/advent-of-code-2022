import {SHAPE} from "./RPSScoreCalculator";

class RPSInputParser {
    parse(input: string) {
        if(input === "A") return [[SHAPE.ROCK]];
        if(input === "B") return [[SHAPE.PAPER]];
        return []
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

    test("Should return Paper shape for 'B'", () => {
        const input = "B";
        const rpsInputParser = new RPSInputParser()

        const rounds = rpsInputParser.parse(input)

        expect(rounds[0][0]).toEqual(SHAPE.PAPER)
    })
});