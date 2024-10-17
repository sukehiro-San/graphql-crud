import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    genre: { type: [String], required: true },
  },
  { collection: "books" }
);

export const Book = model("Book", bookSchema);
