import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import Modal from '../Modal/Modal';


const NavBar = () => {
    const { toggleModal, isLoggedIn, setIsLoggedIn } = useGlobalContext();
    //simulacion de login en la aplicacion
    const handleLogin = () => {
        setIsLoggedIn(false);
        toggleModal();
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        width={164}
                        height={42}
                    />
                </Link>
                <Link className={styles.popular} href="/">Popular</Link>
                <Link className={styles.favorites} href="/favorites">Favorites</Link>
            </div>
            <div className={styles.login}>
                <Image
                    src="/assets/login.svg"
                    alt="Login"
                    width={26}
                    height={26}
                    onClick={handleLogin}
                    className={styles.loginImage}
                />
            </div>
            <Modal />
        </nav>
    );
};

export default NavBar;
