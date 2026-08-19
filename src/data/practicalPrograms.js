/**
 * OFFICIAL CBSE CLASS XI COMPUTER SCIENCE PRACTICAL PROGRAMS DATA
 * 30-Mark Practical Examination Reference & Program Bank
 */

export const practicalStructure = {
    totalMarks: 30,
    components: [
        {
            title: "Lab Test",
            marks: 12,
            badge: "12 Marks",
            description: "Hands-on Python programming test evaluated in the school computer lab.",
            breakdown: [
                { item: "Algorithm / Logic & Problem Solving", weight: "60% (7.2 Marks)" },
                { item: "Documentation & Comments", weight: "20% (2.4 Marks)" },
                { item: "Code Quality & Output Accuracy", weight: "20% (2.4 Marks)" }
            ]
        },
        {
            title: "Report File + Viva",
            marks: 10,
            badge: "10 Marks",
            description: "Practical record file containing minimum 20 verified Python programs along with viva-voce examination.",
            breakdown: [
                { item: "Practical Record Journal (Min 20 Programs)", weight: "7 Marks" },
                { item: "Viva-Voce Oral Evaluation", weight: "3 Marks" }
            ]
        },
        {
            title: "Project Work",
            marks: 8,
            badge: "8 Marks",
            description: "Term-end Python project applying core computational logic, data structures, and file or console I/O.",
            breakdown: [
                { item: "Project Problem Definition & Design", weight: "3 Marks" },
                { item: "Program Implementation & Execution", weight: "5 Marks" }
            ]
        }
    ]
};

export const practicalCategories = ["All", "Basic & Math", "Loops & Patterns", "Strings", "Lists & Tuples", "Dictionaries"];

