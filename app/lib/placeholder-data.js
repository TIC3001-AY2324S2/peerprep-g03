// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
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
    caterory: 'Strings, Algorithms',
    complexity: 'Easy',
  },
  {
    id: '2',
    title: 'Linked List Cycle Detection',
    description: 'Implement a function to detect if a linked list contains a cycle.',
    caterory: 'Data Structures, Algorithms',
    complexity: 'Easy',
  },
  {
    id: '3',
    title: 'Roman to Integer',
    description: 'Given a roman numeral, convert it to an integer.',
    caterory: 'Algorithms',
    complexity: 'Easy',
  },
  {
    id: '4',
    title: 'Add Binary',
    description: 'Given two binary strings a and b, return their sum as a binary string.',
    caterory: 'Bit Manipulati on, Algorithms',
    complexity: 'Easy',
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
    caterory: 'Recursion, Algorithms',
    complexity: 'Easy',
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
    caterory: 'Data Structures',
    complexity: 'Easy',
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
    caterory: 'Databases',
    complexity: 'Easy',
  },

];

const questionShowTitleComplexity = question.map(item => {
  return {
    id: item.id,
    title: item.title,
    complexity: item.complexity
  };
});

module.exports = {
  question,
  questionShowTitleComplexity,
};
