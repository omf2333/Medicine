import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { TextField } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Password extends Component {
  state = {
    values: {
      password: '',
      confirm: '',
    },
    snackOpen: false,
    message: ''
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleClickReset = () => {
    const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if (!pwdRegex.test(this.state.values.password)) {
      this.setState({snackOpen: true, message: '密码格式错误，要求至少8位，且包含数字、字母！'});
    }else{
      if(this.state.values.confirm !== this.state.values.password){
        this.setState({snackOpen: true, message: '两次输入密码不同！'})
      }else{
        let formData = new FormData();
        formData.append('_id', localStorage.getItem("customerID"));
        formData.append('_password', this.state.values.password);
        console.log(formData);
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Customer/update/password', {
          method: 'POST',
          body: formData
        }).then(res => res.json()).then(json=>{
          console.log(json)
          this.setState({
            snackOpen:true,
            message:json.message
          })
        });
      }
    }

  };


  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }


  render() {
    const { classes, className, ...rest } = this.props;
    const { values, snackOpen, message } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="修改密码"
            title="密码"
          />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="新密码"
              name="新密码"
              onChange={event =>
                this.handleFieldChange('password', event.target.value)
              }
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="重复新密码"
              name="重复新密码"
              onChange={event =>
                this.handleFieldChange('confirm', event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={this.handleClickReset}
          >
            修改密码
          </Button>
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
        </PortletFooter>
      </Portlet>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Password);
