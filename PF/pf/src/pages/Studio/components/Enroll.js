import axios from "axios";

function Enrollc(recurrence){
    let config1 = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }
    let data = {}
    const url = `http://localhost:8000/classes/${recurrence}/enroll/`;
    axios.post(url,data,config1).then((res) => {
     });

}



export default Enrollc;
