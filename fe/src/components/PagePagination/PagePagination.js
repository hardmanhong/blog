import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import "./PagePagination.scss";
class PagePagination extends PureComponent {
  render() {
    const { total, onChange } = this.props;
    return (
      <Pagination
        className="component-pagination"
        size="small"
        total={total}
        onChange={onChange}
      />
    );
  }
}

PagePagination.propTypes = {
  total: PropTypes.number,
  onChange: PropTypes.func
};

export default PagePagination;
