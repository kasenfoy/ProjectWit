import React from "react";
import {IScanOutput} from "../lib/interfaces/dynamodb/IScanOutput";
import {WitObject} from "../lib/types";
import {Id} from "./basic/id"
import {Tile} from "./tile";
import TileListCss from "./css/tile-list.module.css"
import {WitComponent} from "./primary-layout";

interface TileListState {}

interface TileListProps {
    data: WitObject[],
    activeComponent: WitComponent,
    setSelectedObject: Function,
    clearSelectedObject: Function
}


// TODO Loading icon while data===undefined?
class TileList extends React.Component<TileListProps,TileListState> {

    state: TileListState = {}

    constructor(props: TileListProps)
    {
        super(props);
        console.debug(this.props.data);

        this.createButtonClick = this.createButtonClick.bind(this);
    }

    /**
     * This function will convert data from a WitObject
     * int a JSX Element array (List)
     * @param list
     */
    compileList()
    {
        // console.debug(this.props.data)
        // Create each <li> element and add it to array
        let compiledList = this.props.data?.map((item: WitObject) => {
            let html = <Tile key={item.data.id} obj={item} setSelectedObject={this.props.setSelectedObject}/>
            return html
            }
        );
        return compiledList
    }

    createButtonClick(event: React.SyntheticEvent)
    {
        this.props.clearSelectedObject()
    }

    /**
     * Function is run when the React component mounds to the DOM
     * Set up an interval for refreshing the data.
     * Runs the function passed in to the TileListProps
     * Uses a proxy function "runOnDelay" to avoid syntax errors in setInterval call.
     */
    componentDidMount() {
        console.log("TileList did mount")
    }

    /**
     * Run when the component is removed from the DOM
     */
    componentWillUnmount() {}

    /**
     * React render to put the elements in the DOM
     */
    render()
    {
        let html =
        <div>
            <div className={TileListCss.TileList}>
                <div><p>Create new: <button onClick={this.createButtonClick}>{this.props.activeComponent}</button></p></div>
                {this.compileList()}
            </div>
        </div>
        return html;
    }
}

export { TileList }