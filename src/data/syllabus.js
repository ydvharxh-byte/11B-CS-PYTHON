/**
 * OFFICIAL CBSE CLASS XI COMPUTER SCIENCE (CODE 083) SYLLABUS DATA
 * Academic Session: 2026-27
 * 
 * Complete Unit-Wise Coverage:
 * Unit 1: Computer Systems and Organisation (10 Marks)
 * Unit 2: Computational Thinking and Programming - I (45 Marks)
 * Unit 3: Society, Law and Ethics (15 Marks)
 * Practical Examination (30 Marks)
 */

export const syllabusOverview = {
    subject: "Computer Science",
    subjectCode: "083",
    class: "XI",
    session: "2026-27",
    totalTheoryMarks: 70,
    totalPracticalMarks: 30,
    units: [
        {
            unitNumber: 1,
            title: "Computer Systems and Organisation",
            marks: 10,
            periods: { theory: 10, practical: 10 },
            shortDesc: "Basic computer organization, memory units, boolean logic, number systems & encoding schemes."
        },
        {
            unitNumber: 2,
            title: "Computational Thinking and Programming - I",
            marks: 45,
            periods: { theory: 45, practical: 35 },
            shortDesc: "Problem solving, Python basics, operators, control flow, strings, lists, tuples, dicts & modules."
        },
        {
            unitNumber: 3,
            title: "Society, Law and Ethics",
            marks: 15,
            periods: { theory: 15, practical: 0 },
            shortDesc: "Digital footprints, cyber safety, data protection, IPR, open source licenses & Indian IT Act."
        }
    ]
};

