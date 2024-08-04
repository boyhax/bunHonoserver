import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email:{type:String ,required:true},
    confirmed_at:{type:Date,}
  },
  {
    
    collection:'books',
    methods: {
      getBooks() {
        
      },
    },
  }

);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('Book', userSchema);