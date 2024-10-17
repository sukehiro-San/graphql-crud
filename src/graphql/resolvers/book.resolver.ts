import { Book } from "../../Models/Book";

const BookResolver = {
  Query: {
    // Get all books
    getAllBooks: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (err) {
        throw new Error("Error fetching books");
      }
    },

    // Get a book by ID
    getBookById: async (_: any, { id }: { id: string }) => {
      try {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error("Book not found");
        }
        return book;
      } catch (err) {
        throw new Error("Error fetching the book");
      }
    },
  },

  Mutation: {
    // Add a new book
    addBook: async (
      _: any,
      {
        title,
        author,
        publishedDate,
        rating,
        genres,
      }: {
        title: string;
        author: string;
        publishedDate: string;
        rating: number;
        genres: string[];
      }
    ) => {
      try {
        // Validation: Check if a book with the same title already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
          throw new Error(`Book with the title "${title}" already exists`);
        }

        const newBook = new Book({
          title,
          author,
          publishedDate: new Date(publishedDate),
          rating,
          genres,
        });

        return await newBook.save();
      } catch (err) {
        throw new Error(`Error adding the book: ${err}`);
      }
    },

    // Remove a book by ID
    removeBook: async (_: any, { id }: { id: string }) => {
      try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
          throw new Error("Book not found");
        }
        return `Book with id ${id} was successfully deleted`;
      } catch (err) {
        throw new Error(`Error deleting the book: ${err}`);
      }
    },

    // Update a book by ID
    updateBook: async (
      _: any,
      {
        id,
        title,
        author,
        publishedDate,
        rating,
        genres,
      }: {
        id: string;
        title?: string;
        author?: string;
        publishedDate?: string;
        rating?: number;
        genres?: string[];
      }
    ) => {
      try {
        // Validation: Check if the updated title already exists in another book
        if (title) {
          const existingBook = await Book.findOne({ title });
          if (existingBook && existingBook.id !== id) {
            throw new Error(`Book with the title "${title}" already exists`);
          }
        }

        const updatedBook = await Book.findByIdAndUpdate(
          id,
          {
            ...(title && { title }),
            ...(author && { author }),
            ...(publishedDate && { publishedDate: new Date(publishedDate) }),
            ...(rating && { rating }),
            ...(genres && { genres: genres }),
          },
          { new: true } // return the updated document
        );

        if (!updatedBook) {
          throw new Error("Book not found");
        }

        return updatedBook;
      } catch (err) {
        throw new Error(`Error updating the book: ${err}`);
      }
    },
  },
};

export default BookResolver;
