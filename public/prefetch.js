const token = localStorage.getItem("token");

window.__LOGIN__ = !!token;

if (token) {
  window.__USER_INFO__ = fetch(
    "https://iqqgucwq2n.hk.aircode.run/get_user_info",
    {
      headers: {
        Authorization: token,
      }
    }
  ).then((response) => response.json());
} else {
  window.__USER_INFO__ = Promise.reject();
}
