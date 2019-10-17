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
  const typeDefs=`
    type Character{
      id: Int!
      name: String
      status: String
      planet: String
    }
    type Query{
      character(id: Int!): Character 
    }
  `
  const resolvers = {
    Query:{
      character: (parent, args, ctx, info) => {
        const result = data.find(obj => obj.id === args.id);

        if(result){
          return {
            id: result.id,
            name: result.name,
            status: result.status,
            planet: result.location.name
          }
        }else return null;

      }
    }
  }
  const server = new GraphQLServer({typeDefs, resolvers});
  server.start();
    // data.forEach(element => {
  //   console.log(`${element.id}: ${element.name}`);
  // });
};

// main program
fetchData(runApp, url);
