import React from "react";
import {WitObject} from "../lib/types";
import {Id} from "./basic/id";
import {Name} from "./basic/name";
import TileCss from "./css/tile.module.css"

interface TileState {
    obj: WitObject
}

interface TileProps {
    obj: WitObject,
    setSelectedObject: Function
}

class Tile extends React.Component<TileProps,TileState> {

    constructor(props: TileProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick()
    {
        this.props.setSelectedObject(this.props.obj);
    }

    render() {
        let html =
            <div className={TileCss.Tile} onClick={this.handleClick} key={this.props.obj.data.id}>
                <Name name={this.props.obj.data.name}/>
                {/*<Id id={this.props.obj.data.id}/>*/}
            </div>
        return html;
    }
}

export {Tile}