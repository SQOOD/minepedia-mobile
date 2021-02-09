import { gql } from '@apollo/client';

const USERS = gql`
  query Vendors{
    vendors{
      email
      id
    }
  }
`
export default USERS