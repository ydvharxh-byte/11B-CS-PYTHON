/**
 * EXAM MODE & QUICK ACCESS DATA
 * Matching the Design Reference:
 * - Quick Access Panel:
 *    1. Complete Syllabus
 *    2. Important Topics
 *    3. Formula / Syntax Sheet
 *    4. One Day Revision
 * - Exam Mode Engine (Timed CBSE Mock Tests with automatic grading)
 */

export const quickAccessItems = [
    {
        id: "complete-syllabus",
        title: "Complete Syllabus",
        subtitle: "Unit-wise course structure and duration",
        iconType: "doc",
        tag: "CBSE 2026-27",
        type: "syllabus-view"
    },
    {
        id: "important-topics",
        title: "Important Topics",
        subtitle: "Key concepts and summaries",
        iconType: "star",
        tag: "High Yield",
        type: "topics-view"
    },
    {
        id: "syntax-sheet",
        title: "Formula / Syntax Sheet",
        subtitle: "Quick reference guide",
        iconType: "sheet",
        tag: "Cheat Sheet",
        type: "syntax-view"
    },
    {
        id: "one-day-revision",
        title: "One Day Revision",
        subtitle: "Last minute preparation",
        iconType: "clock",
        tag: "Exam Ready",
        type: "revision-view"
    }
];

export const highYieldTopics = [
    {
        unit: "Unit 1: Computer Systems (10 Marks)",
        topics: [
            {
                name: "Number System Conversions",
                marks: "2-3 Marks",
                summary: "Conversions between Binary, Decimal, Octal, and Hexadecimal. Remember: group binary digits in 3s for Octal and 4s for Hexadecimal."
            },
            {
                name: "Boolean Logic & De Morgan's Laws",
                marks: "2-3 Marks",
                summary: "Truth table construction for basic and universal gates (NAND, NOR). Proof of (A+B)' = A'.B' and (A.B)' = A'+B'."
            },
            {
                name: "Memory Hierarchy & Units",
                marks: "1-2 Marks",
                summary: "RAM vs ROM, Cache memory speed vs capacity, and conversion order: Bit < Byte < KB < MB < GB < TB < PB."
            },
            {
                name: "Operating System Functions",
                marks: "2 Marks",
                summary: "Processor management, Memory management, File system management, and Device driver management."
            }
        ]
    },
    {
        unit: "Unit 2: Computational Thinking & Python (45 Marks)",
        topics: [
            {
                name: "String Slicing & Built-in Methods",
                marks: "4-6 Marks",
                summary: "Slicing rules s[start:stop:step], negative index calculation, and common methods: split(), join(), replace(), isalnum(), isdigit()."
            },
            {
                name: "List Operations & Mutability",
                marks: "5-7 Marks",
                summary: "Differences between append() vs extend(), pop() vs remove(), sort() vs sorted(), and shallow vs deep assignment."
            },
            {
                name: "Dictionary Key Constraints & Methods",
                marks: "4-5 Marks",
                summary: "Keys must be immutable (str, int, tuple). Understanding dict.get(key, default), keys(), values(), items(), and update()."
            },
            {
                name: "Loop Tracing & Output Prediction",
                marks: "6-8 Marks",
                summary: "Nested loops, range(start, stop, step) step boundaries, and effects of break vs continue statements."
            },
            {
                name: "Python Standard Modules",
                marks: "3-4 Marks",
                summary: "math.ceil() vs math.floor(), math.sqrt(), random.randint(a,b) (both inclusive!) vs random.randrange(a,b) (stop exclusive), statistics.mean/median/mode."
            },
            {
                name: "Operator Precedence & Expressions",
                marks: "2-3 Marks",
                summary: "Precedence order: ** (right-to-left) > *, /, //, % > +, - > Relational > not > and > or."
            }
        ]
    },
    {
        unit: "Unit 3: Society, Law and Ethics (15 Marks)",
        topics: [
            {
                name: "Cyber Safety & Common Cyber Crimes",
                marks: "4-5 Marks",
                summary: "Phishing, Hacking, Identity Theft, Malware (Virus, Worm, Trojan, Ransomware), and safe browsing with cookies."
            },
            {
                name: "Intellectual Property Rights & Licenses",
                marks: "3-4 Marks",
                summary: "Differences between Copyright, Patent, and Trademark. Open source licenses (GPL, Apache, Creative Commons) vs Proprietary software."
            },
            {
                name: "Digital Footprints & Netiquettes",
                marks: "3 Marks",
                summary: "Active vs passive digital footprints. Online manners, email etiquette, and prevention of cyberbullying."
            },
            {
                name: "E-Waste Hazards & IT Act 2000",
                marks: "3-4 Marks",
                summary: "Toxic constituents of e-waste (Lead, Mercury), recycling guidelines, and reporting to Cyber Cells under IT Act 2000."
            }
        ]
    }
];

