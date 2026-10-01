/**
 * INTERACTIVE PRACTICE CENTRE DATA BANK
 * CBSE Class 11 Computer Science (083) - Session 2026-27
 * 
 * Supports:
 * - MCQs
 * - Output Prediction
 * - Find the Error
 * - Code & Concept questions
 */

export const practiceCategories = [
    { id: "all", name: "All Topics" },
    { id: "computer-systems", name: "Unit 1: Computer Systems & Logic" },
    { id: "python-basics", name: "Python Basics & Operators" },
    { id: "control-flow", name: "Flow of Control (if & loops)" },
    { id: "strings", name: "Strings & Slicing" },
    { id: "lists-tuples", name: "Lists & Tuples" },
    { id: "dictionaries", name: "Dictionaries" },
    { id: "modules", name: "Standard Modules" },
    { id: "society-ethics", name: "Unit 3: Society & Cyber Law" }
];

export const quizQuestions = [
    // Unit 1: Computer Systems & Logic
    {
        id: "q1",
        category: "computer-systems",
        type: "MCQ",
        difficulty: "Easy",
        topic: "Memory Units",
        question: "How many Bytes are there in exactly 1 Megabyte (1 MB) in standard binary computing?",
        options: [
            { id: "A", text: "1,000,000 Bytes" },
            { id: "B", text: "1,024 Bytes" },
            { id: "C", text: "1,048,576 Bytes (1024 x 1024)" },
            { id: "D", text: "1,073,741,824 Bytes" }
        ],
        correctOption: "C",
        explanation: "1 KB = 1024 Bytes. 1 MB = 1024 KB = 1024 x 1024 = 1,048,576 Bytes."
    },
    {
        id: "q2",
        category: "computer-systems",
        type: "MCQ",
        difficulty: "Medium",
        topic: "Boolean Logic",
        question: "According to De Morgan's First Law of Boolean Logic, the expression (A + B)' is equivalent to:",
        options: [
            { id: "A", text: "A' + B'" },
            { id: "B", text: "A' . B'" },
            { id: "C", text: "(A . B)'" },
            { id: "D", text: "A + B" }
        ],
        correctOption: "B",
        explanation: "De Morgan's First Law states that the complement of a sum (OR) is equal to the product (AND) of the complements: (A + B)' = A' . B'."
    },
    {
        id: "q3",
        category: "computer-systems",
        type: "MCQ",
        difficulty: "Medium",
        topic: "Number Systems",
        question: "What is the Octal representation of the binary number (111010)₂?",
        options: [
            { id: "A", text: "72" },
            { id: "B", text: "58" },
            { id: "C", text: "72" },
            { id: "D", text: "72₈" }
        ],
        correctOption: "A",
        explanation: "To convert Binary to Octal, group digits into triplets from right: 111 (7) and 010 (2). Hence (111010)₂ = (72)₈."
    },

    // Python Basics & Operators
    {
        id: "q4",
        category: "python-basics",
        type: "Output Prediction",
        difficulty: "Easy",
        topic: "Floor Division & Modulus",
        codeSnippet: `a = 15
b = 4
print(a // b, a % b)`,
        question: "What will be printed upon running the code?",
        options: [
            { id: "A", text: "3.75 3" },
            { id: "B", text: "3 3" },
            { id: "C", text: "4 3" },
            { id: "D", text: "3 0" }
        ],
        correctOption: "B",
        explanation: "Floor division (//) returns the integer truncated quotient: 15 // 4 = 3. Modulus (%) returns the remainder: 15 % 4 = 3."
    },
    {
        id: "q5",
        category: "python-basics",
        type: "MCQ",
        difficulty: "Easy",
        topic: "Mutability",
        question: "Which of the following data types in Python is MUTABLE?",
        options: [
            { id: "A", text: "tuple" },
            { id: "B", text: "str" },
            { id: "C", text: "list" },
            { id: "D", text: "int" }
        ],
        correctOption: "C",
        explanation: "Lists and dictionaries are mutable (can be changed in-place). Tuples, strings, and integers are immutable."
    },
    {
        id: "q6",
        category: "python-basics",
        type: "Find the Error",
        difficulty: "Medium",
        topic: "Identifiers & Keywords",
        codeSnippet: `def = "KV Rewari"
print(def)`,
        question: "What error will Python produce when executing this code?",
        options: [
            { id: "A", text: "NameError: name 'def' is not defined" },
            { id: "B", text: "SyntaxError: invalid syntax" },
            { id: "C", text: "TypeError: unsupported operand" },
            { id: "D", text: "ValueError: variable naming error" }
        ],
        correctOption: "B",
        explanation: "'def' is a reserved Python keyword used for defining functions. Keywords cannot be used as variable identifiers, resulting in a SyntaxError during parsing."
    },

    // Flow of Control
    {
        id: "q7",
        category: "control-flow",
        type: "Output Prediction",
        difficulty: "Medium",
        topic: "Loops & break",
        codeSnippet: `total = 0
for i in range(1, 10, 2):
    if i == 5:
        break
    total += i
print(total)`,
        question: "What is the value of total output by the loop?",
        options: [
            { id: "A", text: "4" },
            { id: "B", text: "9" },
            { id: "C", text: "16" },
            { id: "D", text: "25" }
        ],
        correctOption: "A",
        explanation: "The sequence generated by range(1, 10, 2) is 1, 3, 5, 7, 9. When i=1: total = 0 + 1 = 1. When i=3: total = 1 + 3 = 4. When i=5: the break statement fires, immediately terminating the loop. print(total) prints 4."
    },
    {
        id: "q8",
        category: "control-flow",
        type: "Output Prediction",
        difficulty: "Hard",
        topic: "Nested Loops & Patterns",
        codeSnippet: `for i in range(1, 4):
    for j in range(i):
        print("*", end="")
    print(end="#")`,
        question: "What will be the exact output printed on the console?",
        options: [
            { id: "A", text: "*#**#***#" },
            { id: "B", text: "*#**#***" },
            { id: "C", text: "***###" },
            { id: "D", text: "*\n**\n***#" }
        ],
        correctOption: "A",
        explanation: "i=1: inner loop prints '*' 1 time, followed by '#'. i=2: inner loop prints '**', followed by '#'. i=3: inner loop prints '***', followed by '#'. Total output: '*#**#***#'."
    },

    // Strings
    {
        id: "q9",
        category: "strings",
        type: "Output Prediction",
        difficulty: "Medium",
        topic: "String Slicing & Steps",
        codeSnippet: `s = "KENDRIYA VIDYALAYA"
print(s[0:8:2])`,
        question: "What will be printed when slicing string 'KENDRIYA VIDYALAYA'?",
        options: [
            { id: "A", text: "KNRI" },
            { id: "B", text: "EDYA" },
            { id: "C", text: "KNDR" },
            { id: "D", text: "KNRY" }
        ],
        correctOption: "A",
        explanation: "s[0:8:2] takes characters from index 0 up to 7 with step 2: index 0 ('K'), index 2 ('N'), index 4 ('R'), index 6 ('I'). The result is 'KNRI'."
    },
    {
        id: "q10",
        category: "strings",
        type: "Output Prediction",
        difficulty: "Medium",
        topic: "String Methods (join)",
        codeSnippet: `words = ["Python", "Class", "11"]
res = "-".join(words)
print(res)`,
        question: "What does '-'.join(words) produce?",
        options: [
            { id: "A", text: "Python-Class-11-" },
            { id: "B", text: "Python-Class-11" },
            { id: "C", text: "['Python', 'Class', '11']" },
            { id: "D", text: "-Python-Class-11" }
        ],
        correctOption: "B",
        explanation: "The join() method concatenates the list elements with the separator placed BETWEEN items, yielding 'Python-Class-11'."
    },

    // Lists & Tuples
    {
        id: "q11",
        category: "lists-tuples",
        type: "Output Prediction",
        difficulty: "Medium",
        topic: "List append vs extend",
        codeSnippet: `data = [10, 20]
data.append([30, 40])
print(len(data))`,
        question: "What will len(data) output after the append operation?",
        options: [
            { id: "A", text: "4" },
            { id: "B", text: "3" },
            { id: "C", text: "2" },
            { id: "D", text: "TypeError" }
        ],
        correctOption: "B",
        explanation: "append() adds its argument as a single element. [30, 40] is added as a nested list at index 2. The list becomes [10, 20, [30, 40]], which has a length of 3."
    },
    {
        id: "q12",
        category: "lists-tuples",
        type: "MCQ",
        difficulty: "Easy",
        topic: "Single Element Tuple",
        question: "Which of the following correctly creates a tuple with a single integer element 5?",
        options: [
            { id: "A", text: "t = (5)" },
            { id: "B", text: "t = [5]" },
            { id: "C", text: "t = (5,)" },
            { id: "D", text: "t = tuple(5)" }
        ],
        correctOption: "C",
        explanation: "In Python, parentheses alone around a single expression (5) are treated as arithmetic grouping. A trailing comma (5,) is required to designate a single-element tuple."
    },

    // Dictionaries
    {
        id: "q13",
        category: "dictionaries",
        type: "Output Prediction",
        difficulty: "Medium",
        topic: "Dictionary Keys",
        codeSnippet: `d = {}
d[(1, 2)] = 10
d[(2, 1)] = 20
print(len(d))`,
        question: "What is the length of dictionary d?",
        options: [
            { id: "A", text: "1" },
            { id: "B", text: "2" },
            { id: "C", text: "TypeError: unhashable type 'tuple'" },
            { id: "D", text: "0" }
        ],
        correctOption: "B",
        explanation: "Tuples are immutable, so they are valid dictionary keys. (1, 2) and (2, 1) are distinct keys. Hence len(d) is 2."
    },

    // Modules
    {
        id: "q14",
        category: "modules",
        type: "Output Prediction",
        difficulty: "Easy",
        topic: "math.ceil vs math.floor",
        codeSnippet: `import math
print(math.ceil(3.2), math.floor(3.8))`,
        question: "What will math.ceil(3.2) and math.floor(3.8) output?",
        options: [
            { id: "A", text: "4 3" },
            { id: "B", text: "3 4" },
            { id: "C", text: "3.0 4.0" },
            { id: "D", text: "4.0 3.0" }
        ],
        correctOption: "A",
        explanation: "math.ceil(x) returns the smallest integer greater than or equal to x (ceil(3.2) = 4). math.floor(x) returns the largest integer less than or equal to x (floor(3.8) = 3)."
    },

    // Unit 3: Society & Cyber Law
    {
        id: "q15",
        category: "society-ethics",
        type: "MCQ",
        difficulty: "Easy",
        topic: "Cyber Crime",
        question: "Software that secretly locks user files using strong encryption and demands ransom money to decrypt them is called:",
        options: [
            { id: "A", text: "Spyware" },
            { id: "B", text: "Ransomware" },
            { id: "C", text: "Adware" },
            { id: "D", text: "Firewall" }
        ],
        correctOption: "B",
        explanation: "Ransomware is a type of malicious software (malware) that encrypts a victim's files and demands payment to restore access."
    }
];
