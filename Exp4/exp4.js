const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const schema = buildSchema(`
    type Student {
        id: Int
        name: String
        age: Int
    }

    type Query {
        hello: String
        student: Student
    }
`);

const root = {
    hello: () => "Hello from GraphQL",

    student: () => ({
        id: 1,
        name: "Roshan",
        age: 19
    })
};

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(3000, () => {
    console.log("GraphQL server running at http://localhost:3000/graphql");
});