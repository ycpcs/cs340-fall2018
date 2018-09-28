---
layout: default
title: "Assignment 4: Calculator"
---

*Note: this assignment description is incomplete and will be updated*

**Due**: Friday, Oct 12th by 11:59 PM

Getting Started
===============

Download [CS340\_Assign04.zip](CS340_Assign04.zip) and unzip it.

Import it into Eclipse **Using File&rarr;Import...&rarr;General&rarr;Existing projects into workspace&rarr;Archive File**.  You should see a project called **CS340\_Assign04** in your Eclipse workspace.

The starting code for the assignment is based on the precedence climbing parser from Lab 6, with some improvements.

## Lexer changes

The lexical analyzer has been changed so that

* Parentheses and exponentiation are supported (changes which you also implemented in Lab 6)
* Arbitrary Java-style identifiers are allowed, not just **a** and **b**.  Also, **fn** is recognized as a keyword (and thus is not considered to be an identifier)
* Arbitrary integer literals are allowed, not just the digits **0** through **9**
* The equals sign (**=**), meaning assignment operator, is a valid token
* A comma (**,**) is a valid token
* Left and right curly braces (**{** and **}**) are valid tokens

## Parser changes

The precedence climbing parser supports exponentiation (higher precedence than <b>*</b> and **/**, and right associative) and **=** for assignment (lower precedence than **+** and **-**, and is right associative).

The grammar is expanded to add support for functions and function calls.  In the productions below, note that *Expression* refers to an arbitrary infix expression handled by the precedence climbing parser, and so should be considered to be the start symbol, even though it isn't on the left hand side of any of the productions.  Also note that <b>int_literal</b> and **identifier** are terminal symbols (tokens), as are the symbols

> **(** **)** **{** **,**

Also note that ε means the empty string.

Here are the grammar productions:

> *PrimaryExpression* &rarr; <b>int_literal</b>
>
> *PrimaryExpression* &rarr; **identifier**
>
> *PrimaryExpression* &rarr; **identifier** **(** *OptArgumentList* **)**
>
> *OptArgumentList* &rarr; *ArgumentList*
>
> *OptArgumentList* &rarr; ε
>
> *ArgumentList* &rarr; *Expression*
>
> *ArgumentList* &rarr; *Expression* **,** *ExpressionList*
>
> *PrimaryExpression* &rarr; *Expression*
>
> *PrimaryExpression* &rarr; **fn** **(** *OptParameterList* **)** **{** *Expression* **}**
>
> *OptParameterList* &rarr; *ParameterList*
>
> *OptParameterList* &rarr; ε
>
> *ParameterList* &rarr; **identifier**
>
> *ParameterList* &rarr; **identifier** **,** *ParameterList*

The parser fully implements all of these productions: you will not need to modify the parser.  However, understanding the grammar rules will be helpful in understanding the structure of the parse trees that your **Interpreter** class will evaluate.

Your Task
=========

Your task is to turn the infix expression grammar we developed in [Lecture 4](../lectures/lecture04.html) and [Lecture 5](../lectures/lecture05.html) and also [Lab 5](../labs/lab05.html) and [Lab 6](../labs/lab06.html) and turn it into a calculator program supporting:

* evaluating arbitrary expressions
* functions and function calls

While not *quite* a full programming language, it will be pretty close, and could be turned into one with a bit of extra work.

## Basic ideas and concepts

Yeah.

## Step 1

Your first step should be to add support for literals, variable references, and binary operators other than assignment.

When these features implemented, the program will serve as a basic calculator.  Note that the only variable that will exist is called **theAnswer**, and its value is **42**.

Example session (user input in **bold**):

<pre>
Enter expressions (type 'quit' when finished):
> <b>4*5+3</b>
PLUS
+--TIMES
|  +--PRIMARY
|  |  +--INT_LITERAL("4")
|  +--PRIMARY
|     +--INT_LITERAL("5")
+--PRIMARY
   +--INT_LITERAL("3")
=> 23
> <b>2^(4-(2*1))</b>
EXP
+--PRIMARY
|  +--INT_LITERAL("2")
+--PRIMARY
   +--LPAREN("(")
   +--MINUS
   |  +--PRIMARY
   |  |  +--INT_LITERAL("4")
   |  +--PRIMARY
   |     +--LPAREN("(")
   |     +--TIMES
   |     |  +--PRIMARY
   |     |  |  +--INT_LITERAL("2")
   |     |  +--PRIMARY
   |     |     +--INT_LITERAL("1")
   |     +--RPAREN(")")
   +--RPAREN(")")
=> 4
> <b>theAnswer</b>
PRIMARY
+--IDENTIFIER("theAnswer")
=> 42
> <b>theAnswer / 2</b>
DIVIDES
+--PRIMARY
|  +--IDENTIFIER("theAnswer")
+--PRIMARY
   +--INT_LITERAL("2")
=> 21
</pre>

### Hints

Add code to the `evaluate` method in the **Interpreter** class to handle the following kinds of parse nodes:

* **PRIMARY** (modify suport parenthesized expressions)
* **PLUS**
* **MINUS**
* **TIMES**
* **DIVIDES**
* **EXP**
* **IDENTIFIER**

Note that **IDENTIFIER** nodes are variable references.  To handle them, look up the value of the variable using the `env` parameter, which is an **Environment** object.

Note that handling the **PLUS**, **MINUS**, **TIMES**, **DIVIDES**, and **EXP** node types will involve recursive evaluation of the left and right child subexpressions.

## Step 2

Your second step should be to implement the assignment operator by changing the `evaluate` method to handle **ASSIGN** nodes.

Example session (user input in **bold**):

<pre>
> <b>a = 4</b>
ASSIGN
+--PRIMARY
|  +--IDENTIFIER("a")
+--PRIMARY
   +--INT_LITERAL("4")
=> 4
> <b>b = 5</b>
ASSIGN
+--PRIMARY
|  +--IDENTIFIER("b")
+--PRIMARY
   +--INT_LITERAL("5")
=> 5
> <b>a+b*3</b>
PLUS
+--PRIMARY
|  +--IDENTIFIER("a")
+--TIMES
   +--PRIMARY
   |  +--IDENTIFIER("b")
   +--PRIMARY
      +--INT_LITERAL("3")
=> 19
> <b>theAnswer=43</b>
ASSIGN
+--PRIMARY
|  +--IDENTIFIER("theAnswer")
+--PRIMARY
   +--INT_LITERAL("43")
=> 43
> <b>theAnswer</b>
PRIMARY
+--IDENTIFIER("theAnswer")
=> 43
</pre>

### Hints

Your code should recursively evaluate the right subexpression to find its value.  Then, it should find the identifier in the left subtree.  If there isn't an identifier on the left hand side of the assignment, throw an **EvaluationException**.  If an idenifier is found on the left hand side of the assignment, call the `put` method on the `env` object to bind (assign) the evaluated value to the variable.

If you have a node whose symbol is **IDENTIFIER**, it will have a token which in turn will contain the name of the variable as its lexeme.  So, you can use code like the following to extract the variable name:

{% highlight java %}
Node identNode = ...

String varName = identNode.getToken().getLexeme();
{% endhighlight %}

Also note: the result of evaluating an **ASSIGN** node should be the value found by recursively evaluating the subexpression on the right hand side of the assignment.

## Step 3

The third step is to add support for functions and function calls.

Example session (user input in **bold**):

<pre>
> <b>f = fn(x) { x * 2 }</b>
ASSIGN
+--PRIMARY
|  +--IDENTIFIER("f")
+--PRIMARY
   +--FN_KEYWORD("fn")
   +--LPAREN("(")
   +--OPT_PARAMETER_LIST
   |  +--PARAMETER_LIST
   |     +--IDENTIFIER("x")
   +--RPAREN(")")
   +--LBRACE("{")
   +--TIMES
   |  +--PRIMARY
   |  |  +--IDENTIFIER("x")
   |  +--PRIMARY
   |     +--INT_LITERAL("2")
   +--RBRACE("}")
=> &lt;&lt;function&gt;&gt;
> <b>f(3)</b>
PRIMARY
+--IDENTIFIER("f")
+--LPAREN("(")
+--OPT_ARGUMENT_LIST
|  +--ARGUMENT_LIST
|     +--PRIMARY
|        +--INT_LITERAL("3")
+--RPAREN(")")
=> 6
> <b>f(f(4))</b>
PRIMARY
+--IDENTIFIER("f")
+--LPAREN("(")
+--OPT_ARGUMENT_LIST
|  +--ARGUMENT_LIST
|     +--PRIMARY
|        +--IDENTIFIER("f")
|        +--LPAREN("(")
|        +--OPT_ARGUMENT_LIST
|        |  +--ARGUMENT_LIST
|        |     +--PRIMARY
|        |        +--INT_LITERAL("4")
|        +--RPAREN(")")
+--RPAREN(")")
=> 16
> <b>g = fn(y) { f(y+1) }</b>
ASSIGN
+--PRIMARY
|  +--IDENTIFIER("g")
+--PRIMARY
   +--FN_KEYWORD("fn")
   +--LPAREN("(")
   +--OPT_PARAMETER_LIST
   |  +--PARAMETER_LIST
   |     +--IDENTIFIER("y")
   +--RPAREN(")")
   +--LBRACE("{")
   +--PRIMARY
   |  +--IDENTIFIER("f")
   |  +--LPAREN("(")
   |  +--OPT_ARGUMENT_LIST
   |  |  +--ARGUMENT_LIST
   |  |     +--PLUS
   |  |        +--PRIMARY
   |  |        |  +--IDENTIFIER("y")
   |  |        +--PRIMARY
   |  |           +--INT_LITERAL("1")
   |  +--RPAREN(")")
   +--RBRACE("}")
=> &lt;&lt;function&gt;&gt;
> <b>g(3)</b>
PRIMARY
+--IDENTIFIER("g")
+--LPAREN("(")
+--OPT_ARGUMENT_LIST
|  +--ARGUMENT_LIST
|     +--PRIMARY
|        +--INT_LITERAL("3")
+--RPAREN(")")
=> 8
</pre>

### Hints

To evaluate a function:

1. Gather all of the parameter names into a **List**
2. Create a **FunctionValue** object with the collected parameter list and the body expression as its body

The result of evaluating a function is the **FunctionValue**.

Note that a traversal of the **OPT\_PARAMETER\_LIST** subtree will be needed to collect all of the parameter names.

To evaluate a function call:

1. Recursively evaluate the identifier naming the function to find its value (which should be a **FunctionValue**)
2. Gather all of the argument values (storing them in a **List**)
3. Create a new **Environment** with the current environment (`env`) as its parent
4. Use the **put** method to bind (assign) each argument value to its corresponding parameter
5. Return the result of recursively evaluating the called function's body in the new environment

# Submitting

When you are done, submit the lab to the Marmoset server using one of the methods below.

## From Eclipse

If you have the [Simple Marmoset Uploader Plugin](../resources/index.html) installed, select the project (**CS340\_Assign04**) in the package explorer and then press the blue up arrow button in the toolbar. Enter your Marmoset username and password when prompted.

This is the recommended way to submit your work.

## From a web browser

Save the project (**CS340\_Assign04**) to a zip file by right-clicking it and choosing

> **Export...&rarr;Archive File**

Upload the saved zip file to the Marmoset server as **assign04**. The server URL is

> <https://cs.ycp.edu/marmoset/>

Use this method only if there is some reason why you can't use the plugin.

<!-- vim:set wrap: ­-->
<!-- vim:set linebreak: -->
<!-- vim:set nolist: -->
