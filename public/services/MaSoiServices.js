import {setLoading} from "./../core/fabrics.js";

export default class MaSoiServices {

  constructor() {
    // this.baseUrl = "https://game-masoi.herokuapp.com";
    this.baseUrl = "";
    this.httpClient = axios.create();
    this.httpClient.defaults.timeout = 30 * 1000;
  }

  async createUser(phone_number, name, email) {
    console.log('create user: ', {"name": name, "phone_number": phone_number, "email": email});
    let user = null;
    setLoading(true);
    await this.httpClient.post(this.baseUrl + '/users', {"name": name, "phone_number": phone_number, "email": email})
    .then(response => {
      setLoading(false);
      console.log(response.data);
      user = response.data;
    });
    return user;
  }

  async checkUserByPhone(phone_number) {
    if (phone_number == undefined || phone_number == null || phone_number.length == 0) {
      return {"error": "số điện thoại không đúng định dạng"};
    }
    setLoading(true);
    try {
      let data =  null;
      var body = {"phone_number" : phone_number};
      await this.httpClient.post(this.baseUrl + '/users/getByPhone', body)
      .then(response => {
        setLoading(false);
        console.log(response.data);
        data = response.data;
      });
      return data;
    } catch (e) {
      setLoading(false);
      return {"error": e.message};
    }
  }
}