export const syntaxCheatSheet = {
    operators: [
        { symbol: "**", name: "Exponentiation", example: "2 ** 3 -> 8", notes: "Right-associative!" },
        { symbol: "//", name: "Floor Division", example: "17 // 5 -> 3", notes: "Truncates fractional part" },
        { symbol: "%", name: "Modulus", example: "17 % 5 -> 2", notes: "Remainder of division" },
        { symbol: "in / not in", name: "Membership", example: "'a' in 'rewari' -> True", notes: "Works on strings, lists, tuples, dict keys" },
        { symbol: "is / is not", name: "Identity", example: "a is b", notes: "Checks if id(a) == id(b)" }
    ],
    stringMethods: [
        { method: "s.strip()", desc: "Removes leading/trailing whitespaces" },
        { method: "s.split(sep)", desc: "Splits string by sep into a list of strings" },
        { method: "sep.join(list)", desc: "Joins list elements into single string separated by sep" },
        { method: "s.find(sub)", desc: "Returns lowest index of sub, or -1 if not found" },
        { method: "s.replace(old, new)", desc: "Returns copy with all occurrences of old replaced by new" },
        { method: "s.count(sub)", desc: "Returns total non-overlapping occurrences of sub" }
    ],
    listMethods: [
        { method: "L.append(x)", desc: "Adds single element x to the end of list" },
        { method: "L.extend(iterable)", desc: "Appends all elements of iterable to list" },
        { method: "L.insert(i, x)", desc: "Inserts item x at index i" },
        { method: "L.pop([i])", desc: "Removes and returns item at index i (default last)" },
        { method: "L.remove(x)", desc: "Removes first item from list whose value is x" },
        { method: "L.sort(reverse=False)", desc: "Sorts list in-place (returns None!)" }
    ],
    dictMethods: [
        { method: "D.get(key, default)", desc: "Safe key access; returns default if key missing" },
        { method: "D.keys()", desc: "Returns dict_keys view of all keys" },
        { method: "D.values()", desc: "Returns dict_values view of all values" },
        { method: "D.items()", desc: "Returns dict_items view of (key, value) pairs" },
        { method: "D.update(other)", desc: "Updates D with key-value pairs from other" },
        { method: "D.pop(key)", desc: "Removes key and returns its value" }
    ],
    modules: [
        { method: "math.ceil(x)", desc: "Smallest integer >= x (e.g., ceil(4.1) -> 5)" },
        { method: "math.floor(x)", desc: "Largest integer <= x (e.g., floor(4.9) -> 4)" },
        { method: "math.sqrt(x)", desc: "Returns square root as float (e.g., sqrt(16) -> 4.0)" },
        { method: "random.randint(a, b)", desc: "Random int in [a, b] inclusive!" },
        { method: "random.randrange(a, b, step)", desc: "Random int from range(a, b, step)" },
        { method: "statistics.mean(data)", desc: "Arithmetic mean of sequence" },
        { method: "statistics.median(data)", desc: "Middle value of sorted dataset" },
        { method: "statistics.mode(data)", desc: "Most frequent value in dataset" }
    ]
};

