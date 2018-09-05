import React, {Component} from 'react';

class TrainerSearchSidebar extends Component{

    render(){
        let stateCheckboxes = this.props.states
        return(
            <div>
                <div id="state-checkbox-selector">
                    <h3>State</h3>
                    {stateCheckboxes}
                </div>
            </div>
        )
    }
};

export default TrainerSearchSidebar;