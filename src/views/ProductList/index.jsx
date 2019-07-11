import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import {
  ProductsToolbar,
  ProductCard,
  ProductDetails,
} from './components';

// Component styles
import styles from './styles';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const itemOfOnePage = 9;

class ProductList extends Component {
  signal = true;

  search = ' ';

  state = {
    isLoading: false,
    products: [],
    productsTotal: 0,
    page: 0,
  };

  async getProducts() {
      this.setState({ isLoading: true });

      await fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Medicine/search/name/' + encodeURI(this.search))
        .then(res => res.json())
        .then(json => {
          this.setState({
            products: json.data,
            productsTotal: json.data.length
          });
          console.log(this.state.products)
        });

      if (this.signal) {
        this.setState({
          isLoading: false,
        });
      }
  }

  componentWillMount() {
    this.signal = true;

    this.getProducts();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderProducts() {
    const { classes } = this.props;
    const { isLoading, products } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography
          variant="h6"
          align='center'
        >
          该药品不存在
        </Typography>
      );
    }

    let subProducts = products.slice(this.state.page * itemOfOnePage, (this.state.page + 1) * itemOfOnePage);

    return (
      <Grid
        container
        spacing={3}
      >
        {subProducts.map(product => (
          <Grid
            item
            key={product._medicine_id}
            lg={4}
            md={6}
            xs={12}
            onClick={this.handleClickDetails}
          >
            <Link to={{pathname: "/product/"+product._medicine_id, query: product}}>
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  handleSearchInput = e =>{
    let search = (e.target.value === '' ? ' ' : e.target.value);

    this.search = search;
  };

  handleSearch = () =>{
    this.setState({
      page:0
    });
    this.getProducts();
  };

  handleBackPage = () =>{
    if(this.state.page > 0){
      this.setState({
        page:this.state.page - 1
      })
    }
  };

  handleFrontPage = () =>{
    let mostPage = (this.state.productsTotal - 1) / itemOfOnePage;
    if(this.state.page < mostPage){
      this.setState({
        page:this.state.page + 1
      })
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="药品">
        <div className={classes.root}>
          <ProductsToolbar father={this}/>
          <div className={classes.content}>
            {this.renderProducts()}
          </div>
          <div className={classes.pagination}>
            <Typography variant="caption">{this.state.page * itemOfOnePage + 1}{'  ——  '}{((this.state.page + 1) * itemOfOnePage < this.state.productsTotal)
              ? (this.state.page + 1) * itemOfOnePage
              : this.state.productsTotal}
              {'     OF     '}
              {this.state.productsTotal}
            </Typography>
            <IconButton
              onClick={this.handleBackPage}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={this.handleFrontPage}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductList);
