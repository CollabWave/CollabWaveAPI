const createFormDataEmail = (data, email) => {
  return {
    to: email,
    subject: "New submission from CollabWave",
    html: `<ul><li><p>Name: ${data.name ?? "-"}</p></li><li><p>Email: ${data.email}</p></li><li><p>Phone: ${data.phone ?? "-"}</p></li><li><p>Website: ${data.website ?? "-"}</p></li><li><p>Message: ${data.message}</p></li></ul>`,
  };
};

module.exports = createFormDataEmail;
