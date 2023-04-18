import {useState} from 'react';
import styles from '../css/roles.module.css';

//descrierea 
function handleRoleClick(target, role)
{
    let roleName = target.role;
    let descriptionElement = document.getElementById(styles.descriptionContainer);
    descriptionElement.style.display = "block";

    let descriptionTitle = descriptionElement.firstChild.lastChild;
    descriptionTitle.innerText = roleName + "'s role description";

    let descriptionText = descriptionElement.lastChild;
    descriptionText.innerText = "This is the description of role: " + roleName;
}

function Role(props)
{
    let roleObj = props.role;

    return (
        <div className={styles.descriptionContainer}>
            <button onClick={e =>handleRoleClick(e.target, roleObj)} className={styles.listRole}>
                {roleObj.role}
            </button>
        </div>
    );
}

export default Role;