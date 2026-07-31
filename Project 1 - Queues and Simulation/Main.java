/*
* CS220 Project 2 - Queues and Simulation
* Main.java
*
* Author: Neil S. Sharma
* Date: May 2024
*
* Main for the Game of War Simulation application.
*
* Intizilzes the game, also displays the text menu interface 
* for the user to run shuffled or unshuffled simulations 
* with a specified number of standard decks.
*
* Originally provided as part of a university programming project
* Under Professor Jeffrey LaMarche, Radford University, CS220 2024
*/
 
 

//This main loads a text menu which can run the simulation
import java.util.Scanner;
public class Main
{

   public static void main(String[] args)
   {
   //variables and objects
   SimulateGameOfWar war;
   Scanner myObj = new Scanner(System.in);     
   
   //begining print statment
   System.out.println("Welcome to the Game of War Simulator 1.0!");
   System.out.println("By: Neil S. Sharma");
   System.out.println("CLass: Principles of Computer Science II");
   
    System.out.println("\n");
   
   for(int i = 1; i > 0; i ++) {
      //print menu
      System.out.println("Game of War Simulation Main Menu: ");
      System.out.println("-----------------------------------------");
      System.out.println("1. Simulate a Game of War (Unshuffled)");
      System.out.println("2. Simulate a Game of War (Shuffled)");
      System.out.println("3. Quit Program");
      System.out.println("-----------------------------------------");
      
      
      //loops selection input
      for(int j = 1; j > 0; j ++) {
         //choose from menu
         int shufflecheck = -1;                        
         do {
            try {
                System.out.print("Enter selection (1 - 3): ");
                shufflecheck = myObj.nextInt();
                } 
            catch (Exception e) {
                System.out.println("ERROR: Invalid choice!");
                }
                myObj.nextLine();
                } while (shufflecheck <= 0 || 4 <= shufflecheck );
                  

         
         
         
         //run unshuffled game
         if(shufflecheck == 1){
                 int decknumber = -1;
                 do {
                 try {
                     System.out.print("Enter the number of decks to use: ");
                     decknumber = myObj.nextInt();
                     } 
                 catch (Exception e) {
                     System.out.println("ERROR: Invalid choice!");
                     }
                     myObj.nextLine();
                 } while (decknumber <= -1);

                   war =  new SimulateGameOfWar(false, decknumber);
                   war.runSimulation();
                 }
                 
         
         
         
         
         
         //run shuffled game
         else if(shufflecheck == 2){
                 int decknumber = -1;
                 do {
                 try {
                     System.out.print("Enter the number of decks to use: ");
                     decknumber = myObj.nextInt();
                     } 
                 catch (Exception e) {
                     System.out.println("ERROR: Invalid choice!");
                     }
                     myObj.nextLine();
                 } while (decknumber <= -1);

                   war =  new SimulateGameOfWar(true, decknumber);
                   war.runSimulation();
                 }
         
         
         
         //Quit Program
         else if(shufflecheck == 3){
            System.out.println("Thanks for using the Game of War Simulator 1.0!");  
            System.exit(0);  
         }
         System.out.println("\n");  
         break; 
      }
      
      }

}
}