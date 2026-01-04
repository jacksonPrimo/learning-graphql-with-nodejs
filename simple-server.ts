import { ApolloServer, gql } from 'apollo-server'

const users: string[] = []

const typeDefs = gql`
  type Query {
    helloWorld: String!
    users: [String!]!
  }

  type Mutation {
    createUser(name: String!): String!
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => {
        return 'Hello world'
      },
      users: () => {
        return users
      }
    },

    Mutation: {
      createUser: (parent, args, ctx) =>{
        console.log(args)
        users.push(args.name)
        return 'john doe'
      }
    }
  }
})

server.listen().then(({ url }) =>{
  console.log('http server running on', url)
})