export const oneDayRevisionGuide = [
    {
        title: "1. 10 Rules You MUST Remember in the Exam Hall",
        points: [
            "Strings and Tuples are IMMUTABLE. You cannot do `s[0] = 'a'` or `t[1] = 99` (raises TypeError).",
            "Lists and Dictionaries are MUTABLE. They can be modified in-place.",
            "Dictionary keys MUST be immutable (Strings, Numbers, Tuples). Lists cannot be dictionary keys!",
            "`random.randint(1, 6)` includes BOTH 1 and 6. `random.randrange(1, 6)` includes 1 to 5 only.",
            "`list.sort()` sorts IN-PLACE and returns `None`. `sorted(list)` returns a NEW sorted list.",
            "`append([1, 2])` adds the list as a single nested element; `extend([1, 2])` unpacks elements.",
            "Division `/` always returns a `float` in Python 3 (e.g., `4 / 2 -> 2.0`).",
            "Floor division `//` truncates down (e.g., `7 // 2 -> 3`, `-7 // 2 -> -4`).",
            "Variable identifiers cannot start with a digit, and cannot be keywords (e.g., `2nd_var` is invalid).",
            "De Morgan's Laws: `not (A or B) == (not A and not B)` and `not (A and B) == (not A or not B)`."
        ]
    },
    {
        title: "2. Common Python Traps & Output Prediction Checklist",
        points: [
            "Check loop bounds carefully: `range(1, 5)` loops for `i = 1, 2, 3, 4` (stops BEFORE 5).",
            "Negative step slicing: `s = 'ABCDE'; s[::-1]` reverses the string to `'EDCBA'`.",
            "Default parameters in functions evaluate once at definition time.",
            "Remember that single-element tuple requires a comma: `t = (5,)` is a tuple, but `t = (5)` is an integer!",
            "Boolean values `True` and `False` are capitalized in Python."
        ]
    },
    {
        title: "3. Top Viva-Voce Questions for Practical Exam (30 Marks)",
        points: [
            "Q: What is the difference between interactive mode and script mode in Python? (Interactive executes immediately, script saves .py file).",
            "Q: Why is Python called dynamically typed? (Variable types are resolved at runtime, no explicit declaration needed).",
            "Q: How does a compiler differ from an interpreter? (Compiler converts full source to machine code at once; interpreter translates line-by-line).",
            "Q: What is a token? Name all 5 types. (Keywords, Identifiers, Literals, Operators, Punctuators).",
            "Q: What is the difference between shallow copy and deep copy? (Shallow copy duplicates top-level structure, deep copy duplicates all nested objects recursively)."
        ]
    }
];

