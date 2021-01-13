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
  return data[today] ? data[today][type] || {} : {};
};

export const setFreqControl = (key, value, type) => {
  const data = getFreqControl(type);
  data[key] = value;

  try {
    // 只存取当前数据，默认重置非当天数据
    localStorage.setItem(
      KEY,
      JSON.stringify({
        [today]: {
          [type]: data
        }
      })
    );
  } catch (e) {
    console.log(e);
  }
};
