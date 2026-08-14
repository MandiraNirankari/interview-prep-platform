const mongoose = require('mongoose')
require('dotenv').config()

const Question = require('./models/Question')

const questions = [
  // =========================
  // ARRAYS
  // =========================

  {
    title: 'Two Sum',
    topic: 'arrays',
    difficulty: 'Easy',
    description:
      'Find two numbers in an array that add up to a target value.',
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    topic: 'arrays',
    difficulty: 'Easy',
    description:
      'Find the maximum profit that can be achieved by buying and selling a stock once.',
  },
  {
    title: 'Maximum Subarray',
    topic: 'arrays',
    difficulty: 'Medium',
    description:
      'Find the contiguous subarray with the largest sum.',
  },
  {
    title: 'Product of Array Except Self',
    topic: 'arrays',
    difficulty: 'Medium',
    description:
      'Return an array where each element is the product of all elements except the element at that index.',
  },

  // =========================
  // STRINGS
  // =========================

  {
    title: 'Valid Anagram',
    topic: 'strings',
    difficulty: 'Easy',
    description:
      'Determine whether two strings are anagrams of each other.',
  },
  {
    title: 'Valid Palindrome',
    topic: 'strings',
    difficulty: 'Easy',
    description:
      'Determine whether a string is a palindrome after ignoring non-alphanumeric characters.',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    topic: 'strings',
    difficulty: 'Medium',
    description:
      'Find the length of the longest substring without repeating characters.',
  },
  {
    title: 'Longest Palindromic Substring',
    topic: 'strings',
    difficulty: 'Medium',
    description:
      'Find the longest palindromic substring in a given string.',
  },

  // =========================
  // LINKED LISTS
  // =========================

  {
    title: 'Reverse Linked List',
    topic: 'linked-lists',
    difficulty: 'Easy',
    description:
      'Reverse a singly linked list and return the new head.',
  },
  {
    title: 'Merge Two Sorted Lists',
    topic: 'linked-lists',
    difficulty: 'Easy',
    description:
      'Merge two sorted linked lists into one sorted linked list.',
  },
  {
    title: 'Linked List Cycle',
    topic: 'linked-lists',
    difficulty: 'Easy',
    description:
      'Determine whether a linked list contains a cycle.',
  },
  {
    title: 'Remove Nth Node From End',
    topic: 'linked-lists',
    difficulty: 'Medium',
    description:
      'Remove the nth node from the end of a linked list.',
  },

  // =========================
  // STACKS & QUEUES
  // =========================

  {
    title: 'Valid Parentheses',
    topic: 'stacks-&-queues',
    difficulty: 'Easy',
    description:
      'Determine whether a string containing brackets is valid.',
  },
  {
    title: 'Min Stack',
    topic: 'stacks-&-queues',
    difficulty: 'Medium',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    topic: 'stacks-&-queues',
    difficulty: 'Medium',
    description:
      'Evaluate an arithmetic expression written in Reverse Polish Notation.',
  },
  {
    title: 'Daily Temperatures',
    topic: 'stacks-&-queues',
    difficulty: 'Medium',
    description:
      'For each day, find how many days you must wait until a warmer temperature.',
  },

  // =========================
  // TREES
  // =========================

  {
    title: 'Maximum Depth of Binary Tree',
    topic: 'trees',
    difficulty: 'Easy',
    description:
      'Find the maximum depth of a binary tree.',
  },
  {
    title: 'Invert Binary Tree',
    topic: 'trees',
    difficulty: 'Easy',
    description:
      'Invert a binary tree by swapping the left and right children of every node.',
  },
  {
    title: 'Binary Tree Level Order Traversal',
    topic: 'trees',
    difficulty: 'Medium',
    description:
      'Return the level order traversal of a binary tree.',
  },
  {
    title: 'Validate Binary Search Tree',
    topic: 'trees',
    difficulty: 'Medium',
    description:
      'Determine whether a binary tree is a valid binary search tree.',
  },

  // =========================
  // GRAPHS
  // =========================

  {
    title: 'Number of Islands',
    topic: 'graphs',
    difficulty: 'Medium',
    description:
      'Count the number of islands in a 2D grid.',
  },
  {
    title: 'Clone Graph',
    topic: 'graphs',
    difficulty: 'Medium',
    description:
      'Return a deep copy of an undirected graph.',
  },
  {
    title: 'Course Schedule',
    topic: 'graphs',
    difficulty: 'Medium',
    description:
      'Determine whether all courses can be completed given prerequisite relationships.',
  },
  {
    title: 'Word Ladder',
    topic: 'graphs',
    difficulty: 'Hard',
    description:
      'Find the shortest transformation sequence from one word to another.',
  },
]

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected successfully')

    await Question.deleteMany({})

    console.log('Existing questions cleared')

    const insertedQuestions =
      await Question.insertMany(questions)

    console.log(
      `${insertedQuestions.length} questions inserted successfully`
    )

    await mongoose.disconnect()

    console.log('MongoDB disconnected')
  } catch (error) {
    console.error(
      'Seeding failed:',
      error.message
    )

    process.exit(1)
  }
}

seedQuestions()