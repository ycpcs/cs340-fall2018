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
		lab: new NumberedLabNoFile(8, "Exam Review")
	},
	{
		topic: new Topic("Lecture 9: Decidability of Regular Languages", "lectures/lecture09.html"),
		lab: new Lab("No lab", "")
	},
	{
		topic: new Topic("** Exam 1", "")
	},
];

// The following is for the college-scheduled final exam.
// It is not used if final is on last day of class
courseInfo.finalExamDates = [
		new FinalExamDay("101", new Date("12/15/2018 08:00:00")),
		new FinalExamDay("102", new Date("12/13/2018 10:15:00")),
];

// vim:ts=2:
