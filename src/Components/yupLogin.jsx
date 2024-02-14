import * as Yup from 'yup';


export const loginSchema = Yup.object({
    email : Yup.string().email().required('Please Enter your Email'),
    password : Yup.string().min(8).required('Plaese Enter your Password'),
})