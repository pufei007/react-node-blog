import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, } from 'antd';
import { common } from '~/framework';
import styles from './index.less';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import homebackground from '../../assets/commons/bg.png';
import { Helmet } from 'react-helmet';
import config from '../../utils/config';
const { utils } = common;
const FormItem = Form.Item;
// const { Header, Footer, Sider, Content } = Layout;
var bg = {
  backgroundImage: 'url(' + homebackground + ')',
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: `${config.host}/api/getVerify?time=${new Date().getTime()}`,
      userFocus: false,
      pwdFocus: false,
      verifyFocus: false,
      userName: '',
      password: '',
      remember: false,
      encode: false,
    };
  }
  componentDidMount() {
    this.loadAccountInfo();
  }
  //判断cookie中是否有账号信息，有就可以进行预填写，没有则直接返回
  loadAccountInfo = () => {
    let accountInfo = utils.getCookie('accountInfo');
    if (Boolean(accountInfo) === false) {
      this.setState({
        encode: false,
      });
    } else {
      let userName = '';
      let passWord = '';
      let index = accountInfo.indexOf('^');
      userName = accountInfo.substring(0, index);
      passWord = accountInfo.substring(index + 1);
      this.setState({
        userName: userName,
        password: passWord,
        remember: true,
        encode: true,
      });
    }
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .dispatch({
            type: 'Login/Login',
            payload: {
              username: values.userName,
              password: values.password,
            },
          })
          .then(res => {
            if (res && res.errno !== -1) {
              this.setState({
                userName: '',
                password: '',
              });
              this.props.dispatch({
                type: 'Global/saveAuthor',
                params: {
                  author: res.data.username,
                  realname: res.data.realname,
                },
              });
              localStorage.setItem('author', res.data.username);
              localStorage.setItem('realname', res.data.realname);
              router.push('/Home');
            }
          });
      }
    });
  };
  //input 获取焦点 width: 100%
  inputOnFocus = value => {
    if (value === 'user') {
      this.setState({ userFocus: true });
    } else if (value === 'pwd') {
      this.setState({ pwdFocus: true });
    } else {
      this.setState({ verifyFocus: true });
    }
  };
  //input 失去焦点
  inputOnBlur = value => {
    if (value === 'user') {
      this.setState({ userFocus: false });
    } else if (value === 'pwd') {
      this.setState({ pwdFocus: false });
    } else {
      this.setState({ verifyFocus: false });
    }
  };
  //去注册
  toRegister = () => {
    router.replace('/Register');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="pageTableDiv">
        <Helmet>
          <title>登录</title>
        </Helmet>
        <div className={styles.main} style={bg}>
          <div className={styles.content}>
            <div className={styles.rightForm}>
              <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
                <div className={styles.title}>简写博客</div>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入账号' }],
                    initialValue: this.state.userName,
                  })(
                    <div style={{ marginTop: '2.2rem' }}>
                      <i
                        className="iconfont icon-ren"
                        style={{
                          marginRight: '.3rem',
                          color: this.state.userFocus ? '#387EE8' : '#848FA0',
                        }}
                      />
                      <Input
                        style={{ width: '15rem' }}
                        className={styles.infoInput}
                        value={this.state.userName}
                        placeholder="账号(guest)"
                        onBlur={this.inputOnBlur.bind(this, 'user')}
                        onFocus={this.inputOnFocus.bind(this, 'user')}
                        onChange={this.handleChange('userName')}
                      />
                    </div>,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                    initialValue: this.state.password,
                  })(
                    <div>
                      <i
                        className="iconfont icon-mima"
                        style={{
                          marginRight: '.3rem',
                          color: this.state.pwdFocus ? '#387EE8' : '#848FA0',
                        }}
                      />
                      <Input
                        style={{ width: '15rem' }}
                        className={styles.infoInput}
                        value={this.state.password}
                        type="password"
                        placeholder="密码(123456)"
                        onBlur={this.inputOnBlur.bind(this, 'pwd')}
                        onFocus={this.inputOnFocus.bind(this, 'pwd')}
                        onChange={this.handleChange('password')}
                      />
                    </div>,
                  )}
                </FormItem>
                {/*<FormItem>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })(
                    <div>
                      <i
                        className="iconfont icon-yuechi"
                        style={{
                          marginRight: '.3rem',
                          color: this.state.verifyFocus ? '#387EE8' : '#848FA0',
                        }}
                      />
                      <Input
                        style={{ width: '15rem' }}
                        className={styles.infoInput}
                        type="text"
                        placeholder="点击验证码可更换"
                        onBlur={this.inputOnBlur.bind(this, 'verify')}
                        onFocus={this.inputOnFocus.bind(this, 'verify')}
                      />
                      <div
                        className={styles.veriImg}
                        style={{ background: `url(${this.state.verify})` }}
                        onClick={this.refreshImg}
                        title="点击验证码可更换"
                      />
                    </div>,
                  )}
                      </FormItem>*/}
                <FormItem>
                  {/*{getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: this.state.remember,
                  })(
                    <Checkbox
                      style={{ color: '#848FA0', fontSize: '.6rem' }}
                      onChange={this.handleChecked('remember')}
                    >
                      记住密码
                    </Checkbox>,
                  )}
                  <a className={styles.forgot} href="">
                    忘记密码？
                  </a>*/}
                  <Button type="primary" htmlType="submit" className={styles.button}>
                    <span>登录</span>
                  </Button>
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#848FA0',
                      fontSize: '.6rem',
                    }}
                  >
                    还没有账号，
                    <a onClick={this.toRegister}>马上注册</a>
                  </div>
                </FormItem>
              </Form>
            </div>
          </div>
          <div className={styles.footer}>
            <span>——— pufei.me ———</span>
          </div>
        </div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(IndexPage);

function mapStateToProps(state) {
  return { ...state.Login, ...state.Global };
}

export default withRouter(connect(mapStateToProps)(WrappedNormalLoginForm));
