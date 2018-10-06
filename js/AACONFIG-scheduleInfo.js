// This file defines the class periods and final exam days.

courseInfo.classPeriods = [
	{
		topic: new Topic("Lecture 1: Syntax, Regular Languages and Regular Expressions", "lectures/lecture01.html"),
		lab: new NumberedLabNoFile(1, "Regular expressions")
	},
	{
		topic: new Topic("Lecture 2: Finite Automata, Lexical Analysis", "lectures/lecture02.html"),
		lab: new NumberedLabNoFile(2, "Finite Automata using JFLAP")
	},
	{
		topic: new Topic("Lecture 3: Designing Finite Automata, Eliminating Nondeterminism", "lectures/lecture03.html"),
		lab: new NumberedLabNoFile(3, "Eliminating nondeterminism")
	},
	{
		topic: new Topic("Lecture 4: Context-Free Languages, Parsing, Ambiguity", "lectures/lecture04.html"),
		lab: new NumberedLabNoFile(4, "Context-free grammars")
	},
	{
		topic: new Topic("Lecture 5: Eliminating Ambiguity, Recursive Descent Parsing", "lectures/lecture05.html"),
		lab: new NumberedLab(5, "Recursive Descent Parsing", "RecursiveDescentJava.zip")
	},
	{
		topic: new Topic("Lecture 6: Precedence Climbing, Abstract Syntax Trees", "lectures/lecture06.html"),
		lab: new NumberedLab(6, "Precedence Climbing", "PrecedenceClimbingJava.zip")
	},
	{
		topic: new Topic("Lecture 7: Turing Machines", "lectures/lecture07.html"),
		lab: new NumberedLabNoFile(7, "Turing Machines")
	},
	{
		topic: new Topic("Lecture 8: Decidability and the Halting Problem", "lectures/lecture08.html"),
		lab: new Lab("No lab", "")
	},
	{
		topic: new Topic("Lecture 9: Decidability of Regular Languages", "lectures/lecture09.html"),
		lab: new Lab("No lab", "")
	},
	{
		topic: new Topic("** Exam 1", "")
	},
	{
		topic: new Topic("Lecture 10: Interpreters", "lectures/lecture10.html"),
		lab: new NumberedLabNoFile(8, "Calculator implementation")
	},
	{
		topic: new Topic("Lecture 11: Interpretation of functions and function calls", "lectures/lecture11.html"),
		lab: new NumberedLabNoFile(9, "Calculator functions")
	},
	{
		topic: new Topic("Lecture 12: Why Clojure?", "lectures/lecture12.html"),
		lab: new NumberedLabNoFile(10, "Clojure warm up")
	},
	{
		topic: new Topic("Lecture 13: Clojure data structures", "lectures/lecture13.html"),
		lab: new NumberedLabNoFile(11, "Can I take you order?")
	},
	{
		topic: new Topic("Lecture 14: Clojure functions", "lectures/lecture14.html"),
		lab: new NumberedLab(12, "Clojure functions", "cs340-lab12.zip")
	},
	{
		topic: new Topic("Lecture 15: Map, filter, reduce, and higher-order functions", "lectures/lecture15.html"),
		lab: new NumberedLab(13, "Tic Tac Toe", "cs340-lab13.zip")
	},
	{
		topic: new Topic("Lecture 16: Recursion and iteration", "lectures/lecture16.html"),
		lab: new NumberedLabNoFile(14, "Recursion in Clojure")
	},
	{
		topic: new Topic("Lecture 17: Clojure macros", "lectures/lecture17.html"),
		lab: new NumberedLabNoFile(15, "Clojure macros")
	},
	{
		topic: new Topic("Clojure review 1", ""),
		lab: new NumberedLab(16, "Clojure review 1", "cs340-lab16.zip")
	},
	{
		topic: new Topic("Clojure review 2", ""),
		lab: new NumberedLab(17, "Clojure review 2", "cs340-lab17.zip")
	},
	{
		topic: new Topic("** Exam 2", "")
	},
];

// The following is for the college-scheduled final exam.
// It is not used if final is on last day of class
courseInfo.finalExamDates = [
		new FinalExamDay("101", new Date("12/15/2018 08:00:00")),
		new FinalExamDay("102", new Date("12/13/2018 10:15:00")),
];

// vim:ts=2:
