import styles from './Signup.module.css';  
import {toast, Toaster} from 'sonner';
import { useNavigate } from "react-router";
import supabase from '../../supabase/client';


export default function Signup() {

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { user, email, password } = Object.fromEntries(new FormData(formRegister));
        let {error} = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            toast.error('La tua registrazione NON è andata a buon fine!');
        } else {
            toast.success('La tua registrazione è andata a buon fine!');
            formRegister.reset();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
        console.log(user,email,password);
    } 

    return (
        <div className={styles.main}>
            <div className={styles.formBox}>
                <form className={styles.form} onSubmit={handleSignup}>
                    <span className={styles.title}>Sign up</span>
                    <span className={styles.subtitle}>Create a free account with your email.</span>
                    <div className={styles.formContainer}>
                        <input type="text" name='user' className={styles.input} placeholder="Username" />
                        <input type="email" name='email' className={styles.input} placeholder="Email" />
                        <input type="password"  name='password' className={styles.input} placeholder="Password" />
                    </div>
                    <button>Sign up</button>
                </form>
                <div className={styles.formSection}>
                    <p className={styles.account}>Have an account? <a href="/login">Log in</a></p>
                </div>
                <Toaster position="top-center"/>
            </div>
        </div>
    );
}