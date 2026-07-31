/*
 * Game of War Simulation | PlayingCardQueue.java
 *
 * Author: Neil S. Sharma
 * Date: May 2024
 *
 * Implements a custom queue data structure using a singly linked list of PlayingCardNode objects.
 *
 * Provides operations for adding cards to the back of the queue,
 * removing cards from the front, checking if the
 * queue is empty, and tracking the number of cards currently stored.
 *
 * Originally developed as part of a university programming project
 * under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
 */
 
 
 
 

public class PlayingCardQueue {

    //Pointers and varibales
    private PlayingCardNode queueFront;
    private PlayingCardNode queueBack;
    private int numberOfCards;






    //Constructor for PlayingCardQueue
    public PlayingCardQueue() {
        queueFront = null;
        queueBack = null;
        numberOfCards = 0;
    }






    //Queue functions
    //Get number of cards in queue
    public int getNumberOfCardsInQueue() {
        return numberOfCards;
    }

    //Check if queue is empty
    public boolean isQueueEmpty() {
        if (queueFront == null) {
            return true;
        } else {
            return false;
        }
    }

    //Remove card from queue
    public PlayingCard dequeueCard() {
        PlayingCard card = null;

        if (isQueueEmpty()) {
            card = null;
        } else {
            card = queueFront.getCard();
            queueFront = queueFront.getNextNode();
            numberOfCards = (numberOfCards - 1);
        }

        return card;
    }

    //Put card into queue
    public boolean enqueueCard(PlayingCard card) {

        if (card != null) {
            PlayingCardNode node = new PlayingCardNode(card);

            if (isQueueEmpty()) {
                queueFront = node;
                queueBack = node;
            } else {
                queueBack.setNextNode(node);
                queueBack = node;
            }

            numberOfCards = (numberOfCards + 1);
            return true;
        } else {
            return false;
        }
    }

}