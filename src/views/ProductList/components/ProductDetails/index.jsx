import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { Avatar, TextField, withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Component styles
import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class ProductDetails extends Component {
  state = {
    open: false,
    uploadedImage: '/images/avatars/avatar_1.png',
    name: '',
    medicineID: '',
    productDate: '',
    supplierID: '',
    batchID: '',
    type: '',
    ingredients: '',
    characters: '',
    usage: '',
    applicability: '',
    purchasePrice: '',
    salePrice:''
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  handleClickUpload = (event) => {
    if (event.target.files && event.target.files[0]){
      this.setState({uploadedImage: URL.createObjectURL(event.target.files[0])});
    }
  }

  handleNameChange = event =>{
    this.setState({ name: event.target.value });
  }

  handleMedicineIDChange = event =>{
    this.setState({ medicineID: event.target.value });
  }

  handleProductionDateChange = event =>{
    this.setState({ productionDate: event.target.value });
  }

  handleSupplierIDChange = event =>{
    this.setState({ medicineID: event.target.value });
  }

  handleBatchIDChange = event =>{
    this.setState({ batchID: event.target.value });
  }

  handleTypeChange = event =>{
    this.setState({ type: event.target.value });
  }

  handleIngredientsChange = event =>{
    this.setState({ ingredients: event.target.value });
  }

  handleCharactersChange = event =>{
    this.setState({ characters: event.target.value });
  }

  handleUsageChange = event =>{
    this.setState({ usage: event.target.value });
  }

  handleApplicabilityChange = event =>{
    this.setState({ applicability: event.target.value });
  }

  handlePurchasePriceChange = event =>{
    this.setState({ purchasePrice: event.target.value });
  }

  handleSalePriceChange = event =>{
    this.setState({ salePrice: event.target.value });
  }
  render() {
    const { classes, className } = this.props;
    const { open, uploadedImage, name, medicineID, productionDate, supplierID, batchID,
      type, ingredients, characters, applicability, usage, purchasePrice, salePrice} = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          添加药品
        </Button>
        <Dialog
          onClose={this.handleClickClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleClickClose} >
            <Typography variant="h4">添加药品</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <div>
              <Avatar
                className={classes.avatar}
                src={uploadedImage}
               component={'div'}/>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                capture={'camcorder'}
                type="file"
                onChange={this.handleClickUpload}
              />
              <label htmlFor="contained-button-file">
                <Button
                  className={classes.uploadButton}
                  color="primary"
                  variant="contained"
                  component="span"
                >
                  上传照片
                </Button>
              </label>
            </div>
            <TextField
              className={classes.shortTextField}
              label="药品名称"
              required
              margin={'dense'}
              value={name}
              variant="outlined"
              onChange={this.handleNameChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品批准文号"
              required
              margin={'dense'}
              value={medicineID}
              variant="outlined"
              onChange={this.handleMedicineIDChange}
            />
            <TextField
              className={classes.shortTextField}
              label="生产日期"
              required
              margin={'dense'}
              value={productionDate}
              variant="outlined"
              onChange={this.handleProductionDateChange}
            />
            <TextField
              className={classes.shortTextField}
              label="供应商"
              required
              margin={'dense'}
              value={supplierID}
              variant="outlined"
              onChange={this.handleSupplierIDChange}
            />
            <TextField
              className={classes.shortTextField}
              label="生产批号"
              required
              margin={'dense'}
              value={batchID}
              variant="outlined"
              onChange={this.handleBatchIDChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品类别"
              required
              margin={'dense'}
              value={type}
              variant="outlined"
              onChange={this.handleTypeChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品性状"
              required
              margin={'dense'}
              value={characters}
              variant="outlined"
              onChange={this.handleCharactersChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品用法"
              required
              margin={'dense'}
              value={usage}
              variant="outlined"
              onChange={this.handleUsageChange}
            />
            <TextField
              className={classes.longTextField}
              label="药品成分"
              required
              margin={'dense'}
              value={ingredients}
              variant="outlined"
              onChange={this.handleIngredientsChange}
            />
            <TextField
              className={classes.longTextField}
              label="药品适用症状"
              required
              margin={'dense'}
              value={applicability}
              variant="outlined"
              onChange={this.handleApplicabilityChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品进价"
              type={'number'}
              required
              margin={'dense'}
              value={purchasePrice}
              variant="outlined"
              onChange={this.handlePurchasePriceChange}
            />
            <TextField
              className={classes.shortTextField}
              label="药品售价"
              type={'number'}
              required
              margin={'dense'}
              value={salePrice}
              variant="outlined"
              onChange={this.handleSalePriceChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              保存信息
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductDetails);
