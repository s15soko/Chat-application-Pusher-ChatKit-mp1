import * as React from 'react';

import { Nav } from "./panelParts/Nav";
import { Results } from "./panelParts/Results";

export class Panel extends React.Component
{
    render()
    {
        return(
            <div>
                <Nav />
                <Results />
            </div>
        );
    }
}