import React from 'react';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { utils } from '../../framework/common';
import { Icon } from 'antd';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.location);
    this.props.dispatch({
      type: 'Detail/Init',
      payload: {
        // id: 17,
        id: this.props.location.params.id,
        // page: this.props.currentPage,
        // pageSize: this.props.pageSize,
        // pId: "",
        // proId: this.props.currentProjectId ? this.props.currentProjectId : ""
      },
    });
  }
  render() {
    return (
      <div className={styles.main}>
        {JSON.stringify(this.props.detail) !== '{}' ? (
          <div className={styles.card}>
            <div className={styles.right}>
              <a className={styles.title}>{this.props.detail.title}</a>
              <div className={styles.info}>
                <div
                  style={{
                    paddingRight: '.2rem',
                  }}
                >
                  <Icon type="user" />
                </div>
                <div
                  style={{
                    paddingRight: '2rem',
                  }}
                >
                  {this.props.detail.author}
                </div>
                <div>{utils.time(this.props.detail.createtime)}</div>
              </div>
              <p className={styles.content} dangerouslySetInnerHTML={{ __html: this.props.detail.content }}></p>
            </div>
          </div>
        ) : <div className={styles.noData}>暂无该文章</div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.Detail };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
