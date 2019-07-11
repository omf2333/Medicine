import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';

// Material components
import { Button, TextField, Typography } from '@material-ui/core';

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
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';


class ProductDetail extends Component {

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };
  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const { classes, className, product, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);


    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            title="药品信息"
          />
        </PortletHeader>
        <PortletContent noPadding>
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
                  成分
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_ingredients}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  药品类型
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_type}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  医保类型
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_character}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  价格
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._min_purchase_price} - {product._max_purchase_price}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  功能主治
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_applicability}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  用法
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_usage}
                </Typography>
              </Breadcrumbs>
            </div>
            <div className={classes.field}>
              <Breadcrumbs separator=":" aria-label="Breadcrumb">
                <Typography
                  color='primary'
                  variant='h5'
                >
                  注意事项
                </Typography>
                <Typography
                  color='inherit'
                  variant='h5'
                >
                  {product._medicine_attention}
                </Typography>
              </Breadcrumbs>
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
        </PortletFooter>
      </Portlet>
    );
  }
}

ProductDetail.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductDetail);
