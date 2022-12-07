import {
    MovesToRoundOutcomeStrategy,
    MovesToRoundWithBothMoveStrategy,
    MY_MOVE,
    MY_OUTCOME,
    OPPONENT_MOVE
} from "../src/MovesToRoundTransformer";
import {SHAPE} from "../src/RPSScoreCalculator";

/* Question : Quand j'applique le pattern stratégie pour séparer la transformation selon que le coup soit un vrai coup (part 1 )
*  ou que le coup soit le résultat (part2) je me retrouve a dupliqué plein de tests car la partie concernant les coups de l'adversaire restent identique*/
describe("MovesToRoundWithBothMoveTransformerStrategy", () => {
    let movesToRPSTransformer: MovesToRoundWithBothMoveStrategy;
    beforeEach(() => {
        movesToRPSTransformer = new MovesToRoundWithBothMoveStrategy()
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

describe("MovesToRoundOutcomeStrategy", () => {
    let movesToRoundOutcomeStrategy: MovesToRoundOutcomeStrategy;
    beforeEach(() => {
        movesToRoundOutcomeStrategy = new MovesToRoundOutcomeStrategy()
    });
    describe("Opponent move", () => {

        test("Should return empty array for no input", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            expect(rounds).toEqual([])
        })

        test("Should return Rock shape for 'A'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.ROCK, MY_MOVE.ROCK]];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            /* Le getOpponentMove a été créer uniquement pour le test :'( */
            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
        })

        test("Should return Paper shape for 'B'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.PAPER, MY_MOVE.PAPER]];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.PAPER)
        })

        test("Should return Scissors shape for 'C'", () => {
            const input:[OPPONENT_MOVE, MY_MOVE][] = [[OPPONENT_MOVE.SCISSORS, MY_MOVE.SCISSORS]];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.SCISSORS)
        })
    })
    describe("My move according to outcome", () => {
        describe("I should loose if X", () => {
            test("Should return Paper shape for opponent Scissors", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.SCISSORS, MY_OUTCOME.LOSE]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.PAPER)
            })

            test("Should return Rock shape for opponent Paper", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.PAPER, MY_OUTCOME.LOSE]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
            })

            test("Should return Scissors shape for opponent Rock", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.ROCK, MY_OUTCOME.LOSE]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
            })
        })

        describe("I should draw if Y", () => {
            test("Should return Paper shape for opponent Paper", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.PAPER, MY_OUTCOME.DRAW]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.PAPER)
            })

            test("Should return Rock shape for opponent Rock", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.ROCK, MY_OUTCOME.DRAW]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
            })

            test("Should return Scissors shape for opponent Scissors", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.SCISSORS, MY_OUTCOME.DRAW]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
            })
        })
        describe("I should win if Z", () => {
            test("Should return Scissors shape for opponent Paper", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.PAPER, MY_OUTCOME.WIN]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.SCISSORS)
            })

            test("Should return Paper shape for opponent Rock", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.ROCK, MY_OUTCOME.WIN]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.PAPER)
            })

            test("Should return Rock shape for opponent Scissors", () => {
                const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.SCISSORS, MY_OUTCOME.WIN]];

                const rounds = movesToRoundOutcomeStrategy.transform(input)

                expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
            })
        })
    })
    describe("Complete round", () => {
        test("Sould return entire round as shape", () => {
            const input:[OPPONENT_MOVE, MY_OUTCOME][] = [[OPPONENT_MOVE.ROCK, MY_OUTCOME.DRAW]];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
            expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
        })

        test("Sould return multiple rounds as shape", () => {
            const round1:[OPPONENT_MOVE, MY_OUTCOME] = [OPPONENT_MOVE.ROCK, MY_OUTCOME.DRAW];
            const round2:[OPPONENT_MOVE, MY_OUTCOME] = [OPPONENT_MOVE.PAPER, MY_OUTCOME.LOSE];
            const round3:[OPPONENT_MOVE, MY_OUTCOME] = [OPPONENT_MOVE.SCISSORS, MY_OUTCOME.WIN];
            const input = [round1, round2, round3];

            const rounds = movesToRoundOutcomeStrategy.transform(input)

            expect(rounds[0].getOpponentMove()).toEqual(SHAPE.ROCK)
            expect(rounds[0].getMyMove()).toEqual(SHAPE.ROCK)
            expect(rounds[1].getOpponentMove()).toEqual(SHAPE.PAPER)
            expect(rounds[1].getMyMove()).toEqual(SHAPE.ROCK)
            expect(rounds[2].getOpponentMove()).toEqual(SHAPE.SCISSORS)
            expect(rounds[2].getMyMove()).toEqual(SHAPE.ROCK)
        })
    })
})