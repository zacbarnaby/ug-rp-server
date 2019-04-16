import * as Sequelize from 'sequelize';

// @ts-ignore
export class User extends Sequelize.Model {
  static init(sequelize: Sequelize.Sequelize): any {
    return super.init(
      {
        username: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        admin: {
          type: Sequelize.INTEGER,
        },
        position: {
          type: Sequelize.JSON,
        },
      },
      {
        sequelize,
        modelName: 'user',
      },
    );
  }

  static associate(models) {
  }
}
