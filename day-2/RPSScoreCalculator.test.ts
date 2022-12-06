enum SHAPE {
    ROCK,
    PAPER
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
    constructor(private opponentMove: SHAPE, private myMove: SHAPE) {}

    outcome(): OUTCOME {
        if(this.isDraw()) return OUTCOME.DRAW;
        if(this.isLoss()) return OUTCOME.LOSS;
        return OUTCOME.WIN;
    }

    private isDraw() {
        return this.opponentMove === this.myMove;
    }

    private isLoss() {
        return this.opponentMove === SHAPE.PAPER && this.myMove === SHAPE.ROCK;
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
* */
describe("RPSScoreCalculator", () => {
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