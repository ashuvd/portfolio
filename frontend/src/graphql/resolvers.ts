import gql from 'graphql-tag';
export const typeDefs = gql`
    type User {
        id: ID!
        login: String!
    }
    type Auth {
        user: User!
        accessToken: String!
        refreshToken: String!
    }
    type Info {
        user: User!
    }
    type Skill {
        id: ID!
        title: String!
        percents: Int!
        category: String!
    }
    type Work {
        id: ID!
        title: String!
        description: String!
        link: String!
        github_link: String!
        image: String!
    }
`;
