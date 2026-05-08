// import { DataTypes } from "sequelize";
// import sequelize from "../database/dbConfigure";
// import Folder from "./folder";

// const File = sequelize.define("File", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   folderId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: Folder,
//       key: "id",
//     },
//   },
//   companyId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   size: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   fileType: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   path: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   tableName: "files",
//   timestamps: true,
// });

// export default File;
