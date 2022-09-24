import axios from 'axios';

export default class PersonService{

    url = "http://localhost:7070/api/v1/"

    getAll() {
        return axios.get(this.url + "all")
    }

    save(person) {
        return axios.post(this.url + "save", person);
    }

    delete(id) {
        return axios.get(this.url + "delete/" + id);
    }
}