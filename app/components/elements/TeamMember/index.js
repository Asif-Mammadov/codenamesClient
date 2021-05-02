import React from 'react'
import styles from "./TeamMember.module.scss"

const TeamMember = () => {
    return (
        <div className={styles.body}> 
            
            <img src="../img/person.png" className={styles.img}></img>
            <p className={styles.p}>Asif Mammadov</p>
            <p className={styles.profession} >Team Lead, Back-End Developer</p>
            <div className={styles.icons}>
                <img src="../icons/mail.svg"></img>
                <img src="../icons/github.svg"></img>
                <img src="../icons/linkedin.svg"></img>
            </div>

        </div>
    )
}
export default TeamMember;