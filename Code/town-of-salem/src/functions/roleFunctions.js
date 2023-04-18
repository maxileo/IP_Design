export const makeRole = function (i)
{
  let possibleRoles = ["Sheriff", "Lookout", "Investigator", "Jailor", "Doctor", "Escort", "Medium", "Godfather", "Mafioso", "Framer", "Serial Killer", "Executioner", "Jester"];

  let alignment1 = "Town(Investigative)";
  let alignment2 = "Town(Protective)";
  let alignment3 = "Town(Support)";
  let alignment4 = "Town(Killing)";
  let alignment5 = "Mafia(Killing)";
  let alignment6 = "Mafia(Deception)";
  let alignment7 = "Neutral(Killing)";
  let alignment8 = "Neutral(Evil)";
  let alignment=[alignment1, alignment1, alignment1, alignment4, alignment2, alignment3, alignment3, alignment5, alignment5, alignment6, alignment7, alignment8, alignment8];

  let goal1 = "Lynch every criminal and evildoer.";
  let goal2 = "Kill anyone that will not submit to the Mafia.";
  let goal3 = "Kill everyone who would oppose you.";
  let goal4 = "Get yourself lynched by any means necessary.";
  let goal5 = "Get your target lynched at any cost.";
  let goal=[goal1, goal1, goal1, goal1, goal1, goal1, goal1, goal2, goal2, goal2, goal3, goal5, goal4];

  let abilitiesSheriff = "Interrogate one person each night for suspicious activity.";
  let abilitiesLookout = "Watch one person at night to see who visits them.";
  let abilitiesInvestigator = "Investigate one person each night for a clue to their role.";
  let abilitiesJailor = "You may choose one person during the day to Jail for the night.";
  let abilitiesDoctor="Heal one person each night, granting them Powerful defense.";
  let abilitiesEscort="Distract someone each night.";
  let abilitiesMedium = "When dead speak to a living person at night.";
  let abilitiesGodFather = "You may choose to attack a player each night.";
  let abilitiesMafioso = "Carry out the Godfather's orders.";
  let abilitiesFramer = "Choose someone to frame at night.";
  let abilitiesSerialKiller = "You may choose to attack a player each night.";
  let abilitiesExecutioner = "Trick the Town into lynching your target.";
  let abilitiesJester = "Trick the Town into voting against you.";
  let abilities = [abilitiesSheriff, abilitiesLookout, abilitiesInvestigator, abilitiesJailor, abilitiesDoctor, abilitiesEscort, abilitiesMedium, abilitiesGodFather, abilitiesMafioso, abilitiesFramer, abilitiesSerialKiller, abilitiesExecutioner, abilitiesJester];

  let attributesSheriff = "You will know if your target is suspicious.";
  let attributesNone = "none";
  let attributesJailor = "-You may anonymously talk with your prisoner.\n-You can choose to attack your prisoner.\n-The jailed target can't perform their night ability.\n-If you execute a Town member, you forfeit further executions.";
  let attributesDoctor = "-You may only Heal yourself once. \n -You will know if your target is attacked.";
  let attributesEscort = "-Distraction blocks your target from using their role's night ability. \n -You cannot be role blocked.";
  let attribuesMedium = "-Speak with the dead at Night. Seance a living player once to speak with them the following Night.\n -You may only seance when you are dead.";
  let attributesGodFather = '-Choose who to kill at Night. If a Mafioso is alive, they will attack the target for you. \n -You have Basic Defense and will appear innocent to a Sheriff.';
  let attributesMafioso = "-You can attack if the Godfather doesn't give you orders.\n-If the Godfather dies you will become the next Godfather.\n-You can talk with the other Mafia at night.";
  let attributesFramer = "-If your target is investigated they will appear suspicious.\n-If there are no kill capable Mafia roles left you will become a Mafioso.";
  let attributesSerialKiller = "-If you are role blocked you will attack the role blocker in addition to your target.\n-Role blockers that target you will have their last will covered in blood making it unreadable.\n-You can choose to be cautious and not kill role blockers.";
  let attributesExecutioner = "-Your target is XXXXXXX.\n-If your target is killed at night you will become a Jester.";
  let attributesJester = "-If you are lynched you will attack one of your guilty or abstaining voters the following night with an Unstoppable attack.";
  let attributes = [attributesSheriff, attributesNone, attributesNone, attributesJailor, attributesDoctor, attributesEscort, attribuesMedium, attributesGodFather, attributesMafioso, attributesFramer, attributesSerialKiller, attributesExecutioner, attributesJester];
  
  let role = {
    roleName : possibleRoles[i],
    alignment : alignment[i],
    goal : goal[i],
    abilities : abilities[i],
    attributes : attributes[i],
    id : Math.floor(Math.random() * 10000)
  }
  return role;
}

