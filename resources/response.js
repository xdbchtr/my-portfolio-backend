const successGet = (getData) => {
  return {
    status: true,
    message: "success get data",
    code: 200,
    data: getData
  }
}

module.exports = {
  successGet
}