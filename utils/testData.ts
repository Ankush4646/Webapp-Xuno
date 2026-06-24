export const createUser = () => {

  const now = new Date();

  const uniqueId =
    `${now.getHours()}${
      now.getMinutes()
    }${now.getSeconds()}`;

  return {

    email:
      `test+sender${uniqueId}@xuno.co`,

    firstName: 'Test',

    middleName: 'QA',

    lastName: 'User'

  };
};

export const createUSPhoneNumber = () => {

  const areaCodes = [
    212, 213, 315, 347,
    408, 415, 516, 617,
    646, 718, 786, 917
  ];

  const areaCode =

    areaCodes[
      Math.floor(
        Math.random() *
        areaCodes.length
      )
    ];

  const prefix =
    Math.floor(200 + Math.random() * 700);

  const lineNumber =
    Math.floor(1000 + Math.random() * 9000);

  return `${areaCode}${prefix}${lineNumber}`;

};