import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Pagination } from "antd";

class UTable extends PureComponent {
  render() {
    const {
      loading,
      scroll,
      columns,
      dataSource,
      total,
      onChange,
      onShowSizeChange
    } = this.props;
    return (
      <>
        <Table
          rowKey="id"
          loading={loading}
          scroll={scroll}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Pagination
          style={{ float: "right", margin: "16px 0" }}
          size="small"
          total={total}
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
        />
      </>
    );
  }
}

UTable.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func
};
UTable.defaultProps = {
  scroll: { x: 1100, y: 500 }
};
export default UTable;
