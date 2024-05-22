first  set of questions:


Given the following list of male and female  names:
male_names = ['John', 'Michael', 'William', 'David', 'James', 'Joseph', 'Daniel', 'Robert', 'Matthew', 'Anthony']
female_names = ['Mary', 'Jennifer', 'Linda', 'Patricia', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen']


   1. Can you use the insert() method to add the name 'Christopher' at the 5th position in the male names list?"


   2. An empty list in Python is defined using square brackets [] with no elements inside. Here's an example:
    empty_list = []
    Create an empty list called numbers. Then, add the numbers 1, 2, and 3 to the list.
    3. Given the list fruits = ['apple', 'banana', 'cherry'], add 'orange' to the end of the list.
    4. Create a list called colors containing the strings 'red', 'green', 'blue', and 'yellow'. Replace the first two items with 'purple' and 'orange' using slicing.  
    Note: slicing is what we did. example of slicing is colors[3:6]. therefore, the first two items is colors[:2]
    5. Replace the last 4 items of the male_names with 'Anthony' and 'Greg' using slicing.
    6. Replace 'Linda', 'Patricia', 'Elizabeth' with "Amanda" and "Grace".
    7. use the len() function to give me the number of item in the female_names List
    8. Given the list numbers = [1, 2, 3, 4, 5], insert the number 10 at index 2.
    9. Use the extend() method to add the names "Emily", "Charlotte", "Amelia", "Harper", and "Evelyn" to the female_names list.


Before the Second set of questions:
let me explain  append(), remove(), and list concatenation in Python
1. append() method: This method is used to add an element to the end of a list.
    # Example of using append()
    my_list = [1, 2, 3]
    my_list.append(4)
    print(my_list)  # Output: [1, 2, 3, 4]
    
    #another example:
     fruits = ['apple', 'banana', 'cherry']
     fruits.append("Grape")
     print(fruits)   # Output:   ['apple', 'banana', 'cherry','Grape']
In these example, append() adds the integer 4 to the end of the list my_list. and "Grape" to the end of the fruits list


2. the remove() method: This method is used to remove the first occurrence of a specified value from a list.
    # Example of using remove()
    my_list = [1, 2, 3, 4]
    my_list.remove(3)
    print(my_list)  # Output: [1, 2, 4]
    
    #another example:
     fruits = ['apple', 'banana', 'cherry','Grape']
     fruits.remove("cherry")
     print(fruits)   # Output:   ['apple', 'banana', 'Grape']
Here, remove() removes the value 3 from the list my_list, and removes the value "cherry" from the fruits list


3. List Concatenation: This refers to the process of combining two or more lists into a single list.
    # Example of list concatenation
    list1 = [1, 2, 3]
    list2 = [4, 5, 6]
    concatenated_list = list1 + list2
    print(concatenated_list)  # Output: [1, 2, 3, 4, 5, 6]


#another example:
fruits1 = ['apple', 'banana', 'cherry','Grape']
fruits2 = ['orange', 'Pinapple']
my_fruits = fruits1 + fruits2
print(my_fruits)  # output: ['apple', 'banana', 'cherry','Grape','orange', 'Pinapple']


Second set of questions:
    1. Create two empty lists named male_names and female_names.
    2. Add the male names "John", "Michael", "David", "James", and "William" to the male_names list using the append() method.
    3. Add the female names "Emma", "Olivia", "Sophia", "Isabella", and "Mia" to the female_names list using the append() method.
    4. Use the insert() method to add the name "Alexander" to the male_names list at index 2.
    5. Use the extend() method to add the names "Emily", "Charlotte", "Amelia", "Harper", and "Evelyn" to the female_names list.
    6. Access and print the 4th name in the male_names list.
    7. Access and print a slice of the female_names list from index 2 to index 4.
    8. Replace the name "James" in the male_names list with "Daniel" using indexing.
    9. Remove the name "Isabella" from the female_names list using the remove() method.
    10. Use list concatenation to combine the male_names and female_names lists into a single list named all_names.