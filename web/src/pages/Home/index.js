import React from 'react';
import styles from './index.less';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

import { Icon ,Button} from 'antd';
import { utils } from '../../framework/common';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // if(this.props.author){
      
      this.props.dispatch({
        type: 'Home/Init',
        payload: {
          author:this.props.author?this.props.author:''
          // page: this.props.currentPage,
          // pageSize: this.props.pageSize,
          // pId: "",
          // proId: this.props.currentProjectId ? this.props.currentProjectId : ""
        },
      });
    // }
  }
  toCheckDetail = data => {
    console.log(data);
    router.push({
      pathname: '/Detail',
      params: {
        id: data.id,
      },
    });
  };
  render() {
    return (
      <div className={styles.main}>
        {this.props.list&&this.props.list.length>0
          ? this.props.list.map((item, index) => {
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.left}>
                    <img src={require('../../assets/cover.jpg')} alt="img" />
                  </div>
                  <div className={styles.right}>
                    <a className={styles.title} onClick={this.toCheckDetail.bind(this, item)}>
                      {item.title}
                    </a>
                    <p className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }}></p>
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
                      <div>{utils.time(item.createtime)}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : <div className={styles.noData}>暂无文章，<Button type='primary' onClick={()=>{router.push('/New')}}>写文章</Button> </div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.Home,...state.Global };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
