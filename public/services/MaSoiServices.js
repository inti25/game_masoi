import {setLoading} from "./../core/fabrics.js";

export default class MaSoiServices {

  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async checkUserByPhone(phone_number) {
    setLoading(true);
    let data =  null;
    await axios.post(this.baseUrl + '/users/getByPhone', {"phone_number":phone_number})
    .then(response => {
      setLoading(false);
      console.log(response.data);
      data = response.data;
    });
    return data;
  }
}
