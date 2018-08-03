import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import AWSAppSyncClient from 'aws-appsync'
import { Query, ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import gql from 'graphql-tag'
import aws_exports from './aws-exports'
import logo from './logo.svg'
import './App.css'

const config = Amplify.configure({
  ...aws_exports,
})

const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: aws_exports.aws_appsync_authenticationType,
    apiKey: aws_exports.aws_appsync_apiKey,
  },
})

const MY_QUERY = gql`
  query getMeetups($id: ID!) {
    getMeetups(id: $id) {
      id,
      title,
      date,
      rating
    }
  }
`

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>

          <p>Some random meetup:</p>
          <Query query={MY_QUERY} variables={{ id: 1 }}>
            {({ data, loading }) => (
              !!loading ? null : (
                <ul>
                  <li>Title: {data.getMeetups.title}</li>
                  <li>Date: {data.getMeetups.date}</li>
                  <li>Rating: {data.getMeetups.rating}</li>
                </ul>
              )
            )}
          </Query>

        </Rehydrated>
      </ApolloProvider>
    )
  }
}

export default App
