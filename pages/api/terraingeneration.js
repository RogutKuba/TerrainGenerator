import { ApolloServer, gql, useMutation } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import { MongoClient } from 'mongodb'

require('dotenv').config();

const typeDefs = gql`

  type Query {
    allTerrains: [Terrain]
    foundTerrain(name: String!): Terrain
  },

  type Mutation {
    newTerrain(_name: String!, _heightNoise: [Int]!, _biomeNoise: [Int]!): String!
    deleteTerrain(_name: String!): String!
  },

  type Terrain {
    name: String
    heightNoise: [Int]
    biomeNoise: [Int]
  }
`

const resolvers = {
  Query: {

    allTerrains(_parent, _args, _context, _info) 
    {
      return _context.db
        .collection('Terrains')
        .find({})
        .toArray()
        .then((data) => {
          return data
        })
    },

    foundTerrain(_parent, _args, _context, _info)
    {
      return  _context.db
        .collection('Terrains')
        .findOne({"name": _args.name})
        .then((data, err) => {
          if(err) console.log(err);
          return data;
        })
    },
  },

  Mutation: {
    newTerrain(_parent, _args, _context, _info){
      var newT = {
          name: _args._name,
          heightNoise: _args._heightNoise,
          biomeNoise: _args._biomeNoise
      };

      return _context.db
      .collection('Terrains')
      .updateOne(
        {name: _args._name}, 
        { $set: { heightNoise: _args._heightNoise, biomeNoise: _args._biomeNoise }},
        {upsert: true}
      )
      .then((data, err) => {
        if(err) console.log(err);
        if(data.upsertedCount == 1)
        {
          return "Inserted";
        } else return "Error";
      });

    },

    deleteTerrain(_parent, _args, _context, _info){
      return _context.db
      .collection('Terrains')
      .deleteOne(
        {
          name: _args._name,
        }, 
      ).then((data, err) => {
        if(err) console.log(err)
        if(data.deletedCount == 1){
          return "Removed"
        } else return "Not Removed"
      })
    },
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

let db

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('TerrainGenerations') // database name
      } catch (e) {
        console.log('--->error while connecting via graphql context (db)', e)
      }
    }

    return { db }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/terraingeneration' })