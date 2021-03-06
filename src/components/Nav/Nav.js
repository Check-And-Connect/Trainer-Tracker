import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>

        <Link to="/trainersearch" style={{ textDecoration: 'none' }}>
          <Button
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
          >
            Search Trainers
          </Button>
        </Link>

        <Link to="/cohort_manager" style={{ textDecoration: 'none' }}>
          <Button
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
          >
            Cohort Manager
          </Button>
        </Link>

        <Button
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Create ▼
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/addtrainer" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              Trainer
            </MenuItem>
          </Link>

          <Link to="/addcohort" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              Cohort
            </MenuItem>
          </Link>


          <Link to="/national_trainer" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              National Trainer
            </MenuItem>
          </Link>

          <Link to="/state_level_org" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              State Level Organization
            </MenuItem>
          </Link>

          <Link to="/editrequirements" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              Edit Requirements
            </MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}


let styles = {};

export default withStyles(styles)(Nav);
