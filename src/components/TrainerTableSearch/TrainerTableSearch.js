import React, { Component } from 'react'
import { TextField , withStyles} from '@material-ui/core';


const styles = {
  textField : {
    margin : '0em 0em 0.5em 1em',
  }
}

export class TrainerTableSearch extends Component {


  handleChange = (event) => {
    this.props.search(event.target.value)
  }

  render() {
    
    return (
      <div>
        <TextField
          className={this.props.classes.textField}
          label="Search Table"
          value={this.props.searchKey}
          onChange={this.handleChange}
          margin="normal"
        />
      </div>
    )
  }
}

export default withStyles(styles)(TrainerTableSearch)
