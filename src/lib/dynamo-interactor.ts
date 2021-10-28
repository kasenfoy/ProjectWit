/**
 * Uses a Singleton pattern to ensure only one instance of Dynamo is active at any time.
 */

// var AWS = require('aws-sdk/dist/aws-sdk-react-native');
import { DynamoDB } from "aws-sdk";
import axios from 'axios';
// import fetch from "node-fetch";

import {stringifiedJson} from "aws-sdk/clients/customerprofiles";
import {Duplex} from "stream";
import {DocumentClient, ScanInput} from "aws-sdk/clients/dynamodb";
import {IScanOutput} from "./interfaces/dynamodb/IScanOutput";
import {IPutItemOutput} from "./interfaces/dynamodb/IPutItemOutput";
import * as constants from "./constants"

interface CredentialData {
    accessKeyId: string,
    secretAccessKey: string,
    sessionToken: string,
}

// TODO Refactor the non-static methods to use this.dynamo instead of DynamoInteractor.getInstance() (Test to make sure that works)

class DynamoInteractor {
    private static instance: DynamoInteractor;
    private static instanceIsReadyPromise: Promise<DynamoInteractor>

    // @ts-ignore needed as the constructor does not explicitly set these up since they are handled async/singleton.
    private dynamo: DynamoDB;
    // @ts-ignore
    private dynamoDocumentClient: DocumentClient;

    private constructor() {}

    private static async setupInstance(): Promise<DynamoInteractor>
    {
        // Create the interactor instance
        let tmpInstance = new DynamoInteractor();

        // Retrieve the credentials
        let credentials = await DynamoInteractor.retrieveCredentials();
        console.log("Here are you credentials (Very insecure of you)", credentials)

        // Set the DynamoDB client
        await tmpInstance.setDynamoDbInstance(credentials);

        // Set the DynamoDB Document client
        await tmpInstance.setDynamoDbDocumentClientInstance(credentials);

        // Return the completed Instance
        return tmpInstance
    }

    private async setDynamoDbInstance(credentials: CredentialData)
    {
        this.dynamo = new DynamoDB({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: 'us-west-2'
        });
    }

    private async setDynamoDbDocumentClientInstance(credentials: CredentialData)
    {
        // Initialize the Dynamo Document Client
        this.dynamoDocumentClient = new DocumentClient({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: 'us-west-2'
        });
    }

    private static async retrieveCredentials(): Promise<CredentialData>
    {
        console.log('Calling API to retrieve credentials')
        let data = await axios.get(constants.config.authApiUrl)
        return {
            accessKeyId: data.data['AccessKeyId'],
            secretAccessKey: data.data['SecretAccessKey'],
            sessionToken: data.data['SessionToken']
        }
    }

    /**
     * The magic of Singleton pattern happens here.
     * This will return the instance if it has been created
     * If not it will create the instance and assign it
     * This was difficult to setup/understand in an Async environment
     * This resource https://adambrodziak.medium.com/singleton-with-async-constructor-in-javascript-32367f52540f
     * Has a comment: https://medium.com/@anxolin/hi-2f6c4968b834 that solved it which I implemented below
     */
    public static async getInstance(): Promise<DynamoInteractor> {
        // Check if the instance has been initialized yet
        if (!DynamoInteractor.instance ) {

            // Check if the instance Promise exists. If yes skip to waiting until the actual instance is ready
            if(!DynamoInteractor.instanceIsReadyPromise) {

                // Assign a promise (don't await, that happens below)
                DynamoInteractor.instanceIsReadyPromise = DynamoInteractor.setupInstance();
            }

            // Await the promise we created
            DynamoInteractor.instance = await DynamoInteractor.instanceIsReadyPromise;
        }

        // Return the instance.
        return DynamoInteractor.instance;
    }

    public async get(params: any): Promise<object>
    {
        console.log("get() has been called with params:", params)
        let client = await DynamoInteractor.getInstance();

        try {
            let data = await client.dynamoDocumentClient.get(params).promise();
            console.debug("get() has finished and returned data: ", data)
            return data.Item as object
        }
        catch (err) {
            console.error("Error", err)
            throw err
        }
    }

    public async insert(params: any): Promise<undefined>
    {
        console.log("insert() has been called with params", params)
        let client = await DynamoInteractor.getInstance();

        try
        {
            let data = await client.dynamoDocumentClient.put(params).promise();
            await data;

            console.debug("insert() has returned data: ", data);
            return undefined;
        }
        catch (err) {
            console.error("insert() error: ", err, " With params:" ,  params)
            throw err
        }

        // Document Client Code
        // DynamoInteractor.getInstance().then((client: DynamoInteractor) => {
        //     client.dynamoDocumentClient.put(params, function (err, data) {
        //         if (err) {
        //             console.log("Failed to insert of object with params: \n", params, err, err.stack)
        //             // console.log(params);
        //             // console.log(err, err.stack);
        //         } else {
        //             console.debug("Sucesfully inserted object with params: ", params, " And returned data: ", data)
        //             // console.log(params);
        //             // console.log(data);
        //         }
        //     });
        // });
    }

    public async delete(params: any): Promise<undefined>
    {
        console.debug("delete() has been called with params: ", params);

        let client = await DynamoInteractor.getInstance();

        try
        {
            let response = await client.dynamoDocumentClient.delete(params).promise();
            console.debug("delete() response: ", response);
            return
        }
        catch (err)
        {
            console.error("delete() error: ", err, " with params: ", params);
            throw err;
        }

    }

    public async scan(params: ScanInput): Promise<IScanOutput>
    {
        console.log("scan() has been called with params:", params)
        let client = await DynamoInteractor.getInstance();

        try {
            let data = await client.dynamoDocumentClient.scan(params).promise();

            await data;

            console.debug("scan() has returned data: ", data)
            return {Count: data.Count, Items: data.Items} as IScanOutput
        }
        catch (err) {
            console.error("scan() error: ", err)
            throw err
        }

    //     return await DynamoInteractor.getInstance().then((client:DynamoInteractor)=>{
    //             return client.dynamoDocumentClient.scan({
    //                 "TableName": "tasks"
    //             }, function (err, data) {
    //                 if (err) {
    //                     console.log("Failed to scan object with params: \n", params, err, err.stack)
    //                     throw "Failed to scan"
    //                 } else {
    //                     console.log("Sucesfully scanned objects with params: ")
    //                     console.log(params);
    //                     console.log(data);
    //                     return <ScanOutput>{Items: data.Items, Count: data.Count}
    //                 }
    //         }
    //     )
    // })
    };
}

export { DynamoInteractor }