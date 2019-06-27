import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import wangEditor from 'wangeditor';

import { connect } from 'dva';

import { Input, Button } from 'antd';
import { notification } from '../../framework/common';
import router from 'umi/router';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      title: this.props.location.params ? this.props.location.params.data.title : '',
      editorHtml: this.props.location.params ? this.props.location.params.data.content : '',
      id: this.props.location.params ? this.props.location.params.data.id : '',
      editorText: '',
    };
  }
  componentDidMount() {
    var editor = new wangEditor(ReactDOM.findDOMNode(this._div));
    editor.customConfig.onchange = html => {
      // console.log(html);
      // console.log(editor.txt.text());
      this.setState({
        editorHtml: html,
        editorText: editor.txt.text(),
      });
    };
    editor.create();
    editor.txt.html(this.state.editorHtml);
  }
  new = () => {
    if (this.state.id) {
      if (this.state.title && this.state.editorHtml) {
        this.props.dispatch({
          type: 'New/UpdateBlog',
          payload: {
            id: this.state.id,
            title: this.state.title,
            content: this.state.editorHtml,
            author: this.props.author,
          },
        });
        setTimeout(() => {
          router.push('/Home');
        }, 1000);
      } else {
        notification.error('请完善标题或内容', '错误');
      }
    } else {
      if (this.state.title && this.state.editorHtml) {
        this.props.dispatch({
          type: 'New/NewBlog',
          payload: {
            title: this.state.title,
            content: this.state.editorHtml,
            author: this.props.author,
          },
        });
        setTimeout(() => {
          router.push('/Home');
        }, 1000);
      } else {
        notification.error('请完善标题或内容', '错误');
      }
    }
  };
  handleTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.title}>
          标题：
          <Input placeholder="请输入标题" value={this.state.title} onChange={this.handleTitle} />
        </div>
        <div id="editor" ref={ref => (this._div = ref)} className={styles.editor} />
        <div>
          <Button type="primary" onClick={this.new}>
            发布文章
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.New, ...state.Global };
}

export default withRouter(connect(mapStateToProps)(IndexPage));
