import { DataMapper } from "./data-mapper";
import {Tag} from "../types";

class TagMapper extends DataMapper
{

    // create(tag: Tag): void {
    //
    //     console.log('Creating tag')
    // }
    // update(): {} {
    //     console.log('Updating tag')
    //     return {};
    // }

    static get(tag: Tag): void {
        // super.get(tag);
        console.log('Getting tag')
        return;
    }
}

export {TagMapper}