export const practicalPrograms = [
    {
        id: "prog-01",
        num: 1,
        title: "Welcome Message with Custom Greeting",
        category: "Basic & Math",
        description: "Input a student's name, class, and roll number and display a formatted, elegant welcome banner with custom separators.",
        tags: ["input()", "print()", "sep", "end"],
        code: `# Program 01: Welcome Message with Custom Greeting
# Author: Class 11 Student (Kendriya Vidyalaya Rewari)

name = input("Enter student name: ")
cls = input("Enter class & section: ")
roll_no = input("Enter roll number: ")

print("\\n" + "=" * 45)
print("   KENDRIYA VIDYALAYA REWARI — PYTHON HUB")
print("=" * 45)
print(f"Welcome, {name}!")
print(f"Class: {cls} | Roll No: {roll_no}")
print("Status: Active Python Explorer")
print("=" * 45)`,
        sampleInput: "Aarav Sharma\nXI-A\n101",
        sampleOutput: "=============================================\n   KENDRIYA VIDYALAYA REWARI — PYTHON HUB\n=============================================\nWelcome, Aarav Sharma!\nClass: XI-A | Roll No: 101\nStatus: Active Python Explorer\n============================================="
    },
    {
        id: "prog-02",
        num: 2,
        title: "Larger and Smaller of Two Numbers",
        category: "Basic & Math",
        description: "Accept two numbers from the user and determine which one is larger and which is smaller, handling equality gracefully.",
        tags: ["if-elif-else", "Comparison"],
        code: `# Program 02: Larger and Smaller of Two Numbers

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if num1 > num2:
    print(f"Larger number is: {num1}")
    print(f"Smaller number is: {num2}")
elif num2 > num1:
    print(f"Larger number is: {num2}")
    print(f"Smaller number is: {num1}")
else:
    print(f"Both numbers are equal ({num1}).")`,
        sampleInput: "45.5\n89.2",
        sampleOutput: "Larger number is: 89.2\nSmaller number is: 45.5"
    },
    {
        id: "prog-03",
        num: 3,
        title: "Largest and Smallest of Three Numbers",
        category: "Basic & Math",
        description: "Determine the maximum and minimum among three given numbers using nested conditional statements without using built-in max/min.",
        tags: ["Nested if", "Logical and"],
        code: `# Program 03: Largest and Smallest of Three Numbers

a = float(input("Enter first number (a): "))
b = float(input("Enter second number (b): "))
c = float(input("Enter third number (c): "))

# Finding Largest
if a >= b and a >= c:
    largest = a
elif b >= a and b >= c:
    largest = b
else:
    largest = c

# Finding Smallest
if a <= b and a <= c:
    smallest = a
elif b <= a and b <= c:
    smallest = b
else:
    smallest = c

print(f"Largest: {largest}")
print(f"Smallest: {smallest}")`,
        sampleInput: "15\n82\n47",
        sampleOutput: "Largest: 82.0\nSmallest: 15.0"
    },
    {
        id: "prog-04",
        num: 4,
        title: "Pattern Programs Using Nested Loops",
        category: "Loops & Patterns",
        description: "Generate right-angle star triangles and number pyramid patterns using nested for loops.",
        tags: ["Nested Loops", "for", "range()"],
        code: `# Program 04: Star and Number Pattern Generation

n = int(input("Enter number of rows: "))

print("\\nPattern A (Right-Angled Triangle):")
for i in range(1, n + 1):
    for j in range(1, i + 1):
        print("*", end=" ")
    print()

print("\\nPattern B (Number Triangle):")
for i in range(1, n + 1):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()

print("\\nPattern C (Inverted Triangle):")
for i in range(n, 0, -1):
    for j in range(i):
        print("#", end=" ")
    print()`,
        sampleInput: "4",
        sampleOutput: "Pattern A:\n* \n* * \n* * * \n* * * * \n\nPattern B:\n1 \n1 2 \n1 2 3 \n1 2 3 4"
    },
    {
        id: "prog-05",
        num: 5,
        title: "Summation of Series (1 + x + x^2 + ... + x^n)",
        category: "Loops & Patterns",
        description: "Compute the sum of the polynomial series S = 1 + x + x^2 + x^3 + ... + x^n for given integer values of x and n.",
        tags: ["Series", "Loops", "Exponentiation"],
        code: `# Program 05: Series Summation: S = 1 + x + x^2 + ... + x^n

x = float(input("Enter value of x: "))
n = int(input("Enter number of terms (n): "))

series_sum = 0.0

for i in range(n + 1):
    term = x ** i
    series_sum += term
    if i == 0:
        print("1", end="")
    else:
        print(f" + {x}^{i}", end="")

print(f"\\nTotal Sum = {series_sum}")`,
        sampleInput: "2\n4",
        sampleOutput: "1 + 2^1 + 2^2 + 2^3 + 2^4\nTotal Sum = 31.0"
    },
    {
        id: "prog-06",
        num: 6,
        title: "Factorial and Factorial-Related Series",
        category: "Loops & Patterns",
        description: "Calculate factorial of a number and evaluate the series: S = 1 + x/1! + x^2/2! + x^3/3! + ... + x^n/n!.",
        tags: ["Factorial", "Series", "Math"],
        code: `# Program 06: Factorial and Factorial Series Evaluation

def calculate_factorial(num):
    fact = 1
    for i in range(1, num + 1):
        fact *= i
    return fact

# 1. Single number factorial
n_val = int(input("Enter number for factorial: "))
print(f"Factorial of {n_val} = {calculate_factorial(n_val)}")

# 2. Factorial Series: S = 1 + x/1! + x^2/2! + ... + x^n/n!
x = float(input("\\nEnter x for series: "))
terms = int(input("Enter number of terms: "))

s_sum = 1.0
for i in range(1, terms + 1):
    s_sum += (x ** i) / calculate_factorial(i)

print(f"Sum of series up to {terms} terms = {s_sum:.4f}")`,
        sampleInput: "5\n2\n3",
        sampleOutput: "Factorial of 5 = 120\nSum of series up to 3 terms = 6.3333"
    },
    {
        id: "prog-07",
        num: 7,
        title: "Perfect Number Checker",
        category: "Basic & Math",
        description: "Check if a given number is a Perfect Number (sum of proper divisors equals the number itself, e.g. 6 = 1 + 2 + 3, 28).",
        tags: ["Divisors", "Math", "while/for"],
        code: `# Program 07: Perfect Number Checker

num = int(input("Enter a positive integer: "))

if num <= 0:
    print("Please enter a positive integer.")
else:
    divisors_sum = 0
    for i in range(1, num):
        if num % i == 0:
            divisors_sum += i

    if divisors_sum == num:
        print(f"{num} is a PERFECT NUMBER!")
    else:
        print(f"{num} is NOT a perfect number (Sum of proper divisors = {divisors_sum}).")`,
        sampleInput: "28",
        sampleOutput: "28 is a PERFECT NUMBER!"
    },
    {
        id: "prog-08",
        num: 8,
        title: "Armstrong Number Checker",
        category: "Basic & Math",
        description: "Determine whether an entered number is an Armstrong number (sum of digits raised to the power of number of digits equals the original number, e.g. 153, 370, 371).",
        tags: ["Armstrong", "Digits", "Modulo"],
        code: `# Program 08: Armstrong Number Checker

num = int(input("Enter a positive integer: "))
temp = num
num_str = str(num)
power = len(num_str)
digit_sum = 0

while temp > 0:
    digit = temp % 10
    digit_sum += digit ** power
    temp //= 10

if digit_sum == num:
    print(f"{num} is an ARMSTRONG NUMBER! ({' + '.join([d + '^' + str(power) for d in num_str])} = {digit_sum})")
else:
    print(f"{num} is NOT an Armstrong number (Calculated sum = {digit_sum}).")`,
        sampleInput: "153",
        sampleOutput: "153 is an ARMSTRONG NUMBER! (1^3 + 5^3 + 3^3 = 153)"
    },
    {
        id: "prog-09",
        num: 9,
        title: "Number Palindrome Checker",
        category: "Basic & Math",
        description: "Reverse an integer using arithmetic operations (% and //) and verify whether it is a numerical Palindrome.",
        tags: ["Palindrome", "while loop", "Reverse"],
        code: `# Program 09: Number Palindrome Checker

n = int(input("Enter an integer: "))
original = n
reversed_num = 0

# Handling negative numbers
temp = abs(n)
while temp > 0:
    digit = temp % 10
    reversed_num = (reversed_num * 10) + digit
    temp //= 10

if n < 0:
    reversed_num = -reversed_num

if original == reversed_num:
    print(f"{original} is a PALINDROME number!")
else:
    print(f"{original} is NOT a palindrome (Reversed = {reversed_num}).")`,
        sampleInput: "12321",
        sampleOutput: "12321 is a PALINDROME number!"
    },
    {
        id: "prog-10",
        num: 10,
        title: "Prime and Composite Number Checker",
        category: "Basic & Math",
        description: "Check whether a given integer greater than 1 is a Prime number or a Composite number using optimized loop checks with for-else.",
        tags: ["Prime", "Composite", "for-else"],
        code: `# Program 10: Prime and Composite Number Checker

num = int(input("Enter a number: "))

if num <= 1:
    print(f"{num} is neither Prime nor Composite.")
else:
    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            factor = i
            break

    if is_prime:
        print(f"{num} is a PRIME NUMBER.")
    else:
        print(f"{num} is a COMPOSITE NUMBER (Divisible by {factor}).")`,
        sampleInput: "29",
        sampleOutput: "29 is a PRIME NUMBER."
    },
    {
        id: "prog-11",
        num: 11,
        title: "Fibonacci Series Generator",
        category: "Loops & Patterns",
        description: "Generate and display the first N terms of the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13, ...).",
        tags: ["Fibonacci", "Loops", "Sequence"],
        code: `# Program 11: Fibonacci Series Generator

n_terms = int(input("Enter number of terms to generate: "))

if n_terms <= 0:
    print("Please enter a positive number of terms.")
elif n_terms == 1:
    print("Fibonacci Sequence: [0]")
else:
    a, b = 0, 1
    fib_list = [a, b]
    for _ in range(2, n_terms):
        c = a + b
        fib_list.append(c)
        a, b = b, c
    print(f"Fibonacci Sequence ({n_terms} terms):")
    print(", ".join(map(str, fib_list)))`,
        sampleInput: "8",
        sampleOutput: "Fibonacci Sequence (8 terms):\n0, 1, 1, 2, 3, 5, 8, 13"
    },
    {
        id: "prog-12",
        num: 12,
        title: "Greatest Common Divisor (GCD) of Two Numbers",
        category: "Basic & Math",
        description: "Compute the Greatest Common Divisor (HCF) of two positive integers using Euclidean division algorithm and basic iteration.",
        tags: ["GCD", "HCF", "Euclid Algorithm"],
        code: `# Program 12: Greatest Common Divisor (GCD / HCF)

a = int(input("Enter first positive integer (a): "))
b = int(input("Enter second positive integer (b): "))

# Euclidean Algorithm
x, y = abs(a), abs(b)
while y != 0:
    x, y = y, x % y

print(f"Greatest Common Divisor (GCD) of {a} and {b} is: {x}")`,
        sampleInput: "48\n18",
        sampleOutput: "Greatest Common Divisor (GCD) of 48 and 18 is: 6"
    },
    {
        id: "prog-13",
        num: 13,
        title: "Least Common Multiple (LCM) of Two Numbers",
        category: "Basic & Math",
        description: "Calculate the Least Common Multiple (LCM) of two numbers using the mathematical relation: LCM(a, b) = (a * b) / GCD(a, b).",
        tags: ["LCM", "Math", "GCD"],
        code: `# Program 13: Least Common Multiple (LCM)

a = int(input("Enter first integer (a): "))
b = int(input("Enter second integer (b): "))

# Calculate GCD first
x, y = abs(a), abs(b)
while y != 0:
    x, y = y, x % y

gcd = x
lcm = abs(a * b) // gcd

print(f"LCM of {a} and {b} is: {lcm}")`,
        sampleInput: "12\n15",
        sampleOutput: "LCM of 12 and 15 is: 60"
    },
    {
        id: "prog-14",
        num: 14,
        title: "Count Vowels, Consonants, Digits and Special Characters",
        category: "Strings",
        description: "Traverse an entered string and count the exact occurrences of vowels, consonants, digits, and special characters.",
        tags: ["Strings", "Traversal", "isalpha()", "isdigit()"],
        code: `# Program 14: Count Character Classes in a String

text = input("Enter a sentence: ")

vowels = 0
consonants = 0
digits = 0
spaces = 0
special = 0

vowel_set = "aeiouAEIOU"

for char in text:
    if char in vowel_set:
        vowels += 1
    elif char.isalpha():
        consonants += 1
    elif char.isdigit():
        digits += 1
    elif char.isspace():
        spaces += 1
    else:
        special += 1

print(f"Vowels: {vowels}")
print(f"Consonants: {consonants}")
print(f"Digits: {digits}")
print(f"Spaces: {spaces}")
print(f"Special Characters: {special}")`,
        sampleInput: "KV Rewari 2026-27!",
        sampleOutput: "Vowels: 5\nConsonants: 6\nDigits: 6\nSpaces: 2\nSpecial Characters: 2"
    },
    {
        id: "prog-15",
        num: 15,
        title: "Count Uppercase and Lowercase Characters",
        category: "Strings",
        description: "Analyze an entered string to determine the total number of uppercase letters, lowercase letters, and non-alphabetic symbols.",
        tags: ["isupper()", "islower()", "Strings"],
        code: `# Program 15: Count Uppercase and Lowercase Characters

line = input("Enter any string: ")

upper_count = 0
lower_count = 0
other_count = 0

for ch in line:
    if ch.isupper():
        upper_count += 1
    elif ch.islower():
        lower_count += 1
    else:
        other_count += 1

print(f"Total Characters: {len(line)}")
print(f"Uppercase Letters: {upper_count}")
print(f"Lowercase Letters: {lower_count}")
print(f"Other Characters: {other_count}")`,
        sampleInput: "Python Programming Class XI",
        sampleOutput: "Total Characters: 27\nUppercase Letters: 4\nLowercase Letters: 20\nOther Characters: 3"
    },
    {
        id: "prog-16",
        num: 16,
        title: "String Palindrome Checker",
        category: "Strings",
        description: "Verify whether an entered string reads the same forwards and backwards (ignoring case sensitivity and spaces).",
        tags: ["String Slicing", "Palindrome", "lower()"],
        code: `# Program 16: String Palindrome Checker

user_str = input("Enter a string: ")

# Cleaning: lower case and removing spaces
cleaned = "".join([c.lower() for c in user_str if c.isalnum()])
reversed_str = cleaned[::-1]

if cleaned == reversed_str:
    print(f"'{user_str}' is a PALINDROME string!")
else:
    print(f"'{user_str}' is NOT a palindrome.")
    print(f"Cleaned: '{cleaned}' | Reversed: '{reversed_str}'")`,
        sampleInput: "Madam",
        sampleOutput: "'Madam' is a PALINDROME string!"
    },
    {
        id: "prog-17",
        num: 17,
        title: "String Case Conversion (Toggle Case)",
        category: "Strings",
        description: "Convert all uppercase characters to lowercase and all lowercase characters to uppercase without using swapcase().",
        tags: ["Toggle Case", "Strings", "isupper()"],
        code: `# Program 17: String Case Conversion (Toggle Case)

sentence = input("Enter string to toggle case: ")
toggled = ""

for ch in sentence:
    if ch.isupper():
        toggled += ch.lower()
    elif ch.islower():
        toggled += ch.upper()
    else:
        toggled += ch

print("Original String:", sentence)
print("Toggled String :", toggled)`,
        sampleInput: "Kendriya Vidyalaya REWARI",
        sampleOutput: "Original String: Kendriya Vidyalaya REWARI\nToggled String : kENDRIYA vIDYALAYA rewari"
    },
    {
        id: "prog-18",
        num: 18,
        title: "Largest and Smallest Element in List / Tuple",
        category: "Lists & Tuples",
        description: "Find the maximum and minimum elements in a numeric list without using the built-in max() and min() functions.",
        tags: ["Lists", "Tuples", "Iteration", "Traversal"],
        code: `# Program 18: Largest and Smallest in List without built-in functions

# Input space-separated integers
raw_input = input("Enter numbers separated by space: ")
num_list = [float(x) for x in raw_input.split()]

if len(num_list) == 0:
    print("List is empty.")
else:
    largest = num_list[0]
    smallest = num_list[0]

    for val in num_list:
        if val > largest:
            largest = val
        if val < smallest:
            smallest = val

    print(f"List: {num_list}")
    print(f"Largest Element : {largest}")
    print(f"Smallest Element: {smallest}")`,
        sampleInput: "34 89 12 76 5 99 23",
        sampleOutput: "List: [34.0, 89.0, 12.0, 76.0, 5.0, 99.0, 23.0]\nLargest Element : 99.0\nSmallest Element: 5.0"
    },
    {
        id: "prog-19",
        num: 19,
        title: "Swap Elements at Even and Odd Indices in a List",
        category: "Lists & Tuples",
        description: "Swap consecutive elements located at even and odd index positions in a Python list.",
        tags: ["Lists", "Indexing", "Swapping", "range(step)"],
        code: `# Program 19: Swap Elements at Even and Odd Positions

# Input list elements
items = input("Enter list elements separated by space: ").split()
print("Original List:", items)

# Swapping adjacent elements (0 with 1, 2 with 3, etc.)
n = len(items)
for i in range(0, n - 1, 2):
    items[i], items[i + 1] = items[i + 1], items[i]

print("List after Swapping Even-Odd Positions:", items)`,
        sampleInput: "A B C D E F",
        sampleOutput: "Original List: ['A', 'B', 'C', 'D', 'E', 'F']\nList after Swapping Even-Odd Positions: ['B', 'A', 'D', 'C', 'F', 'E']"
    },
    {
        id: "prog-20",
        num: 20,
        title: "Linear Search in List / Tuple",
        category: "Lists & Tuples",
        description: "Search for a specific target value in a list/tuple using the Linear Search algorithm and report its index and occurrence count.",
        tags: ["Linear Search", "Searching", "Algorithms"],
        code: `# Program 20: Linear Search in List

elements = input("Enter list numbers separated by space: ").split()
num_list = [int(x) for x in elements]
target = int(input("Enter number to search for: "))

found_indices = []

for idx in range(len(num_list)):
    if num_list[idx] == target:
        found_indices.append(idx)

if len(found_indices) > 0:
    print(f"Target {target} FOUND at index/indices: {found_indices}")
    print(f"Total occurrences: {len(found_indices)}")
else:
    print(f"Target {target} NOT FOUND in the list.")`,
        sampleInput: "10 25 30 25 40 50\n25",
        sampleOutput: "Target 25 FOUND at index/indices: [1, 3]\nTotal occurrences: 2"
    },
    {
        id: "prog-21",
        num: 21,
        title: "Student Dictionary with Roll Number, Name, and Marks",
        category: "Dictionaries",
        description: "Create a student database using dictionary to store roll numbers, names, and marks; compute class average and display topper.",
        tags: ["Dictionaries", "Key-Value", "Database"],
        code: `# Program 21: Student Records Dictionary

students = {}
n = int(input("How many students to enter? "))

for i in range(n):
    print(f"\\n--- Student {i+1} ---")
    roll = input("Enter Roll Number: ")
    name = input("Enter Student Name: ")
    marks = float(input("Enter Computer Science Marks (out of 100): "))
    students[roll] = {"name": name, "marks": marks}

print("\\n" + "=" * 40)
print(f"{'ROLL':<8}{'NAME':<20}{'MARKS':<8}")
print("=" * 40)

total_marks = 0
topper_roll = None
highest_score = -1

for roll, info in students.items():
    print(f"{roll:<8}{info['name']:<20}{info['marks']:<8}")
    total_marks += info["marks"]
    if info["marks"] > highest_score:
        highest_score = info["marks"]
        topper_roll = roll

avg = total_marks / n if n > 0 else 0
print("=" * 40)
print(f"Class Average Marks: {avg:.2f}")
if topper_roll:
    print(f"Class Topper: {students[topper_roll]['name']} (Roll: {topper_roll}) with {highest_score} Marks!")`,
        sampleInput: "3\n101\nAarav Sharma\n96\n102\nDiya Verma\n92\n103\nKabir Rao\n98",
        sampleOutput: "========================================\nROLL    NAME                MARKS   \n========================================\n101     Aarav Sharma        96.0    \n102     Diya Verma          92.0    \n103     Kabir Rao           98.0    \n========================================\nClass Average Marks: 95.33\nClass Topper: Kabir Rao (Roll: 103) with 98.0 Marks!"
    }
];
