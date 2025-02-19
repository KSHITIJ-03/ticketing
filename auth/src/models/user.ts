import mongoose from "mongoose";

interface UserAttr {
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
})

const User = mongoose.model('User', userSchema);

// new User({
//     email : 'tim@gmail.com',
//     password : '12345678',
//     hello : 'true' // here one can add more fields typescript won't be responsible for this
//                    // i will make function build() and it will take attributes for UserModel, and these
//                    // will be of type interfave UserModel
// })

const buildUser = (attr: UserAttr) => {
    return new User(attr);
}

buildUser({
    email : 'tim@gmail.com',
    password : '12345678',
    //hello : 'jkdfsnc'          // this would be checked by typescript
})

// to make new user attributes to be checked by TypeScript we will make a interface for User

export {User, buildUser}; // but here it is not ideal to export buildUser function and import it
                          // every time for creating a user

                          // a alternative way is to attach that build function on the model
                          // using statics