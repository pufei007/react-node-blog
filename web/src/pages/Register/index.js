import React from "react";
import { connect } from "dva";
import { Form, Input, Row, Col, Button } from "antd";
import { Helmet } from "react-helmet";
import withRouter from "umi/withRouter";
import config from "../../utils/config";
import styles from "./index.less";
import router from "umi/router";
const FormItem = Form.Item;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      verify: `${config.host}/api/getVerify?time=${new Date().getTime()}`
    };
  }
  componentWillUnmount = () => {
    this.props.dispatch({
      type: "Register/cleanStatus",
      payload: {
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "Register/Register",
          payload: {
            username: values.username,
            password: values.password,
            realname: values.realname ,
          }
        });
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入密码不一致，请重新确认！");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  //切换验证码
  checkNext = () => {
    this.setState({
      verify: `${config.host}/api/getVerify?time=${new Date().getTime()}`
    });
  };
  //去登录
  toLogin = () => {
    router.replace("/Login");
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };

    return (
      <div className="pageTableDiv" style={{ minWidth: "60rem" }}>
        <Helmet>
          <title>注册</title>
        </Helmet>
        <div className={styles.main}>
          <div className={styles.bg}>
            {!this.props.registerStatus ? (
              <div className={styles.register}>
                <div className={styles.title}>用户注册</div>
                <Form onSubmit={this.handleSubmit}>
                  <FormItem {...formItemLayout} label="账号" hasFeedback>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          message: "请输入登录账号！"
                        },
                        {
                          pattern:
                            "^[\u4e00-\u9fa5a-zA-Z]+[\u4e00-\u9fa5a-zA-Z0-9_]{1,19}$",
                          message:
                            "以字母或汉字开头，2-20位，汉字、字母、数字、下划线的组合"
                        }
                      ],
                      validateFirst: true //当某一规则校验不通过时，是否停止剩下的规则的校验
                    })(
                      <Input
                        placeholder="以字母或汉字开头，2-20位，汉字、字母、数字、下划线的组合"
                        autoComplete="off"
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="用户名" hasFeedback>
                    {getFieldDecorator("realname", {
                      rules: [
                        {
                          required: true,
                          message: "请输入用户名！"
                        },
                      ],
                      validateFirst: true //当某一规则校验不通过时，是否停止剩下的规则的校验
                    })(
                      <Input
                        placeholder="请输入用户名"
                        autoComplete="off"
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="密码" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "请输入密码！"
                        },
                        {
                          validator: this.validateToNextPassword
                        },
                        {
                          pattern: "^[0-9A-Za-z]{6,20}$",
                          message: "6-20位英文（区分大小写）、数字的组合"
                        }
                      ],
                      validateFirst: true //当某一规则校验不通过时，是否停止剩下的规则的校验
                    })(
                      <Input
                        type="password"
                        placeholder="6-20位英文（区分大小写）、数字的组合"
                        minLength={6}
                        maxLength={20}
                        autoComplete="new-password"
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "请再次输入密码！"
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(
                      <Input
                        type="password"
                        onBlur={this.handleConfirmBlur}
                        placeholder="请再输入一遍上面的密码"
                        minLength={6}
                        maxLength={20}
                        autoComplete={"off"}
                      />
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      立即注册
                    </Button>
                    <span style={{ float: "right", fontSize: ".6rem" }}>
                      已有账号？马上<a onClick={this.toLogin}>登录</a>
                    </span>
                  </FormItem>
                </Form>
              </div>
            ) : (
              <div className={styles.success}>
                
                <p>
                  恭喜您，
                  <span style={{ color: "#387EE8", marginRight: ".3rem" }}>
                    {this.props.registerName}
                  </span>
                  注册成功！
                </p>
                <Button type="primary" onClick={this.toLogin}>
                  马上登录
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(IndexPage);

function mapStateToProps(state) {
  return { ...state.Register };
}

export default withRouter(connect(mapStateToProps)(WrappedNormalLoginForm));
