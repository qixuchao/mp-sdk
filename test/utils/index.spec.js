const toString = Object.prototype.toString;

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}

const isPlainObject = value => {
  if (getTag(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

const macroReplace = (
  str = '',
  data = {
    REQUESTID: ''
  },
  needEncode = true
) => {
  // 内置数据
  const builtData = {
    OS: 3, // H5
    APP: 'https://www.hixianchang.com/' || window.location.hostname,
    IP: '127.0.0.1',
    TS: +new Date()
  };

  const encode = value => {
    if (isPlainObject(value)) {
      value = JSON.stringify(value);
    }
    return needEncode ? encodeURIComponent(value) : value;
  };

  return str.replace(/__(.*?)__/g, function (fragment) {
    let variable = fragment.match(/__(.*)__/);
    const value = builtData[variable[1]] || data[variable[1]];
    return value === undefined ? fragment : encode(value);
  });
};

let data = {
  REQUESTID: '120005-9011423600714141-1599716735847-4',
  DATA: {
    category: true,
    sdkVersion: '1.5.2',
    policyVersion: 15,
    slotId: '120005',
    err: 0,
    consumerType: 'gdt',
    consumerSlotId: '9011423600714141'
  }
};

let url =
  'https://t2.fancyapi.com/NTAwMDAwMDAyMge6de/NTAwMDAwMDAyMAbf9b/b?ad=__ADID__&dt=__DATA__&ex=__EXT__&l=__LBS__&m1a=__ANDROIDID__&m2=__IMEI__&m5=__IDFA__&m6a=__MAC__&mo=__OS__&nn=__APP__&ns=__IP__&oa=__OAID__&pr=__PRICE__&tr=__REQUESTID__&ts=__TS__&o=';

console.log(macroReplace(url, data));
