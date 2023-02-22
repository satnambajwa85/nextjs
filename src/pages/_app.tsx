import '@/styles/globals.css'
//import type { AppProps } from 'next/app'
import { AuthProvider } from '../lib/auth.js'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
/*

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

function createApolloClient() {
  const link = new HttpLink({
    uri: 'http://localhost:4001/graphql',
  })

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}
function App({ Component, pageProps }: AppProps) { 
  //MyApp({ Component, pageProps }) {
  return (
    <AuthProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}*/

export default App