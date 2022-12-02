export default async function loginservice(username, password) {
  var headers = new Headers();

  var formdata = new FormData();

  formdata.append("username", username);
  formdata.append("password", password);

  var options = {
    method: "POST",
    headers: headers,
    body: formdata,
  };

  const res = await fetch("http://localhost:8000/accounts/login/", options);
  return res;
}
