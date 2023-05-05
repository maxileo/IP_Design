import {useState} from 'react';
import styles from '../css/roles.module.css';

//descrierea 
function handleRoleClick(target, role)
{
    let roleName = target.parentElement.firstChild.innerText;

    let descriptionElement = document.getElementById(styles.descriptionContainer);
    descriptionElement.style.display = "block";

    let descriptionTitle = descriptionElement.firstChild.lastChild;
    descriptionTitle.innerText = roleName ;


    let alignmentText = descriptionElement.lastChild.firstChild.firstChild;
    alignmentText.innerText = "Alignment: ";

    let alignmentDescription = descriptionElement.lastChild.firstChild.lastChild;
    alignmentDescription.innerText = role.alignment;

    let goalText = descriptionElement.lastChild.children[1].firstChild;
    goalText.innerText = "\nGoal: ";

    let goalDescription = descriptionElement.lastChild.children[1].lastChild;
    goalDescription.innerText = role.goal;

    let abilitiesText = descriptionElement.lastChild.children[2].firstChild;
    abilitiesText.innerText = "\nAbilities: ";

    let abilitiesDescription = descriptionElement.lastChild.children[2].lastChild;
    abilitiesDescription.innerText = role.abilities;

    let attributesText = descriptionElement.lastChild.lastChild.firstChild;
    attributesText.innerText = "\nAttributes: ";

    let attributesDescription = descriptionElement.lastChild.lastChild.lastChild;
    attributesDescription.innerText = role.attributes;


}

function Role(props)
{
    let roleObj = props.role;

    return (
        <div className={styles.descriptionContainer}>
            <button onClick={e =>handleRoleClick(e.target, roleObj)} className={styles.listRole}>
                {roleObj.roleName}
            </button>
        </div>
    );
}

export default Role;