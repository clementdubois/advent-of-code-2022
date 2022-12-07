import {SHAPE} from "./RPSScoreCalculator";

class RPSInputParser {
    parse(input: string) {
        if(input === "A") return [[SHAPE.ROCK]];
        if(input === "B") return [[SHAPE.PAPER]];
        if(input === "C") return [[SHAPE.SCISSORS]]
        return []
    }
}

describe("RPSInputParser", () => {
    let rpsInputParser: RPSInputParser;

    beforeEach(() => {
        rpsInputParser = new RPSInputParser();
    })
   test("Should return empty array for no input", () => {
       const input = "";

       const rounds = rpsInputParser.parse(input)

       expect(rounds).toEqual([])
   })

    test("Should return Rock shape for 'A'", () => {
        const input = "A";

        const rounds = rpsInputParser.parse(input)

        expect(rounds[0][0]).toEqual(SHAPE.ROCK)
    })

    test("Should return Paper shape for 'B'", () => {
        const input = "B";

        const rounds = rpsInputParser.parse(input)

        expect(rounds[0][0]).toEqual(SHAPE.PAPER)
    })

    test("Should return Scissors shape for 'C'", () => {
        const input = "C";

        const rounds = rpsInputParser.parse(input)

        expect(rounds[0][0]).toEqual(SHAPE.SCISSORS)
    })
});