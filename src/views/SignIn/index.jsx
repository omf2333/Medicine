import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Grid,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared components
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

// Service methods
const signIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignIn extends Component {
  state = {
    values: {
      phoneNumber: '',
      password: ''
    },
    touched: {
      phoneNumber: false,
      password: false
    },
    errors: {
      phoneNumber: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null,
    snackOpen: false,
    message: ''
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = () => {
    try{
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      let formData = new FormData();
      formData.append('_phone', values.phoneNumber);
      formData.append('_password', values.password);
      console.log(formData);
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Customer/login', {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(json=>{
        if (json.message === '登录成功'){
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('customerID', json.data._id);
          localStorage.setItem('staffID', json.data._id);
          // localStorage.setItem('password', values.password);
          localStorage.setItem('customerName', json.data._name);
          localStorage.setItem('phoneNumber', json.data._phone);
          localStorage.setItem('bonusPoint', json.data._bouns_point);

          history.push('/productList');
        } else {
          this.setState({isLoading: false, snackOpen: true, message: '用户名和密码不匹配！'});
        }
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
  };

  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading,
      snackOpen,
      message
    } = this.state;

    const showNumberError = touched.phoneNumber && errors.phoneNumber;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Takamaru Ayako
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
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
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    登录
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    使用第三方账户登录
                  </Typography>
                  <Button
                    className={classes.facebookButton}
                    color="primary"
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    <FacebookIcon className={classes.facebookIcon} />
                    使用微博账户登录
                  </Button>
                  <Button
                    className={classes.googleButton}
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    <GoogleIcon className={classes.googleIcon} />
                    使用QQ账户登录
                  </Button>
                  <Typography
                    className={classes.suggestion}
                    variant="body1"
                  >
                    使用手机号码登录
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.begin_textField}
                      label="手机号码"
                      name="phoneNumber"
                      onChange={event =>
                        this.handleFieldChange('phoneNumber', event.target.value)
                      }
                      type="text"
                      value={values.phoneNumber}
                      variant="outlined"
                    />
                    {showNumberError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.phoneNumber[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.begin_textField}
                      label="密码"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography
                      className={classes.submitError}
                      variant="body2"
                    >
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      登录
                    </Button>
                  )}
                  <Typography
                    className={classes.signUp}
                    variant="body1"
                  >
                    还没有账户？{' '}
                    <Link
                      className={classes.signUpUrl}
                      to="/sign-up"
                    >
                      注册
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignIn);
