/**
 * INTERACTIVE QUIZ DATA BANK - CBSE CLASS 11 PYTHON
 */

export const quizQuestions = [
    {
        id: "q1",
        topic: "Variables & Assignment",
        codeSnippet: `x = 10
x = x + 5
print(x)`,
        question: "What will be the output of the following Python code snippet?",
        options: [
            { id: "A", text: "10" },
            { id: "B", text: "15" },
            { id: "C", text: "5" },
            { id: "D", text: "Error (SyntaxError)" }
        ],
        correctOption: "B",
        explanation: "Initially x is assigned the integer 10. In the next line, x + 5 evaluates to 15, which is reassigned to variable x. Therefore, print(x) outputs 15."
    },
    {
        id: "q2",
        topic: "Operators & Division",
        codeSnippet: `a = 15
b = 4
print(a // b, a % b)`,
        question: "What is the output of floor division and modulus in Python?",
        options: [
            { id: "A", text: "3.75 3" },
            { id: "B", text: "3 3" },
            { id: "C", text: "4 3" },
            { id: "D", text: "3 0" }
        ],
        correctOption: "B",
        explanation: "Floor division (//) returns the truncated quotient as an integer: 15 // 4 = 3. Modulus (%) returns the remainder of the division: 15 % 4 = 3."
    },
    {
        id: "q3",
        topic: "String Slicing",
        codeSnippet: `s = "KV REWARI"
print(s[3:8])`,
        question: "What will be printed when slicing the string 'KV REWARI'?",
        options: [
            { id: "A", text: "' REWA'" },
            { id: "B", text: "'REWAR'" },
            { id: "C", text: "'REWARI'" },
            { id: "D", text: "' REWAR'" }
        ],
        correctOption: "B",
        explanation: "In string slicing s[start:stop], index 3 is 'R' (0='K', 1='V', 2=' ', 3='R', 4='E', 5='W', 6='A', 7='R'). The slice stops before index 8 ('I'). Hence it returns 'REWAR'."
    },
    {
        id: "q4",
        topic: "List Mutability",
        codeSnippet: `data = [10, 20, 30]
data.append([40, 50])
print(len(data))`,
        question: "What will len(data) output after the append operation?",
        options: [
            { id: "A", text: "5" },
            { id: "B", text: "4" },
            { id: "C", text: "3" },
            { id: "D", text: "TypeError" }
        ],
        correctOption: "B",
        explanation: "The append() method adds its argument as a single element. Here the entire list [40, 50] becomes the 4th element at index 3: [10, 20, 30, [40, 50]]. If extend() were used, length would be 5."
    },
    {
        id: "q5",
        topic: "Loops & range()",
        codeSnippet: `total = 0
for i in range(1, 6, 2):
    total += i
print(total)`,
        question: "What is the final value of variable total?",
        options: [
            { id: "A", text: "15" },
            { id: "B", text: "9" },
            { id: "C", text: "10" },
            { id: "D", text: "6" }
        ],
        correctOption: "B",
        explanation: "range(1, 6, 2) generates the sequence [1, 3, 5]. In the loop: total = 0 + 1 + 3 + 5 = 9."
    },
    {
        id: "q6",
        topic: "Tuples & Immutability",
        codeSnippet: `tup = (1, 2, 3)
tup[0] = 10
print(tup)`,
        question: "What happens when you attempt to modify a tuple element?",
        options: [
            { id: "A", text: "(10, 2, 3)" },
            { id: "B", text: "TypeError: 'tuple' object does not support item assignment" },
            { id: "C", text: "ValueError" },
            { id: "D", text: "(1, 2, 3, 10)" }
        ],
        correctOption: "B",
        explanation: "Tuples are immutable data structures in Python. Attempting item assignment raises a TypeError at runtime."
    },
    {
        id: "q7",
        topic: "Dictionary Operations",
        codeSnippet: `d = {"a": 1, "b": 2}
print(d.get("c", 0))`,
        question: "What does the dict.get() method return for a missing key with a default?",
        options: [
            { id: "A", text: "KeyError: 'c'" },
            { id: "B", text: "None" },
            { id: "C", text: "0" },
            { id: "D", text: "False" }
        ],
        correctOption: "C",
        explanation: "The get(key, default) method safely retrieves the value for a key without crashing. Because key 'c' does not exist in d, it returns the specified default value 0."
    },
    {
        id: "q8",
        topic: "Python Modules",
        codeSnippet: `import math
print(math.floor(3.9), math.ceil(3.1))`,
        question: "What values will math.floor() and math.ceil() produce?",
        options: [
            { id: "A", text: "3 4" },
            { id: "B", text: "4 3" },
            { id: "C", text: "3.0 4.0" },
            { id: "D", text: "4 4" }
        ],
        correctOption: "A",
        explanation: "math.floor(3.9) rounds downwards to the nearest integer 3, while math.ceil(3.1) rounds upwards to the nearest integer 4."
    }
];
