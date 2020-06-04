const express = require('express'),
	graphqlHTTP = require('express-graphql'),
	{buildSchema} = require('graphql')

const path = require('path')

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
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send('Hello')
})
app.all('/simply_clean.css', (req, res) => {
	res.sendFile(path.join(__dirname, '/node_modules/simply_clean.css/style.css'))
})
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}))


app.listen(4000)

console.log('Running graphql server on port 4000')