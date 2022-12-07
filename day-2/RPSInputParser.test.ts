import {SHAPE} from "./RPSScoreCalculator";

enum OPPONENT_MOVE {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = 'C'
}

enum MY_MOVE {
    ROCK = "X",
}

class RPSInputParser {
    parse(input: string): [SHAPE, SHAPE][] {
        const [opponentMove, myMove] = RPSInputParser.parseOneRound(input);
        if (opponentMove) {
            return [[
                RPSInputParser.transformOpponentMoveToRPS(opponentMove),
                RPSInputParser.transformMyMoveToRPS(myMove)
            ]]
        }
        return []
    }

    private static parseOneRound(input: string) {
        return input.split(" ") as [OPPONENT_MOVE, MY_MOVE];
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

    private static transformMyMoveToRPS(myMove: MY_MOVE): SHAPE {
        switch (myMove) {
            case MY_MOVE.ROCK:
                return SHAPE.ROCK;
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
    describe("My move", () => {
        test("Should return Rock shape for 'X'", () => {
            const input = OPPONENT_MOVE.ROCK + " X";

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][1]).toEqual(SHAPE.ROCK)
        })
    })
});