
export function storeString(key, value) {
  console.log('sore key = ' + key + 'value = ' + value);
  localStorage.setItem(key, value);
}

export function getString(key, defaultVaule = null) {
  var data = localStorage.getItem(key);
  if (data == undefined || data == null)
    return defaultVaule;
  else
    return data;
}
