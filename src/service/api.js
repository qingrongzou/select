import mockjs from 'mockjs';

export const getCitys = params => {
  const { province } = params;
  const res = mockjs.mock({
    'list|20': [
      {
        'id|1-1000': 1,
        province,
        city: '@city()',
      },
    ],
  });
  return new Promise((resolve, reject) => {
    resolve(res);
  });
};
