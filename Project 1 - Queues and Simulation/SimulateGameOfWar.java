/*
* Game of War Simulation | SimulateGameOfWar.java
*
* Author: Neil S. Sharma
* Date: May 2024
*
* Simulates the Game of War between two players using custom queue and playing card data structures
*
* Supports games with one or more standard decks, shuffled or unshuffled, and tracks game statistics
* including rounds played, wins, losses, ties, and the overall winner.
*
* Originally developed as part of a university programming project
* under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
*/




public class SimulateGameOfWar {

    //Variables
    private PlayingCardQueue player1 = new PlayingCardQueue();
    private PlayingCardQueue player2 = new PlayingCardQueue();
    private int P1_wins = 0;
    private int P2_wins = 0;
    private int P1_losses = 0;
    private int P2_losses = 0;
    private int ties = 0;
    private int rounds = 0;
    private int winner = 0;
    private PlayingCard P1_card;
    private PlayingCard P2_card;
    private int P1_cardpoint = 0;
    private int P2_cardpoint = 0;
    private int P1_cardcount = 0;
    private int P2_cardcount = 0;





    //Default game start, one deck only
    public SimulateGameOfWar(boolean shuffle) {
        PlayingCardPile deck = new PlayingCardPile(1);

        //shuffle deck if true
        if (shuffle) {
            deck.shufflePile();
        }

        //deal cards to players
        int deckcount = deck.getNumberOfCardsInPile();

        for (int i = 0; i < deckcount; i++) {
            if (i % 2 == 0) {
                player1.enqueueCard(deck.dealCard());
            } else {
                player2.enqueueCard(deck.dealCard());
            }
        }

        P1_cardcount = player1.getNumberOfCardsInQueue();
        P2_cardcount = player2.getNumberOfCardsInQueue();
    }




    //Custom game start
    public SimulateGameOfWar(boolean shuffle, int numberOfDecks) {
        PlayingCardPile deck = new PlayingCardPile(numberOfDecks);

        //shuffle deck if true
        if (shuffle) {
            deck.shufflePile();
        }

        //deal cards to players
        int deckcount = deck.getNumberOfCardsInPile();

        for (int i = 0; i < deckcount; i++) {
            if (i % 2 == 0) {
                player1.enqueueCard(deck.dealCard());
            } else {
                player2.enqueueCard(deck.dealCard());
            }
        }

        P1_cardcount = player1.getNumberOfCardsInQueue();
        P2_cardcount = player2.getNumberOfCardsInQueue();
    }
    
    



    //Call round of game, looped above
    public void game_rounds() {

        //Adds one round
        rounds++;

        //Draw top cards
        P1_card = player1.dequeueCard();
        P2_card = player2.dequeueCard();

        P1_cardcount = player1.getNumberOfCardsInQueue();
        P2_cardcount = player2.getNumberOfCardsInQueue();

        //Flip cards
        P1_card.flipCard();
        P2_card.flipCard();

        //Get point values
        P1_cardpoint = P1_card.getCardPoints();
        P2_cardpoint = P2_card.getCardPoints();

        //Determine winner
        if (P1_cardpoint > P2_cardpoint) {
            winner = 1;
            P1_wins++;
            P2_losses++;
        }

        if (P1_cardpoint < P2_cardpoint) {
            winner = 2;
            P2_wins++;
            P1_losses++;
        }

        if (P1_cardpoint == P2_cardpoint) {
            winner = 3;
            ties++;
        }

        //Display round
        System.out.println();
        System.out.println("Round " + rounds + ": Player 1 (" + P1_cardcount + ") Player 2 (" + P2_cardcount + ")");
        System.out.println("-----------------------------------------");
        System.out.println("Player 1 Card       Player 2 Card");
        System.out.println(P1_card + "       " + P2_card);
        System.out.println("-----------------------------------------");

        //Turn cards face down
        P1_card.flipCard();
        P2_card.flipCard();

        //Give cards to winner
        if (winner == 1) {
            System.out.println("Player 1 won the round!");
            player1.enqueueCard(P1_card);
            player1.enqueueCard(P2_card);
        }

        if (winner == 2) {
            System.out.println("Player 2 won the round!");
            player2.enqueueCard(P2_card);
            player2.enqueueCard(P1_card);
        }

        if (winner == 3) {
            System.out.println("WAR! Both players lose!");
        }

        P1_cardcount = player1.getNumberOfCardsInQueue();
        P2_cardcount = player2.getNumberOfCardsInQueue();
    }





    //Run entire game
    public void runSimulation() {

        while (P1_cardcount != 0 && P2_cardcount != 0) {
            game_rounds();
        }

        //Print winner
        System.out.println();

        if (P1_cardcount != 0) {
            System.out.println("** Player 1 Won the Game!! **");
        }

        if (P2_cardcount != 0) {
            System.out.println("** Player 2 Won the Game!! **");
        }

        //Print remaining cards
        System.out.println();
        System.out.println("Remaining Cards:");
        System.out.println("-----------------");
        System.out.println("Player 1 (" + P1_cardcount + ")");
        System.out.println("Player 2 (" + P2_cardcount + ")");
        System.out.println("-----------------");

        //Print statistics
        System.out.println();
        System.out.println("Game Statistics:");
        System.out.println("-----------------------------------");
        System.out.println("Total Rounds:          " + rounds);
        System.out.println("Total Wars (Ties):     " + ties + " ( " + String.format("%.2f", (((float) ties / (float) rounds) * 100)) + "% )");
        System.out.println("Player 1 Wins:         " + P1_wins + " ( " + String.format("%.2f", (((float) P1_wins / (float) rounds) * 100)) + "% )");
        System.out.println("Player 1 Loses:        " + P1_losses + " ( " + String.format("%.2f", (((float) P1_losses / (float) rounds) * 100)) + "% )");
        System.out.println("Player 2 Wins:         " + P2_wins + " ( " + String.format("%.2f", (((float) P2_wins / (float) rounds) * 100)) + "% )");
        System.out.println("Player 2 Loses:        " + P2_losses + " ( " + String.format("%.2f", (((float) P2_losses / (float) rounds) * 100)) + "% )");
        System.out.println("-----------------------------------");
    }

}