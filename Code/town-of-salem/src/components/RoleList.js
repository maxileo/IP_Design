import Role from './Role.js';
import styles from '../css/roles.module.css';

// lista de Roluri

function handleCloseDescriptionClick()
{
    let descriptionElement = document.getElementById(styles.descriptionContainer);
    descriptionElement.style.display = "none";
}

function RoleList(props)
{
    let rolesList = props.rolesList;
    
    return (
        <div className={styles.roleDescriptionContainer}>

            {/* descrierea rolurilor */}
            <div id={styles.descriptionContainer} style={{display: "none"}}>
                <div className={styles.uiDescriptionContainer}>
                    <input 
                        onClick={e => handleCloseDescriptionClick()}
                        id={styles.closeDescription} type="image" src='/media/close.png' alt=''>
                    </input>
                    <h3 id={styles.descriptionTxt}>Role Description</h3>
                </div>
                <div id={styles.roleDescription}>This is the description of role.</div>
            </div> 

            {/* lista de roluri */}
            <div className={styles.roleListContainerDiv}>
                <h3 id={styles.rolesTxt}>Role List</h3>
                <div className={styles.roleListContainer}>
                    {rolesList.map((role) => <Role key={role.id} role={role} />)} 
                </div>
            </div>
            
        </div>
    );
 }

export default RoleList;

