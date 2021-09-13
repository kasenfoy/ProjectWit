/**
 * Uses a Singleton pattern to ensure only one instance of Dynamo is active at any time.
 */

// var AWS = require('aws-sdk/dist/aws-sdk-react-native');
import { DynamoDB } from "aws-sdk";
import {stringifiedJson} from "aws-sdk/clients/customerprofiles";

class DynamoInteractor {
    private static instance: DynamoInteractor;
    private dynamo: DynamoDB;

    /**
     * TODO Remove API Key
     * @private
     */
    private constructor() {
        this.dynamo = new DynamoDB({
            accessKeyId: ,
            secretAccessKey: ,
            region: 'us-west-2'
        });
    }



    /**
     * The magic of Singleton pattern happens here.
     * This will return the instance if it has been created
     * If not it will create the instance and assign it
     */
    public static getInstance(): DynamoInteractor {
        if (!DynamoInteractor.instance) {
            DynamoInteractor.instance = new DynamoInteractor();
        }

        return DynamoInteractor.instance;
    }

    public get(key: string|undefined, table: string): any {

        // Set up the parameters
        const params = {
            TableName: table,
            Key: {
                'id': {S: key}
            }
        }

        console.log(params);

        // Call dyanmo and check for error.
        this.dynamo.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                throw err;
            } else {
                console.log("Success", data.Item);
                console.log(typeof data.Item);
                console.log(data);
                return data.Item;
            }
        });
    }

    insert(params: any) {
        console.log(params)

        this.dynamo.putItem(params, function (err, data) {
            if (err) {
                console.log("Failed to insert of object with params:")
                console.log(params);
                console.log(err, err.stack);
            } else {
                console.log("Sucesfully inserted object with params: ")
                console.log(params);
                console.log(data);
            }
        });
    }

    /**
     * TODO Remove this, it was just for testing
     * With the addition of 'Expected' it now fails on duplicate ID entry.
     */
    public InsertTask()
    {
        console.log("Trying to insert an item")
        let myMap = new Map();
        myMap.set('id', 'helloids');
        myMap.set('name', 'hellonames');
        const convertedMap = Object.fromEntries(myMap);

        var params = {
            Item: {
                "id": {
                  S: "boberts"
                }
            },
            // Item: convertedMap,
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "NONE",
            Expected: {
                id: { Exists: false }
            },
            TableName: "tasks"
        }
        this.dynamo.putItem(params, function (err, data) {
            if (err)
            {
                console.log("fail")
                console.log(err, err.stack);
            }
            else
            {
                console.log("Success")
                console.log(data);
            }
        });
    }

}

export { DynamoInteractor }