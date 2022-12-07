
import axios from "axios";

function DropAll(class_id){
    let config1 = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }
    let data = {}
    console.log(config1)
    const url = `http://localhost:8000/classes/${class_id}/dropall/`;
    axios.post(url,data,config1).then((res) => {
     });

}

export default DropAll;
