import React, { Component } from 'react';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';


import NewTable from './Table'
// Component styles
import styles from './style';


class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    sales: [],
    selectedUsers: [],
    error: null
  };

  componentWillMount() {
    console.log(this.props.match.params.id);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+'http://www.uniskare.xyz:6858/api/Sale/records/'+this.props.match.params.id).then(res=>res.json()).then(
      json=> {
        console.log(json);
        this.setState({
            sales: json.data,
            isLoading:true,
          }
        )
      }
    )
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers() {
    const { classes } = this.props;


    if(this.state.isLoading) {
      return (

        <NewTable
          //
          onSelect={this.handleSelect}
          users={this.state.sales}
        />
      );
    } else {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="订单详情">
        <div className={classes.root}>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
