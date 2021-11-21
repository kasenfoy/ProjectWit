import {CreateFormBase, CreateFormBaseProps, CreateFormBaseState} from "./create-form";
import {Tag} from "../../lib/types";
import {ITags} from "../../lib/interfaces/types";

interface CreateFormTagsProps extends CreateFormBaseProps {}
interface CreateFormTagsState extends ITags {}

class CreateFormTags extends CreateFormBase {

    // state: CreateFormTagsState;

    constructor(props: CreateFormBaseProps) {
        super(props);

        this.state = this.getStateDefaults();
    }

    getStateDefaults(): CreateFormTagsState {

        let state = {
            ...super.getStateDefaults()
        }

        return state;
    }

    createObject(obj: ITags) {
        Tag.create(obj);
    }

    updateObject(obj: ITags) {
        let tag = new Tag(obj);
        tag.update();
    }

    async delete(id: string): Promise<void> {
        return await Tag.delete(id);
    }

}

export { CreateFormTags }