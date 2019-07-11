import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

// Material helpers
import { IconButton, withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter, PortletHeader } from 'components';

// Component styles
import styles from './styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@material-ui/icons';

class AccountProfile extends Component {

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    const { classes, className, name, id, image, isLike, father, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <IconButton
            className={classes.backButton}
            onClick={this.handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          {isLike ?
            <IconButton
              className={classes.backButton}
              onClick={father.handleUnLike}
            >
              <StarIcon />
            </IconButton>
          :
            <IconButton
              className={classes.backButton}
              onClick={father.handleLike}
            >
              <StarBorderIcon />
            </IconButton>
          }
        </PortletHeader>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.imageWrapper}>
              <img
                alt={name}
                width="250"
                height="250"
                src={image}
              />
            </div>
          </div>
        </PortletContent>
        <PortletFooter>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  名称
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {name}
                </Typography>
              </Breadcrumbs>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  批准文号
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {id}
                </Typography>
              </Breadcrumbs>
            </div>
          </form>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(AccountProfile);
