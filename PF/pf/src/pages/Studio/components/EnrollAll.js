import axios from "axios";

function EnrollAll(class_id){
    let config1 = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }
    let data = {}
    console.log(config1)
    const url = `http://localhost:8000/classes/${class_id}/enrollall/`;
    axios.post(url,data,config1).then((res) => {
     }).catch((error) => {
            if(error.response.status === 403){
               return alert("You do not have an active subscription. Please subscribe first!!")
            }
            else if (error.response.status === 400){
                return alert("You already enrolled in every occurrence in this class!!")
            }
        });
    ;

}

export default EnrollAll;
