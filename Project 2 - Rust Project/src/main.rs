/*
Author: Neil Sears Sharma 
Class: CS320-01-Fall,2024
Professor: Dr. Nathaniel Lahn
Assignment: Project 3
Version: 1.0

Descripton:
This program merges two stings based on length
it also filters strings for only lower case characters.

References: 
I used all of the supplementary material given for stucts
I also refered to the site below for basic rust syntax:
https://doc.rust-lang.org/reference/introduction.html
*/

//importers
use std::io::{self, Write};
use my_vec::*;
//use my_vec::{element_at, new, push, MyVec, len};


fn main() {
    // Ask for the number of cases
    print!("Enter number of test cases: ");
    io::stdout().flush().unwrap(); 
    
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let t: usize = input.trim().parse().expect("Please enter a valid number");

    // Process each case
    for _ in 0..t {
        // Read the first string: x
        print!("Enter string x: ");
        io::stdout().flush().unwrap(); 
        let mut x = String::new();
        io::stdin().read_line(&mut x).unwrap();
        let x = string_to_vec(x.trim());

        // Read the second string: y
        print!("Enter string y: ");
        io::stdout().flush().unwrap(); 
        let mut y = String::new();
        io::stdin().read_line(&mut y).unwrap();
        let y =  string_to_vec(y.trim());

        // Convert x and y to Vec of U8 and filter them
        let filtered_x = filter(&x, |x| (x as char).is_ascii_lowercase());
        let filtered_y = filter(&y, |x| (x as char).is_ascii_lowercase());

        // Merge the filtered strings
        let merged = merge_strings(&filtered_x, &filtered_y);

        // Convert the merged Vec<u8> back into a string and print it
        let merged_string = String::from_utf8(merged).unwrap();
        println!("Merged string: {}", merged_string);
    }
}




// converst string to vec
fn string_to_vec(s: &str) -> MyVec<u8> {
    let mut vec = new::<u8>(); 
    for ch in s.chars() {
        push(&mut vec, ch as u8); // Push the character as u8 
    }
    return vec
}




// Function to merge the two filtered MyVec<u8>
fn merge_strings(x: &MyVec<u8>, y: &MyVec<u8>) -> Vec<u8> {
    let mut merged = Vec::new(); // Use Vec<u8> instead of MyVec<u8>
    let len_x = len(&x);
    let len_y = len(&y);

    // Interweave characters from both strings
    let min_len = len_x.min(len_y);
    for i in 0..min_len {
        merged.push(element_at(&x, i)); // Push element from x
        merged.push(element_at(&y, i)); // Push element from y
    }

    for i in min_len..len_x {
        merged.push(element_at(&x, i));
    }
    
    for i in min_len..len_y {
        merged.push(element_at(&y, i));
    }

    return merged 
}










//TESTS for Main



// Test for string_to_vec function
#[test]
fn test_string_to_vec() {
    let input = "abc"; 
    let result = string_to_vec(input);


    assert_eq!(len(&result), input.len());


    assert_eq!(element_at(&result, 0), b'a');
    assert_eq!(element_at(&result, 1), b'b');
    assert_eq!(element_at(&result, 2), b'c');
}

#[test]
fn test_string_to_vec_empty() {
    let input = "";
    let result = string_to_vec(input);

    assert_eq!(len(&result), 0);
}







// Test for merge_strings
#[test]
fn test_merge_strings() {
    let mut x = new::<u8>();
    push(&mut x, b'a');
    push(&mut x, b'b');
    push(&mut x, b'c');

    let mut y = new::<u8>();
    push(&mut y, b'1');
    push(&mut y, b'2');
    push(&mut y, b'3');

    let result = merge_strings(&x, &y);

    let mut expected = Vec::new();
    expected.push(b'a');
    expected.push(b'1');
    expected.push(b'b');
    expected.push(b'2');
    expected.push(b'c');
    expected.push(b'3');


    assert_eq!(result.len(), expected.len());


    for i in 0..result.len() {
        assert_eq!(result[i], expected[i]);
    }
}



#[test]
fn test_merge_strings_different_lengths() {
    let mut x = new::<u8>();
    push(&mut x, b'a');
    push(&mut x, b'b');

    let mut y = new::<u8>();
    push(&mut y, b'1');
    push(&mut y, b'2');
    push(&mut y, b'3');
    push(&mut y, b'4');

    let result = merge_strings(&x, &y);

    let mut expected = Vec::new();
    expected.push(b'a');
    expected.push(b'1');
    expected.push(b'b');
    expected.push(b'2');
    expected.push(b'3');
    expected.push(b'4');

    assert_eq!(result.len(), expected.len());

    for i in 0..result.len() {
        assert_eq!(result[i], expected[i]);
    }
}

#[test]
fn test_merge_strings_empty() {
    let x = new::<u8>();
    let y = new::<u8>();

    let result = merge_strings(&x, &y);

    let expected = Vec::new();

    assert_eq!(result.len(), expected.len());

    for i in 0..result.len() {
        assert_eq!(result[i], expected[i]);
    }
}

#[test]
fn test_merge_strings_one_empty() {
    let mut x = new::<u8>();
    push(&mut x, b'a');
    push(&mut x, b'b');

    let y = new::<u8>();

    let result = merge_strings(&x, &y);

    let mut expected = Vec::new();
    expected.push(b'a');
    expected.push(b'b');

    assert_eq!(result.len(), expected.len());

    for i in 0..result.len() {
        assert_eq!(result[i], expected[i]);
    }
}

