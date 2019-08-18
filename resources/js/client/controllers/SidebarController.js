import { Friend } from "../../components/sidebar/Friend";

import * as React from 'react';
import * as ReactDOM from "react-dom";

export class SidebarController
{
    /**
     * Fill sidebar by friends data
     * 
     * @param {*} friends 
     */
    static build(friends)
    {
        ReactDOM.render(<Friend friends = {friends}/>, document.getElementById("friends"));
    }
}