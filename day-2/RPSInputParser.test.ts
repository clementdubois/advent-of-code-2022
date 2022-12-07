import {SHAPE} from "./RPSScoreCalculator";

enum OPPONENT_MOVE {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = 'C'
}

enum MY_MOVE {
    ROCK = "X",
    PAPER = "Y",
    SCISSORS = "Z",
}

class StringInputToRoundParser {
    private inputMoveToRPSTransformer: MoveToRPSTransformer;

    constructor() {
        this.inputMoveToRPSTransformer = new MoveToRPSTransformer();
    }

    parse(input: string): [SHAPE, SHAPE][] {
       return StringInputToRoundParser
           .parseRounds(input)
           .map(StringInputToRoundParser.parseMoves)
           .map(this.inputMoveToRPSTransformer.transform)
    }

    private static parseRounds(input: string) {
        return input.split("\n").filter(round => round);
    }

    private static parseMoves(input: string) {
        const MOVE_SEPARATOR = " ";
        return input.split(MOVE_SEPARATOR).filter(move => move) as [OPPONENT_MOVE, MY_MOVE];
    }


}

class MoveToRPSTransformer {
    transform(round: [OPPONENT_MOVE, MY_MOVE]): [SHAPE, SHAPE] {
        return [
            MoveToRPSTransformer.transformOpponentMoveToRPS(round[0]),
            MoveToRPSTransformer.transformMyMoveToRPS(round[1])
        ]
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
            case MY_MOVE.PAPER:
                return SHAPE.PAPER;
            case MY_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
            case MY_MOVE.ROCK:
                return SHAPE.ROCK;
        }
    }
}

/* Au début j'avais juste un StringInputToRoundParser, je me rends compte qu'il y a deux responsabilités :
transformer l'input textuel en tableau et transformer les coups en SHAPE
=> J'extrais un MoveToRPSTransformer, est ce que je refais les tests U, si oui est ce que j'enleve les TU du parser,
est ce que je suis pas en train de coupler à l'implem, est ce qu'il faut une autre classe qui fasse le relai entre le parser et le transformer ?
*/
describe("StringInputToRoundParser", () => {
    let rpsInputParser: StringInputToRoundParser;

    beforeEach(() => {
        rpsInputParser = new StringInputToRoundParser();
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
            const input = OPPONENT_MOVE.ROCK + " " + MY_MOVE.ROCK;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][1]).toEqual(SHAPE.ROCK)
        })
        test("Should return Paper shape for 'Y'", () => {
            const input = OPPONENT_MOVE.ROCK + " " + MY_MOVE.PAPER;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][1]).toEqual(SHAPE.PAPER)
        })
        test("Should return Scissors shape for 'Z'", () => {
            const input = OPPONENT_MOVE.ROCK + " " + MY_MOVE.SCISSORS;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0][1]).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("Complete round", () => {
        test("Sould return entire round as shape", () => {
            const input = OPPONENT_MOVE.ROCK + " " + MY_MOVE.SCISSORS;

            const rounds = rpsInputParser.parse(input)

            expect(rounds[0]).toEqual([SHAPE.ROCK, SHAPE.SCISSORS])
        })

        test("Sould return multiple rounds as shape", () => {
            const round1 = OPPONENT_MOVE.ROCK + " " + MY_MOVE.SCISSORS;
            const round2 = OPPONENT_MOVE.PAPER + " " + MY_MOVE.ROCK;
            const round3 = OPPONENT_MOVE.SCISSORS + " " + MY_MOVE.PAPER;
            const input = `${round1}\n${round2}\n${round3}`;

            const rounds = rpsInputParser.parse(input)

            expect(rounds).toEqual([
                [SHAPE.ROCK, SHAPE.SCISSORS],
                [SHAPE.PAPER, SHAPE.ROCK],
                [SHAPE.SCISSORS, SHAPE.PAPER]
            ])
        })
    })
});