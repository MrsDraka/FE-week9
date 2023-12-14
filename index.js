/**
 * This is the class that represents each card
 */
class Card {
  /**
   * Creates the instance of a card
   */
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

/**
 * Deck class respresents a full deck
 */
class Deck {
  /**
   * Creates an instance of deck
   */
  constructor() {
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    this.cards = [];
    this.initializeDeck();
  }

  /**
   * Initializes the 52 card deck.
   * Used Unicode escape sequences to represent each suit with
   * with its corresponding symbol characters
   */
  initializeDeck() {
    const suits = ["\u2665", "\u2666", "\u2663", "\u2660"];
    for (let suit of suits) {
      for (let value of this.values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  /**
   * Method that suffles the deck
   */
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Deals the cards to the players. I know in person you would
   * go one by one to each player, but since it's programmed and
   * shuffled there's no need to do it this way, hence why I spliced it.
   */
  deal(numberOfCards) {
    return this.cards.splice(0, numberOfCards);
  }
}

/**
 * Represents a player.
 */
class Player {
  /**
   * Creates a player instance
   */
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.hand = [];
  }

  /**
   Draws a card for a player.
   Will return the drawn card.
   */
  playCard() {
    return this.hand.pop();
  }
}

/**
 * Runs the game.
 */
async function playWarGame() {
  const deck = new Deck();
  deck.shuffle();

  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");

  player1.hand = deck.deal(26);
  player2.hand = deck.deal(26);

  console.log(`
    .------..------..------.
    |W.--. ||A.--. ||R.--. |
    | :/\\: || (\\/) || :(): |
    | :\\/  || :\\/  || ()() |
    | '--'W|| '--'A|| '--'R|
    \`------'\`------'\`------'

    ██████╗  █████╗ ███╗   ███╗███████╗
    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
    ██║  ███╗███████║██╔████╔██║█████╗  
    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  
    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ 
`);

  for (let i = 0; i < 26; i++) {
    const card1 = player1.playCard();
    const card2 = player2.playCard();

    console.log(`-------------------------
     \u2665 Round ${i + 1} \u2665
-------------------------`);

    console.log(`Player 1 plays: [${card1.value}${card1.suit}]`);
    console.log(`Player 2 plays: [${card2.value}${card2.suit}]`);

    /**
     * Added these variables to be able to compare their value
     * and keep the score.
     */

    let value1 = deck.values.indexOf(card1.value);
    let value2 = deck.values.indexOf(card2.value);

    if (value1 > value2) {
      player1.score++;
      console.log(`\u2660 Player 1 wins the battle! \u2660`);
    } else if (value1 < value2) {
      player2.score++;
      console.log(`\u2660 Player 2 wins the battle! \u2660`);
    } else {
      console.log(`\u2663 \u2666  Round is a tie \u2660 \u2665`);
    }
    console.log(`-------------------------
     \u2663 Scoreboard \u2663
-------------------------
Player 1: ${player1.score} pts
Player 2: ${player2.score} pts
-------------------------`);
  }

  console.log(`
▂▃▅▇█▓▒░Final Score ░▒▓█▇▅▃▂

Player 1: ${player1.score}
Player 2: ${player2.score}`);
  if (player1.score > player2.score) {
    console.log(`
    ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗      ██╗    ██╗    ██╗██╗███╗   ██╗███████╗██╗
    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗    ███║    ██║    ██║██║████╗  ██║██╔════╝██║
    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝    ╚██║    ██║ █╗ ██║██║██╔██╗ ██║███████╗██║
    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗     ██║    ██║███╗██║██║██║╚██╗██║╚════██║╚═╝
    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║     ██║    ╚███╔███╔╝██║██║ ╚████║███████║██╗
    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═╝     ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝`);
  } else if (player1.score < player2.score) {
    console.log(`

    ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗     ██████╗     ██╗    ██╗██╗███╗   ██╗███████╗██╗
    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗    ╚════██╗    ██║    ██║██║████╗  ██║██╔════╝██║
    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝     █████╔╝    ██║ █╗ ██║██║██╔██╗ ██║███████╗██║
    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗    ██╔═══╝     ██║███╗██║██║██║╚██╗██║╚════██║╚═╝
    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║    ███████╗    ╚███╔███╔╝██║██║ ╚████║███████║██╗
    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝    ╚══════╝     ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝`);
  } else {
    console.log(`

    ████████╗██╗  ██╗███████╗     ██████╗  █████╗ ███╗   ███╗███████╗    ██╗███████╗     █████╗     ████████╗██╗███████╗██╗
    ╚══██╔══╝██║  ██║██╔════╝    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██║██╔════╝    ██╔══██╗    ╚══██╔══╝██║██╔════╝██║
       ██║   ███████║█████╗      ██║  ███╗███████║██╔████╔██║█████╗      ██║███████╗    ███████║       ██║   ██║█████╗  ██║
       ██║   ██╔══██║██╔══╝      ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║╚════██║    ██╔══██║       ██║   ██║██╔══╝  ╚═╝
       ██║   ██║  ██║███████╗    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ██║███████║    ██║  ██║       ██║   ██║███████╗██╗
       ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝╚══════╝    ╚═╝  ╚═╝       ╚═╝   ╚═╝╚══════╝╚═╝`);
  }
  console.log(`

  .------..------..------..------..------..------.
  |T.--. ||H.--. ||A.--. ||N.--. ||K.--. ||S.--. |
  | :/\:  || :/\:  || (\/)  || :(): || :/\:  || :/\:  |
  | (__) || (__) || :\/:  || ()() || :\/:  || :\/:  |
  | '--'T|| '--'H|| '--'A|| '--'N|| '--'K|| '--'S|
  \`------'\`------'\`------'\`------'\`------'\`------'
  
  -... -.--    .- -. .-    --. 

`);
}

// Starts a new game by calling the game function
playWarGame();
