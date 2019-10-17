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
      characters(name: String, status: String, planet: String, page: Int, pageSize: Int): [Character]!
      planets: [String]
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

      },

      characters: (parent, args, ctx, info) =>{
        const pagina = args.page || 1;
        const paginaSize = args.pageSize || 20;
        const inicio =((pagina-1)* paginaSize);
        const fin = (pagina*paginaSize);
        let arrayResults = data.slice();

        if(args.name){
          arrayResults = arrayResults.filter(obj => obj.name.includes(args.name));
        }
        if(args.status){
          arrayResults = arrayResults.filter(obj => obj.status.includes(args.status));
        }
        if(args.planetas){
          arrayResults = arrayResults.filter(obj => obj.location.name.includes(args.planetas));
        }
        
          return arrayResults
            .slice(inicio, fin)
            .map(character => {
            return {
              id: character.id,
              name: character.name,
              status: character.status,
              planet: character.location.name
            }
          });
        },

        planets:(parent, args, ctx, info) => {
          let array = [];
          data.forEach((element,i) => {
            array.push(data[i].location.name);
          })
          let result = array.filter((value, actualIndex, arr)=> arr.indexOf(value)===actualIndex);
          return result;
        }
      }

    }
  const server = new GraphQLServer({typeDefs, resolvers});
  server.start();
  }
  
  // data.forEach(element => {
  //   console.log(`${element.id}: ${element.name}`);
  // });


// main program
fetchData(runApp, url);
