import Role from "./Role.js";
import styles from "../css/roles.module.css";

// lista de Roluri

function handleCloseDescriptionClick() {
  let descriptionElement = document.getElementById(styles.descriptionContainer);
  descriptionElement.style.display = "none";
}

function RoleList(props) {
  let rolesList = props.rolesList;

  return (
    <div className={styles.roleDescriptionContainer}>
      {/* descrierea rolurilor */}
      <div id={styles.descriptionContainer} style={{ display: "none" }}>
        <div className={styles.uiDescriptionContainer}>
          <input
            onClick={(e) => handleCloseDescriptionClick()}
            id={styles.closeDescription}
            type="image"
            src="/media/close.png"
            alt=""
          ></input>
          <h3 id={styles.descriptionTxt}>Role</h3>
        </div>
        <div id={styles.roleDescription}>
          <div id={styles.roleAlignment}>
            <h4 id={styles.alignmentTxt}>Alignment</h4>
            <div id={styles.alignmentDescription}>
              This is the alignment of role.
            </div>
          </div>
          <div id={styles.roleGoal}>
            <h4 id={styles.goalTxt}>Goal</h4>
            <div id={styles.goalDescription}>This is the goal of role.</div>
          </div>
          <div id={styles.roleAbilities}>
            <h4 id={styles.abilitiesTxt}>Abillities</h4>
            <div id={styles.abilitiesDescription}>
              This is the ability of role.
            </div>
          </div>
          <div id={styles.roleAttributes}>
            <h4 id={styles.attributesTxt}>Attributes</h4>
            <div id={styles.attributesDescription}>
              These are the attributes of role.
            </div>
          </div>
        </div>
      </div>

      {/* lista de roluri */}
      <div className={styles.roleListContainerDiv}>
        <h3 id={styles.rolesTxt}>Role List</h3>
        <div className={styles.roleListContainer}>
          {rolesList.map((role) => (
            <Role key={role.id} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleList;
