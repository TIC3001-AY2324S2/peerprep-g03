// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
const categories = [
  {value: '1', label: "Strings"},
  {value: '2', label: "Algorithms"},
  {value: '3', label: "Data Structures"},
  {value: '4', label: "Bit Manipulation"},
  {value: '5', label: "Databases"},
  {value: '6', label: "Brainteaser"},
  {value: '7', label: "Arrays"},
];

const question = [
  {
    id: '1',
    title: 'Reverse a String',
    description: 'Write a function that ' +
    'reverses a string. The ' +
    'input string is given as ' +
    'an array of characters ' +
    's.' +
    'You must do this by ' +
    'modifying the input ' +
    'array in-place with ' +
    'O(1) extra memory.' +
    'Example 1:'+
    'Input: s = '+
    '["h","e","l","l","o"]' +
    'Output: ' +
    '["o","l","l","e","h"]' +
    'Example 2:' +
    'Input: s = ' +
    '["H","a","n","n","a","'+
    'h"]' +
    'Output:' +
    '["h","a","n","n","a","' +
    'H"]'+
    'Constraints:' +
    '1 <= s.length <= 105' +
    's[i] is a printable ascii ' +
    'character.',
    category: 'Strings, Algorithms',
    complexity: 'hard',
  },
  {
    id: '2',
    title: 'Linked List Cycle Detection',
    description: 'Implement a function to detect if a linked list contains a cycle.',
    category: 'Data Structures, Algorithms',
    complexity: 'easy',
  },
  {
    id: '3',
    title: 'Roman to Integer',
    description: 'Given a roman numeral, convert it to an integer.',
    category: 'Algorithms',
    complexity: 'easy',
  },
  {
    id: '4',
    title: 'Add Binary',
    description: 'Given two binary strings a and b, return their sum as a binary string.',
    category: 'Bit Manipulation, Algorithms',
    complexity: 'medium',
  },
  {
    id: '5',
    title: 'Fibonacci Number',
    description: 'The Fibonacci '+
    'numbers, commonly '+
    'denoted F(n) form a '+
    'sequence, called the '+
    'Fibonacci sequence, '+
    'such that each '+
    'number is the sum of '+
    'the two preceding '+
    'ones, starting from 0' +
    'and 1. That is,'+
    'F(0) = 0, F(1) = 1'+
    'F(n) = F(n - 1) + F(n -'+
    '2), for n > 1.'+
    'Given n, calculate '+
    'F(n).',
    category: 'Recursion, Algorithms',
    complexity: 'easy',
  },
  {
    id: '6',
    title: 'Implement Stack using Queues',
    description: 'Implement a last-infirst-out (LIFO) stack '+
    'using only two '+
    'queues. The '+
    'implemented stack '+
    'should support all the '+
    'functions of a normal '+
    'stack (push, top, pop, '+
    'and empty).',
    category: 'Data Structures',
    complexity: 'medium',
  },
  {
    id: '7',
    title: 'Combine Two Tables',
    description: 'Given table Person '+
    'with the following '+
    'columns:'+
    '1. personId (int)'+
    '2. lastName '+
    '(varchar)'+
    '3. firstName' +
    '(varchar)'+
    'personId is the' +
    'primary key.'+
    'And table Address '+
    'with the following '+
    'columns:'+
    '1. addressId '+
    '(int)'+
    '2. personId (int)'+
    '3. city (varchar)'+
    '4. state '+
    '(varchar)'+
    'addressId is the '+
    'primary key.'+
    'Write a solution to '+
    'report the first name, '+
    'last name, city, and '+
    'state of each person '+
    'in the Person table. If '+
    'the address of a '+
    'personId is not '+
    'present in the '+
    'Address table, report '+
    'null instead.'+
    'Return the result '+
    'table in any order.',
    category: 'Databases',
    complexity: 'hard',
  },
  {
    id: '8',
    title: 'Repeated DNA Sequences',
    description: 'The DNA sequence is '+
    'composed of a series '+
    'of nucleotides '+
    "abbreviated as 'A', 'C', "+
    "'G', and 'T'."+
    'For example, '+
    '"ACGAATTCCG" is a '+
    'DNA sequence.'+
    'When studying DNA, '+
    'it is useful to identify '+
    'repeated sequences '+
    'within the DNA.'+
    'Given a string s that '+
    'represents a DNA '+
    'sequence, return all '+
    'the 10-letter-long '+
    'sequences '+
    '(substrings) that '+
    'occur more than once '+
    'in a DNA molecule. '+
    'You may return the '+
    'answer in any order',
    category: 'Algorithms, Bit Manipulation',
    complexity: 'Medium',
  },

];

const questionShowTitleComplexity = question.map(item => {
  return {
    id: item.id,
    title: item.title,
    complexity: item.complexity
  };
});

function askQuestionById(id){
  for (const item of question){
      if (item.id == id){
          return item;
      }
  }
  return null;
}

function askCategoryById(id){
  for (const item of categories){
      if (item.value == id){
          return item;
      }
  }
  return null;
}

module.exports = {
  question,
  questionShowTitleComplexity,
  categories,
  askQuestionById,
  askCategoryById
};
