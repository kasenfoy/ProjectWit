import {CreateFormBase, CreateFormBaseProps} from "./create-form";
import {ISprints, Sprints} from "../../lib/types/sprints";
import {WitObject} from "../../lib/types";
import {Name} from "../basic/name";

interface CreateFormSprintsProps extends CreateFormBaseProps
{

}

interface CreateFormSprintsState extends ISprints
{

}

class CreateFormSprints extends CreateFormBase
{
    state: CreateFormSprintsState;

    constructor(props: CreateFormSprintsProps) {
        super(props);

        this.state = {
            ...this.getStateDefaults()
        }
    }

    createObject(obj: ISprints) {
        Sprints.create(obj);
    }

    updateObject(obj: ISprints) {
        let sprint = new Sprints(obj)
        sprint.update()
    }

    async delete(id: string): Promise<void> {
        await Sprints.delete(id);
    }

    generateEmptyWitObject(): Sprints {
        let sprint = new Sprints({id: WitObject.generateId()})
        return sprint;
    }

    compileComponents(): JSX.Element[] {

        let html = [...super.compileComponents()]
        html.push(
            <div>
                <Name name={"Start Date"}/>
                <input type="date" id="start" name="start_date" value={this.state.start_date} onChange={this.handleChange} />
            </div>
        )

        html.push(
            <div>
                <Name name={"End Date"}/>
                <input type="date" id="end" name="end_date" value={this.state.end_date} onChange={this.handleChange} min={this.state.start_date}/>
            </div>
        )

        return html;
    }

    render(): JSX.Element {
        return super.render();
    }

}

export {CreateFormSprints}
export type {CreateFormSprintsProps, CreateFormSprintsState}