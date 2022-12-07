
import axios from "axios";

function Drop(recurrence){
    let config1 = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }
    let data = {}
    console.log(config1)
    const url = `http://localhost:8000/classes/${recurrence}/drop/`;
    axios.post(url,data,config1).then((res) => {

     });

}



export default Drop;
