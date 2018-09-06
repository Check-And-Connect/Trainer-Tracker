import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  state = {
    anchorEl: null,
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
      <div className="buttonGroup">
      <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
        >
          <Link to="/user">HOME4NOW</Link>
        </Button>
      <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
        >
          Search Trainers
        </Button>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          
        >
        <Link to="/info">Cohort Manager</Link>
          
        </Button>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Create
        </Button>
        <Menu 
          
          id="simple-menu"
          className="navBar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem className={this.props.classes.dropDown} onClick={this.handleClose}><Link to="/addtrainer">Trainer</Link></MenuItem>

          <MenuItem className={this.props.classes.dropDown} onClick={this.handleClose}>Cohort</MenuItem>

          <MenuItem className={this.props.classes.dropDown} onClick={this.handleClose}>Requirements</MenuItem>

          <MenuItem className={this.props.classes.dropDown} onClick={this.handleClose}> 
          <Link to="/register">National Trainer</Link></MenuItem>

          <MenuItem className={this.props.classes.dropDown} onClick={this.handleClose}>State Lead</MenuItem>
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

let styles = {
  dropDown:{
    display: 'flex',

  }
}
export default withStyles(styles)(Nav);
