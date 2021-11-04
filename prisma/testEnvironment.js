// test env for prisma
// https://github.com/prisma/prisma-examples/blob/latest/typescript/testing-express/prisma/prisma-test-environment.js
const path = require('path');
const fs = require('fs');
const util = require('util');
const NodeEnvironment = require('jest-environment-node');
const { nanoid } = require('nanoid');
const exec = util.promisify(require('child_process').exec);

const prismaBinary = path.join(__dirname, '..', 'node_modules', '.bin', 'prisma');

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.dbName = `test_${nanoid()}.db`;
    const dbUrl = `file:${this.dbName}`;
    process.env.DATABASE_URL = dbUrl;
    this.global.process.env.DATABASE_URL = dbUrl;
    this.dbPath = path.join(__dirname, this.dbName);
  }

  async setup() {
    await exec(`${prismaBinary} migrate up --create-db --experimental`);
  }

  async teardown() {
    await fs.promises.unlink(this.dbPath);
  }
}

module.exports = PrismaTestEnvironment;
