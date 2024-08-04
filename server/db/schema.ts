import * as mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    author: {type: String, required: true},
    places: [String],
  },
  {
    
    collection:'books',
    methods: {
      getauthor() {
        console.log(`${this.author}!`);
      },
    },
  }

);

export type Book = mongoose.InferSchemaType<typeof bookSchema>;
export const Book = mongoose.model('Book', bookSchema);