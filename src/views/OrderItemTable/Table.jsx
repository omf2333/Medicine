
import React from 'react';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom';
class BasicSearch extends React.Component {
  render() {
    const { classes, className, users } = this.props;

    return (
      <div>
        <Link to={"/customerOrders/"+localStorage.getItem("customerID")}><Icon>arrow_back</Icon></Link>
      <MaterialTable
        title={"订单详情"}
        columns={[
          { title: '批准文号', field: '_medicine_id' },
          { title: '药品名称', field: '_medicine_name' },
          { title: '生产批号', field: '_batch_id'},
          {
            title: '药品数量',
            field: '_sale_num',
          },
          {
            title: '药品单价',
            field: '_per_price',
          },
        ]}
        data= {users}
        options={{
          search: true,
          filtering:true,
        }}
      />
      </div>
    )
  }
}
export default  BasicSearch;