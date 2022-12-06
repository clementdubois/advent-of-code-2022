enum SHAPE {
    ROCK,
    PAPER,
    SCISSORS,
}

enum OUTCOME {
    WIN,
    LOSS,
    DRAW
}

class RPSScoreCalculator {
    count(rounds: Round[]) {
        return 8;
    }
}

class Round {
    constructor(private opponentMove: SHAPE, private myMove: SHAPE) {
    }

    outcome(): OUTCOME {
        if (this.isDraw()) return OUTCOME.DRAW;
        if (this.isLoss()) return OUTCOME.LOSS;
        return OUTCOME.WIN;
    }

    private isDraw() {
        return this.opponentMove === this.myMove;
    }

    private isLoss() {
        return this.opponentMove === SHAPE.PAPER && this.myMove === SHAPE.ROCK
            || this.opponentMove === SHAPE.ROCK && this.myMove === SHAPE.SCISSORS
            || this.opponentMove === SHAPE.SCISSORS && this.myMove === SHAPE.PAPER;
    }
}

class ScoreOutcomeCalculator {
    private static WIN_SCORE = 6;
    private static DRAW_SCORE = 3;
    private static LOSS_SCORE = 0;

    count(round: Round) {
        switch (round.outcome()) {
            case OUTCOME.WIN:
                return ScoreOutcomeCalculator.WIN_SCORE;
            case OUTCOME.DRAW:
                return ScoreOutcomeCalculator.DRAW_SCORE;
            case OUTCOME.LOSS :
                return ScoreOutcomeCalculator.LOSS_SCORE;
        }
    }
}

/* Questions qui me viennent :
*  - Avec cette démarche j'implémente deux règles en même temps ( calcul du score de la mache = point de victoire + ce qu'on a joué),
* est ce qu'il faut décomposé sachant que d'un point de vue externe seul nous interesse le total ?
* => Ma solution, je créer des classe intermédiaire que je tests, pas sur que ça soit ok
* => Pareil avec Round que je teste pour avoir l'exhaustivité des cas mais quand je commence les tests j'ai déjà pleins de cas qui sont vert
* */
describe("RPSScoreCalculator", () => {
    describe("Round", () => {
        describe("Draw", () => {
            test("Outcome should be draw if Rock and Rock", () => {
                // GIVEN
                const round = new Round(SHAPE.ROCK, SHAPE.ROCK);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.DRAW)
            })

            test("Outcome should be draw if PAPER and PAPER", () => {
                // GIVEN
                const round = new Round(SHAPE.PAPER, SHAPE.PAPER);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.DRAW)
            })

            test("Outcome should be draw if SCISSORS and SCISSORS", () => {
                // GIVEN
                const round = new Round(SHAPE.SCISSORS, SHAPE.SCISSORS);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.DRAW)
            })
        })

        describe("Loss", () => {
            test("Outcome should be LOSS if Paper and Rock", () => {
                // GIVEN
                const round = new Round(SHAPE.PAPER, SHAPE.ROCK);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.LOSS)
            })
            test("Outcome should be LOSS if Rock and Scissors", () => {
                // GIVEN
                const round = new Round(SHAPE.ROCK, SHAPE.SCISSORS);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.LOSS)
            })
            test("Outcome should be LOSS if Scissors and Paper", () => {
                // GIVEN
                const round = new Round(SHAPE.SCISSORS, SHAPE.PAPER);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.LOSS)
            })
        })
    });
    describe("ScoreOutcomeCalculator", () => {
        test("Should return 0 if I lose", () => {
            // GIVEN
            const round1 = new Round(SHAPE.PAPER, SHAPE.ROCK);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round1);
            // THEN
            expect(outcomeScore).toEqual(0)
        })

        test("Should return 3 if draw", () => {
            // GIVEN
            const round1 = new Round(SHAPE.PAPER, SHAPE.PAPER);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round1);
            // THEN
            expect(outcomeScore).toEqual(3)
        })

        test("Should return 6 if win", () => {
            // GIVEN
            const round1 = new Round(SHAPE.ROCK, SHAPE.PAPER);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round1);
            // THEN
            expect(outcomeScore).toEqual(6)
        })
    })
    test("Should return 8 for A - Y / Rock - Paper", () => {
        // GIVEN
        const round1 = new Round(SHAPE.PAPER, SHAPE.ROCK);
        const rpsScoreCalculator = new RPSScoreCalculator();
        // WHEN
        const score = rpsScoreCalculator.count([round1]);
        // THEN
        expect(score).toEqual(8)
    })

});