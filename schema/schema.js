const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
    { name: "this is book one", genre: 'movie', id: '1', authorid: '1' },
    { name: "this is book two", genre: 'chinama', id: '2', authorid: '2' },
    { name: "this is book three", genre: 'maramari', id: '3', authorid: '3' },
    { name: "this is book four", genre: 'maramari', id: '4', authorid: '2' },
    { name: "this is book five", genre: 'maramari', id: '5', authorid: '3' },
    { name: "this is book six", genre: 'maramari', id: '6', authorid: '3' },
]
var authors = [
    { name: "joyonto", age: 22, id: '1' },
    { name: "kumar", age: 66, id: '2' },
    { name: "roy", age: 44, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    console.log(parent)
                    return _.find(authors, { id: parent.authorid })
                }
            }
        }
    }
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorid: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})