import { gql } from "apollo-server-express";

const BookType = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedDate: String!
    rating: Int!
    genres: [String!]!
  }

  type Query {
    getAllBooks: [Book!]!
    getBookById(id: ID!): Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      publishedDate: String!
      rating: Int!
      genres: [String!]!
    ): Book
    removeBook(id: ID!): String
    updateBook(
      id: ID!
      title: String
      author: String
      publishedDate: String
      rating: Int
      genres: [String!] # List of genres (optional in update)
    ): Book
  }
`;

export default BookType;
