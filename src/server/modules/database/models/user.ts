// import * as Sequelize from 'sequelize';

// export default (sequelize: Sequelize.Sequelize, dataTypes: any) => {
//   class User extends Sequelize.Model {}

//   User.init(
//     {
//       username: {
//         type: Sequelize.STRING,
//       },
//       password: {
//         type: Sequelize.STRING,
//       },
//       admin: {
//         type: Sequelize.INTEGER,
//       },
//       position: {
//         type: Sequelize.JSON,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'user',
//     });
// };

import sequelize from 'sequelize';

export class User extends sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: sequelize.STRING,
        },
        password: {
          type: sequelize.STRING,
        },
        admin: {
          type: sequelize.INTEGER,
        },
        position: {
          type: sequelize.JSON,
        },
      },
      {
        sequelize,
        modelName: 'user',
      },
    );
  }
}
