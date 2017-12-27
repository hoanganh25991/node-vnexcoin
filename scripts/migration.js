import cpf from "child_process"
import path from "path"
import fs from "fs"

const _ = console.log

const {
  MYSQL_ROOT_USER: root,
  MYSQL_ROOT_PASS: rootpass,
  DB_USER: user = "gobear",
  DB_PASS: pass = "dOey8JPc",
  DB_HOST: host = "localhost"
} = process.env

const run = () => {
  const shouldMigrate = root && rootpass
  if (!shouldMigrate) return

  const userSql = `CREATE USER IF NOT EXISTS '${user}'@'${host}' IDENTIFIED BY '${pass}';GRANT SELECT, EXECUTE, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON \`gobear\`.* TO 'gobear'@'localhost' WITH GRANT OPTION;`
  _("[INFO] Write user.sql file")
  fs.writeFileSync(path.join(__dirname, "user.sql"), userSql)

  _("[INFO] Migration database skeleton")
  _(cpf.execSync(`mysql -u ${root} --password=${rootpass} < ${path.join(__dirname, "sql.sql")}`).toString())
  _(cpf.execSync(`mysql -u ${root} --password=${rootpass} < ${path.join(__dirname, "user.sql")}`).toString())

  _("[INFO] Remove user.sql")
  _(cpf.execSync(`rm -rf ${path.join(__dirname, "user.sql")}`).toString())
}

run()
