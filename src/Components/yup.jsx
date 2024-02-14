import * as Yup from 'yup';

export const registerSchema = Yup.object({
    firstName : Yup.string().max(25).min(2).required('Please Enter your First Name'),
    lastName : Yup.string().max(25).min(2).required('Please Enter your Last Name'),
    email : Yup.string().email().required('Please Enter your Email'),
    password : Yup.string().min(8).required('Plaese Enter your Password'),
    confirm_password : Yup.string().min(8).required('Plaese Enter Password to Confirm').oneOf([Yup.ref('password'),null],"Password must Match")
})

