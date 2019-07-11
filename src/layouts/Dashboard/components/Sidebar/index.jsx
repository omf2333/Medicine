import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  StoreMallDirectoryOutlined as StockIcon,
  PlaylistAddCheckOutlined as OrderIcon,
  //LockOpenOutlined as LockOpenIcon,
  FeedbackOutlined as FeedbackIcon,
  InfoOutlined as InfoIcon,
  RecordVoiceOverOutlined as SupplierIcon,
  AttachFileOutlined as ContractIcon,
  TrendingDownOutlined as DiscountIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SearchOutlined as MedicineSearchIcon
  //SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    const isLogin = localStorage.getItem("isAuthenticated");
    var customerId ;
    if(isLogin){
      customerId = localStorage.getItem("customerID");
    }

    console.log("isLogin:",isLogin);
    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="Brainalytica logo"
              className={classes.logoImage}
              src="/images/logos/brainalytica_logo.svg"
            />
          </Link>
        </div>
        {/*<Divider className={classes.logoDivider} />*/}
        {/*<div className={classes.profile}>*/}
        {/*  <Link to="/account">*/}
        {/*    <Avatar*/}
        {/*      alt="Roman Kutepov"*/}
        {/*      className={classes.avatar}*/}
        {/*      src="/images/avatars/avatar_1.png"*/}
        {/*    />*/}
        {/*  </Link>*/}
        {/*  <Typography*/}
        {/*    className={classes.nameText}*/}
        {/*    variant="h6"*/}
        {/*  >*/}
        {/*    Roman Kutepov*/}
        {/*  </Typography>*/}
        {/*  <Typography*/}
        {/*    className={classes.bioText}*/}
        {/*    variant="caption"*/}
        {/*  >*/}
        {/*    Brain Director*/}
        {/*  </Typography>*/}
        {/*</div>*/}
        <Divider className={classes.profileDivider} />
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/productList"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <MedicineSearchIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="药品查询"
            />
          </ListItem>
        </List>
          { isLogin ?
            <List>
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to={"/customerOrders/" + localStorage.getItem("customerID")}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <OrderIcon/>
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="订单信息"
              />
            </ListItem>
            < ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/feedback"
            >
            <ListItemIcon className={classes.listItemIcon}>
            <FeedbackIcon />
            </ListItemIcon>
            <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="反馈信息"
            />
            </ListItem>
            <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/userInfo"
            >
            <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="账号信息"
            />
            </ListItem>
            </List> : null
          }

      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
