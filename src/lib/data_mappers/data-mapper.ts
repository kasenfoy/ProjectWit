import { WitObject } from "../types/wit-object";
import { DynamoInteractor } from "../dynamo-interactor";
import {Tasks} from "../types";
import * as Interfaces from "../interfaces";
import {ITasks, IWitObject} from "../interfaces/types";

/**
 * Abstract class to implement the Data Mapper design pattern
 */


class DataMapper
{

    static fromDynamoFormat<T extends IWitObject>(obj: object): T {
        const iTask = <T>obj;
        return iTask;
    }

    static toDynamoDocumentClientFormat<T extends IWitObject>(obj: WitObject): T {
        return <T> obj.data;
    }
}



export { DataMapper }