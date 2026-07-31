/*
* Game of War Simulation | PlayingCardNode.java
*
* Author: Jeffrey LaMarche
* Date: May 2024
*
* Represents a node in a singly linked list used to implement the custom PlayingCardQueue.
*
* Each node stores a PlayingCard object and a reference to the next node in the queue,
* providing the foundation for the queue data structure used by the simulation.
*
* Originally provided as part of a university programming project
* under Professor Jeffrey LaMarche, Radford University, CS220 (2024).
*/
 
 
public class PlayingCardNode
{
    private PlayingCard card;
    private PlayingCardNode nextNode;

    /**
     * The default constructor for a PlayingCardNode. A default node is setup
     * such that the data and next link are both null values.
     */
    public PlayingCardNode()
    {
        card = null;
        nextNode = null;
    }

    /**
     * A constructor that allows setting the card value for a newly created
     * node. The next link will be set to null.
     * 
     * @param card PlayingCard object reference, which could be null.
     */
    public PlayingCardNode(PlayingCard card)
    {
        this.card = card;
        nextNode = null;
    }

    /**
     * Allows access to the PlayingCard object reference stored in a node.
     * 
     * @return Reference to a PlayingCard object, which could be null.
     */
    public PlayingCard getCard()
    {
        return card;
    }

    /**
     * Allows access to the next link reference stored in a node.
     * 
     * @return Reference to a PlayingCardNode object, which could be null.
     */
    public PlayingCardNode getNextNode()
    {
        return nextNode;
    }

    /**
     * Allows setting the PlayingCard object reference to a new value.
     * 
     * @param card PlayingCard object reference, which could be null.
     */
    public void setCard(PlayingCard card)
    {
        this.card = card;
    }

    /**
     * Allows setting the next link in the PlayingCardNode.
     * 
     * @param nextNode PlayingCardNode object reference, which could be null.
     */
    public void setNextNode(PlayingCardNode nextNode)
    {
        this.nextNode = nextNode;
    }
    
}
