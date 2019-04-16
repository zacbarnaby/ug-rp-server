import database from '../database/database';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
Object.assign(mp.Player.prototype, {
  exists() {
    return new Promise((resolve, reject) => {
      const username = (<PlayerMp>this).name;
      database.user.count({ where: { username } })
        .then((count: Number) => {
          if (count !== 0) resolve();
          else reject('No account matches that username.');
        })
        .catch(() => reject('An unknown error occurred. Try again later.'));
    });
  },
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      database.user.findOne({ raw: true, where: { username } })
        .then((account: any) => {
          bcrypt.compare(password, account.password, (err: object, res: Boolean) => {
            if (res === true) resolve(account);
            else reject('Incorrect username or password.');
          });
        })
        .catch(() => {
          return reject('Incorrect username or password.');
        });
    });
  },
  register(username: string, password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err: object, hash: string) => {
        database.user.create({ username, password: hash })
          .then((account: any) => resolve(account))
          .catch(() => reject('An unknown error occurred. Try again later.'));
      });
    });
  },
  save() {
    const { x, y, z } = this.position;
    const position = JSON.stringify({ x, y, z, r: this.heading });
    return database.user.update({ position, admin: this.account.admin }, { where: { id: this.account.uid } });
  },
  handleLogin(account: UGAccount) {
    (<UGPlayerMp>this).logged = true;
    (<UGPlayerMp>this).account = account;
    (<UGPlayerMp>this).spawnedVehicles = [];
  },
});
