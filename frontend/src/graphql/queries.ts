import gql from 'graphql-tag';

export const loginQuery = gql`
    query($login: String!, $password: String!){
        login(login: $login, password: $password) {
            accessToken,
            user {
                id,
                login
            },
            refreshToken
        }
    }
`;

export const refreshQuery = gql`
    query($accessToken: String!, $refreshToken: String!){
        refresh(accessToken: $accessToken, refreshToken: $refreshToken) {
            accessToken,
            user {
                id,
                login
            },
            refreshToken
        }
    }
`;

export const infoQuery = gql`
    {
        info {
            user {
                id,
                login
            }
        }
    }
`;

export const skillsQuery = gql`
    {
        skills {
            id,
            title,
            percents,
            category
        }
    }
`;

export const worksQuery = gql`
    {
        works {
            id,
            title,
            description,
            link,
            image
        }
    }
`;

export const skillQuery = gql`
    query($id: ID!) {
        skill(id: $id) {
            id,
            title,
            percents,
            category
        }
    }
`;

export const workQuery = gql`
    query($id: ID!) {
        work(id: $id) {
            id,
            title,
            description,
            link,
            image
        }
    }
`;

export const createSkillMutation = gql`
    mutation CreateSkill($title: String!, $percents: Int!, $category: String!) {
        createSkill(title: $title, percents: $percents, category: $category) {
            id
            title
            percents
            category
        }
    }
`;

export const changeSkillMutation = gql`
    mutation ChangeSkill($title: String!, $percents: Int!, $category: String!, $id: ID!) {
        changeSkillById(title: $title, percents: $percents, category: $category, id: $id) {
            id,
            title,
            percents,
            category
        }
    }
`;
export const deleteSkillMutation = gql`
    mutation DeleteSkill($id: ID!) {
        deleteSkillById(id: $id) {
            id,
        }
    }
`;

export const createWorkMutation = gql`
    mutation CreateWork($title: String!, $description: String!, $link: String!, $file: Upload!) {
        createWork(title: $title, description: $description, link: $link, file: $file) {
            id,
            title,
            description,
            link,
            image
        }
    }
`;

export const changeWorkMutation = gql`
    mutation ChangeWork($id: ID!, $title: String!, $description: String!, $link: String!, $file: Upload) {
        changeWorkById(id: $id, title: $title, description: $description, link: $link, file: $file) {
            id,
            title,
            description,
            link,
            image
        }
    }
`;

export const deleteWorkMutation = gql`
    mutation DeleteWork($id: ID!) {
        deleteWorkById(id: $id) {
            id,
        }
    }
`;
