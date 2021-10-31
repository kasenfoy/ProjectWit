import {CreateFormBase, CreateFormBaseProps, CreateFormBaseState} from "./create-form";
import {Tag} from "../../lib/types";
import {ITags} from "../../lib/interfaces/types";

interface CreateFormTagsProps extends CreateFormBaseProps {}
interface CreateFormTagsState extends ITags {
    formName: string
}

class CreateFormTags extends CreateFormBase {

    state: CreateFormTagsState;

    constructor(props: CreateFormBaseProps) {
        super(props);

        this.state = this.getStateDefaults(props);
    }

    getStateDefaults(props: CreateFormTagsProps): CreateFormTagsState {

        let state = {
            formName: 'Tags',
            ...super.getStateDefaults(props)
        }

        return state;
    }

    createObject(obj: ITags) {
        Tag.create(obj);
    }

}

export { CreateFormTags }