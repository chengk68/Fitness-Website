import axios from "axios";

function Enroll(recurrence, LoggedIn){
    let config1 = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }
    let data = {}
    const url = `http://localhost:8000/classes/${recurrence}/enroll/`;
    axios.post(url,data,config1).then((res) => {return alert("Success!")

     }).catch((error) => {
            if(error.response.status === 403){
                return alert("You do not have an active subscription. Please subscribe first!!")
            }
            else if (error.response.status === 400){
                console.log("400")
                return alert("You already enrolled in this class!!")
            }
            else if (error.response.status === 401){
                console.log('401')
                LoggedIn()
            }
        });

}



export default Enroll;
