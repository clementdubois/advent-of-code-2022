import {
    OUTCOME,
    Round,
    RPSScoreCalculator,
    ScoreBonusCalculator,
    ScoreOutcomeCalculator,
    SHAPE
} from "../src/RPSScoreCalculator";


/* Questions qui me viennent :
*  - Avec cette démarche j'implémente deux règles en même temps (calcul du score de la manche = point de victoire + ce qu'on a joué),
* est-ce qu'il faut décomposer sachant que d'un point de vue externe seul nous intéresse le total ?
* => Ma solution, je crée des classes intermédiaires que je teste, pas sûr que ça soit ok
* => Pareil avec Round que je teste pour avoir l'exhaustivité des cas, mais quand je commence les tests j'ai déjà pleins de cas qui sont verts
* => Idem pour les tests de WIN qui étaient déjà tous verts
* => J'ai bien découpé les responsabilités et testé unitairement tous les cas, mais est ce que je ne suis pas trop couplé à l'implem,
*  j'ai l'impression qui si je change ma structure de classe mes tests bas niveau (genre Round) vont être un frein
* => Est ce qu'il faut faire de l'injection de dépendance ou des mocks ?
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
        describe("Win", () => {
            test("Outcome should be Win if Paper and Scissors", () => {
                // GIVEN
                const round = new Round(SHAPE.PAPER, SHAPE.SCISSORS);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.WIN)
            })
            test("Outcome should be Win if Rock and Paper", () => {
                // GIVEN
                const round = new Round(SHAPE.ROCK, SHAPE.PAPER);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.WIN)
            })
            test("Outcome should be Win if Scissors and Rock", () => {
                // GIVEN
                const round = new Round(SHAPE.SCISSORS, SHAPE.ROCK);
                // WHEN
                const outcome = round.outcome();
                // THEN
                expect(outcome).toEqual(OUTCOME.WIN)
            })
        })
    });
    describe("ScoreBonusCalculator", () => {
        test('Should return 1 for Rock', () => {
            // GIVEN
            const shape = SHAPE.ROCK
            let scoreBonusCalcutor = new ScoreBonusCalculator();
            // WHEN
            const bonus = scoreBonusCalcutor.count(shape);
            // THEN
            expect(bonus).toEqual(1)
        })
        test('Should return 2 for Paper', () => {
            // GIVEN
            const shape = SHAPE.PAPER
            let scoreBonusCalcutor = new ScoreBonusCalculator();
            // WHEN
            const bonus = scoreBonusCalcutor.count(shape);
            // THEN
            expect(bonus).toEqual(2)
        })
        test('Should return 3 for Scissors', () => {
            // GIVEN
            const shape = SHAPE.SCISSORS
            let scoreBonusCalcutor = new ScoreBonusCalculator();
            // WHEN
            const bonus = scoreBonusCalcutor.count(shape);
            // THEN
            expect(bonus).toEqual(3)
        })
    })
    describe("ScoreOutcomeCalculator", () => {
        test("Should return 0 if I lose", () => {
            // GIVEN
            const round = new Round(SHAPE.PAPER, SHAPE.ROCK);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round);
            // THEN
            expect(outcomeScore).toEqual(0)
        })

        test("Should return 3 if draw", () => {
            // GIVEN
            const round = new Round(SHAPE.PAPER, SHAPE.PAPER);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round);
            // THEN
            expect(outcomeScore).toEqual(3)
        })

        test("Should return 6 if win", () => {
            // GIVEN
            const round = new Round(SHAPE.ROCK, SHAPE.PAPER);
            const scoreOutcomeCalculator = new ScoreOutcomeCalculator();
            // WHEN
            const outcomeScore = scoreOutcomeCalculator.count(round);
            // THEN
            expect(outcomeScore).toEqual(6)
        })
    })
    describe("ScoreCalculator", () => {
        test("Should return 8 for Rock - Paper", () => {
            // GIVEN
            const round = new Round(SHAPE.ROCK, SHAPE.PAPER);
            const rpsScoreCalculator = new RPSScoreCalculator();
            // WHEN
            const score = rpsScoreCalculator.getTotalScore([round]);
            // THEN
            expect(score).toEqual(8)
        })
        test("Should return 1 for Paper - Rock", () => {
            // GIVEN
            const round = new Round(SHAPE.PAPER, SHAPE.ROCK);
            const rpsScoreCalculator = new RPSScoreCalculator();
            // WHEN
            const score = rpsScoreCalculator.getTotalScore([round]);
            // THEN
            expect(score).toEqual(1)
        })
        test("Should return 6 for Scissors - Scissors", () => {
            // GIVEN
            const round = new Round(SHAPE.SCISSORS, SHAPE.SCISSORS);
            const rpsScoreCalculator = new RPSScoreCalculator();
            // WHEN
            const score = rpsScoreCalculator.getTotalScore([round]);
            // THEN
            expect(score).toEqual(6)
        })
        test("Should sum the score for all rounds", () => {
            // GIVEN
            const round1 = new Round(SHAPE.ROCK, SHAPE.PAPER);
            const round2 = new Round(SHAPE.PAPER, SHAPE.ROCK);
            const round3 = new Round(SHAPE.SCISSORS, SHAPE.SCISSORS);
            const rpsScoreCalculator = new RPSScoreCalculator();
            // WHEN
            const score = rpsScoreCalculator.getTotalScore([round1, round2, round3]);
            // THEN
            expect(score).toEqual(15)
        })
    })

});