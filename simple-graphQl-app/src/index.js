const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
app.use(cors());
mongoose.connect(
  'mongodb+srv://graphqltest:test123@cluster0.si61i.mongodb.net/"GQL TESTING"?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('database connected');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
