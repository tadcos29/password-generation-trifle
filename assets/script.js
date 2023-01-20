// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
// STUDENT CODE BEGINS
let sPassSource = "";
let nFinalPass=0;
let rgUserChoice = [];

/* Create object in which to store all available character sets. 
Additional properties may be added, and the code will automatically include them in user options. */
const objCharacterPool = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "1234567890",
  special: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\'",
};
objCharacterPool.uppercase= objCharacterPool.lowercase.toUpperCase();

// Main function.
function generatePassword() {
  let nPassLength = 0;
  nPassLength = prompt("How many characters should the password have? (8-128)");
  // Check for anomalies. Display anomalous outcomes in the password box.
  switch (true) {
      case (!IsANumber(nPassLength)):
        {alert("'"+nPassLength+"' is not a valid number. Please begin the process again by clicking the Generate Password button.");}
        return "The user has failed to request a valid password length."
      case (nPassLength > 128):
        {alert("The maximum password length is 128 characters, and you have entered "+Number(nPassLength)+". Please begin the process again by clicking the Generate Password button.");}
        return "The requested password was too long."
      break;
      case (nPassLength < 8):  
        { alert("The minimum password length is 8 characters, and you have entered "+Number(nPassLength)+". Please begin the process again by clicking the Generate Password button.")}
        return "The requested password was too short."
      break;
  }
  // Collect user choices.
  rgUserChoice=[];
  for (property in objCharacterPool) {
    if(confirm("Shall we add "+ property +" characters to the pool of characters to draw from? Select OK to approve or Cancel to exclude "+ property +" characters.")) {
      rgUserChoice.push(property);
    }
  }
  if (rgUserChoice.length===0) {
    alert("Unfortunately, you have selected no character types from which to generate the password. Please begin the process again by clicking the Generate Password button.");
    return "Cannot generate password. The user has rejected all possible characters."
    }
  
 GeneratePool();
 nFinalPass = RandomFromPool(sPassSource, nPassLength);
 // The following loop tests the generated password and regenerates it 
 // if it fails to include at least one character from each criterion
 // approved by the user.
 while (!ValidatePassword(nFinalPass)){
  nFinalPass="";
  nFinalPass=RandomFromPool(sPassSource,nPassLength);
 }
    return nFinalPass;
}

function GeneratePool() {
    // Generate the pool of possible characters based on the user's choices.
    sPassSource="";
    for (i=0;i<rgUserChoice.length;i++) {sPassSource=sPassSource.concat(objCharacterPool[rgUserChoice[i]]);}  
      //Only those properties of the objCharacterPool object that correspond to
      //user criteria are considered, and their values added to the character pool.
      //The rgUserChoice array stores user choices.
                                                                    
    return;
}
    function ValidatePassword (candidatePass) {
      /*The password is validated to ensure that at least one character from each category
      approved by the user is included in the final password.*/

      let choiceIndex=0; // Index to traverse the user criteria.
      let currCharIndex=0; //Index to traverse all characters inside each criterion.
      let foundFlag=false; //
      while (choiceIndex<rgUserChoice.length) {     
        // Traversing across criteria.   
        for (currCharIndex=0;currCharIndex<objCharacterPool[rgUserChoice[choiceIndex]].length;currCharIndex++) { 
          //Traversing character by character within the current criterion.
            if (candidatePass.indexOf(objCharacterPool[rgUserChoice[choiceIndex]][currCharIndex])===-1) {
              foundFlag=false;
            } else {foundFlag=true;}
          }
          if (!foundFlag) {return false;} else {console.log(objCharacterPool[rgUserChoice[choiceIndex]]+" cleared.")}
           //If even one category fails to be represented, we may break out of the function; the password is ruined.
          choiceIndex++; 
          foundFlag=false;
        }
        return true;
      }

function RandomFromPool(inputPool,strLength) {
  console.log(inputPool+" at "+strLength);
  let nTempRandomisedPass="";
    for (randIndex=0;randIndex<strLength;randIndex++)
    {
      nTempRandomisedPass=nTempRandomisedPass.concat(inputPool[Math.floor(Math.random()*(inputPool.length))]);
      //iterating over  the desired length of the password, nTempRandomisedPass is concatenated
      //with a random member of the character pool that the user's choices have determined (inputPool)
    }
    return nTempRandomisedPass;
}

 function IsANumber(suppliedString) { //This function validates input as a positive integer.
  let sValidString=true;
  let strLIndex=0; 
  if (suppliedString==undefined || suppliedString==="") {sValidString=false; }
  // getting rid of the usual suspects
  else
    {
      while (strLIndex<suppliedString.length && sValidString) {
          /* Checking every character in the supplied string for membership in the digit set,
          which is already conveniently present in objCharacterPool.numbers property. */
          sValidString=false; 
         for (numSetIndex=0; numSetIndex<objCharacterPool.number.length; numSetIndex++) {
            if (suppliedString[strLIndex] == objCharacterPool.number[numSetIndex]) {
              console.log("indexNum: "+ strLIndex+"numSetIndex: "+numSetIndex);
              sValidString=true; /*if there is at least one match, that character is validated
                                  as a digit, and the loop continues until all characters have been checked.
                                  Otherwise, if sValidString remains false, the while loop ends.*/
            } 
         }
         strLIndex++ //Increment the suppliedString traversal loop.
      }
    }
    return sValidString;
} 