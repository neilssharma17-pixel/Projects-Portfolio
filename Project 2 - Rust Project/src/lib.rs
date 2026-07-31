
/*
Author: Neil Sears Sharma 
Class: CS320-01-Fall,2024
Professor: Dr. Nathaniel Lahn
Assignment: Project 3
Version: 1.0

Descripton:
Holds the struct to be used in the main 
as well as it's methods


References: 
I used all of the supplementary material given for stucts
I also refered to the site below for basic rust syntax:
https://doc.rust-lang.org/reference/introduction.html
*/


// Struct is public, but fields are not!
pub struct MyVec<T> {
    buffer: Box<[T]>, // A pointer to an array slice. Dereference it using *buffer.
    length: usize,    // Number of elements added.
}

// The initial value of capacity for a new buffer.
const INITIAL_CAPACITY: usize = 1;





// Helper function to allocate a slice with a given length.
fn alloc_slice_with_length<T: Copy + Default>(length: usize) -> Box<[T]> {
    return vec![T::default(); length].into_boxed_slice()
}



// Create a new MyVec with an initial capacity.
pub fn new<T: Copy + Default>() -> MyVec<T> {
    MyVec {
        buffer: alloc_slice_with_length(INITIAL_CAPACITY),
        length: 0,
    }
}



// Return the element at the given index. Panics on out-of-bounds access.
pub fn element_at<T: Copy>(vec: &MyVec<T>, index: usize) -> T {
    if index >= vec.length {
        panic!("Index out of bounds");
    }
    return vec.buffer[index]
}





// Set the element at the given index to the new value. Panics on out-of-bounds access.
pub fn set<T: Copy>(vec: &mut MyVec<T>, index: usize, new_value: T) {
    if index >= vec.length {
        panic!("Index out of bounds");
    }
    vec.buffer[index] = new_value;
}





// Add a new element to the end of the vector. Resize if necessary.
pub fn push<T: Copy + Default>(vec: &mut MyVec<T>, element: T) {
    // Resize if necessary
    if vec.length == vec.buffer.len() {
        let new_capacity = vec.buffer.len() * 2;
        let mut new_buffer = alloc_slice_with_length::<T>(new_capacity);
        new_buffer[..vec.length].copy_from_slice(&vec.buffer[..vec.length]);
        vec.buffer = new_buffer;
    }

    // Add the new element
    vec.buffer[vec.length] = element;
    vec.length += 1;
}




// Removes and returns the last element. Returns None if empty.
pub fn pop<T: Copy>(vec: &mut MyVec<T>) -> Option<T> {
    if vec.length == 0 {
        return None;
    }
    vec.length -= 1;
    return Some(vec.buffer[vec.length])
}




// Add a new element at the specified index, shifting elements to the right.
pub fn add<T: Copy + Default>(vec: &mut MyVec<T>, element: T, index: usize) {
    if index > vec.length {
        panic!("Index out of bounds");
    }

    if vec.length == vec.buffer.len() {
        let new_capacity = vec.buffer.len() * 2;
        let mut new_buffer = alloc_slice_with_length::<T>(new_capacity);
        new_buffer[..vec.length].copy_from_slice(&vec.buffer[..vec.length]);
        vec.buffer = new_buffer;
    }

    for i in (index..vec.length).rev() {
        vec.buffer[i + 1] = vec.buffer[i];
    }

    vec.buffer[index] = element;
    vec.length += 1;
}




// Removes the element at the specified index, shifting elements to the left.
pub fn remove<T: Copy>(vec: &mut MyVec<T>, index: usize) -> T {
    if index >= vec.length {
        panic!("Index out of bounds");
    }

    let removed_value = vec.buffer[index];
    for i in index..vec.length - 1 {
        vec.buffer[i] = vec.buffer[i + 1];
    }
    vec.length -= 1;
    return removed_value
}





// Returns true if "vec" contains "item".
pub fn contains<T: Copy + Default + Eq>(vec: &MyVec<T>, item: T) -> bool {
    for i in 0..vec.length {
        if vec.buffer[i] == item {
            return true;
        }
    }
    return false
}




// Filters the vector based on the provided filter function in drawing assignment
pub fn filter<T: Copy + Default, F: Fn(T) -> bool>(input: &MyVec<T>, filter: F) -> MyVec<T> {
    let mut filtered_vec = new::<T>();
    for i in 0..input.length {
        if filter(input.buffer[i]) {
            push(&mut filtered_vec, input.buffer[i]);
        }
    }
    return filtered_vec
}




//Added for simplicity, returns vec length for above functions.
pub fn len<T>(vec: &MyVec<T>) -> usize {
    return vec.length
}












//TESTS for lib


#[test]
fn test_new() {
    let vec: MyVec<i32> = new();
    assert_eq!(vec.length, 0);
}

#[test]
fn test_push() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    assert_eq!(vec.length, 1);
    assert_eq!(element_at(&vec, 0), 10);
}

#[test]
fn test_pop() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    assert_eq!(pop(&mut vec), Some(10));
    assert_eq!(pop(&mut vec), None);
}

#[test]
fn test_add() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    add(&mut vec, 20, 0);
    assert_eq!(element_at(&vec, 0), 20);
    assert_eq!(element_at(&vec, 1), 10);
}

#[test]
fn test_remove() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    push(&mut vec, 20);
    let removed = remove(&mut vec, 0);
    assert_eq!(removed, 10);
    assert_eq!(element_at(&vec, 0), 20);
}

#[test]
fn test_contains() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    push(&mut vec, 20);
    assert!(contains(&vec, 10));
    assert!(!contains(&vec, 30));
}

#[test]
fn test_filter() {
    let mut vec: MyVec<i32> = new();
    push(&mut vec, 10);
    push(&mut vec, 20);
    let filtered = filter(&vec, |x| x > 15);
    assert_eq!(filtered.length, 1);
    assert_eq!(element_at(&filtered, 0), 20);
}