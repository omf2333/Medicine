import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { IconButton, withStyles } from '@material-ui/core';

//Custom components
import { SearchInput } from '../';

// Component styles
import styles from './styles';
import { KeyboardReturn as EnterIcon } from '@material-ui/icons';


class ProductsToolbar extends Component {

  render() {
    const { classes, className, father } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="搜索药品"
            onChange={father.handleSearchInput}
          />
          <IconButton
            className={classes.enterIcon}
            variant="text"
            onClick={father.handleSearch}
          >
            <EnterIcon />
          </IconButton>
          <span className={classes.spacer} />
        </div>
      </div>
    );
  }
}

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductsToolbar);
