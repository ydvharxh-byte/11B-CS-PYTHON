/**
 * OFFICIAL CBSE CLASS XI COMPUTER SCIENCE (2026-27) SYLLABUS DATA
 * UNIT 2: Computational Thinking and Programming - I (45 Marks)
 */

export const syllabusTopics = [
    {
        id: "01",
        number: "01",
        title: "Introduction to Problem-Solving",
        tag: "Problem Solving",
        shortDesc: "Problem analysis, algorithm development, flowcharting, pseudocode, coding, testing, debugging & decomposition.",
        overview: "Problem solving is the process of formulating a problem, finding a solution, and expressing the solution in a form that can be carried out by a computer. It involves clear conceptualization, structured decomposition, and systematic verification.",
        cbseMarks: "Unit 2 Foundation",
        subtopics: [
            "Analyzing the problem to clearly understand input, processing, and output requirements",
            "Developing an algorithm (step-by-step finite sequence of unambiguous instructions)",
            "Coding — translating algorithm into Python programming language",
            "Testing — running the program with sample data to verify correct output",
            "Debugging — detecting and removing syntax, logical, and runtime bugs",
            "Flowcharts — visual representation of algorithmic flow using standard ANSI symbols (Terminal, Process, Decision, I/O, Connector)",
            "Pseudocode — structured informal language for specifying program logic without syntactic constraints",
            "Decomposition — breaking down complex problems into smaller, manageable, independent sub-problems"
        ],
        keywords: ["Algorithm", "Flowchart", "Pseudocode", "Decomposition", "Testing", "Debugging", "Dry Run"],
        sampleCode: `# Example: Algorithm converted to Python
# Problem: Calculate Simple Interest and Total Amount

principal = float(input("Enter principal amount: "))
rate = float(input("Enter annual interest rate (%): "))
time = float(input("Enter time in years: "))

# Processing
interest = (principal * rate * time) / 100
total_amount = principal + interest

# Output
print("Simple Interest:", interest)
print("Total Payable Amount:", total_amount)`,
        suggestedPrograms: [
            "Draw flowchart and write algorithm to find largest among three numbers",
            "Develop pseudocode and program to convert temperature from Celsius to Fahrenheit",
            "Decompose a student grading system into input, computation, and display subroutines"
        ]
    },
    {
        id: "02",
        number: "02",
        title: "Python Programming Basics",
        tag: "Language Fundamentals",
        shortDesc: "Features of Python, Interactive vs Script mode, Character set, Tokens, Variables, l-value/r-value, Comments.",
        overview: "Python is a high-level, interpreted, dynamically typed, and case-sensitive programming language created by Guido van Rossum. It emphasizes code readability and clean syntax.",
        cbseMarks: "Tokens & Basics",
        subtopics: [
            "Introduction to Python & Features (Interpreted, Cross-platform, Free/Open-source, Extensible, Dynamically typed)",
            "Hello World program & structure of a basic Python script",
            "Execution Modes: Interactive mode (Python prompt >>> for immediate execution) vs Script mode (.py files for permanent storage)",
            "Python Character Set (Letters, Digits, Special symbols, Whitespaces, Unicode characters)",
            "Python Tokens (Smallest individual unit in a program):",
            "  • Keywords (Reserved words with special meaning, e.g., if, else, for, while, def, import, True, False, None)",
            "  • Identifiers (Names given to variables, functions; rules: starts with letter/underscore, no keywords, case-sensitive)",
            "  • Literals (Constant values: Numeric, String, Boolean True/False, Special Literal None)",
            "  • Operators (Symbols that perform computations on operands)",
            "  • Punctuators (Symbols for structuring statements: ( ) [ ] { } , : ; ' \" # \\)",
            "Variables, Dynamic Typing & Concept of l-value (target/variable) and r-value (assigned value/expression)",
            "Comments: Single line comments (#) and Multiline comments (triple-quoted strings or multiple #)"
        ],
        keywords: ["Tokens", "Keywords", "Identifiers", "Literals", "Punctuators", "Dynamic Typing", "l-value", "r-value"],
        sampleCode: `# Python Basics Demo
# This is a single line comment

greeting = "Hello, Class 11!" # Variable assignment (greeting is l-value, string is r-value)
count = 5                      # Integer literal

# Displaying greeting multiple times
print(greeting)
print("Let's master Python tokens and syntax!")

# Dynamic typing in action:
x = 100       # x is an int
print(type(x))
x = "Rewari"  # x is now a str
print(type(x))`,
        suggestedPrograms: [
            "Write a Python script to print personal details with formatted separators and ends",
            "Demonstrate dynamic typing by assigning different literal types to a single variable"
        ]
    },
    {
        id: "03",
        number: "03",
        title: "Data Types",
        tag: "Data Modeling",
        shortDesc: "Numbers (int, float, complex), Boolean, Sequences (string, list, tuple), None, Mapping (dict), Mutability.",
        overview: "Data types specify the type of value a variable can store and the set of operations that can be performed on it. Python provides rich built-in core data types categorized as mutable and immutable.",
        cbseMarks: "Core Types & Mutability",
        subtopics: [
            "Numbers Category:",
            "  • Integer (int: signed integers of arbitrary precision, e.g., 42, -99)",
            "  • Floating point (float: fractional numbers with decimal point or scientific notation, e.g., 3.14, -0.001, 2.5e3)",
            "  • Complex (complex: real + imaginary parts in form a + bj, e.g., 3 + 4j)",
            "Boolean (bool: Subtype of integer with two values: True and False)",
            "Sequence Category (Ordered collection of items indexed by integers):",
            "  • String (str: immutable sequence of Unicode characters in quotes)",
            "  • List (list: mutable sequence of arbitrary objects enclosed in [ ])",
            "  • Tuple (tuple: immutable sequence of arbitrary objects enclosed in ( ))",
            "None Data Type (Special constant representing absence of value or null state)",
            "Mapping Category (Key-value pairs with unique, immutable keys):",
            "  • Dictionary (dict: mutable mapping of keys to values enclosed in { })",
            "Mutability vs Immutability:",
            "  • Immutable (Values cannot be altered in-place: int, float, complex, bool, str, tuple)",
            "  • Mutable (Values can be changed in-place without changing object identity: list, dict)"
        ],
        keywords: ["int", "float", "complex", "bool", "str", "list", "tuple", "None", "dict", "Mutable", "Immutable", "id()", "type()"],
        sampleCode: `# Demonstration of Data Types & Mutability

# 1. Numbers & Boolean
age = 16          # int
pi = 3.14159      # float
z = 2 + 3j        # complex
is_active = True  # bool

# 2. Sequences
student_name = "Aarav"          # str (Immutable)
marks = [85, 92, 78, 96]       # list (Mutable)
coordinates = (28.19, 76.62)    # tuple (Immutable)

# 3. Mapping
student_record = {"roll": 101, "name": "Aarav", "marks": 92} # dict (Mutable)

# Mutability test
marks[0] = 90  # Allowed for list (mutable)
print("Updated list:", marks)
# student_name[0] = 'B' # TypeError: 'str' object does not support item assignment`,
        suggestedPrograms: [
            "Check and print the data type and memory identity (using id()) of various literal objects",
            "Demonstrate mutable vs immutable behavior using lists and strings"
        ]
    },
    {
        id: "04",
        number: "04",
        title: "Operators",
        tag: "Core Syntax",
        shortDesc: "Arithmetic, Relational, Logical, Assignment, Augmented, Identity (is, is not), Membership (in, not in).",
        overview: "Operators are special symbols or keywords that trigger specific mathematical, logical, comparison, or identity computations on operands.",
        cbseMarks: "Operators & Precedence",
        subtopics: [
            "Arithmetic Operators: + (Addition), - (Subtraction), * (Multiplication), / (True float division), // (Floor/integer division), % (Modulus/Remainder), ** (Exponentiation/Power)",
            "Relational (Comparison) Operators: ==, !=, <, <=, >, >= (Yield Boolean True/False results)",
            "Logical Operators: and (True if both operands are true), or (True if at least one operand is true), not (Logical inversion)",
            "Assignment Operator: = (Assigns r-value expression to l-value variable)",
            "Augmented (Shorthand) Assignment Operators: +=, -=, *=, /=, //=, %=, **=",
            "Identity Operators: is (Returns True if operands point to the same memory object), is not (Returns True if operands point to different objects)",
            "Membership Operators: in (Returns True if element is found in sequence), not in (Returns True if element is not present in sequence)"
        ],
        keywords: ["Arithmetic", "Relational", "Logical", "Augmented", "is", "is not", "in", "not in", "// vs /", "%"],
        sampleCode: `# Python Operators Comprehensive Demo

a, b = 15, 4

# Arithmetic & Floor Division
print("True Division (a / b):", a / b)    # 3.75
print("Floor Division (a // b):", a // b)  # 3
print("Modulus (a % b):", a % b)           # 3
print("Exponentiation (a ** 2):", a ** 2)  # 225

# Identity vs Equality
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print("list1 == list2:", list1 == list2)   # True (Same values)
print("list1 is list2:", list1 is list2)   # False (Different memory addresses)
print("list1 is list3:", list1 is list3)   # True (Same memory address)

# Membership Operators
fruits = ["apple", "banana", "mango"]
print("'apple' in fruits:", 'apple' in fruits)       # True
print("'orange' not in fruits:", 'orange' not in fruits) # True`,
        suggestedPrograms: [
            "Evaluate complex boolean logic statements combining and, or, and not",
            "Demonstrate difference between '==' (value equality) and 'is' (identity comparison)"
        ]
    },
    {
        id: "05",
        number: "05",
        title: "Expressions, Statements, Type Conversion & I/O",
        tag: "Execution & I/O",
        shortDesc: "Operator precedence, Expression evaluation, Implicit & Explicit type casting, input() & print().",
        overview: "Expressions combine values, variables, and operators to yield a single value. Python evaluates them based on operator precedence and associativity rules, with explicit or implicit type conversions.",
        cbseMarks: "Expression Evaluation & I/O",
        subtopics: [
            "Expressions vs Statements (Expressions evaluate to a value; Statements execute an action)",
            "Operator Precedence Hierarchy: (Parentheses) > ** > (+, - unary) > (*, /, //, %) > (+, - binary) > (<, <=, >, >=, ==, !=) > (is, is not, in, not in) > (not) > (and) > (or)",
            "Evaluation of Complex Arithmetic and Relational Expressions",
            "Type Conversion Categories:",
            "  • Implicit Type Conversion (Type Promotion: Python automatically converts lower precision data type to higher precision, e.g., int + float -> float)",
            "  • Explicit Type Conversion (Type Casting: Programmer forces conversion using built-in functions: int(), float(), str(), bool(), list(), tuple(), etc.)",
            "Accepting Input from Console: input() function (Always returns string value by default, requires type casting for numeric input)",
            "Displaying Output: print() function (Parameters: sep=' ' for custom separators, end='\\n' for custom ending characters)"
        ],
        keywords: ["Precedence", "Associativity", "Implicit Conversion", "Type Casting", "input()", "print()", "sep", "end"],
        sampleCode: `# Input / Output & Type Casting

# Taking numeric inputs from user
num1 = int(input("Enter first integer: "))
num2 = float(input("Enter second float: "))

# Implicit conversion: int + float -> float
result = num1 + num2
print("Implicit conversion result type:", type(result))

# Formatted print using sep and end
print("Value 1:", num1, "Value 2:", num2, sep=" | ")
print("Sum =", result, end=" [Calculation Complete]\\n")

# Explicit string formatting
print(f"Result formatted: {num1} + {num2} = {result:.2f}")`,
        suggestedPrograms: [
            "Evaluate arithmetic expressions with nested parentheses following BODMAS / Python precedence",
            "Accept student details using input() with type conversion and display formatted report card"
        ]
    },
    {
        id: "06",
        number: "06",
        title: "Errors",
        tag: "Debugging & Errors",
        shortDesc: "Syntax errors, Logical errors, Run-time errors with real-world troubleshooting examples.",
        overview: "Errors (bugs) prevent programs from executing properly or generating expected outputs. Understanding the three primary error categories is vital for CBSE theory questions and lab debugging.",
        cbseMarks: "Error Classification",
        subtopics: [
            "Syntax Errors: Occur when rules of Python syntax are violated (e.g., missing colons, misspelled keywords, unmatched parentheses, illegal indentation). Detected by parser before execution.",
            "Logical Errors (Bugs): Occur when the program compiles and runs without crashing, but produces incorrect or unintended results due to flawed algorithmic logic (e.g., using + instead of *, incorrect formula).",
            "Run-time Errors (Exceptions): Occur during execution when an illegal operation is attempted (e.g., division by zero ZeroDivisionError, accessing undefined variable NameError, index out of range IndexError, type mismatch TypeError, value mismatch ValueError)."
        ],
        keywords: ["SyntaxError", "Logical Error", "Run-time Error", "ZeroDivisionError", "NameError", "TypeError", "IndexError", "ValueError"],
        sampleCode: `# Demonstrating the 3 Types of Errors

# 1. SYNTAX ERROR Example (caught before running):
# if True
#     print("Missing colon causes SyntaxError")

# 2. LOGICAL ERROR Example:
# Goal: Calculate Average of two numbers
a = 10
b = 20
wrong_avg = a + b / 2   # Bug! Evaluates to 10 + 10 = 20 due to precedence
correct_avg = (a + b) / 2 # Correct: 15.0
print("Logical error output:", wrong_avg, "| Correct output:", correct_avg)

# 3. RUN-TIME ERROR Example:
try:
    denominator = 0
    val = 100 / denominator
except ZeroDivisionError as err:
    print("Caught Run-time Error:", err)`,
        suggestedPrograms: [
            "Identify and rectify syntax, logical, and runtime errors from given CBSE snippet questions"
        ]
    },
    {
        id: "07",
        number: "07",
        title: "Flow of Control",
        tag: "Control Structure",
        shortDesc: "Indentation, Sequential flow, Conditional (selection) flow, Iterative (repetition) flow.",
        overview: "Flow of control refers to the order in which statements are executed in a program. Python uses indentation to define block scope instead of curly braces.",
        cbseMarks: "Control Constructs",
        subtopics: [
            "Introduction to Flow of Control in computer programs",
            "Indentation: Python's unique block-structuring mechanism (standard 4 spaces per block level; indentation errors)",
            "Sequential Flow: Default execution where statements execute line by line in the order they appear",
            "Conditional (Selection) Flow: Execution path diverges based on evaluation of boolean condition (decision making)",
            "Iterative (Repetition / Looping) Flow: A block of statements executes repeatedly while a condition remains true or for items in a sequence"
        ],
        keywords: ["Indentation", "Sequential", "Conditional", "Iterative", "Block Scope", "Control Flow"],
        sampleCode: `# Demonstration of the 3 Flow of Control types

print("--- 1. SEQUENTIAL FLOW ---")
step1 = "Step A: Read Data"
step2 = "Step B: Process Data"
print(step1)
print(step2)

print("\\n--- 2. CONDITIONAL FLOW ---")
score = 85
if score >= 90:
    print("Grade: A+")
else:
    print("Grade: A")

print("\\n--- 3. ITERATIVE FLOW ---")
for i in range(1, 4):
    print(f"Iteration step {i}")`,
        suggestedPrograms: [
            "Illustrate difference between sequential, conditional, and repetitive code blocks"
        ]
    },
    {
        id: "08",
        number: "08",
        title: "Conditional Statements",
        tag: "Decision Making",
        shortDesc: "if, if-else, if-elif-else statements, flowcharts, absolute value, sorting 3 numbers, divisibility.",
        overview: "Conditional statements allow programs to make decisions and execute specific blocks of code depending on whether specified conditions evaluate to True or False.",
        cbseMarks: "if / elif / else",
        subtopics: [
            "The if statement: executes block only if test condition is True",
            "The if-else statement: provides an alternate block when condition evaluates to False",
            "The if-elif-else statement (Chained conditionals): tests multiple conditions sequentially until one matches",
            "Nested Conditional Statements: if statements inside another if block",
            "Flowchart representations of single-alternative, dual-alternative, and multiple-alternative decisions",
            "Official Suggested Programs:",
            "  • Finding the absolute value of a number",
            "  • Sorting three numbers in ascending/descending order",
            "  • Checking divisibility of a number by another"
        ],
        keywords: ["if", "else", "elif", "Chained Conditionals", "Nested if", "Absolute Value", "Divisibility"],
        sampleCode: `# Program: Sort 3 numbers in ascending order without list methods

a = int(input("Enter first number (a): "))
b = int(input("Enter second number (b): "))
c = int(input("Enter third number (c): "))

if a <= b and a <= c:
    smallest = a
    if b <= c:
        middle, largest = b, c
    else:
        middle, largest = c, b
elif b <= a and b <= c:
    smallest = b
    if a <= c:
        middle, largest = a, c
    else:
        middle, largest = c, a
else:
    smallest = c
    if a <= b:
        middle, largest = a, b
    else:
        middle, largest = b, a

print(f"Ascending order: {smallest} <= {middle} <= {largest}")`,
        suggestedPrograms: [
            "Determine whether an entered year is a Leap Year or not",
            "Calculate electricity bill based on tiered slab rates",
            "Find roots of a quadratic equation (ax^2 + bx + c = 0) and determine their nature"
        ]
    },
    {
        id: "09",
        number: "09",
        title: "Iterative Statements",
        tag: "Loops & Iteration",
        shortDesc: "for loop, range(), while loop, break, continue, nested loops, pattern generation, series, factorial.",
        overview: "Iterative statements (loops) execute a block of code repeatedly as long as a condition is satisfied. Python offers the 'for' loop for definite iteration and 'while' loop for condition-driven iteration.",
        cbseMarks: "Loops & Control Jump",
        subtopics: [
            "The for loop: Iterating over sequences (strings, lists, tuples) or generated numerical ranges",
            "The range() function: syntax range(start, stop[, step]), positive and negative step values",
            "The while loop: repeats block as long as condition evaluates to True; infinite loop prevention",
            "Loop Control Jump Statements:",
            "  • break statement: immediately terminates current loop and transfers control to statement after loop",
            "  • continue statement: skips remainder of current iteration and jumps to the next iteration",
            "Nested Loops: Loops inside loops (outer loop and inner loop execution cycle)",
            "else clause with for and while loops (executes when loop finishes normally without break)",
            "Official Suggested Programs:",
            "  • Pattern generation using nested loops (triangles, pyramids, inverted triangles)",
            "  • Summation of series (e.g., 1 + x + x^2 + ... + x^n)",
            "  • Factorial of a positive integer"
        ],
        keywords: ["for", "while", "range()", "break", "continue", "Nested Loops", "Loop else", "Factorial", "Series"],
        sampleCode: `# Program: Factorial of a number and Pattern Generation

# 1. Factorial Calculation using while loop
n = 5
fact = 1
temp = n
while temp > 1:
    fact *= temp
    temp -= 1
print(f"Factorial of {n} = {fact}")

# 2. Pattern Generation using nested for loops
# Output:
# *
# * *
# * * *
# * * * *
rows = 4
print("\\nGenerated Pattern:")
for i in range(1, rows + 1):
    for j in range(i):
        print("*", end=" ")
    print()`,
        suggestedPrograms: [
            "Compute sum of series: S = 1 - x + x^2 - x^3 + ... + (-1)^n * x^n",
            "Check whether a given number is Prime or Composite using for-else",
            "Generate Fibonacci series up to n terms"
        ]
    },
    {
        id: "10",
        number: "10",
        title: "Strings",
        tag: "Sequences & Text",
        shortDesc: "Operations, Slicing, Traversing, plus all 22 official built-in string methods.",
        overview: "Strings are immutable sequences of Unicode characters enclosed in single, double, or triple quotes. Python provides rich slicing capabilities and a comprehensive set of string manipulation methods.",
        cbseMarks: "String Slicing & Methods",
        subtopics: [
            "String Operations: Concatenation (+), Repetition (*), Membership (in, not in), Comparison (lexicographical)",
            "String Indexing: Positive (0 to len-1) and Negative (-1 to -len) indexing",
            "String Slicing: syntax string[start : stop : step], reversing strings using [::-1]",
            "Traversing a string using for loop and while loop",
            "Immutability of Strings (cannot modify character in-place)",
            "All 22 Official Built-in Functions / Methods:"
        ],
        builtInMethods: [
            "len()", "capitalize()", "title()", "lower()", "upper()", "count()",
            "find()", "index()", "endswith()", "startswith()", "isalnum()",
            "isalpha()", "isdigit()", "islower()", "isupper()", "isspace()",
            "lstrip()", "rstrip()", "strip()", "replace()", "join()",
            "partition()", "split()"
        ],
        keywords: ["String Slicing", "Immutable", "Concatenation", "partition() vs split()", "find() vs index()", "strip()", "isalnum()"],
        sampleCode: `# Comprehensive String Slicing and Method Demonstrations

text = "  Kendriya Vidyalaya Rewari - Python Hub  "

# Strip whitespaces
clean_text = text.strip()
print("Clean text:", clean_text)

# Slicing
print("First 8 chars:", clean_text[:8])
print("Reversed string:", clean_text[::-1])

# String Methods
print("Uppercase:", clean_text.upper())
print("Title Case:", clean_text.title())
print("Count of 'a':", clean_text.lower().count('a'))
print("Starts with 'Kendriya':", clean_text.startswith('Kendriya'))

# split vs partition
words = clean_text.split(" ")
print("split() words list:", words)

part = clean_text.partition("-")
print("partition() 3-tuple:", part)`,
        suggestedPrograms: [
            "Check if an entered string is a Palindrome (case-insensitive and ignoring spaces)",
            "Count number of vowels, consonants, digits, and special characters in a line of text",
            "Replace all occurrences of a word with another word without using replace()"
        ]
    },
    {
        id: "11",
        number: "11",
        title: "Lists",
        tag: "Mutable Sequences",
        shortDesc: "Indexing, Slicing, Traversing, Nested lists, Linear search, Min/Max/Mean & all 15 official methods.",
        overview: "Lists are ordered, mutable sequences that can store heterogeneous data types. They support indexing, slicing, nested lists, and extensive built-in manipulation methods.",
        cbseMarks: "Lists & Algorithms",
        subtopics: [
            "Introduction to Lists, creating empty and initialized lists",
            "Indexing and Slicing (Positive and Negative indexes)",
            "List Operations: Concatenation (+), Repetition (*), Membership (in, not in)",
            "Traversing a list using loops (by elements and by index using range(len()))",
            "Nested Lists (Matrices / 2D grids and multidimensional indexing)",
            "List Mutability (Item assignment, in-place modifications)",
            "All 15 Official Functions / Methods:"
        ],
        builtInMethods: [
            "len()", "list()", "append()", "extend()", "insert()", "count()",
            "index()", "remove()", "pop()", "reverse()", "sort()", "sorted()",
            "min()", "max()", "sum()"
        ],
        keywords: ["Mutable", "append() vs extend()", "pop() vs remove()", "sort() vs sorted()", "Linear Search", "Nested List"],
        sampleCode: `# List Operations, Methods, and Linear Search

numbers = [45, 12, 89, 34, 67, 23]

# Methods
numbers.append(100)       # Adds 100 at end
numbers.insert(2, 50)     # Inserts 50 at index 2
numbers.remove(12)        # Removes value 12
popped_item = numbers.pop() # Removes and returns last item

print("Modified list:", numbers)
print(f"Max: {max(numbers)}, Min: {min(numbers)}, Sum: {sum(numbers)}")
print(f"Mean: {sum(numbers) / len(numbers):.2f}")

# Linear Search Implementation
target = 89
found_index = -1
for i in range(len(numbers)):
    if numbers[i] == target:
        found_index = i
        break

if found_index != -1:
    print(f"Element {target} found at index {found_index}")
else:
    print("Element not found")`,
        suggestedPrograms: [
            "Find maximum and minimum values in a list without using max() and min()",
            "Calculate mean of numeric values in a list",
            "Perform Linear Search on an array/list of integers",
            "Count frequency of each distinct element in a list",
            "Swap elements at even and odd positions in a list"
        ]
    },
    {
        id: "12",
        number: "12",
        title: "Tuples",
        tag: "Immutable Sequences",
        shortDesc: "Indexing, Slicing, Tuple assignment, Nested tuples, and all 8 official built-in functions.",
        overview: "Tuples are immutable sequences of Python objects enclosed in parentheses. They provide read-only data integrity, faster iteration, and can serve as dictionary keys.",
        cbseMarks: "Tuples & Immutability",
        subtopics: [
            "Introduction to Tuples, single-element tuple syntax (e.g., t = (5,))",
            "Indexing and Slicing of Tuples",
            "Tuple Operations: Concatenation (+), Repetition (*), Membership (in, not in)",
            "Tuple Assignment (Unpacking: a, b, c = (10, 20, 30))",
            "Nested Tuples",
            "Immutability of Tuples (advantages over lists: write-protection, hashing)",
            "All 8 Official Functions / Methods:"
        ],
        builtInMethods: [
            "len()", "tuple()", "count()", "index()", "sorted()", "min()", "max()", "sum()"
        ],
        keywords: ["Tuple", "Immutable", "Tuple Unpacking", "Single Element Tuple", "count()", "index()", "sorted()"],
        sampleCode: `# Tuple Creation, Packing, Unpacking, and Methods

# Single element tuple requires a trailing comma
single_tup = (42,)
print("Type of single_tup:", type(single_tup))

# Tuple packing & unpacking
student_data = (101, "Sneha Sharma", 94.5, "Rewari")
roll, name, marks, city = student_data
print(f"Unpacked: Roll={roll}, Name={name}, Marks={marks}, City={city}")

# Built-in functions on numeric tuple
score_tuple = (78, 92, 85, 92, 64, 99, 88)
print("Count of 92:", score_tuple.count(92))
print("Index of 64:", score_tuple.index(64))
print("Maximum score:", max(score_tuple))
print("Minimum score:", min(score_tuple))
print("Mean score:", sum(score_tuple) / len(score_tuple))

# sorted() returns a NEW sorted list, leaving original tuple unchanged
sorted_scores = sorted(score_tuple)
print("Sorted scores (list):", sorted_scores)`,
        suggestedPrograms: [
            "Find the maximum, minimum, and average marks from a tuple of student scores",
            "Search for an element in a tuple using Linear Search",
            "Count frequency of all elements in a given tuple"
        ]
    },
    {
        id: "13",
        number: "13",
        title: "Dictionaries",
        tag: "Key-Value Mappings",
        shortDesc: "Keys, Mutability, Traversing, Student/Employee dictionaries & all 18 official dictionary methods.",
        overview: "Dictionaries are mutable mappings consisting of key-value pairs enclosed in curly braces. Keys must be unique and immutable (strings, numbers, tuples), while values can be of any data type.",
        cbseMarks: "Mappings & Dict Methods",
        subtopics: [
            "Introduction to Dictionaries and Key-Value mapping concept",
            "Accessing items using keys (dict[key] vs dict.get(key))",
            "Mutability of Dictionaries (Adding new keys, Modifying existing values)",
            "Traversing a dictionary (by keys, values, and items)",
            "Dictionary key constraints (Keys must be immutable and unique)",
            "All 18 Official Functions / Methods / Keywords:"
        ],
        builtInMethods: [
            "len()", "dict()", "keys()", "values()", "items()", "get()",
            "update()", "del", "clear()", "fromkeys()", "copy()", "pop()",
            "popitem()", "setdefault()", "max()", "min()", "sorted()"
        ],
        keywords: ["dict", "Key-Value", "Mapping", "keys()", "values()", "items()", "get()", "update()", "pop()", "popitem()"],
        sampleCode: `# Comprehensive Dictionary Operations Demo

# Create employee / student records dictionary
students = {
    "101": {"name": "Aarav Sharma", "marks": 94},
    "102": {"name": "Diya Verma", "marks": 88},
    "103": {"name": "Kabir Rao", "marks": 96}
}

# Adding and modifying
students["104"] = {"name": "Meera Joshi", "marks": 91}
students["102"]["marks"] = 90

# Safe access with get()
print("Roll 101 data:", students.get("101"))
print("Roll 105 (non-existent):", students.get("105", "Student Not Found"))

# Traversing with items()
print("\\n--- Student Records ---")
for roll, info in students.items():
    print(f"Roll: {roll} | Name: {info['name']} | Marks: {info['marks']}")

# Character Frequency Counter Program
sentence = "kendriya vidyalaya rewari"
freq = {}
for char in sentence:
    if char != " ":
        freq[char] = freq.get(char, 0) + 1
print("\\nCharacter Frequencies:", freq)`,
        suggestedPrograms: [
            "Count the frequency of each character in a given string using a dictionary",
            "Create an employee dictionary to store names and salaries, search and display records",
            "Store student roll numbers, names, and marks; find the class topper"
        ]
    },
    {
        id: "14",
        number: "14",
        title: "Python Modules",
        tag: "Standard Library",
        shortDesc: "Importing modules, math (pi, e, sqrt, ceil, floor, etc.), random, and statistics modules.",
        overview: "A module is a Python file containing function definitions, constants, and variables that can be reused across programs. Python includes standard built-in modules for mathematics, pseudo-random generation, and statistical calculations.",
        cbseMarks: "Modules & Library Functions",
        subtopics: [
            "Concept of Python Modules & Modular Programming",
            "Importing syntax: 'import <module>' and 'from <module> import ...'",
            "Renaming modules using alias: 'import <module> as <alias>'",
            "Math Module Functions & Constants:",
            "  • Constants: pi (3.14159...), e (2.71828...)",
            "  • Functions: sqrt(x), ceil(x), floor(x), pow(x, y), fabs(x), sin(x), cos(x), tan(x)",
            "Random Module Functions:",
            "  • random() — returns random float in range [0.0, 1.0)",
            "  • randint(a, b) — returns random integer in range [a, b] inclusive",
            "  • randrange([start,] stop[, step]) — returns randomly selected element from range",
            "Statistics Module Functions:",
            "  • mean(data) — arithmetic mean (average) of data",
            "  • median(data) — middle value of data set",
            "  • mode(data) — single most common data point"
        ],
        builtInMethods: [
            "math.pi", "math.e", "math.sqrt()", "math.ceil()", "math.floor()", "math.pow()", "math.fabs()", "math.sin()", "math.cos()", "math.tan()",
            "random.random()", "random.randint()", "random.randrange()",
            "statistics.mean()", "statistics.median()", "statistics.mode()"
        ],
        keywords: ["Module", "import", "math", "random", "statistics", "ceil vs floor", "randint vs randrange", "mean", "median", "mode"],
        sampleCode: `# Python Standard Modules Demonstration

import math
import random
import statistics

# 1. Math Module
radius = 7
area = math.pi * math.pow(radius, 2)
print(f"Area of circle (r={radius}): {area:.2f}")
print("math.ceil(4.2):", math.ceil(4.2))    # 5
print("math.floor(4.8):", math.floor(4.8))  # 4
print("math.sqrt(144):", math.sqrt(144))    # 12.0

# 2. Random Module
dice_roll = random.randint(1, 6) # Generates 1, 2, 3, 4, 5, or 6
lucky_number = random.randrange(10, 100, 5) # 10, 15, 20... up to 95
print(f"Simulated Dice Roll: {dice_roll}")
print(f"Random Step Value: {lucky_number}")

# 3. Statistics Module
class_marks = [78, 85, 92, 85, 90, 85, 94]
print("Mean:", statistics.mean(class_marks))
print("Median:", statistics.median(class_marks))
print("Mode:", statistics.mode(class_marks))`,
        suggestedPrograms: [
            "Simulate a 6-sided dice roll game using random.randint()",
            "Calculate area of a triangle given three sides using Heron's formula and math.sqrt()",
            "Compute mean, median, and mode for student test scores using statistics module"
        ]
    }
];
