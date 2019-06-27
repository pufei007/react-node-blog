import React from 'react';
import styles from './index.less';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { modal } from '../../framework/common';
import { Icon, Button } from 'antd';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(this.props.location);
    this.props.dispatch({
      type: 'Admin/Init',
      payload: {
        author: this.props.author,
      },
    });
  }
  edit = data => {
    // console.log(data);
    router.push({
      pathname: '/New',
      params: {
        data: data,
      },
    });
  };
  del = data => {
    modal.confirm('确认是否删除该文章？', this.confirm.bind(this, data.id), null, '删除');
  };
  confirm = id => {
    this.props
      .dispatch({
        type: 'Admin/DelBlog',
        payload: {
          id: id,
          author: this.props.author,
        },
      })
      .then(res => {
        if (res && res.errno === 0) {
          this.props.dispatch({
            type: 'Admin/Init',
            payload: {
              author: this.props.author,
            },
          });
        }
      });
  };
  toDetail = id => {
    router.push({
      pathname: '/Detail',
      params: {
        id: id,
      },
    });
  };
  render() {
    // console.log(this.props.list);
    return (
      <div className={styles.main}>
        <div>个人文章管理</div>
        <div className={styles.list}>
          {this.props.list.length > 0 ? (
            <ul>
              {this.props.list.map((item, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div className={styles.title} onClick={this.toDetail.bind(this, item.id)}>
                        <a>{item.title}</a>
                      </div>
                      <div className={styles.btn}>
                        <Button type="primary" onClick={this.edit.bind(this, item)}>
                          编辑
                        </Button>
                        <Button type="danger" onClick={this.del.bind(this, item)}>
                          删除
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.noData}>暂无文章</div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.Admin, ...state.Global };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
