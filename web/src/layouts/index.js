import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout, Row, Col, Button } from 'antd';
import { Helmet } from 'react-helmet';
import styles from './index.less';
import { Bootstrap } from '../framework';
export default withRouter(
  connect(({ loading ,Global}) => {
    // console.log(Global);
    return { loading,Global };
  })(function({ loading,Global, location, children }) {
    return (
      <Bootstrap>
        {location.pathname === '/Login' || location.pathname === '/Register' ? (
          <Layout className={styles.Layout}>
            <Helmet>
              <title>蒲大飛</title>
              <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
              <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
            </Helmet>
            <Layout.Content className={styles.loginContent}>{children}</Layout.Content>
          </Layout>
        ) : (
          <Layout>
            <Helmet>
              <title>蒲大飛</title>
              <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
              <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
            </Helmet>
            <Layout.Header className={styles.header}>
              <Row>
                <Col xs={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }}>
                  <div className={styles.head}>
                    <ul>
                      <li
                        onClick={() => {
                          router.push('Home');
                        }}
                        title="首页"
                      >
                        简写博客
                      </li>
                      <li onClick={out} title='推出'>退出</li>
                      <li style={{marginRight:'1rem'}} title='个人中心' onClick={admin}>{Global.realname}</li>
                      <li title="写文章">
                        <Button
                          type="primary"
                          shape="round"
                          icon="edit"
                          onClick={() => {
                            router.push('New');
                          }}
                        >
                          写文章
                        </Button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Layout.Header>
            <Layout.Content className={styles.mainContent}>
              <Row>
                <Col xs={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }}>
                  {children}
                </Col>
              </Row>
              <Layout.Footer>
                <Row>
                  <Col xs={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }}>
                    <div className={styles.foot}>
                      <ul>
                        <li>Copyright © 2019 pufei.me All Rights Reserved</li>
                        <li>me@pufei.me</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Layout.Footer>
            </Layout.Content>
          </Layout>
        )}
      </Bootstrap>
    );
    
  }),
);
function out(){
  localStorage.setItem('author','')
  router.replace('/Login')
}
function admin(){
  router.replace('/Admin')
}
