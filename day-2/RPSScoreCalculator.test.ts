enum SHAPE_OPPONENT {
    ROCK = "A",
    PAPER = "B"
}

enum SHAPE_ME {
    ROCK = "X",
    PAPER = "Y"
}

class RPSScoreCalculator {
    count(rounds: string[][]) {
        return 8;
    }
}

class ScoreOutcomeCalculator {
    count() {
        return 0
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
            const rounds = [[SHAPE_OPPONENT.PAPER, SHAPE_ME.ROCK]]
            let scoreOutcomeCalculator = new ScoreOutcomeCalculator();

            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count();
            // THEN
            expect(outcomeScore).toEqual(0)
        })
    })
    test("Should return 8 for A - Y / Rock - Paper", () => {
        // GIVEN
        const rounds = [[SHAPE_OPPONENT.ROCK, SHAPE_ME.PAPER]]
        const rpsScoreCalculator = new RPSScoreCalculator();
        // WHEN
        const score = rpsScoreCalculator.count(rounds);
        // THEN
        expect(score).toEqual(8)
    })

});