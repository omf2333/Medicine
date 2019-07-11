import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { CircularProgress, withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// Component styles
import styles from './styles';

import emitter from '../../util'

class AccountProfile extends Component {
  state = {
    data:{_id: '', _name: '', _phone: '', _identity: ''},
    isLoading: false,
  };
  componentWillMount() {
    this.state.data._id = localStorage.getItem('staffID');
    this.state.data._name = localStorage.getItem('staffName');
    this.state.data._phone = localStorage.getItem('phoneNumber');
    this.state.data._identity = localStorage.getItem('position');
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener('changeMessage', (name) => {
      console.log('receive new name ' + name);
      let newData = this.state.data;
      newData._name = name;
      this.setState({
        data: newData
      });
    });
  }
  componentWillUnmount() {
    //emitter.removeListener(this.eventEmitter);
  }

  renderPosition() {
    const { classes, className, ...rest } = this.props;
    if(this.state.data != null) {
      return (
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          {'身份：' + '尊贵的会员'}
        </Button>
      )
    }else{
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
  }
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    // if(!this.state.isLoading) {
    //   return (
    //     <div className={classes.progressWrapper}>
    //       <CircularProgress />
    //     </div>
    //   );
    // } else {
    //
    // }
    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{this.state.data._name}</Typography>
              <Typography
                className={classes.locationText}
                variant="body1"
              >
                上海，中国
              </Typography>
              <Typography
                className={classes.dateText}
                variant="body1"
              >
                2019-07-07 04:32(GMT-4)
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">个人信息完成度: 80%</Typography>
            <LinearProgress
              value={80}
              variant="determinate"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          {this.renderPosition()}
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
