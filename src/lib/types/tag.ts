// import { WitObject } from "./wit-object";
import * as Mappers from "../data_mappers/"
import * as Types from "../types"

class Tag extends Types.WitObject {

    tableName: string = "tags";

    // constructor(name: string ) {
    //     // super(name);
    // }

    greet(): void
    {
        console.log("Hello from Tags!");
        // console.log(Mappers.TagMapper.create(this))
    }
}

export { Tag }