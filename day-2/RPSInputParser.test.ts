import {SHAPE} from "./RPSScoreCalculator";

enum OPPONENT_MOVE {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = 'C'
}

class RPSInputParser {
    parse(input: string) {
        const [opponentMove] = RPSInputParser.parseOneRound(input);
        return opponentMove ? [[RPSInputParser.transformOpponentMoveToRPS(opponentMove)]] : []
    }

    private static parseOneRound(input: string) {
        return input.split(" ") as [OPPONENT_MOVE];
    }

    private static transformOpponentMoveToRPS(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.ROCK;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.PAPER;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
        }
    }
}

describe("RPSInputParser", () => {
    let rpsInputParser: RPSInputParser;

    beforeEach(() => {
        rpsInputParser = new RPSInputParser();
    })
    describe("Opponent move", () => {

        test("Should return empty array for no input", () => {
            const input = "";

            const rounds = rpsInputParser.parse(input)

            expect(rounds).toEqual([])
        })

        test("Should return Rock shape for 'A'", () => {
            const input = OPPONENT_MOVE.ROCK;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][0]).toEqual(SHAPE.ROCK)
        })

        test("Should return Paper shape for 'B'", () => {
            const input = OPPONENT_MOVE.PAPER;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][0]).toEqual(SHAPE.PAPER)
        })

        test("Should return Scissors shape for 'C'", () => {
            const input = OPPONENT_MOVE.SCISSORS;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][0]).toEqual(SHAPE.SCISSORS)
        })
    })
    describe.skip("My move", () => {
        test("Should return Rock shape for 'X'", () => {
            const input = OPPONENT_MOVE.ROCK + " X";

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][1]).toEqual(SHAPE.ROCK)
        })
    })
});