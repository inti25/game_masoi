import {setLoading} from "./../core/fabrics.js";

export default class MaSoiServices {

  constructor() {
    this.baseUrl = "https://game-masoi.herokuapp.com";
    // this.baseUrl = "http://localhost:3000";
  }

  async checkUserByPhone(phone_number) {
    setLoading(true);
    let data =  null;
    var body = {"phone_number" : phone_number};
    await axios.post(this.baseUrl + '/users/getByPhone', body)
    .then(response => {
      setLoading(false);
      console.log(response.data);
      data = response.data;
    });
    return data;
  }
}
