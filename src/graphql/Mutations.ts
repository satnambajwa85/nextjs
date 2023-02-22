import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($input: loginInput!) {
  login(input: $input)
}
`