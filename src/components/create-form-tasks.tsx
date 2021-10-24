import {CreateFormBase, CreateFormBaseProps, CreateFormBaseState} from "./create-form";
import {Tasks, WitObject} from "../lib/types";
import {ITasks} from "../lib/interfaces/types";


// interface  {};
// interface s {};

interface CreateFormTasksProps extends CreateFormBaseProps{};
interface CreateFormTasksState extends CreateFormBaseState{
    description: string;
};


class CreateFormTasks extends CreateFormBase
{
    state: CreateFormTasksState;

    constructor(props: CreateFormTasksProps) {
        super(props)

        this.state = {
            description: '',
            // This is a merge of objects as defined in:
            // https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/
            ...super.getStateDefaults(props)
        }

        console.log(this.state)
        this.compileComponents = this.compileComponents.bind(this);
    }

    compileComponents(): JSX.Element[] {
        let superHTML = super.compileComponents();
        let html =
            <label>
                <p>Description</p>
                <textarea name={"description"} value={this.state.description} onChange={this.handleChange} />
            </label>

        let list = [superHTML, html]
        // list.push(superHTML);
        // list.push(html);

        return list as JSX.Element[];
    }

    // Override for tasks form
    createObject(obj: ITasks) {
        Tasks.create(obj);
    }

}

export {CreateFormTasks}
