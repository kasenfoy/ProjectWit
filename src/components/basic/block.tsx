import React from "react";
import {WitComponent} from "../primary-layout";
import BasicModuleCss from "../css/basic.module.css"


interface BlockProps {
    id: string;
    text?: string;
    handleDelete?: Function,
    witComponent?: WitComponent,
    asyncGetObjectName: Function
}

interface BlockState {
    name: string;
}

class Block extends React.Component<BlockProps, BlockState>
{

    state: BlockState;

    constructor(props: BlockProps) {
        super(props);
        this.state = {name: this.props.id}

        // Bindings
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        if (this.props.handleDelete !== undefined)
        {
            this.props.handleDelete(this.props.id);
        }
    }

    render() {
        let html =
            <div className={BasicModuleCss.Block} >
                <div className={BasicModuleCss.BlockContent} >
                    <b>{this.state.name}</b>
                </div>

                <div className={BasicModuleCss.BlockDelete} onClick={this.handleDelete}><b>X</b></div>
            </div>

        return html
    }

    componentDidMount() {
        this.props.asyncGetObjectName(this.props.id).then((s: string)=>{
            this.setState({name: s})
        })
    }

}

export {Block}