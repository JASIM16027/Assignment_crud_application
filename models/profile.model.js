module.exports = (sequelize, Model, DataTypes) => {
    class Profile extends Model {}
  
    Profile.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        profilePhoto: {
          type: DataTypes.STRING,
        },
        isMarried: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        // Other model options go here
        sequelize,
        modelName: 'profile',
        timestamps: false,
        freezeTableName: true
      }
    );
    return Profile;
  };
  