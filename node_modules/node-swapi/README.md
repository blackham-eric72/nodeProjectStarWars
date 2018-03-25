# node-swapi

[![npm version](https://img.shields.io/npm/v/node-swapi.svg)](https://www.npmjs.org/package/node-swapi)



Node wrapper around SWAPI - http://swapi.co/

## Requirements
- node: ">6.0.0"

## Installation

```bash
npm install node-swapi
```

## Usage

Require a library:

```javascript
// Require entire library
const SWAPI = require('node-swapi');

// or just a particular part, e. g. person
const {person} = require('node-swapi');
```

Request data from the server
```javascript


// get list of people 
SWAPI.people.list()
  .then((data) => {
    data.results.map((item) => {
      console.log(item.name);
    });
  })
  .catch((error) => {
    console.log(error);
  })

// get person with id 1
SWAPI.people.get(1)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })

// search for Luke Skywalker
SWAPI.people.search('Luke')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })

```
