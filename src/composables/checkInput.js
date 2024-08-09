export function checkInput(name, data, err, type) {
  if (data.value != "") {
    err.value = "";
    return true;
  } else {
    err.value = `${name} is required`;
    console.log(err.value);
    return false;
  }
}
