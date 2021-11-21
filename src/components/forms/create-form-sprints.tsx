import {CreateFormBase, CreateFormBaseProps} from "./create-form";
import {ISprints, Sprints} from "../../lib/types/sprints";

interface CreateFormSprintsProps extends CreateFormBaseProps
{

}

interface CreateFormSprintsState extends ISprints
{

}

class CreateFormSprints extends CreateFormBase
{
    constructor(props: CreateFormSprintsProps) {
        super(props);

    }

    createObject(obj: ISprints) {
        Sprints.create(obj);
    }

    render(): JSX.Element {
        return super.render();
    }

}

export {CreateFormSprints}
export type {CreateFormSprintsProps, CreateFormSprintsState}