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
        <Link to="/user" style={{ textDecoration: 'none' }}>
          <Button className="button"
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
          >
            HOME4NOW
          </Button>
        </Link>

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
          Create
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

          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              Requirements
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

          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem
              className={this.props.classes.dropDown}
              onClick={this.handleClose}
            >
              State Lead
            </MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}

// const Nav = () => (
//   <div className="navbar">
//     <div>
//       <ul>
//         <li>
//           <Link to="/user">
//             Create
//           </Link>
//         </li>
//         <li>
//           <Link to="/info">
//             Cohort Manager
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// );

let styles = {};

export default withStyles(styles)(Nav);
