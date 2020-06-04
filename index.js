const express = require('express'),
	graphqlHTTP = require('express-graphql'),
	{buildSchema} = require('graphql')

const schema = buildSchema(`
	type Query {
		hello: String
	}
`)

const root = {
	hello: () => {
		return 'Hello World'
	}
}

const app = express()
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}))
app.listen(4000)

console.log('Running graphql server on port 4000')