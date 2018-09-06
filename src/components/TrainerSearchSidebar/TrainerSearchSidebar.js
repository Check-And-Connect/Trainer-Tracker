import React, {Component} from 'react';

class TrainerSearchSidebar extends Component{
    render(){
        return(
            <div>
                <div id="state-checkbox-selector">
                    <h3>State</h3>
                    {this.props.state.forEach(((state, index) => (
                        <div>
                            <p>{state}</p>
                            <input 
                                key={index}
                                type="checkbox" 
                                value={state} 
                                name="state"
                                defaultChecked
                                onChange={this.props.handleCheckboxClick}
                            />
                        </div>
                    )))}
                    <h3>State-Level Org.</h3>
                    {this.props.state_level_organization_name.forEach(((slo, index) => (
                        <div>
                            <p>{slo}</p>
                            <input 
                                key={index}
                                type="checkbox" 
                                value={slo} 
                                name="slo"
                                defaultChecked
                                onChange={this.props.handleCheckboxClick}
                            />
                        </div>
                    )))}
                    <h3>Cohort</h3>
                    {this.props.cohort_name.forEach(((cohort, index) => (
                        <div>
                            <p>{cohort}</p>
                            <input 
                                key={index}
                                type="checkbox" 
                                value={cohort} 
                                name="cohort"
                                defaultChecked
                                onChange={this.props.handleCheckboxClick}
                            />
                        </div>
                    )))}
                </div>
            </div>
        )
    }
};

export default TrainerSearchSidebar;