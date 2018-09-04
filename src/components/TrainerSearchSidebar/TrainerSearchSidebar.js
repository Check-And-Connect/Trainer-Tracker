import React, {Component} from 'react';
import {connect} from 'react-redux';

class TrainerSearchSidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            displayedStates: this.getCheckboxes('state'),
            displayedSLOs: this.getCheckboxes('slo'),
            displayedCohorts: this.getCheckboxes('cohort')
        }
    }

    getCheckboxes = (category) => {
        // some function to filter the allTrainers prop and return
    }

    render(){
        return(
            <div>
                <div id="state-checkbox-selector">
                    <h3>State</h3>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
        allTrainers: state.trainers
})

export default connect(mapStateToProps)(TrainerSearchSidebar);