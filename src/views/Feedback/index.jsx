import React from 'react';
import MaterialTable from 'material-table';
import { Dashboard as DashboardLayout } from 'layouts';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import styles from './styles';
import PropTypes from 'prop-types';
import { CircularProgress, withStyles } from '@material-ui/core';
import RecipeReviewCard from './components/RecipeReviewCard';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class Typography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      columns: [
        { title: '用户编号', field: '_customer_id' },
        { title: '用户姓名', field: '_customer_name' },
        { title: '提交时间', field: '_time' }
      ],
      data: [],
      isLoading: false,

      snackOpen: false,
      message: ''
    };
  }

  componentWillMount() {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Feedback/all')
      .then(res => res.json())
      .then(json => {
        console.log(json);

        for(let each of json.data) {
          let time = new Date(each._time)
          each._time = time.toLocaleString();
          //console.log("时间转化",time.toLocaleString())
        }
        this.setState({isLoading :true, data: json.data });
      });
  }
  handleCloseSnack = () => {
    this.setState({snackOpen: false});
  }
  handle = (event) => {
    this.setState({
      info: event.target.value
    });
  };

  handleSubmit = () => {
    try {
      const { info } = this.state;
      let formData = new FormData();
      //let customer_id = localStorage.getItem('customerID');
      //let customer_name = localStorage.getItem('customerName');
      formData.append('_customer_id','VodkaSoul');
      formData.append('_suggest_content', info);
      formData.append('_customer_name', 'songzhaoyi');
      this.setState({
        isLoading:false,
        info:''
      });
      const proxyurl = 'https://cors-anywhere.herokuapp.com/';
      fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Feedback/insertFeedback', {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(json => {
        this.setState({
          message: json.message,
          snackOpen: true,
        })
        if (json.message === '插入信息成功') {
          const proxyurl = 'https://cors-anywhere.herokuapp.com/';
          fetch(proxyurl + 'http://www.uniskare.xyz:6858/api/Feedback/all')
            .then(res => res.json())
            .then(json => {
              console.log(json);
              for(let each of json.data) {
                let time = new Date(each._time)
                each._time = time.toLocaleString();
                //console.log("时间转化",time.toLocaleString())
              }
              this.setState({isLoading :true, data: json.data });
            });
        }
      });
    } catch (error) {
      this.setState({
        isLoading: true,
        serviceError: error
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {snackOpen, message ,isLoading} = this.state;
    return (
      <DashboardLayout title='反馈信息'>
        <div className={classes.root}>
          <div className={classes.content}>
            {isLoading ? (
              <MaterialTable
                title="反馈信息表"
                columns={this.state.columns}
                data={this.state.data}
                detailPanel={[
                  {
                    tooltip: 'Learn more',
                    render: rowData => {
                      return (
                        <div>
                          <RecipeReviewCard context={rowData}/>
                        </div>
                      );
                    }
                  }
                ]}
              />) : (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
        <TextField
          id="filled-dense-multiline"
          label="在此留下反馈信息"
          className={clsx(classes.textField, classes.dense)}
          margin="normal"
          variant="filled"
          value={this.state.info}
          onChange={this.handle}
          multiline
          rowsMax="4"
          fullWidth
          helperText="140个字符以内"
        />
        <div className={classes.row}>
          <span className={classes.spacer}/>

            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
              发送
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={classes.rightIcon}>send</Icon>
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

        </div>
      </DashboardLayout>
    );
  }
}

Typography.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Typography);
