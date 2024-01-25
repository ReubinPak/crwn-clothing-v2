import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import { 
    createAuthUserWithEmailAndPassword, createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: ''
}



const SignUpFrom = () =>{
    const [formFields, setFromFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmedPassword} = formFields;

    console.log(formFields);
    
    const resetFormFields = () =>{
        setFromFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmedPassword ){
            alert("Passwords do no math");
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }catch(error){
            if(error.code == 'auth/email-already-in-use'){
        
                alert('Cannot create user, email already in use');
            }else{
                console.log('user creation encounted an error', error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFromFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <label>Display</label>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

                <label>Email</label>
                <FormInput 
                    label="Email"
                    type="email"
                    required onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <label>Password</label>
                <FormInput 
                    label="Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <label>Confirm Password</label>
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="confirmedPassword" 
                    value={confirmedPassword}
                />
                <Button buttonType='google' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}


export default SignUpFrom;