import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { CircularProgress, withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import emitter from '../../util'

class Account extends Component {
  state = {
    id: '1197182168',
    name: '罗宇',
    phone: '18721333367',
    data:{_id: '', _name: '', _phone: ''},
    isLoading: false,
    snackOpen: false,
    message: ''
  };
  componentWillMount() {
    this.state.data._id = localStorage.getItem('customerID');
    this.state.data._name = localStorage.getItem('customerName');
    this.state.data._phone = localStorage.getItem('phoneNumber');

  }

  handleClickSave(){
    let formData = new FormData();
    formData.append('_id', this.state.data._id);
    formData.append('_name', this.state.data._name);
    formData.append('_phone', this.state.data._phone);
    console.log(formData);
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Customer/update/information', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(json=>{
      this.setState({
        snackOpen:true,
        message:json.message
      })
      if(json.message === '更新信息成功'){
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('customerID', json.data._id);
        localStorage.setItem('customerName', json.data._name);
        localStorage.setItem('phoneNumber', json.data._phone);
        this.handleResetName(json.data._name);
      }
    });
  };
  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }

  handleNameChange = event =>{
    let newData = this.state.data;
    newData._name = event.target.value;
    this.setState({ data:newData });
  }

  handlePhoneChange = event =>{
    let newData = this.state.data;
    newData._phone = event.target.value;
    this.setState({ data:newData });
  }

  handleResetName = name =>{
    emitter.emit('changeMessage', name);
    console.log('send new name');
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { _id, _name, _phone} = this.state.data;
    const {snackOpen, message } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="信息可编辑"
            title="个人信息"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="用户编号(不可更改)"
                required
                value={_id}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="用户姓名"
                required
                value={_name}
                variant="outlined"
                onChange={this.handleNameChange}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="电话号码"
                type="number"
                value={_phone}
                variant="outlined"
                onChange={this.handlePhoneChange}
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            onClick={event => this.handleClickSave()}
          >
            保存信息
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
    )
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
