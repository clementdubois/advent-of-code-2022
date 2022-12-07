import {MovesToRPSTransformer} from "../src/MovesToRPSTransformer";
import {MY_MOVE, OPPONENT_MOVE} from "../src/RPSInputParser";
import {SHAPE} from "../src/RPSScoreCalculator";

describe("MovesToRPSTransformer", () => {
    let movesToRPSTransformer: MovesToRPSTransformer;
    beforeEach(() => {
        movesToRPSTransformer = new MovesToRPSTransformer()
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

            expect(rounds[0][0]).toEqual(SHAPE.ROCK)
        })

        test("Should return Paper shape for 'B'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.PAPER, MY_MOVE.PAPER]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0][0]).toEqual(SHAPE.PAPER)
        })

        test("Should return Scissors shape for 'C'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.SCISSORS, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0][0]).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("My move", () => {
        test("Should return Rock shape for 'X'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.ROCK]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0][1]).toEqual(SHAPE.ROCK)
        })
        test("Should return Paper shape for 'Y'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.PAPER]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0][1]).toEqual(SHAPE.PAPER)
        })
        test("Should return Scissors shape for 'Z'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0][1]).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("Complete round", () => {
        test("Sould return entire round as shape", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS]];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds[0]).toEqual([SHAPE.ROCK, SHAPE.SCISSORS])
        })

        test("Sould return multiple rounds as shape", () => {
            const round1:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.ROCK, MY_MOVE.SCISSORS];
            const round2:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.PAPER, MY_MOVE.ROCK];
            const round3:[OPPONENT_MOVE, MY_MOVE] = [OPPONENT_MOVE.SCISSORS, MY_MOVE.PAPER];
            const input = [round1, round2, round3];

            const rounds = movesToRPSTransformer.transform(input)

            expect(rounds).toEqual([
                [SHAPE.ROCK, SHAPE.SCISSORS],
                [SHAPE.PAPER, SHAPE.ROCK],
                [SHAPE.SCISSORS, SHAPE.PAPER]
            ])
        })
    })
})