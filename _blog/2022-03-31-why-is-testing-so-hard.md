---
title: Why is testing so hard?
description: Challenges faced while writing tests and how to overcome them.

---

If you've ever worked as a software engineer, there's a good chance that you
slacked off from writing tests at least once. Your manager probably forces you
to write tests, so you do it. But why does testing code seem so hard? After
all, it's just code. In this post, I want to discuss why testing feels so hard
to do and some techniques that can make it easier.

## Why should you write tests?

Testing is much more than proving that the code you wrote works. It ensures
that the existing code will always work. Your team makes a lot of changes while
developing and maintaining a piece of software. Even the tiniest of changes in
some dependency might break something.

Consider a case where you have to work on a code that you don't understand.
Maybe someone wrote it four years back and then left your company. Tests are a
great reference point for understanding that code. At the same time, you can
make changes to the code without worrying about any bugs that will show up in
production.

Tests motivate you to think about all the cases when things can go wrong.
Writing tests that cover each possibility is itself a task. The habit of
writing tests encourages you to think of all possible bugs, all the edge cases
against which you can test your code.

> What can go wrong when this code goes into the next release?

Thinking like this is quite helpful when writing tests. The idea is never to be
optimistic about the code you wrote.

## Resistance in writing tests

You were already familiar with most of the points mentioned above. What are the
reasons that you still don't feel like writing tests? The answer is the lack of
a testing framework.

You are much more likely to write tests if a framework exists that makes your
job easier. Things like testing a hash function might not require any setup,
but soon enough, you're using the same method in the core of your complicated
system.

For basic stuff, you'll find a lot of testing frameworks. Languages nowadays
have this built into them. For example, in Golang, create a file ending in
`_test.go` in your package. You can use packages like Testify to simplify
writing those if statements. Rust also comes with a testing framework on its
own. You'll find tons of libraries for languages that don't have this ability.
For a C++ program, you can use GoogleTest (which easily integrates with CMake
and Bazel) or Catch2, a header-only framework.

But the problem does not solve itself there. Tests are not only about comparing
the actual to the expected output. These frameworks only provide assertions
like `ASSERT_EQUAL` and not
`ASSERT_FILE_CREATED_FROM_PROCESS_HAS_CORRECT_FORMAT`.

Each kind of test requires a unique setup or "framework". This framework
includes utilities to set up an environment for that test, execute the
necessary steps and check if the result is valid. Say you want to calculate the
hash of a directory (recursively) and store it in a file. The tests you need to
write to verify the same are:

1. The hash of a known test directory is equal to an expected value.
1. Two directories with different tree structures should have different hash
   values.
1. The probability of a hash collision is lower than some percentage.
1. The file format of the file that stores the hashes is consistent.
1. Given an existing file and test directories, the process can run smoothly.

Whoa! That was a lot to test for such a simple thing. But as you can see, at
each of the steps described, something could go wrong very quickly. So what
kind of framework is required? You need some test data against which you have
the correct results. A script or test can generate the data. That's most of
your framework. Then you need the outputs against which you can compare. Not
going to lie, this is some busywork. You're not always lucky that you can use
`==` to assert the output. So, finally, you need utility functions to compare
the output data.

## Overcoming challenges

Once you have a framework ready, adding more test cases is pretty
straightforward. But how do you overcome the barrier of creating a framework
that suits your needs?

### Unit testing

Break down your code into various components. Take the example mentioned
earlier. Write a module responsible for calculating the hash and another that
creates a file with a list of key-value pairs. Test both of them individually.
You require a straightforward setup for both of them, given the lack of
constraints. Finally, this will help you in creating the test data. For
example, the hash function takes an array of bytes as input. You now need a
setup that makes test data that your code will translate into a target array.
This methodology is much simpler than figuring out your test data result.

### Write code that's easier to test

> Beautiful code is something you can test with ease.

You want to test how your code handles whenever there's a hash collision. Does
it calculate a new hash, throw an error or overwrite the existing key? Your
hash is a 64-bit integer. You might need to run the process `2^64` times to get
a hash collision. It's not just the number of iterations, but each iteration's
cost is high. Now imagine if your hash function took a maximum value as an
argument. The method essentially returned `the hash % maximum value`. Writing
the test is quite simplified now. While the maximum value will be set to
`2^64-1` in production, setting the maximum value to a smaller value in the
test gets you a very predictable collision.

---

Writing tests is hard, but it's also essential. Writing good tests allows you
to make changes quickly, release frequently, worry less about bugs, and make
you, and others around you, a better developer. There are other challenges that
you will face while writing tests. Understanding what those issues are will
help you in tackling them.

I never wrote tests before I started working professionally. I tested all my
projects manually. Developing the habit of writing tests and following the
paradigms of Test Driven Development does help in the long term. It makes
better software. Everything mentioned in this post is what I learned from my
experience in the past year as a new professional developer.
