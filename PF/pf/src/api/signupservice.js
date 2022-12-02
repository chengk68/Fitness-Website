export default async function signupservice(
  username,
  password,
  email,
  avatar,
  phone,
  first_name,
  last_name
) {
  var headers = new Headers();
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("email", email);
  formdata.append("avatar", avatar);
  formdata.append("phone", phone);
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);

  var options = {
    method: "POST",
	headers: headers,
    body: formdata,
  };

  const res = await fetch("http://localhost:8000/accounts/signup/", options)
    .then((response) => {
      console.log(response)
		return response.status === 201
	})

  return res;
}
