import React from "react";
import {iScanOutput} from "../lib/interfaces/dynamodb/iScanOutput";
import {WitObject} from "../lib/types";
import {Id} from "./basic/id"

interface TileListState {
    compiledList?: JSX.Element[] | undefined;
    data: WitObject[],
    // refreshFunction: Function,
    // r: (n: number) => any
}

interface TileListProps {
    data: WitObject[],
    refreshFunction: Function,
    compiledList?: JSX.Element[] | undefined,
}

class TileList extends React.Component<TileListProps,TileListState> {

    state: TileListState = {
        data: this.props.data,
        // refreshFunction: this.props.refreshFunction,
        // compiledList: undefined
    }

    refreshFunction: Function
    refreshInterval: any
    // compiledList: JSX.Element[]

    constructor(props: TileListProps) {
        super(props);

        this.refreshInterval = 100;
        this.refreshFunction = this.props.refreshFunction

        this.state.data = props.data
        console.debug(this.props.data);
        // this.state.refreshFunction = props.refreshFunction;

        // this.compiledList = this.compileList(props.data);
        this.state.compiledList = this.compileList(props.data);

        // bindings, needed for 'this' binding
        this.compileList = this.compileList.bind(this);
        this.runOnDelay = this.runOnDelay.bind(this);
    }

    /**
     * This function will convert data from a WitObject
     * int a JSX Element array (List)
     * @param list
     */
    compileList(list: WitObject[]) {

        // Create each <li> element and add it to array
        let compiledList = list.map((item: WitObject) => {
            console.log(typeof item)
            let html = <li
                key={item.data.id}>Name: {item.data.name} <Id id={item.data.id} />
                <button onClick={item.delete}>Delete</button>
            </li>

            return html
            }
        );

        return compiledList
    }

    fakeIt(): undefined{
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        return
    };

    /**
     * Function is run when the React component mounds to the DOM
     * Set up an interval for refreshing the data.
     * Runs the function passed in to the TileListProps
     * Uses a proxy function "runOnDelay" to avoid syntax errors in setInterval call.
     */
    componentDidMount() {
        this.refreshInterval = setInterval(this.runOnDelay, 600*1000)
    }

    /**
     * Run when the component is removed from the DOM
     */
    componentWillUnmount() {
        // Remove the interval we created so it stops running.
        clearInterval(this.refreshInterval);
    }

    /**
     * Run on delay is a proxy function to avoid syntax errors in setInterval call above.
     */
    async runOnDelay() {
        // Run the function given via props and update the data.
        let data = await this.refreshFunction()
        this.setState({data: data})

        // Compile the list in the JSX Element array
        let compiledList = this.compileList(data);
        this.setState({compiledList: compiledList})
    }

    /**
     * React render to put the elements in the DOM
     */
    render() {
        let ul = <ul>{this.state.compiledList}</ul>
        return <div>{ul}</div>;
    }
}

export { TileList }