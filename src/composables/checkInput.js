export function checkInput(name, data, err, type) {
  console.log(data.value);
  if (data.value) {
    err.value = "";
    return true;
  } else {
    err.value = `${name} is required`;
    console.log(err.value);
    return false;
  }
}
