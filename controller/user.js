const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../utils/cryp");

const login = async (username, password) => {
  username = escape(username);

  // 生成加密密码
  password = genPassword(password);
  password = escape(password);

  const sql = `
        select username, realname from users where username=${username} and password=${password}
    `;
  const rows = await exec(sql);
  return rows[0] || {};
};
const register = async (blogData = {}) => {
  const username = blogData.username;
  const password = genPassword(blogData.password);
  const realname = blogData.realname;
  const checkSql = `select * from users where username='${username}'`;
  const res = await exec(checkSql);
  if (res.length > 0) {
    return false;
  } else {
    const sql = `
    insert into users (username, password, realname)
    values ('${username}', '${password}', '${realname}');
      `;
    const rows = await exec(sql);
    if (rows.affectedRows > 0) {
      return true;
    }
    return false;
  }
};

module.exports = {
  login,
  register
};
