// import { WitObject } from "./wit-object";
import * as Mappers from "../data_mappers/"
import * as Types from "../types"

class Tag extends Types.WitObject {

    tableName: string = "tags";

    // constructor(name: string ) {
    //     // super(name);
    // }

    // TODO Implement
    delete(): Promise<undefined> {
        return Promise.resolve(undefined);
    }

    // TODO Implement
    get(): Promise<Tag> {
        return Promise.resolve(new Tag({id: 'fakeid'}));
    }

    greet(): void
    {
        console.log("Hello from Tags!");
        // console.log(Mappers.TagMapper.create(this))
    }
}

export { Tag }