export const officialMockExams = [
    {
        id: "mock-01",
        title: "CBSE Class 11 CS Term-End Comprehensive Mock Exam",
        durationMinutes: 30,
        totalMarks: 25,
        instructions: [
            "This test follows the official CBSE Class 11 Computer Science (083) pattern.",
            "Each question carries 1 mark. There is no negative marking.",
            "You can navigate freely, mark questions for review, and change answers before final submission.",
            "Timer will countdown automatically. Submit before time expires."
        ],
        questions: [
            {
                id: "m1_q1",
                unit: "Unit 1",
                question: "Which of the following logic gates is known as a Universal Gate?",
                options: [
                    { id: "A", text: "AND Gate" },
                    { id: "B", text: "OR Gate" },
                    { id: "C", text: "NAND Gate" },
                    { id: "D", text: "NOT Gate" }
                ],
                correctOption: "C",
                explanation: "NAND and NOR are called Universal Gates because any Boolean logic function or circuit can be implemented using only NAND or only NOR gates."
            },
            {
                id: "m1_q2",
                unit: "Unit 1",
                question: "Convert the binary number (110101)₂ into its Decimal equivalent.",
                options: [
                    { id: "A", text: "45" },
                    { id: "B", text: "53" },
                    { id: "C", text: "55" },
                    { id: "D", text: "61" }
                ],
                correctOption: "B",
                explanation: "1×2⁵ + 1×2⁴ + 0×2³ + 1×2² + 0×2¹ + 1×2⁰ = 32 + 16 + 0 + 4 + 0 + 1 = 53."
            },
            {
                id: "m1_q3",
                unit: "Unit 2",
                question: "Which of the following is an INVALID Python identifier?",
                options: [
                    { id: "A", text: "_roll_number" },
                    { id: "B", text: "student_11b" },
                    { id: "C", text: "2nd_term" },
                    { id: "D", text: "KV_Rewari" }
                ],
                correctOption: "C",
                explanation: "In Python, identifier names cannot begin with a numeric digit. '2nd_term' starts with '2', violating identifier naming rules."
            },
            {
                id: "m1_q4",
                unit: "Unit 2",
                codeSnippet: `x = 20
def change():
    x = 30
change()
print(x)`,
                question: "What will be printed upon executing the code?",
                options: [
                    { id: "A", text: "30" },
                    { id: "B", text: "20" },
                    { id: "C", text: "50" },
                    { id: "D", text: "UnboundLocalError" }
                ],
                correctOption: "B",
                explanation: "Inside the function change(), x = 30 creates a local variable x. The global x remains 20. Hence print(x) outside prints 20."
            },
            {
                id: "m1_q5",
                unit: "Unit 2",
                codeSnippet: `s = "PM SHRI KV REWARI"
print(s[-6:-2])`,
                question: "What is the output of the string slice?",
                options: [
                    { id: "A", text: "'REWA'" },
                    { id: "B", text: "'REWAR'" },
                    { id: "C", text: "'EWAR'" },
                    { id: "D", text: "'WARI'" }
                ],
                correctOption: "A",
                explanation: "In 'PM SHRI KV REWARI', index -6 is 'R', -5 is 'E', -4 is 'W', -3 is 'A', -2 is 'R'. The slice s[-6:-2] extracts up to but not including -2, yielding 'REWA'."
            },
            {
                id: "m1_q6",
                unit: "Unit 2",
                codeSnippet: `d = {"a": 1, "b": 2}
print(d.get("c", 10))`,
                question: "What will d.get('c', 10) return?",
                options: [
                    { id: "A", text: "KeyError" },
                    { id: "B", text: "None" },
                    { id: "C", text: "10" },
                    { id: "D", text: "0" }
                ],
                correctOption: "C",
                explanation: "The get(key, default) method returns the default value (10) when the requested key 'c' does not exist in the dictionary, preventing a KeyError."
            },
            {
                id: "m1_q7",
                unit: "Unit 2",
                codeSnippet: `import random
val = random.randint(10, 15)
print(val)`,
                question: "Which of the following values can NEVER be output by the random snippet?",
                options: [
                    { id: "A", text: "10" },
                    { id: "B", text: "12" },
                    { id: "C", text: "15" },
                    { id: "D", text: "16" }
                ],
                correctOption: "D",
                explanation: "random.randint(a, b) generates an integer N such that a <= N <= b. For (10, 15), possible values are 10, 11, 12, 13, 14, 15. Value 16 can never be generated."
            },
            {
                id: "m1_q8",
                unit: "Unit 2",
                codeSnippet: `t = (10, [20, 30], 40)
t[1].append(50)
print(len(t[1]))`,
                question: "What will be printed after executing the snippet?",
                options: [
                    { id: "A", text: "TypeError: tuple does not support item assignment" },
                    { id: "B", text: "2" },
                    { id: "C", text: "3" },
                    { id: "D", text: "None" }
                ],
                correctOption: "C",
                explanation: "While the tuple t itself is immutable, its second element t[1] is a mutable list. Calling append(50) on that list modifies it in-place to [20, 30, 50]. len(t[1]) is now 3."
            },
            {
                id: "m1_q9",
                unit: "Unit 3",
                question: "A website deliberately sending fake emails that appear to be from a reputed bank in order to steal passwords is an example of:",
                options: [
                    { id: "A", text: "Plagiarism" },
                    { id: "B", text: "Phishing" },
                    { id: "C", text: "Eavesdropping" },
                    { id: "D", text: "Copyright infringement" }
                ],
                correctOption: "B",
                explanation: "Phishing is the fraudulent practice of sending fraudulent communications that appear to come from a reputable source, usually through email, to induce individuals to reveal sensitive personal information."
            },
            {
                id: "m1_q10",
                unit: "Unit 3",
                question: "Under the Indian legal framework, cyber crimes, digital signatures, and electronic records are governed by:",
                options: [
                    { id: "A", text: "Indian Penal Code 1860" },
                    { id: "B", text: "Information Technology Act 2000" },
                    { id: "C", text: "Digital India Act 2014" },
                    { id: "D", text: "Copyright Amendment Act 1957" }
                ],
                correctOption: "B",
                explanation: "The Information Technology Act, 2000 (IT Act 2000) is the primary law in India dealing with cybercrime and electronic commerce."
            }
        ]
    }
];
