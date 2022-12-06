enum SHAPE {
    ROCK,
    PAPER
}

class RPSScoreCalculator {
    count(rounds: Round[]) {
        return 8;
    }
}

enum OUTCOME {
    WIN,
    LOSS,
    DRAW
}

class Round {
    constructor(private opponentMove: SHAPE, private myMove: SHAPE) {}

    outcome(): OUTCOME {
        return this.opponentMove === this.myMove ? OUTCOME.DRAW : OUTCOME.LOSS
    }
}

class ScoreOutcomeCalculator {
    private static DRAW_SCORE = 3;
    private static LOSS_SCORE = 0;

    count(round: Round) {
        return round.outcome() === OUTCOME.DRAW ? ScoreOutcomeCalculator.DRAW_SCORE : ScoreOutcomeCalculator.LOSS_SCORE
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
            let scoreOutcomeCalculator = new ScoreOutcomeCalculator();

            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round1);
            // THEN
            expect(outcomeScore).toEqual(0)
        })

        test("Should return 3 if draw", () => {
            // GIVEN
            const round1 = new Round(SHAPE.PAPER, SHAPE.PAPER);
            let scoreOutcomeCalculator = new ScoreOutcomeCalculator();

            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round1);
            // THEN
            expect(outcomeScore).toEqual(3)
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