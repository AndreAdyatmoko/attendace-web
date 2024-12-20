const { default: axios } = require("axios");


const GetAllGrades=()=> axios.get('/api/grade')
const CreateNewStudent=(data)=> axios.post('/api/student', data)

const GetALLStudent=()=> axios.get('/api/student')

export default {
    GetAllGrades,
    CreateNewStudent,
    GetALLStudent
}