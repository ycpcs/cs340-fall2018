---
layout: default
title: "Assignment 4: Calculator"
---

*Note: this assignment description is incomplete and will be updated*

**Due**: Thursday, Oct 11th by 11:59 PM

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

The precedence climbing parser supports exponentiation (higher precedence than <b>*</b> and **/**, and right associated) and **=** for assignment (lower precedence than **+** and **-**, and is right associative).

The grammar is expanded to add support for functions and function calls.  These are the grammar rules.  Note that *Expression* refers to an arbitrary infix expression handled by the precedence climbing parser.  Also note that <b>int_literal</b>, **identifier**, "fn", "(", ")", and "{" are terminal symbols (tokens), and that ε means the empty string.

> *PrimaryExpression* &rarr; <b>int_literal</b>
>
> *PrimaryExpression* &rarr; **identifier**
>
> *PrimaryExpression* &rarr; **identifier** "(" *OptArgumentList* ")
>
> *OptArgumentList* &rarr; *ArgumentList*
>
> *OptArgumentList* &rarr; ε
>
> *ArgumentList* &rarr; *Expression*
>
> *ArgumentList* &rarr; *Expression* "," *ExpressionList*
>
> *PrimaryExpression* &rarr; *Expression*
>
> *PrimaryExpression* &rarr; "fn" "(" *OptParameterList* ")" "{" *Expression* "}"
>
> *OptParameterList* &rarr; *ParameterList*
>
> *OptParameterList* &rarr; ε
>
> *ParameterList* &rarr; **identifier**
>
> *ParameterList* &rarr; **identifier** "," *ParameterList*

The parser fully implements all of these productions: you will not need to modify the parser.  However, understanding the grammar rules will be helpful in understanding the structure of the parse trees that your **Interpreter** class will evaluate.

Your Task
=========

Your task is to turn the infix expression grammar we developed in [Lecture 4](../lectures/lecture04.html) and [Lecture 5](../lectures/lecture05.html) and also [Lab 5](../labs/lab05.html) and [Lab 6](../labs/lab06.html) and turn it into a calculator program supporting:

* evaluating arbitrary expressions
* functions and function calls

While not *quite* a full programming language, it will be pretty close, and could be turned into one with a bit of extra work.

<!-- vim:set wrap: ­-->
<!-- vim:set linebreak: -->
<!-- vim:set nolist: -->
