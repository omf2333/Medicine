import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  AccountProfile,
  ProductDetail,
} from './components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { blue } from '../../common/colors';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  snackBar:{
    background: blue
  }
});

class Product extends Component {
  state = {
    isLike: false,
    snackOpen: false,
    message: ''
  };

  componentWillMount() {
    let user_id = localStorage.getItem('customerID');
    console.log(user_id)
    let medicine_id = this.props.match.params.id;
    let formData = new FormData();
    console.log(user_id,medicine_id);
    formData.append('_customer_id',user_id);
    formData.append('_medicine_id',medicine_id);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+'http://www.uniskare.xyz:6858/api/Subscribe',
      {
        method:'POST',
        body:formData,
      })
      .then(res => res.json())
      .then(json =>{
        this.setState({
          isLike:json.data
        })
      });
  }

  handleLike = () =>{
    let user_id = localStorage.getItem('customerID');
    const product = this.props.location.query;
    let medicine_id = product._medicine_id;
    let formData = new FormData();
    console.log(user_id,medicine_id);
    formData.append('_customer_id',user_id);
    formData.append('_medicine_id',medicine_id);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+'http://www.uniskare.xyz:6858/api/Subscribe/insert',
      {
        method:'POST',
        body:formData,
      })
      .then(res => res.json())
      .then(json =>{
          console.log(json.message)
        this.setState({
          snackOpen: true,
          message: json.message
        })
      });


    this.setState({
      isLike: true
    })
  };

  handleUnLike = () =>{
    let user_id = localStorage.getItem('customerID');
    const product = this.props.location.query;
    let medicine_id = product._medicine_id;
    console.log(user_id,medicine_id);
    let formData = new FormData();
    formData.append('_customer_id',user_id);
    formData.append('_medicine_id',medicine_id);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+'http://www.uniskare.xyz:6858/api/Subscribe/delete',
      {
        method:'DELETE',
        body:formData,
      })
      .then(res => res.json())
      .then(json =>{
        console.log(json.message)
        this.setState({
          snackOpen: true,
          message: json.message
        })
      });

    this.setState({
      isLike: false
    })
  };

  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const { classes} = this.props;

    const product = this.props.location.query;

    const {snackOpen,message} = this.state;

    return (
      <DashboardLayout title="药品详情">
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            direction='row'
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AccountProfile
                name={product._medicine_name}
                id={product._medicine_id}
                image={product._medicine_image}
                isLike={this.state.isLike}
                father={this}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <ProductDetail
                product={product}
              />
              <Snackbar
                ContentProps={{ classes: { root: classes.snackBar } }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                color={'primary'}
                open={snackOpen}
                autoHideDuration={6000}
                message={message}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleCloseSnack}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </Grid>
          </Grid>

        </div>
      </DashboardLayout>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
