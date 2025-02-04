import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword


} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}



const SignInFrom = () =>{
    const [formFields, setFromFields] = useState(defaultFormFields)
    const { email, password} = formFields;

    console.log(formFields);
    
    const resetFormFields = () =>{
        setFromFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields()
        }catch(error){

            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFromFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>


                <label>Email</label>
                <FormInput 
                    label="Email"
                    type="email"
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <label>Password</label>
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />

                <div className='buttons-container'>
                    <Button buttonType='inverted' type="submit">Sign In</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google sign in</Button>
                </div>

            </form>
        </div>
    )
}


export default SignInFrom;