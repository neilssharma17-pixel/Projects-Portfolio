/*
* Game of War Simulation | Card.java
*
* Author: Jeffrey LaMarche
* Date: May 2024
*
* Abstract base class for all card objects used in the Game of War Simulation. 
*
* Defines cards that will be used in the game. 
* Holds when it face up or face down and chances value when called.
*
* Originally provided as part of a university programming project
* under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
*/



public abstract class Card
{
   /*
   Whether the card is face up or face down. True menas faceUp. 
   */
   private boolean faceUp;     

   /**
    * Value constructor to create cards with specific 
    *  face up value.
    */
   public Card(boolean faceUp)
   {
      this.faceUp = faceUp;
   }

   /**
    * Allows access to determining if the card is face up. 
    * 
    * @return true if the card is face up, false if the card is face down.
    */
   public boolean isFaceUp()
   {
      return faceUp;
   }

   /**
    * Allows setting the card face up value to a different value.
    * 
    * @param faceUp Whether the card is face up or face down.
    */
   public void setFaceUp(boolean faceUp)
   {
      this.faceUp = faceUp;
   }
   
   /**
    * Flips a card from one side to the other.
    */
   public void flipCard()
   {
      faceUp = !faceUp;
   }
   
   /**
    * Displays a card based on which side is showing.
    */
   public abstract void displayCard();

}
