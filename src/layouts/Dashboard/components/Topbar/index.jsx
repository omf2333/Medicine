import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { Grid, withStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import { NotificationList } from './components';

// Component styles
import styles from './styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



class Topbar extends Component {
  signal = true;

  state = {
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null,
    snackOpen: false,
    message: ''
  };

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { history } = this.props;
    localStorage.setItem('isAuthenticated', false);
    localStorage.clear();
    this.setState({snackOpen:true,message:"退出登录！"});
    history.push('/productList');
  };

  handleSignIn = () => {
    const { history } = this.props;
    //localStorage.setItem('isAuthenticated', true);
    //localStorage.clear();
    history.push('/sign-in');
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };

  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    const { notifications, notificationsCount, notificationsEl,snackOpen,message } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);

    const isLogin = localStorage.getItem("isAuthenticated");
    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            <IconButton
              className={classes.notificationsButton}
              onClick={this.handleShowNotifications}
            >
              <Badge
                badgeContent={notificationsCount}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={classes.signOutButton}
              onClick={isLogin ? this.handleSignOut:this.handleSignIn}
            >
              <InputIcon />
            </IconButton>
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <NotificationList
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
        </Popover>
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
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
