interface dynamoTables {
    tasks: string;
    tags: string;
    users: string;
    sprints: string;
    lanes: string;
    comments: string;
}

interface stageVariables {
    authApiUrl: string;
    dynamoTables: dynamoTables;
    IAMUserARN: string;
}

const dev: stageVariables= {
    authApiUrl: 'https://n35qat61sl.execute-api.us-west-2.amazonaws.com/prod/auth',
    IAMUserARN: 'arn:aws:iam::326480716745:role/dynamo-auth-role-dev',
    dynamoTables: {
        tasks: 'project-wit-tasks-dev',
        tags: 'project-wit-tags-dev',
        users: 'project-wit-users-dev',
        sprints: 'project-wit-sprints-dev',
        lanes: 'project-wit-lanes-dev',
        comments: 'project-wit-comments-dev'
    }

}

// TODO Implement this after moving to prod
// const prod: stageVariables = {
//
// }
// export const config = process.env.NODE_ENV === ‘development’ ? dev : prod;

export const config = dev