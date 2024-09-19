// src/components/Modal.tsx
import React, { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import Image from 'next/image';
import styles from './Modal.module.css';

const Modal = () => {
    const { isModalOpen, toggleModal, isLoggedIn, setIsLoggedIn } = useGlobalContext();
    const [isSignUp, setIsSignUp] = useState(false);
    if (!isModalOpen) return null;

    const handleSwitch = (type: 'signUp' | 'logIn') => {
        setIsSignUp(type === 'signUp');
        setIsLoggedIn(type === 'logIn');
    };

    return (
        <div className={styles.modalOverlay} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={toggleModal}>
                    &times;
                </button>
                <div className={styles.form}>
                    <div className={styles.switchContainer}>
                        <button
                            className={`${styles.switchButton} ${!isSignUp ? styles.active : ''}`}
                            onClick={() => handleSwitch('logIn')}
                        > Log In
                        </button>
                        <button
                            className={`${styles.switchButton} ${isSignUp ? styles.active : ''}`}
                            onClick={() => handleSwitch('signUp')}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className={styles.formRegister}>
                        {isSignUp ? (
                            <div className={styles.signUpForm}>
                                <button className={styles.registerButton}>Register with your email</button>
                            </div>
                        ) : (
                            <div className={styles.logInForm} >
                                <form className={styles.logInFormFields}>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Email"
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className={styles.inputField}
                                    />
                                    <button type="submit" className={styles.signInButton}>Sign In</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.imageRegister}>
                    {isSignUp ?
                        <Image
                            src="/assets/register.svg"
                            alt="Register"
                            layout="fill"
                            objectFit="cover"
                        /> :
                        <Image
                            src="/assets/in.svg"
                            alt="Register"
                            layout="fill"
                            objectFit="cover"
                        />}
                </div>
            </div>
        </div>
    );
};

export default Modal;
