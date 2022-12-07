import {SHAPE} from "./RPSScoreCalculator";
import {transform} from "@babel/core";

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

class RPSInputParser {
    private inputMoveToRPSTransformer: InputMoveToRPSTransformer;
    constructor() {
        this.inputMoveToRPSTransformer = new InputMoveToRPSTransformer();
    }
    parse(input: string): [SHAPE, SHAPE][] {
        const round1 = RPSInputParser.parseOneRound(input);
        if (round1.length) {
            return [
                this.inputMoveToRPSTransformer.transform(round1),
            ]
        }
        return []
    }

    private static parseOneRound(input: string) {
        return input.split(" ").filter(round => round) as [OPPONENT_MOVE, MY_MOVE];
    }


}

class InputMoveToRPSTransformer {
    transform(round: [OPPONENT_MOVE, MY_MOVE]):  [SHAPE, SHAPE] {
        return [
            InputMoveToRPSTransformer.transformOpponentMoveToRPS(round[0]),
            InputMoveToRPSTransformer.transformMyMoveToRPS(round[1])
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

/* Au début j'avais juste un RPSInputParser, je me rends compte qu'il y a deux responsabilités :
transformer l'input textuel en tableau et transformer les coups en SHAPE
=> J'extrais un InputMoveToRPSTransformer, est ce que je refais les tests U, si oui est ce que j'enleve les TU du parser,
est ce que je suis pas en train de coupler à l'implem, est ce qu'il faut une autre classe qui fasse le relai entre le parser et le transformer ?
*/
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
});