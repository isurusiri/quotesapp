const { prisma } = require("./generated/prisma-client");
const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    publishedQuotes(root, args, context) {
      return context.prisma.quotes({ where: { published: true } });
    },
    quotes(root, args, context) {
      return context.prisma.quotes();
    },
    quote(root, args, context) {
      return context.prisma.quote({ where: { id: args.quoteId } });
    },
    quotesByUser(root, args, context) {
      return context.prisma.user({ id: args.userId }).quotes();
    },
    quotesByPerson(root, args, context) {
      return context.prisma.quotes({ where: { saidBy: args.personName } });
    },
  },
  Mutation: {
    createUser(root, args, context) {},
    createQuote(root, args, context) {},
    heartAQuote(root, args, context) {},
  },
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log("Server is running on http://localhost:4000"));
