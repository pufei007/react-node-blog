import React from 'react';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

import { Icon } from 'antd';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'Home/Init',
      payload: {
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
        {this.props.list
          ? this.props.list.map((item, index) => {
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.left}>
                    <img src={require('../../assets/cover.jpg')} alt="img" />
                  </div>
                  <div className={styles.right}>
                    <a className={styles.title}>{item.title}</a>
                    <p className={styles.content}>{item.content}</p>
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
                        {item.author}
                      </div>
                      <div>{item.createtime}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.Home };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
