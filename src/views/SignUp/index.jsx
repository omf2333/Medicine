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
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from 'common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

validate.validators.checked = validators.checked;

// Service methods
const signUp = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignUp extends Component {
  state = {
    values: {
      userID: '',
      name: '',
      phoneNumber: '',
      password: '',
      policy: false
    },
    touched: {
      userID: false,
      name: false,
      phoneNumber: false,
      password: false,
      policy: null
    },
    errors: {
      userID: null,
      name: null,
      phoneNumber: null,
      password: null,
      policy: null
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

  handleClickSignUp = () => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if(!phoneRegex.test(this.state.values.phoneNumber)){
      this.setState({snackOpen: true, message: "手机号码输入有误！"});
    }else if(!pwdRegex.test(this.state.values.password)){
      this.setState({snackOpen: true, message: "密码格式错误，要求至少8位，且包含数字、字母！"});
    }else{
      this.handleSignUp();
    }
  }

  handleSignUp = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      let formData = new FormData();
      formData.append('_name', values.name);
      formData.append('_id', values.userID);
      formData.append('_phone', values.phoneNumber);
      formData.append('_password', values.password);
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Customer/register', {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(json=>{
        if (json.message === '注册成功'){
          history.push('/sign-in');
        } else {
          this.setState({isLoading: false, snackOpen: true, message: '注册失败！'});
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

    const showUserIDError =
      touched.userID && errors.userID ? errors.userID[0] : false;
    const showNameError =
      touched.name && errors.name ? errors.name[0] : false;
    const showNumberError =
      touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

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
                  药品管理系统
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    School of Software Engineering
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Tongji University, Shanghai
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
                    创建新账户
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    使用您的手机号码来创建账户
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.begin_textField}
                      label="用户名"
                      name="userID"
                      onChange={event =>
                        this.handleFieldChange('userID', event.target.value)
                      }
                      value={values.userID}
                      variant="outlined"
                    />
                    {showUserIDError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.userID[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.begin_textField}
                      label="姓名"
                      onChange={event =>
                        this.handleFieldChange('name', event.target.value)
                      }
                      value={values.name}
                      variant="outlined"
                    />
                    {showNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.name[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.begin_textField}
                      label="手机号码"
                      name="phoneNumber"
                      onChange={event =>
                        this.handleFieldChange('phoneNumber', event.target.value)
                      }
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
                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        我已阅读并接受 &nbsp;
                        <Link
                          className={classes.policyUrl}
                          to="#"
                        >
                          用户服务协议
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.policy[0]}
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
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleClickSignUp}
                      size="large"
                      variant="contained"
                    >
                      注册
                    </Button>
                  )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    已拥有账户？{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/sign-in"
                    >
                      登录
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

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignUp);
