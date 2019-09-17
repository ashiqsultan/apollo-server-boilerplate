const { ApolloServer, gql } = require('apollo-server');
const WeatherAPI = require('./restdatafetch');
const fetch = require("node-fetch");

//Dummy data
const authorsList = [
    {
        name: 'ashiq'
    },
    {
        name: 'fayaz'
    }
];
const booksList = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: authorsList[0],
        published: '1995',
    },
    {
        title: 'Jurassic Park',
        author: authorsList[1],
        published: '2000',
    },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }
  
  type Author {
    name: String
    books: [Book]
  }

  type Weather{
    timezone: String
    id: String
    name: String
  }

  # The "Query" type is special
  type Query {
    getBooks: [Book]
    getAuthors: [Author]
    getSimpleWeather(cityName:String!): Weather

  }
  type Mutation {
      addBook(title: String, author: String): Book
      }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getBooks: () => booksList,
        getAuthors: () => authorsList,
        // Using only fetch
        // getSimpleWeather: async () => {
        //     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=chennai&appid=36e7bbbb4ce89be60781903189fcc5f1`);
        //     const data = await response.json();
        //     return data;
        // },
        getSimpleWeather: async (_root, arg, { dataSources }) => {
            return dataSources.WeatherAPI.getClimate(arg.cityName);
        },
    },
    Mutation: {
        addBook: (root, arg) => {
            booksList.push({
                title: arg.title,
                author: arg.author,
            })
            console.log(arg.title);
            console.log(booksList)
        }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            WeatherAPI: new WeatherAPI(),
            //personalizationAPI: new PersonalizationAPI(),
        };
    },
    context: () => {
        return {
            token: 'foo',
        };
    },
});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});