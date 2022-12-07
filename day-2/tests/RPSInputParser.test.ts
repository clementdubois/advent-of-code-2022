import {RPSInputParser} from "../src/RPSInputParser";
import {MY_MOVE, OPPONENT_MOVE} from "../src/MovesToRoundTransformer";

/* Au début j'avais juste un StringInputToRoundParser, je me rends compte qu'il y a deux responsabilités :
transformer l'input textuel en tableau et transformer les coups en SHAPE
=> J'extrais un MoveToRPSTransformer, est ce que je refais les tests U, si oui est ce que j'enleve les TU du parser,
est ce que je suis pas en train de coupler à l'implem, est ce qu'il faut une autre classe qui fasse le relai entre le parser et le transformer ?
*/
describe("StringInputToRoundParser", () => {
    let rpsInputParser: RPSInputParser;

    beforeEach(() => {
        rpsInputParser = new RPSInputParser();
    })
    test("Should return empty array if no round", () => {
       const input = "";

       const rounds = rpsInputParser.parse(input)

        expect(rounds.length).toEqual(0)
    });
   test("Should split moves from one round", () => {
      const input = OPPONENT_MOVE.ROCK + " " + MY_MOVE.PAPER;

      const rounds = rpsInputParser.parse(input)

       expect(rounds).toEqual([[OPPONENT_MOVE.ROCK, MY_MOVE.PAPER]])
   });

    test("Should split multiple rounds", () => {
        const round1 = OPPONENT_MOVE.ROCK + " " + MY_MOVE.PAPER;
        const round2 = OPPONENT_MOVE.SCISSORS + " " + MY_MOVE.SCISSORS;
        const input = `${round1}\n${round2}`;

        const rounds = rpsInputParser.parse(input)

        expect(rounds).toEqual([[OPPONENT_MOVE.ROCK, MY_MOVE.PAPER], [OPPONENT_MOVE.SCISSORS, MY_MOVE.SCISSORS]])
    });
});
