import {MovesToRoundWithBothMoveTransformerStrategy, MY_MOVE, OPPONENT_MOVE} from "../src/MovesToRoundTransformer";
import {SHAPE} from "../src/RPSScoreCalculator";

describe("MovesToRoundWithBothMoveTransformerStrategy", () => {
    let movesToRPSTransformer: MovesToRoundWithBothMoveTransformerStrategy;
    beforeEach(() => {
        movesToRPSTransformer = new MovesToRoundWithBothMoveTransformerStrategy()
    });
    describe("Opponent move", () => {

        test("Should return empty array for no input", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds).toEqual([])
        })

        test("Should return Rock shape for 'A'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.ROCK]];

            const rounds = movesToRPSTransformer.transform(input)

            /* Le getOpponentMove a été créer uniquement pour le test :'( */
            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
        })

        test("Should return Paper shape for 'B'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.PAPER, MY_MOVE.PAPER]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.PAPER)
        })

        test("Should return Scissors shape for 'C'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.SCISSORS, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("My move", () => {
        test("Should return Rock shape for 'X'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.ROCK]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
        })
        test("Should return Paper shape for 'Y'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.PAPER]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getMyMove()).toEqual(SHAPE.PAPER)
        })
        test("Should return Scissors shape for 'Z'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("Complete round", () => {
        test("Sould return entire round as shape", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
            expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
        })

        test("Sould return multiple rounds as shape", () => {
            const round1:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS];
            const round2:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.PAPER, MY_MOVE.ROCK];
            const round3:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.SCISSORS, MY_MOVE.PAPER];
            const input = [round1, round2, round3];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
            expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
            expect(rounds[1].getOpponentMove()).toEqual(SHAPE.PAPER)
            expect(rounds[1].getMyMove()).toEqual(SHAPE.ROCK)
            expect(rounds[2].getOpponentMove()).toEqual(SHAPE.SCISSORS)
            expect(rounds[2].getMyMove()).toEqual(SHAPE.PAPER)
        })
    })
})