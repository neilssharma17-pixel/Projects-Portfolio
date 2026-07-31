/*
 * Game of War Simulation | PlayingCardSuit.java
 *
 * Author: Neil S. Sharma
 * Date: May 2024
 *
 * Defines the four standard playing card suits used throughout the Game of War Simulation.
 * Provides a custom string representation
 * for displaying each suit in a readable format.
 *
 * Originally developed as part of a university programming project
 * under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
 */



//This enum holds the suits of the cards
public enum PlayingCardSuit {
    SPADES, DIAMONDS, CLUBS, HEARTS;


    //enum Variable
    private PlayingCardSuit suit;


    //Returns enum suit as string
    @Override
    public String toString() {
        String str = "";
        this.suit = this;

        switch (suit) {
            case SPADES:
                str = "Spades";
                break;
            case DIAMONDS:
                str = "Diamonds";
                break;
            case CLUBS:
                str = "Clubs";
                break;
            case HEARTS:
                str = "Hearts";
                break;
        }

        return str;
    }

}