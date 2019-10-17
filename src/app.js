import { fetchData } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga';

// rickymorty entry point
const url = 'https://rickandmortyapi.com/api/character/';

/**
 * Main App
 * @param data all rickyandmorty database
 */
const runApp = data => {
  //Resolvers y typedefs aquí

  data.forEach(element => {
    console.log(`${element.id}: ${element.name}`);
  });
};

// main program
fetchData(runApp, url);
