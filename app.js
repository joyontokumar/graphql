const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");

// database connect 
(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/graphqlstarter', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to database");
    } catch (error) {
        console.log(error)
    }
})()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("Now our port listening on 4000")
})