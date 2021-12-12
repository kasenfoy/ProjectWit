/***
 * This file is responsible for the web portals configuration
 * It should be used when deploying a custom implementation
 * of project WIT CDK infrastructure.
 * ***/


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

const beta: stageVariables= {
    authApiUrl: 'https://2sn8t4joqc.execute-api.us-west-2.amazonaws.com/prod/auth',
    IAMUserARN: 'arn:aws:iam::326480716745:role/dynamo-auth-role-beta',
    dynamoTables: {
        tasks: 'project-wit-tasks-beta',
        tags: 'project-wit-tags-beta',
        users: 'project-wit-users-beta',
        sprints: 'project-wit-sprints-beta',
        lanes: 'project-wit-lanes-beta',
        comments: 'project-wit-comments-beta'
    }
}

const prod: stageVariables= {
    authApiUrl: 'https://0ieoa7wmvf.execute-api.us-west-2.amazonaws.com/prod/auth',
    IAMUserARN: 'arn:aws:iam::326480716745:role/dynamo-auth-role-prod',
    dynamoTables: {
        tasks: 'project-wit-tasks-prod',
        tags: 'project-wit-tags-prod',
        users: 'project-wit-users-prod',
        sprints: 'project-wit-sprints-prod',
        lanes: 'project-wit-lanes-prod',
        comments: 'project-wit-comments-prod'
    }
}

let conf;
switch (process.env.REACT_APP_ENV)
{
    case 'development':
        conf = dev;
        break;
    case 'beta':
        conf = beta;
        break;
    case 'production':
        conf = prod;
        break;
    default:
        conf = dev;
        console.error(`REACT_APP_ENV ${process.env.REACT_APP_ENV} not set to appropriate value, defaulting to development`)
}

console.debug("REACT_APP_ENV=", process.env.REACT_APP_ENV)
console.debug("config=", conf)

export const config = conf;
// export const config = process.env.NODE_ENV === 'production' ? prod : dev;

// export const config = dev