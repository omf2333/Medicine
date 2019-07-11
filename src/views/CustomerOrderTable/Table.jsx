
import React from 'react';
import MaterialTable from 'material-table'
import {withRouter} from 'react-router';


class BasicSearch extends React.Component {
  state = {
    data:[],
  }
  constructor(props) {
    super(props);
    this.state = {
      data:props.users
    }

  }

  render() {
    const { classes, className, users } = this.props;

    return (
      <div>
      <MaterialTable
        title="订单"
        columns={[
          { title: '销售编号', field: '_sale_id' },
          { title: '职员编号', field: '_staff_id' },
          { title: '销售时间', field: '_sale_date',type:'datetime' },
          {
            title: '销售总价', field: '_sale_price',
          }
        ]}
        data= {this.state.data}
        options={{
          search: true,
          filtering:true,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: 'toc',
            tooltip: '详情',
            onClick: (event, rowData) => {
              //console.log(rowData)
              this.props.history.push('/orders/'+rowData._sale_id);
              //this.props.history.push('/contract/'+'II');
            }
          },
        ]}
      />
      </div>
    )
  }
}
export default  withRouter(BasicSearch);