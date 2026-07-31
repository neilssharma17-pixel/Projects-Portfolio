/*
 * Game of War Simulation | PlayingCardPile.java
 *
 * Author: Neil S. Sharma
 * Date: May 2024
 *
 * Creates and manages one or more standard decks of playing cards using a LinkedList.
 *
 * Provides functionality for building, shuffling, dealing, displaying,
 * and adding cards back to the bottom of the pile. Card point values
 * are assigned during deck creation for use in the Game of War simulation.
 *
 * Originally developed as part of a university programming project
 * under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
 */



//Imports for linkedlist
import java.util.Collections;
import java.util.LinkedList;




public class PlayingCardPile {

    //Variables
    //Number of Decks
    private int numberOfDecks;

    //List of Playing Cards
    private LinkedList<PlayingCard> PCP = new LinkedList<PlayingCard>();





    //Returns the point value for a card
    private int getPoints(int rank) {
        if (rank == 1) {
            return 13;   //Ace
        }
        return rank - 1;
    }



    //Constructor for PlayingCardPile
    public PlayingCardPile(int numberOfDecks) {

        this.numberOfDecks = numberOfDecks;

        for (int i = 0; i < numberOfDecks; i++) {

            //Spades
            for (int l = 1; l < 14; l++) {
                PCP.add(new PlayingCard(PlayingCardSuit.SPADES, l, getPoints(l), false));
            }

            //Diamonds
            for (int j = 1; j < 14; j++) {
                PCP.add(new PlayingCard(PlayingCardSuit.DIAMONDS, j, getPoints(j), false));
            }

            //Clubs
            for (int e = 1; e < 14; e++) {
                PCP.add(new PlayingCard(PlayingCardSuit.CLUBS, e, getPoints(e), false));
            }

            //Hearts
            for (int r = 1; r < 14; r++) {
                PCP.add(new PlayingCard(PlayingCardSuit.HEARTS, r, getPoints(r), false));
            }
        }
    }





    //Shuffle move functions
    //Get pile size
    public int getNumberOfCardsInPile() {
        return PCP.size();
    }

    //Check if pile empty
    public boolean isPileEmpty() {
        if (getNumberOfCardsInPile() == 0) {
            return true;
        } else {
            return false;
        }
    }

    //Shuffle pile
    public void shufflePile() {
        Collections.shuffle(PCP);
    }

    //Deal card on top of pile
    public PlayingCard dealCard() {
        return PCP.pop();
    }

    //Add card to pile
    public void addCardToBottom(PlayingCard card) {
        PCP.addLast(card);
    }
    
    
    
    
    

    //Display whole pile
    public void displayPile(boolean displayFaceUp) {

        if (isPileEmpty()) {
            System.out.println("The pile is empty");
        } else {

            if (displayFaceUp) {

                for (int v = 0; v < getNumberOfCardsInPile(); v++) {
                    PCP.get(v).flipCard();
                    PCP.get(v).displayCard();
                    PCP.get(v).flipCard();
                }

            } else {

                for (int w = 0; w < getNumberOfCardsInPile(); w++) {
                    PCP.get(w).displayCard();
                }

            }
        }
    }

}