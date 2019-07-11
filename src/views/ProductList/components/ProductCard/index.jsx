import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, Divider } from '@material-ui/core';

// Material icons
import {
  AccessTime as AccessTimeIcon,
  GetApp as GetAppIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class ProductCard extends Component {
  render() {
    const { classes, className, product } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt="Product"
            className={classes.image}
            src={product._medicine_image}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            {product._medicine_name}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            {product._medicine_type}
          </Typography>
        </div>
        <Divider />
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
