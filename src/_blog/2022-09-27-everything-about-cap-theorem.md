---
title: Everything you want to know about the CAP theorem
description: >-
  What is CAP theorem, why it's confusing and how does the PACELC
  theorem solve some of its issues

---

CAP in CAP theorem (or Brewer's theorem) stands for **Consistency**,
**Availability** and **Partition tolerance.** What do these terms mean?

## Definition of the CAP theorem

In any stateful distributed system (specifically a distributed system with
nodes that **replicate** their state onto other nodes), **Partition** means the
isolation of one or more nodes in the system due to network failure. A system
must **tolerate Partition,** i.e., make some tough choices whenever a partition
occurs. One of those choices is between **consistency** and **availability:**

* **Consistency** means that the system returns either the latest data or errors.
* **Availability** means that the system produces a non-error response every time.

_CAP theorem states that such a system must choose between consistency and
availability **in case of a network partition.**_

### An example

Here's an example demonstrating how developers use the CAP theorem to design
distributed systems:

There are three nodes in the distributed system, each sharing an integral state
through replication. Assume the initial state on all three nodes as 0.

1. Write request sent to Node 1 to set state equal to 100.
1. Node 1 tries replicating the result to all the other nodes in the system.
1. Due to a network partition between Node 1 and 2, Node 2 does not receive the
   update and now holds the outdated state.
1. Node 2 receives a read request.

The system must now decide whether to return the outdated result or error.

### Types of systems

If the system decides to return the stale result, it implies that the system
prioritises availability over consistency. These systems are called **AP
(Available and Partition tolerant)** Systems. Example: Cassandra. These systems
are helpful where the correctness of the result is not as important. A good
real world example would be the upvote count on Reddit.

Whereas, if the system decides to return an error, it implies that the system
gives priority to consistency over availability. These systems are called **CP
(Consistent and Partition tolerant)** Systems. Example: PostgreSQL. Banking
systems are highly consistent and do not compromise consistency for
availability.

## Classical definition

Originally, the CAP theorem states that the system can provide only two of the
following guarantees – consistency, availability or Partition tolerance. This
definition of the CAP theorem can be misleading since having a CA System is
practically impossible. Moreover, neglecting partition tolerance in favour of
consistency or availability does not make sense even theoretically. There have
been many criticisms of the theorem due to this definition giving birth to the
famous PACELC theorem, which extends and lays down the criteria for design
decisions more clearly.

## The PACELC Theorem

CAP theorem only states that you cannot achieve a perfectly available and
consistent system given network partitions might occur. People confuse the
theorem a lot due to its definition. As a result, the PACELC theorem was born.
The meaning of the PACELC theorem is understood when expanding the
abbreviation:

In the case of a **network partition (P)** in a stateful distributed system,
one has to choose between **availability (A)** and **consistency (C)**, but
**else (E)**, in the absence of partitions, one has to choose between **lower
latency (L)** and **consistency (C).**

The first part of the theorem (PAC) is precisely the CAP theorem but is more
explicit. The second part (ELC) introduces a new term – **latency.** Latency is
the time it takes for data to pass from one point on a network to another.

Earlier, people often used to confuse the CAP theorem even when there was no
network partition. Since the theorem never explicitly stated the tradeoff
between consistency and availability was because of partitions, having **lower
latency** was often confused with availability. Indeed, distributed systems
can't be perfect even with no partitions.

### A world without partitions

Taking the same example as mentioned above in CAP theorem, assume the following scenario:

1. Write request sent to Node 1 to set state equal to 100.
1. Node 1 has the latest state, 100, and it starts to replicate the state to
   all other nodes.
1. The client tries to read from Node 2.

Now the system has two choices – to return the stale result immediately
**(lower latency)** or to wait for the latest state from Node 1 and then return
the correct result **(consistency).**

### Types of PACELC systems

When talking about partitions, an AP system in PACELC is called a **PA**
system, and a CP system is called a **PC.**

Else, the system can either choose between lower latency and consistency,
hence:

* A system that prioritizes lower latency over consistency is an **EL (Else
  lower Latency)** system.
* A system that prioritizes consistency over lower latency is an **EC (Else
  Consistency)** system.

Therefore, there can be four kinds of PACELC systems:

1. **PA/EL:** In case of partition be available else choose lower latency.
1. **PA/EC:** In case of partition be available else choose consistency.
1. **PC/EL:** In case of partition be consistent else choose lower latency.
1. **PC/EC:** In case of partition be consistent else choose consistency.

It might seem that any PC system would also be an EC system and vice-versa.
Even though most of the systems we see are PA/EL (e.g., Cassandra) or PC/EC
(e.g., PostgreSQL), there are some notable exceptions. Many databases like
Dynamo, Cassandra and Riak have user-adjustable settings to control the
tradeoff between lower latency and consistency.

## Some final thoughts

Designing a distributed system is challenging. There are tradeoffs everywhere.
You might develop a distributed system to achieve high availability, but in
doing so, you lose consistency in certain unavoidable conditions. Perhaps you
need a distributed system to parallelize a heavy workload or increase
throughput. There can be a million different reasons, but they come with
complexities. Understanding the various systems' tradeoffs is vital since all
applications serve a unique purpose.

## References (and recommended reads)

1. [CAP Theorem](https://en.wikipedia.org/wiki/CAP_theorem): Wikipedia
1. [Problems with CAP, and Yahoo’s little known NoSQL
   system](http://dbmsmusings.blogspot.com/2010/04/problems-with-cap-and-yahoos-little.html):
   The blog that gave rise to PACELC theorem
1. [CAP or no CAP? Understanding when the CAP theorem applies and what it
   means](https://www.alexdebrie.com/posts/when-does-cap-theorem-apply/): An
   amazing article about when the CAP theorem is valid.
