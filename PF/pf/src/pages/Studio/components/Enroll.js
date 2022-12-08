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
     }).catch((error) => {
            if(error.response.status === 403){
                return alert("You do not have an active subscription. Please subscribe first!!")
            }
            else if (error.response.status === 400){
                console.log("400")
                return alert("You already enrolled in this class!!")
            }
        });

}



export default Enrollc;
