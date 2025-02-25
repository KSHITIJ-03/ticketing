import mongoose from "mongoose";
import { Password } from "../services/password";
import { transform } from "typescript";

interface UserAttr {
    email : string,
    password : string
}

// interface that escribes the properties that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr : UserAttr) : UserDoc
}

// interface that describes the user document

interface UserDoc extends mongoose.Document {
    email : string,
    password : string
}

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},
{
    toJSON: { // to reflect a standard response to the client whenever a user doc is used
        transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
})

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attr : UserAttr): UserDoc => {
    return new User(attr);
}



const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// User.build({
//     email : 'tim@gmail.com',
//     password : '12345678'
// }) // typeScript don't know how to statics methods on model
             // therefore it is needed to make a interface and do all that angular bracket stuff

// const user = User.build({
//     email : 'tim@gmail.com',
//     password : '12345678'
// }) 

// new User({
//     email : 'tim@gmail.com',
//     password : '12345678',
//     hello : 'true' // here one can add more fields typescript won't be responsible for this
//                    // i will make function build() and it will take attributes for UserModel, and these
//                    // will be of type interfave UserModel
// })

// const buildUser = (attr: UserAttr) => {
//     return new User(attr);
// }

// buildUser({
//     email : 'tim@gmail.com',
//     password : '12345678',
//     //hello : 'jkdfsnc'          // this would be checked by typescript
// })

// to make new user attributes to be checked by TypeScript we will make a interface for User

export {User}; // but here it is not ideal to export buildUser function and import it
                          // every time for creating a user

                          // a alternative way is to attach that build function on the model
                          // using statics