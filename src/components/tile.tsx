import React from "react";
import {WitObject} from "../lib/types";
import {Id} from "./basic/id";
import {Name} from "./basic/name";
import TileCss from "./css/tile.module.css"

interface TileState {
    obj: WitObject
}

interface TileProps {
    obj: WitObject
}

class Tile extends React.Component<TileProps,TileState> {

    constructor(props: TileProps) {
        super(props);
    }

    render() {
        let html =
            <div className={TileCss.Tile}>
                <Name name={this.props.obj.data.name}/>
                {/*<Id id={this.props.obj.data.id}/>*/}
            </div>
        return html;
    }
}

export {Tile}