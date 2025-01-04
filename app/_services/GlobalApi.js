const { default: axios } = require("axios");


const GetAllGrades=()=> axios.get('/api/grade')
const CreateNewStudent=(data)=> axios.post('/api/student', data)

const GetALLStudent=()=> axios.get('/api/student')

const DeleteStudent = (id) => 
    axios.delete(`/api/student/`, {
        params: {id}
    })

const GetAttendanceList=(grade,month)=> axios.get(`/api/attendance?grade=`+grade+'&month='+month)

export default {
    GetAllGrades,
    CreateNewStudent,
    GetALLStudent,
    DeleteStudent,
    GetAttendanceList
}