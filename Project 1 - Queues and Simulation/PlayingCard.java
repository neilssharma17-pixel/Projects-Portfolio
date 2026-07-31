/*
* Game of War Simulation | PlayingCard.java
*
* Author: Neil S. Sharma
* Date: May 2024
*
* Represents an individual playing card used in the Game of War Simulation. 
* Creates each card and stores its suit, rank, and point value,
* inherits face-up/face-down behavior from the Card class, and
* provides methods for accessing card information and displaying
* the card.
*
* Originally developed as part of a university programming project
* under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
*/
 
 
 

//This class creates the playing card object
public class PlayingCard extends Card {


    // Variables for PlayingCard, used in PlayingCard Constuctor
    private PlayingCardSuit suit;
    private int card_rank;
    private int card_points;





    //Constuctor, creates card to use
    public PlayingCard(PlayingCardSuit suit, int card_rank, int card_points, boolean faceUp) {
        super(faceUp);
        this.suit = suit;
        this.card_rank = card_rank;
        this.card_points = card_points;
    }

    //Getter for card_rank
    public int getCardRank() {
        return card_rank;
    }

    //Getter for card_points
    public int getCardPoints() {
        return card_points;
    }

    //Setter for card_points
    public void setCardPoints(int points) {
        card_points = points;
    }





    //Coverts Playing Card to String print out
    public String toString() {
        String str = "";
        String string_rank = "";

        //Convert card rank
        switch (card_rank) {
            case 1:
                string_rank = "Ace";
                break;
            case 11:
                string_rank = "Jack";
                break;
            case 12:
                string_rank = "Queen";
                break;
            case 13:
                string_rank = "King";
                break;
            default:
                string_rank = Integer.toString(card_rank);
        }

        //Check if PlayingCard is facing up, (abstact class Card variable faceUp = true)
        if (isFaceUp()) {
            str = string_rank + " of " + suit;
        } else {
            str = "Card is Face Down";
        }

        return str;
    }






    //Display card, print out toString above
    public void displayCard() {
        System.out.println(toString());
    }

}