import express from "express";
import { ApolloServer } from "@apollo/server"; // Apollo Server v4
import { expressMiddleware } from "@apollo/server/express4"; // Middleware for Express
import { json } from "body-parser"; // For parsing JSON requests
import BookType from "./graphql/schemas/Book.type";
import BookResolver from "./graphql/resolvers/book.resolver";
import { ExpressContextFunctionArgument } from "@apollo/server/express4"; // Import correct context type
import mongoose from "mongoose";

const app = express();
mongoose
  .connect(
    "mongodb+srv://sunny:sunny@firstcluster.gxsun.mongodb.net/book-management?retryWrites=true&w=majority&appName=FirstCluster"
  )
  .then((res) => {
    console.log("DB connected!");
    startServer().catch((err) => {
      console.error("Error starting the server: ", err);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to DB, shutting down server!");
  });

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: BookType,
    resolvers: BookResolver,
  });

  await server.start();

  app.use("/graphql", json(), expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/graphql");
  });
};
