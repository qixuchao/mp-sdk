const KEY = 'M$P_FC';

const today = (() => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return date.getFullYear() + '-' + month + '-' + date.getDate();
})();

export const getFreqControl = type => {
  let data = {};
  try {
    data = JSON.parse(localStorage[KEY]);
  } catch (e) {}

  let currentData = data[today] || {};

  if (type) {
    return currentData[type] || {};
  }

  return currentData;
};

export const setFreqControl = (key, value, type) => {
  const data = getFreqControl(type);
  const allData = getFreqControl();

  data[key] = value;

  try {
    // 只存取当前数据，默认重置非当天数据
    localStorage.setItem(
      KEY,
      JSON.stringify({
        [today]: {
          ...allData,
          [type]: data
        }
      })
    );
  } catch (e) {
    console.log(e);
  }
};