export const syllabusTopics = [
    // ==========================================
    // UNIT 1: COMPUTER SYSTEMS AND ORGANISATION (10 MARKS)
    // ==========================================
    {
        id: "cs-01",
        unitNumber: 1,
        unitTitle: "Unit 1: Computer Systems and Organisation",
        category: "computer-systems",
        number: "U1-01",
        title: "Basic Computer Organisation",
        tag: "Computer Hardware & Architecture",
        shortDesc: "Hardware, software, CPU, ALU, CU, registers, input/output devices, memory hierarchy & system buses.",
        overview: "A computer system is an integrated set of hardware and software components that processes raw data into meaningful information according to instructions. The central processing unit (CPU) interacts with primary and secondary memory via system buses.",
        cbseMarks: "Unit 1 (10 Marks)",
        subtopics: [
            "Introduction to computer system components: Hardware vs Software",
            "Central Processing Unit (CPU): Arithmetic Logic Unit (ALU), Control Unit (CU), and CPU Registers",
            "System Buses: Address Bus, Data Bus, and Control Bus",
            "Input Devices: Keyboard, Mouse, Scanner, MICR, OCR, Barcode Reader",
            "Output Devices: Monitor (LED/LCD), Printers (Impact vs Non-impact), Plotters, Speakers",
            "Mobile System Organisation: Mobile Processor, Display Subsystem, Camera Subsystem, Power Management Subsystem",
            "Memory Hierarchy: Registers, Cache Memory (L1, L2, L3), Primary Memory (RAM & ROM), Secondary Storage (HDD, SSD, Flash drive)"
        ],
        keywords: ["CPU", "ALU", "Control Unit", "System Bus", "RAM", "ROM", "Cache", "SSD", "Mobile Architecture"],
        sampleCode: `# Python representation of Computer Memory Units Conversion
def bytes_to_human_readable(bytes_count):
    units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
    idx = 0
    val = float(bytes_count)
    while val >= 1024 and idx < len(units) - 1:
        val /= 1024.0
        idx += 1
    return f"{val:.2f} {units[idx]}"

sample_ram = 16 * (1024 ** 3)  # 16 GB in bytes
print("RAM Size in Bytes:", sample_ram)
print("Human Readable:", bytes_to_human_readable(sample_ram))`,
        sampleOutput: "RAM Size in Bytes: 17179869184\nHuman Readable: 16.00 GB",
        suggestedPrograms: [
            "Write a Python script to convert memory units from bits to Megabytes and Gigabytes",
            "Create a program that calculates storage required for a given number of audio/video files"
        ]
    },
    {
        id: "cs-02",
        unitNumber: 1,
        unitTitle: "Unit 1: Computer Systems and Organisation",
        category: "computer-systems",
        number: "U1-02",
        title: "Types of Software & System Utilities",
        tag: "System & Application Software",
        shortDesc: "System software, OS functions, language translators (assembler, compiler, interpreter), application software & utilities.",
        overview: "Software is a collection of programs, procedures, and documentation that tells the computer hardware what tasks to perform. Software is classified into System Software and Application Software.",
        cbseMarks: "Unit 1 (10 Marks)",
        subtopics: [
            "System Software: Operating System (OS), Device Drivers, and System Utilities",
            "Functions of Operating System: Processor management, Memory management, File management, Device management",
            "Language Processors / Translators:",
            "  • Assembler (translates assembly language to machine code)",
            "  • Compiler (translates entire high-level code to machine code in one go)",
            "  • Interpreter (translates high-level code line-by-line, e.g., Python)",
            "Application Software: General purpose (Word processors, Spreadsheets) vs Specific purpose (Custom billing, School management)",
            "System Utilities: Antivirus software, Disk defragmenters, Compression tools (ZIP), Backup utilities"
        ],
        keywords: ["Operating System", "Compiler", "Interpreter", "Device Driver", "Utility Software"],
        sampleCode: `# Python script demonstrating Interpreter vs Compiler concepts
import sys
print("Python Version:", sys.version.split()[0])
print("Platform:", sys.platform)
print("Byteorder:", sys.byteorder)`,
        sampleOutput: "Python Version: 3.12.0\nPlatform: win32\nByteorder: little",
        suggestedPrograms: [
            "Display system configuration and Python interpreter specifications using sys and os modules"
        ]
    },
    {
        id: "cs-03",
        unitNumber: 1,
        unitTitle: "Unit 1: Computer Systems and Organisation",
        category: "computer-systems",
        number: "U1-03",
        title: "Boolean Logic & Logic Gates",
        tag: "Digital Electronics",
        shortDesc: "NOT, AND, OR, NAND, NOR, XOR, XNOR truth tables, Boolean laws & De Morgan's Theorems.",
        overview: "Boolean logic deals with binary variables that have two states: TRUE (1) and FALSE (0). It forms the fundamental theoretical foundation for digital computer circuitry.",
        cbseMarks: "Unit 1 (10 Marks)",
        subtopics: [
            "Introduction to Boolean algebra and binary states (True=1, False=0)",
            "Basic Logic Gates: NOT (Inverter), AND (Conjunction), OR (Disjunction)",
            "Universal Logic Gates: NAND (NOT-AND) and NOR (NOT-OR)",
            "Special Logic Gates: XOR (Exclusive-OR) and XNOR (Equivalence)",
            "Truth Tables for 2-input and 3-input Boolean functions",
            "Basic Boolean Laws: Identity, Dominance, Idempotence, Complementarity, Commutative, Associative, Distributive",
            "De Morgan's First Law: (A + B)' = A' . B'",
            "De Morgan's Second Law: (A . B)' = A' + B'",
            "Simplification of Boolean expressions and circuit diagram realization"
        ],
        keywords: ["Boolean Logic", "Truth Table", "Logic Gates", "Universal Gates", "De Morgan's Laws"],
        sampleCode: `# Verification of De Morgan's Law using Python Boolean Logic
print("A  B | (A or B)' | (not A and not B) | Law 1 Holds?")
print("-" * 48)
for A in [False, True]:
    for B in [False, True]:
        lhs = not (A or B)
        rhs = (not A) and (not B)
        print(f"{int(A)}  {int(B)} |    {int(lhs)}    |         {int(rhs)}        | {lhs == rhs}")`,
        sampleOutput: "A  B | (A or B)' | (not A and not B) | Law 1 Holds?\n------------------------------------------------\n0  0 |    1    |         1        | True\n0  1 |    0    |         0        | True\n1  0 |    0    |         0        | True\n1  1 |    0    |         0        | True",
        suggestedPrograms: [
            "Write a Python program to generate the complete truth table for XOR and XNOR gates",
            "Verify De Morgan's Second Law: not (A and B) == (not A or not B)"
        ]
    },
    {
        id: "cs-04",
        unitNumber: 1,
        unitTitle: "Unit 1: Computer Systems and Organisation",
        category: "computer-systems",
        number: "U1-04",
        title: "Number Systems & Encoding Schemes",
        tag: "Number Systems & ASCII",
        shortDesc: "Binary, Octal, Decimal, Hexadecimal conversions & character encoding: ASCII, ISCII, UNICODE.",
        overview: "Computers store and process all instructions and characters in numeric digital format. Number systems define positional notation, while character encoding maps symbols to binary values.",
        cbseMarks: "Unit 1 (10 Marks)",
        subtopics: [
            "Positional Number Systems: Base/Radix concepts",
            "Binary (Base 2: 0, 1), Octal (Base 8: 0–7), Decimal (Base 10: 0–9), Hexadecimal (Base 16: 0–9, A–F)",
            "Conversions between Decimal and Binary, Octal, Hexadecimal",
            "Direct conversions: Binary to Octal (3-bit grouping) and Binary to Hex (4-bit grouping)",
            "Encoding Schemes:",
            "  • ASCII (American Standard Code for Information Interchange: 7-bit, 128 characters)",
            "  • ISCII (Indian Script Code for Information Interchange: 8-bit for Indian scripts)",
            "  • UNICODE: Universal encoding covering all global languages (UTF-8, UTF-16, UTF-32)"
        ],
        keywords: ["Binary", "Octal", "Hexadecimal", "Radix", "ASCII", "ISCII", "UNICODE", "UTF-8"],
        sampleCode: `# Python Number System Conversions
decimal_val = 125

bin_val = bin(decimal_val)  # Binary representation (0b prefix)
oct_val = oct(decimal_val)  # Octal representation (0o prefix)
hex_val = hex(decimal_val)  # Hexadecimal representation (0x prefix)

print(f"Decimal:     {decimal_val}")
print(f"Binary:      {bin_val} (Raw: {bin_val[2:]})")
print(f"Octal:       {oct_val} (Raw: {oct_val[2:]})")
print(f"Hexadecimal: {hex_val} (Raw: {hex_val[2:].upper()})")

# ASCII Ordinal & Character demo
char = 'K'
print(f"Character '{char}' ASCII code: {ord(char)} -> Binary: {bin(ord(char))[2:]}")`,
        sampleOutput: "Decimal:     125\nBinary:      0b1111101 (Raw: 1111101)\nOctal:       0o175 (Raw: 175)\nHexadecimal: 0x7d (Raw: 7D)\nCharacter 'K' ASCII code: 75 -> Binary: 1001011",
        suggestedPrograms: [
            "Build an interactive base converter in Python for Decimal, Binary, Octal, and Hexadecimal",
            "Write a script that prints ASCII values and binary codes for every character in a string"
        ]
    },

    // ==========================================
    // UNIT 2: COMPUTATIONAL THINKING AND PROGRAMMING - I (45 MARKS)
    // ==========================================
    {
        id: "py-01",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "python-basics",
        number: "01",
        title: "Introduction to Problem-Solving",
        tag: "Problem Solving",
        shortDesc: "Problem analysis, algorithm development, flowcharting, pseudocode, coding, testing, debugging & decomposition.",
        overview: "Problem solving is the systematic process of defining a problem, identifying its inputs, constraints, and outputs, developing a step-by-step algorithm, visualizing it with flowcharts, and coding it into a program.",
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
        sampleCode: `# Algorithm to Python Code: Calculate Simple Interest and Amount
principal = float(input("Enter principal amount: "))
rate = float(input("Enter annual interest rate (%): "))
time = float(input("Enter time in years: "))

# Processing
interest = (principal * rate * time) / 100
total_amount = principal + interest

# Output
print(f"Simple Interest: {interest:.2f}")
print(f"Total Payable Amount: {total_amount:.2f}")`,
        sampleOutput: "Enter principal amount: 5000\nEnter annual interest rate (%): 7.5\nEnter time in years: 2\nSimple Interest: 750.00\nTotal Payable Amount: 5750.00",
        suggestedPrograms: [
            "Draw flowchart and write algorithm to find largest among three numbers",
            "Develop pseudocode and program to convert temperature from Celsius to Fahrenheit",
            "Decompose a student grading system into input, computation, and display subroutines"
        ]
    },
    {
        id: "py-02",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "python-basics",
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
greeting = "Hello, Class 11!"
count = 5

print(greeting)
print("Mastering Python tokens and syntax!")

# Dynamic typing in action:
x = 100
print("Value:", x, "| Type:", type(x).__name__)
x = "Kendriya Vidyalaya Rewari"
print("Value:", x, "| Type:", type(x).__name__)`,
        sampleOutput: "Hello, Class 11!\nMastering Python tokens and syntax!\nValue: 100 | Type: int\nValue: Kendriya Vidyalaya Rewari | Type: str",
        suggestedPrograms: [
            "Write a Python script to print student information with custom sep and end parameters",
            "Demonstrate dynamic typing by assigning integer, float, string, and list to the same variable"
        ]
    },
    {
        id: "py-03",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "python-basics",
        number: "03",
        title: "Data Types & Mutability",
        tag: "Data Modeling",
        shortDesc: "Numbers (int, float, complex), Boolean, Sequences (string, list, tuple), None, Mapping (dict), Mutability.",
        overview: "Data types specify the type of value a variable can store and the operations that can be performed on it. Python provides built-in core data types categorized as mutable and immutable.",
        cbseMarks: "Core Types & Mutability",
        subtopics: [
            "Numbers: int (signed integers), float (fractional numbers), complex (real + imaginary)",
            "Boolean: True and False (subtype of integer, 1 and 0)",
            "Sequence Types: String (immutable text), List (mutable ordered collection), Tuple (immutable ordered collection)",
            "Mapping Type: Dictionary (mutable key-value pairs)",
            "Special Type: None (represents absence of value or null state)",
            "Concept of Mutability vs Immutability:",
            "  • Mutable types (can be modified in-place): list, dict, set",
            "  • Immutable types (cannot be modified after creation): int, float, bool, str, tuple",
            "type() and id() functions to inspect data types and memory addresses"
        ],
        keywords: ["int", "float", "complex", "str", "list", "tuple", "dict", "None", "Mutable", "Immutable"],
        sampleCode: `# Demonstrating Mutability vs Immutability in Python
# 1. Immutable integer
a = 10
print(f"Initial a = {a}, id = {id(a)}")
a = a + 5
print(f"Modified a = {a}, new id = {id(a)} (New object created!)")

# 2. Mutable list
my_list = [10, 20, 30]
print(f"Initial list = {my_list}, id = {id(my_list)}")
my_list.append(40)
print(f"Modified list = {my_list}, same id = {id(my_list)} (Modified in-place!)")`,
        sampleOutput: "Initial a = 10, id = ...\nModified a = 15, new id = ... (New object created!)\nInitial list = [10, 20, 30], id = ...\nModified list = [10, 20, 30, 40], same id = ... (Modified in-place!)",
        suggestedPrograms: [
            "Write a program to demonstrate the mutability of lists vs immutability of tuples",
            "Inspect memory identity using id() before and after modifying collections"
        ]
    },
    {
        id: "py-04",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "python-basics",
        number: "04",
        title: "Operators & Expressions",
        tag: "Operators",
        shortDesc: "Arithmetic, Relational, Logical, Assignment, Augmented, Identity (is, is not), Membership (in, not in) & Precedence.",
        overview: "Operators are special symbols that carry out arithmetic, logical, and relational computations. Expressions are combinations of operators, literals, and variables that evaluate to a value.",
        cbseMarks: "Operators & Expressions",
        subtopics: [
            "Arithmetic Operators: + (Addition), - (Subtraction), * (Multiplication), / (True Division), // (Floor Division), % (Modulus), ** (Exponentiation)",
            "Relational / Comparison Operators: ==, !=, >, <, >=, <=",
            "Logical Operators: and, or, not (with short-circuit evaluation rules)",
            "Assignment & Augmented Assignment Operators: =, +=, -=, *=, /=, //=, %=, **=",
            "Identity Operators: is, is not (tests whether two variables point to same memory address)",
            "Membership Operators: in, not in (tests membership in sequences like strings, lists, tuples)",
            "Operator Precedence and Associativity (PEMDAS / BODMAS in Python)"
        ],
        keywords: ["Arithmetic", "Relational", "Logical", "Precedence", "Identity", "Membership", "Augmented"],
        sampleCode: `# Operators in Python
a, b = 17, 5
print(f"a = {a}, b = {b}")
print("True Division (a / b):", a / b)
print("Floor Division (a // b):", a // b)
print("Modulus / Remainder (a % b):", a % b)
print("Exponentiation (a ** 2):", a ** 2)

# Membership test
fruits = ["apple", "mango", "orange"]
print("'mango' in fruits:", 'mango' in fruits)
print("'banana' not in fruits:", 'banana' not in fruits)`,
        sampleOutput: "a = 17, b = 5\nTrue Division (a / b): 3.4\nFloor Division (a // b): 3\nModulus / Remainder (a % b): 2\nExponentiation (a ** 2): 289\n'mango' in fruits: True\n'banana' not in fruits: True",
        suggestedPrograms: [
            "Evaluate arithmetic expressions demonstrating operator precedence: e.g., 2 ** 3 * 4 / 2 + 5",
            "Check if a student's roll number is in a list using the 'in' membership operator"
        ]
    },
    {
        id: "py-05",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "python-basics",
        number: "05",
        title: "Errors: Syntax, Logical & Runtime",
        tag: "Debugging & Error Handling",
        shortDesc: "Syntax errors (parsing bugs), Runtime errors (exceptions during execution) & Logical errors (semantic defects).",
        overview: "Errors (bugs) prevent a program from executing properly or producing correct output. Understanding the three categories of errors is essential for debugging CBSE code questions.",
        cbseMarks: "Error Identification",
        subtopics: [
            "Syntax Errors: Violations of Python grammatical rules detected during parsing (missing colon, mismatched parentheses, misspelled keyword)",
            "Runtime Errors (Exceptions): Errors that occur during program execution (ZeroDivisionError, NameError, TypeError, IndexError, ValueError)",
            "Logical Errors: The program runs without error but produces incorrect output due to flawed algorithm or wrong logic",
            "Common CBSE debugging questions and line-by-line identification techniques"
        ],
        keywords: ["SyntaxError", "RuntimeError", "ZeroDivisionError", "NameError", "TypeError", "Logical Error"],
        sampleCode: `# Common Error Demonstrations in Python
# 1. Runtime Error: ZeroDivisionError (Handled)
try:
    x = 10 / 0
except ZeroDivisionError as e:
    print("Caught Runtime Error:", e)

# 2. Runtime Error: IndexError (Handled)
try:
    nums = [1, 2, 3]
    print(nums[10])
except IndexError as e:
    print("Caught Runtime Error:", e)

# 3. Logical Error Example:
# Goal: Compute average of 10 and 20 (Should be 15)
wrong_avg = 10 + 20 / 2  # Logical bug: Missing parentheses! Evaluates to 20.0
correct_avg = (10 + 20) / 2
print("Wrong Average (Logical bug):", wrong_avg)
print("Correct Average:", correct_avg)`,
        sampleOutput: "Caught Runtime Error: division by zero\nCaught Runtime Error: list index out of range\nWrong Average (Logical bug): 20.0\nCorrect Average: 15.0",
        suggestedPrograms: [
            "Find and fix syntax and runtime errors in given buggy CBSE code snippets",
            "Demonstrate NameError and TypeError through deliberate code examples"
        ]
    },
    {
        id: "py-06",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "control-flow",
        number: "06",
        title: "Conditional Statements (if, if-else, if-elif-else)",
        tag: "Decision Making",
        shortDesc: "Indentation, boolean conditions, if statements, if-else, if-elif-else ladders & nested conditionals.",
        overview: "Conditional statements allow a program to make decisions and execute different blocks of code based on whether a condition evaluates to True or False. Python uses strict indentation (typically 4 spaces) to delimit code blocks.",
        cbseMarks: "Flow of Control",
        subtopics: [
            "The concept of sequential execution vs selective branching",
            "Role of indentation in Python (replacing curly braces { } used in C/C++/Java)",
            "Simple if statement: syntax and execution flow",
            "if-else statement: two-way decision making",
            "if-elif-else ladder: multi-way decision branching",
            "Nested if statements: placing an if statement inside another if or else block",
            "Conditional expressions (ternary operator): value_if_true if condition else value_if_false"
        ],
        keywords: ["if", "elif", "else", "Indentation", "Nested if", "Branching"],
        sampleCode: `# Student Grade Evaluation using if-elif-else
marks = float(input("Enter Computer Science marks (0-100): "))

if marks >= 90:
    grade = "A1 (Outstanding)"
elif marks >= 80:
    grade = "A2 (Excellent)"
elif marks >= 70:
    grade = "B1 (Very Good)"
elif marks >= 60:
    grade = "B2 (Good)"
elif marks >= 33:
    grade = "Pass"
else:
    grade = "Needs Improvement"

print(f"Marks: {marks} | Final Grade: {grade}")`,
        sampleOutput: "Enter Computer Science marks (0-100): 88.5\nMarks: 88.5 | Final Grade: A2 (Excellent)",
        suggestedPrograms: [
            "Find largest among three numbers using nested if-else",
            "Check if a given year is a Leap Year using logical operators",
            "Calculate electricity bill based on graded unit consumption slabs"
        ]
    },
    {
        id: "py-07",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "control-flow",
        number: "07",
        title: "Iteration & Loops (for, while, range)",
        tag: "Repetition & Loops",
        shortDesc: "Definite vs Indefinite loops, for loop, range() function, while loop, loop else clause, infinite loops.",
        overview: "Loops repeat a block of statements multiple times until a condition is satisfied. Python offers the 'for' loop for iterating over sequences and the 'while' loop for condition-controlled repetition.",
        cbseMarks: "Loops & Iteration",
        subtopics: [
            "Concept of iteration and why repetition is essential in computing",
            "Definite loop (for loop) vs Indefinite loop (while loop)",
            "The range([start], stop, [step]) function: default start=0, default step=1, stop is exclusive",
            "Iterating over sequences: strings, lists, tuples with for loop",
            "while loop: initialization, condition checking, body, and update step",
            "Loop 'else' block: executed when the loop completes normally without a 'break'",
            "Preventing infinite loops: ensuring condition variables change towards termination"
        ],
        keywords: ["for", "while", "range()", "Iteration", "Loop Else", "Accumulator"],
        sampleCode: `# Multiplication Table using for and range()
num = int(input("Enter an integer: "))
print(f"--- Table of {num} ---")
for i in range(1, 11):
    print(f"{num} x {i:02d} = {num * i}")

# Sum of digits using while loop
n = 12345
temp = n
digit_sum = 0
while temp > 0:
    digit = temp % 10
    digit_sum += digit
    temp //= 10
print(f"Sum of digits of {n} is: {digit_sum}")`,
        sampleOutput: "Enter an integer: 7\n--- Table of 7 ---\n7 x 01 = 7\n7 x 02 = 14\n7 x 03 = 21\n7 x 04 = 28\n7 x 05 = 35\n7 x 06 = 42\n7 x 07 = 49\n7 x 08 = 56\n7 x 09 = 63\n7 x 10 = 70\nSum of digits of 12345 is: 15",
        suggestedPrograms: [
            "Calculate factorial of a number using while loop",
            "Generate Fibonacci sequence up to N terms using for loop",
            "Check whether a given number is Prime or Composite"
        ]
    },
    {
        id: "py-08",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "control-flow",
        number: "08",
        title: "Loop Jump Statements (break, continue, pass) & Nested Loops",
        tag: "Jump Statements & Patterns",
        shortDesc: "Early termination with break, skipping with continue, placeholder pass & nested loops for patterns.",
        overview: "Jump statements alter the normal linear or iterative flow of control. Nested loops (a loop inside another loop) are widely used for grid traversals, matrix processing, and visual pattern printing.",
        cbseMarks: "Jump Statements & Patterns",
        subtopics: [
            "break statement: immediately terminates the innermost enclosing loop",
            "continue statement: skips the remainder of the current iteration and jumps to the next",
            "pass statement: null operation used as a syntactical placeholder where code is required",
            "Nested loops: outer loop controlling rows and inner loop controlling columns",
            "Pattern generation: right-angled triangles, pyramids, inverted triangles, number patterns"
        ],
        keywords: ["break", "continue", "pass", "Nested Loops", "Pattern Printing"],
        sampleCode: `# Demonstrating break, continue, and pattern printing
print("--- break & continue demo ---")
for i in range(1, 8):
    if i == 3:
        continue  # Skip 3
    if i == 6:
        break     # Stop before 6
    print(i, end=" ")
print("\\n")

# Pattern: Number Pyramid
print("--- Number Triangle Pattern ---")
rows = 5
for i in range(1, rows + 1):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()`,
        sampleOutput: "--- break & continue demo ---\n1 2 4 5 \n\n--- Number Triangle Pattern ---\n1 \n1 2 \n1 2 3 \n1 2 3 4 \n1 2 3 4 5 ",
        suggestedPrograms: [
            "Print inverted star pattern using nested for loops",
            "Search for a target in a list and use break when found, with for-else notification if not found"
        ]
    },
    {
        id: "py-09",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "data-structures",
        number: "09",
        title: "Strings in Python",
        tag: "Sequence Data Structure",
        shortDesc: "Indexing (positive/negative), Slicing [start:stop:step], Concatenation, Repetition & all 22 official methods.",
        overview: "A string in Python is an immutable sequence of Unicode characters enclosed in single, double, or triple quotes. It supports forward (0 to len-1) and backward (-1 to -len) indexing, slicing, and built-in text manipulation methods.",
        cbseMarks: "String Methods & Slicing",
        subtopics: [
            "String creation and quotes usage",
            "Indexing: Positive (from 0 onwards) and Negative (from -1 backwards)",
            "String Slicing: string[start:stop:step] rules and edge cases",
            "String operators: + (concatenation), * (repetition), in/not in (membership)",
            "String Immutability: why str[0] = 'x' raises TypeError",
            "All 22 Official CBSE String Functions & Methods:"
        ],
        builtInMethods: [
            "len()", "title()", "lower()", "upper()", "count()", "find()",
            "index()", "endswith()", "startswith()", "isalnum()", "isalpha()",
            "isdigit()", "islower()", "isupper()", "isspace()", "lstrip()",
            "rstrip()", "strip()", "replace()", "join()", "partition()", "split()"
        ],
        keywords: ["String", "Slicing", "Immutable", "split()", "join()", "replace()", "strip()", "count()", "find()"],
        sampleCode: `# String Operations and Methods
text = "  Kendriya Vidyalaya Rewari  "

# Strip whitespaces and case conversions
clean_text = text.strip()
print("Original:", repr(text))
print("Cleaned:", repr(clean_text))
print("Uppercase:", clean_text.upper())
print("Title Case:", clean_text.title())

# Slicing
school = clean_text[:8]   # 'Kendriya'
city = clean_text[-6:]     # 'Rewari'
print(f"School: '{school}', City: '{city}'")

# Counting vowels in string
vowels = "aeiouAEIOU"
vowel_count = sum(1 for ch in clean_text if ch in vowels)
print(f"Vowel count in '{clean_text}': {vowel_count}")`,
        sampleOutput: "Original: '  Kendriya Vidyalaya Rewari  '\nCleaned: 'Kendriya Vidyalaya Rewari'\nUppercase: KENDRIYA VIDYALAYA REWARI\nTitle Case: Kendriya Vidyalaya Rewari\nSchool: 'Kendriya', City: 'Rewari'\nVowel count in 'Kendriya Vidyalaya Rewari': 10",
        suggestedPrograms: [
            "Check whether a given string is a Palindrome (ignoring spaces and case)",
            "Count number of vowels, consonants, digits, and spaces in a sentence",
            "Replace all occurrences of a word in a sentence without using replace()"
        ]
    },
    {
        id: "py-10",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "data-structures",
        number: "10",
        title: "Lists in Python",
        tag: "Mutable Ordered Sequences",
        shortDesc: "Creation, Indexing, Mutability, Slicing, Traversing, Nested Lists & all 15 official methods.",
        overview: "A list is an ordered, mutable collection of elements enclosed in square brackets [ ]. Lists can store elements of heterogenous data types and support dynamic resizing.",
        cbseMarks: "List Methods & Algorithms",
        subtopics: [
            "Creating lists (empty list, mixed types, list comprehension basics)",
            "Accessing elements via positive and negative indices",
            "Mutability: modifying items, slice assignments",
            "List concatenation (+) and repetition (*)",
            "Linear search and traversal algorithms",
            "All 15 Official CBSE List Functions & Methods:"
        ],
        builtInMethods: [
            "len()", "list()", "append()", "extend()", "insert()", "count()",
            "index()", "remove()", "pop()", "reverse()", "sort()", "sorted()",
            "min()", "max()", "sum()"
        ],
        keywords: ["list", "append()", "extend()", "insert()", "pop()", "remove()", "sort()", "Linear Search"],
        sampleCode: `# List Operations and Methods Demo
marks = [78, 85, 92, 64, 85, 99]

print("Original Marks:", marks)
marks.append(88)             # Adds 88 at end
marks.insert(2, 95)          # Inserts 95 at index 2
print("After append & insert:", marks)

removed = marks.pop()        # Removes last item
print(f"Popped item: {removed}")

# Statistics
print("Class Topper Marks:", max(marks))
print("Lowest Marks:", min(marks))
print("Class Average:", sum(marks) / len(marks))
print("Frequency of 85:", marks.count(85))

# Sorting
marks.sort(reverse=True)     # In-place descending sort
print("Sorted (Descending):", marks)`,
        sampleOutput: "Original Marks: [78, 85, 92, 64, 85, 99]\nAfter append & insert: [78, 85, 95, 92, 64, 85, 99]\nPopped item: 99\nClass Topper Marks: 95\nLowest Marks: 64\nClass Average: 83.16666666666667\nFrequency of 85: 2\nSorted (Descending): [95, 92, 85, 85, 78, 64]",
        suggestedPrograms: [
            "Perform Linear Search to find an element in a user-entered list",
            "Swap the first half of a list with the second half",
            "Find the second largest number in a list of integers"
        ]
    },
    {
        id: "py-11",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "data-structures",
        number: "11",
        title: "Tuples in Python",
        tag: "Immutable Sequences",
        shortDesc: "Creation, Single element tuple (42,), Immutability, Tuple unpacking, Slicing & all 8 methods.",
        overview: "A tuple is an ordered, immutable collection of elements enclosed in parentheses ( ). Once created, elements of a tuple cannot be added, removed, or changed. Tuples provide read-only data integrity.",
        cbseMarks: "Tuple Functions & Unpacking",
        subtopics: [
            "Creating tuples: empty tuple (), single-element tuple (requires trailing comma: (5,)), multiple items",
            "Tuple packing and tuple unpacking (a, b, c = my_tuple)",
            "Immutability of Tuples: why modifying an item raises TypeError",
            "Tuple concatenation and repetition",
            "All 8 Official CBSE Tuple Functions & Methods:"
        ],
        builtInMethods: [
            "len()", "tuple()", "count()", "index()", "sorted()", "min()", "max()", "sum()"
        ],
        keywords: ["tuple", "Immutable", "Trailing Comma", "Unpacking", "count()", "index()"],
        sampleCode: `# Tuple Operations and Unpacking
scores = (78, 92, 85, 92, 64, 99, 88)

print("Scores Tuple:", scores)
print("Count of 92:", scores.count(92))
print("Index of 64:", scores.index(64))
print("Highest Score:", max(scores))
print("Lowest Score:", min(scores))
print("Mean Score:", sum(scores) / len(scores))

# sorted() returns a new sorted list, original tuple remains immutable
sorted_list = sorted(scores)
print("Sorted as list:", sorted_list)

# Tuple Unpacking
student_info = ("Aarav", 101, 95.5)
name, roll, percent = student_info
print(f"Name: {name}, Roll: {roll}, Percentage: {percent}%")`,
        sampleOutput: "Scores Tuple: (78, 92, 85, 92, 64, 99, 88)\nCount of 92: 2\nIndex of 64: 4\nHighest Score: 99\nLowest Score: 64\nMean Score: 85.42857142857143\nSorted as list: [64, 78, 85, 88, 92, 92, 99]\nName: Aarav, Roll: 101, Percentage: 95.5%",
        suggestedPrograms: [
            "Input N numbers from user and store in a tuple; find maximum, minimum, and average",
            "Demonstrate how a list nested inside a tuple can still be modified while the tuple itself is immutable"
        ]
    },
    {
        id: "py-12",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "data-structures",
        number: "12",
        title: "Dictionaries in Python",
        tag: "Key-Value Mappings",
        shortDesc: "Key-value mapping, Keys constraint (immutable), Mutability, Traversing & all 18 methods.",
        overview: "A dictionary is a mutable collection of key-value pairs enclosed in curly braces { }. Keys must be unique and immutable (strings, numbers, tuples), while values can be of any data type.",
        cbseMarks: "Mappings & Dict Methods",
        subtopics: [
            "Introduction to Dictionaries and Key-Value mapping concept",
            "Accessing items: dict[key] vs dict.get(key, default)",
            "Mutability of Dictionaries: adding new keys, modifying existing values",
            "Traversing a dictionary (by keys, by values, by items)",
            "Dictionary key constraints (Keys must be immutable and unique)",
            "All 18 Official CBSE Dictionary Functions / Methods:"
        ],
        builtInMethods: [
            "len()", "dict()", "keys()", "values()", "items()", "get()",
            "update()", "del", "clear()", "fromkeys()", "copy()", "pop()",
            "popitem()", "setdefault()", "max()", "min()", "sorted()"
        ],
        keywords: ["dict", "Key-Value", "Mapping", "keys()", "values()", "items()", "get()", "update()", "pop()"],
        sampleCode: `# Student Database using Dictionary
students = {
    "101": {"name": "Aarav Sharma", "marks": 94},
    "102": {"name": "Diya Verma", "marks": 88},
    "103": {"name": "Kabir Rao", "marks": 96}
}

# Add and update
students["104"] = {"name": "Meera Joshi", "marks": 91}
students["102"]["marks"] = 90

print("--- Student Records ---")
for roll, info in students.items():
    print(f"Roll: {roll} | Name: {info['name']:<15} | Marks: {info['marks']}")

# Character Frequency Counter
text = "kendriya vidyalaya rewari"
freq = {}
for ch in text:
    if ch != " ":
        freq[ch] = freq.get(ch, 0) + 1
print("\\nCharacter Frequencies:", freq)`,
        sampleOutput: "--- Student Records ---\nRoll: 101 | Name: Aarav Sharma   | Marks: 94\nRoll: 102 | Name: Diya Verma     | Marks: 90\nRoll: 103 | Name: Kabir Rao      | Marks: 96\nRoll: 104 | Name: Meera Joshi    | Marks: 91\n\nCharacter Frequencies: {'k': 1, 'e': 3, 'n': 1, 'd': 1, 'r': 3, 'i': 3, 'y': 2, 'a': 4, 'v': 1, 'l': 1, 'w': 1}",
        suggestedPrograms: [
            "Create an employee dictionary with name and salary; search and display an employee's record",
            "Store student roll numbers, names, and marks; determine the class topper"
        ]
    },
    {
        id: "py-13",
        unitNumber: 2,
        unitTitle: "Unit 2: Computational Thinking & Programming - I",
        category: "modules",
        number: "13",
        title: "Python Standard Modules (math, random, statistics)",
        tag: "Standard Library",
        shortDesc: "Importing modules, math (pi, e, sqrt, ceil, floor, pow), random (randint, randrange), statistics (mean, median, mode).",
        overview: "A module is a Python file containing function definitions, constants, and variables. Python's standard library provides built-in modules for mathematical computations, pseudo-random generation, and statistical calculations.",
        cbseMarks: "Modules & Library Functions",
        subtopics: [
            "Concept of Modular Programming and code reusability",
            "Importing syntax: 'import module', 'from module import function', 'import module as alias'",
            "Math Module: pi, e, sqrt(), ceil(), floor(), pow(), fabs(), sin(), cos(), tan()",
            "Random Module: random() [0.0, 1.0), randint(a, b) [a, b inclusive], randrange(start, stop, step)",
            "Statistics Module: mean(), median(), mode()"
        ],
        builtInMethods: [
            "math.pi", "math.e", "math.sqrt()", "math.ceil()", "math.floor()", "math.pow()", "math.fabs()",
            "random.random()", "random.randint()", "random.randrange()",
            "statistics.mean()", "statistics.median()", "statistics.mode()"
        ],
        keywords: ["Module", "import", "math", "random", "statistics", "ceil", "floor", "randint", "mean", "median", "mode"],
        sampleCode: `# Python Standard Modules Demo
import math
import random
import statistics

# 1. Math Module
radius = 7
area = math.pi * math.pow(radius, 2)
print(f"Circle Area (r=7): {area:.2f}")
print("math.ceil(4.2):", math.ceil(4.2))
print("math.floor(4.8):", math.floor(4.8))

# 2. Random Module
dice_roll = random.randint(1, 6)
print(f"Simulated Dice Roll: {dice_roll}")

# 3. Statistics Module
scores = [78, 85, 92, 85, 90, 85, 94]
print("Mean:", statistics.mean(scores))
print("Median:", statistics.median(scores))
print("Mode:", statistics.mode(scores))`,
        sampleOutput: "Circle Area (r=7): 153.94\nmath.ceil(4.2): 5\nmath.floor(4.8): 4\nSimulated Dice Roll: 4\nMean: 87\nMedian: 85\nMode: 85",
        suggestedPrograms: [
            "Simulate a 6-sided dice roll game using random.randint()",
            "Calculate area of a triangle given three sides using Heron's formula and math.sqrt()",
            "Compute mean, median, and mode for student test scores using statistics module"
        ]
    },

    // ==========================================
    // UNIT 3: SOCIETY, LAW AND ETHICS (15 MARKS)
    // ==========================================
    {
        id: "soc-01",
        unitNumber: 3,
        unitTitle: "Unit 3: Society, Law and Ethics",
        category: "society-ethics",
        number: "U3-01",
        title: "Digital Footprints & Net Etiquettes",
        tag: "Cyber Citizenship",
        shortDesc: "Active vs passive digital footprints, net etiquettes, communication etiquettes & social media guidelines.",
        overview: "A digital footprint is the unique trail of data and activities left behind by an individual when using the internet. Understanding digital trails and practicing courteous online conduct is critical for every digital citizen.",
        cbseMarks: "Unit 3 (15 Marks)",
        subtopics: [
            "Concept of Digital Footprint: Active footprints (user deliberately shares) vs Passive footprints (collected without explicit user awareness, e.g., IP address, browsing history)",
            "Consequences and permanence of digital footprints on future academic and career prospects",
            "Netiquette (Internet Etiquette): Respecting others' time and bandwidth, polite communication, avoiding ALL CAPS (perceived as shouting)",
            "Communication Etiquettes: Professional email formatting, clear subject lines, respecting privacy",
            "Social Media Etiquettes: Verifying facts before sharing, avoiding cyber bullying, respecting intellectual property"
        ],
        keywords: ["Digital Footprint", "Active Footprint", "Passive Footprint", "Netiquette", "Cyber Etiquette"],
        sampleCode: `# Python representation of a Digital Footprint Audit
def audit_footprint(profile):
    score = 100
    if profile.get("public_location"):
        score -= 20
    if profile.get("shares_passwords"):
        score -= 40
    if not profile.get("two_factor_auth"):
        score -= 20
    return max(0, score)

student_profile = {
    "public_location": False,
    "shares_passwords": False,
    "two_factor_auth": True
}
print("Digital Safety Score:", audit_footprint(student_profile), "/ 100 (Safe Digital Citizen!)")`,
        sampleOutput: "Digital Safety Score: 100 / 100 (Safe Digital Citizen!)",
        suggestedPrograms: [
            "Create a Python quiz checking students' awareness of digital footprints and netiquettes"
        ]
    },
    {
        id: "soc-02",
        unitNumber: 3,
        unitTitle: "Unit 3: Society, Law and Ethics",
        category: "society-ethics",
        number: "U3-02",
        title: "Data Protection & Intellectual Property Rights (IPR)",
        tag: "Legal & Ethical Framework",
        shortDesc: "Copyright, Patent, Trademark, Plagiarism, Open Source Licenses (GPL, Apache, Creative Commons).",
        overview: "Intellectual Property Rights (IPR) protect the creations of human mind, including software, inventions, and literary works. Unauthorized use constitutes infringement or plagiarism.",
        cbseMarks: "Unit 3 (15 Marks)",
        subtopics: [
            "Intellectual Property Rights (IPR) categories:",
            "  • Copyright: Protects literary and artistic expressions (e.g., software source code, books, music)",
            "  • Patent: Protects novel inventions and industrial processes",
            "  • Trademark: Protects distinctive logos, symbols, and brand names",
            "Infringement and Plagiarism: Difference between copying someone's work without attribution vs violating commercial rights",
            "Free and Open Source Software (FOSS): Principles of freedom to run, study, redistribute, and improve software",
            "Open Source Licensing: GNU General Public License (GPL), Apache License, MIT License, Creative Commons (CC)"
        ],
        keywords: ["IPR", "Copyright", "Patent", "Trademark", "Plagiarism", "FOSS", "GPL", "Creative Commons"],
        sampleCode: `# Inspecting License and Open Source Attribution
project_meta = {
    "project": "CS 11 Learning Hub",
    "license": "MIT Open Source License",
    "attribution": "PM SHRI Kendriya Vidyalaya, Rewari",
    "curriculum": "CBSE Computer Science (083) 2026-27"
}
for key, value in project_meta.items():
    print(f"{key.title():<15}: {value}")`,
        sampleOutput: "Project        : CS 11 Learning Hub\nLicense        : MIT Open Source License\nAttribution    : PM SHRI Kendriya Vidyalaya, Rewari\nCurriculum     : CBSE Computer Science (083) 2026-27",
        suggestedPrograms: [
            "Write a script that matches different software scenarios with their appropriate licensing model"
        ]
    },
    {
        id: "soc-03",
        unitNumber: 3,
        unitTitle: "Unit 3: Society, Law and Ethics",
        category: "society-ethics",
        number: "U3-03",
        title: "Cyber Crime, Cyber Safety & Indian IT Act",
        tag: "Cyber Security & Law",
        shortDesc: "Hacking, phishing, identity theft, malware, cookies, safe browsing, IT Act 2000 & cyber cells.",
        overview: "Cyber crime involves criminal activity conducted via computers or the internet. Understanding common cyber threats, cybersecurity defense mechanisms, and legal statutes protects users from harm.",
        cbseMarks: "Unit 3 (15 Marks)",
        subtopics: [
            "Cyber Crimes Definition and Types:",
            "  • Hacking (Unauthorized access: White hat vs Black hat)",
            "  • Phishing (Fraudulent attempts to obtain sensitive information like passwords and bank details)",
            "  • Cyber Stalking and Online Harassment",
            "  • Identity Theft (Impersonating someone else to commit fraud)",
            "  • Malware types: Viruses (infects files), Worms (self-replicating over networks), Trojans (disguised as useful software), Ransomware (encrypts files for extortion)",
            "Cyber Safety Best Practices: Safely browsing the web, confidential browsing (Incognito), firewall, digital signatures, cookies management",
            "Indian Information Technology Act (IT Act 2000): Key provisions, cyber tribunals, and reporting cyber crime via cyber cells (cybercrime.gov.in)"
        ],
        keywords: ["Cybercrime", "Hacking", "Phishing", "Malware", "Ransomware", "IT Act 2000", "Cyber Cell"],
        sampleCode: `# Password Strength Checker for Cyber Safety
def check_password_strength(password):
    score = 0
    if len(password) >= 8: score += 1
    if any(c.isupper() for c in password): score += 1
    if any(c.islower() for c in password): score += 1
    if any(c.isdigit() for c in password): score += 1
    if any(c in "!@#$%^&*()-_+=" for c in password): score += 1
    
    levels = {1: "Very Weak", 2: "Weak", 3: "Moderate", 4: "Strong", 5: "Very Strong"}
    return levels.get(score, "Very Weak")

sample_pw = "KvRewari@2026"
print(f"Password '{sample_pw}' strength:", check_password_strength(sample_pw))`,
        sampleOutput: "Password 'KvRewari@2026' strength: Very Strong",
        suggestedPrograms: [
            "Write a Python script to validate password strength based on CBSE cybersecurity guidelines",
            "Demonstrate Caesar Cipher encryption and decryption as a basic cryptography technique"
        ]
    },
    {
        id: "soc-04",
        unitNumber: 3,
        unitTitle: "Unit 3: Society, Law and Ethics",
        category: "society-ethics",
        number: "U3-04",
        title: "E-Waste Management & Technology Health Concerns",
        tag: "Environment & Health",
        shortDesc: "E-waste hazards, disposal methods, recycling, ergonomics, screen time, repetitive strain injury (RSI).",
        overview: "Discarded electronic equipment creates toxic environmental hazards if not disposed of responsibly. Extended screen time and poor computing posture can cause physical and mental health issues.",
        cbseMarks: "Unit 3 (15 Marks)",
        subtopics: [
            "E-Waste (Electronic Waste): Definition and major sources (discarded computers, mobile phones, batteries, circuit boards)",
            "Hazards of toxic chemicals in e-waste: Lead, Mercury, Cadmium, Beryllium polluting soil and groundwater",
            "E-Waste Management: Reduce, Reuse, Recycle (3Rs), authorized collection centers, proper recycling methods",
            "Health Concerns in Technology Use:",
            "  • Ergonomics: Correct chair height, monitor distance, keyboard positioning",
            "  • Physical ailments: Repetitive Strain Injury (RSI), Carpal Tunnel Syndrome, Computer Vision Syndrome (CVS / eye strain), backache",
            "  • Psychological impacts: Digital fatigue, sleep disruption from blue light, screen addiction"
        ],
        keywords: ["E-Waste", "Recycling", "Ergonomics", "RSI", "Computer Vision Syndrome", "Digital Wellness"],
        sampleCode: `# 20-20-20 Rule Reminder for Healthy Screen Habits
print("=== DIGITAL WELLNESS: THE 20-20-20 RULE ===")
print("Every 20 minutes of screen time:")
print("  1. Look away at an object at least 20 feet away.")
print("  2. Focus on it for at least 20 seconds.")
print("  3. Blink repeatedly to reduce eye strain!")`,
        sampleOutput: "=== DIGITAL WELLNESS: THE 20-20-20 RULE ===\nEvery 20 minutes of screen time:\n  1. Look away at an object at least 20 feet away.\n  2. Focus on it for at least 20 seconds.\n  3. Blink repeatedly to reduce eye strain!",
        suggestedPrograms: [
            "Build an interactive ergonomic screen-break reminder timer in Python"
        ]
    }
];

export const syllabusCategories = [
    { id: "all", label: "All Units (70M)" },
    { id: "computer-systems", label: "Unit 1: Computer Systems (10M)" },
    { id: "python-basics", label: "Unit 2: Python Basics" },
    { id: "control-flow", label: "Unit 2: Control Flow" },
    { id: "data-structures", label: "Unit 2: Data Structures" },
    { id: "modules", label: "Unit 2: Modules" },
    { id: "society-ethics", label: "Unit 3: Society & Ethics (15M)" }
];
