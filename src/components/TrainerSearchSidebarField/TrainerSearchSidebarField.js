import React, {Component} from 'react';

class TrainerSearchSidebarField extends Component{

    render(){
        const allCheckboxes = this.props.checkboxes.map((checkbox, index) => {
            
            return (
                <input
                    name={check}
            )
        })
    }
};

export default TrainerSearchSidebarField;