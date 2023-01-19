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

let sPassSource = "";
let nFinalPass=0;
let rgUserChoice = [];

const objCharacterPool = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "1234567890",
  special: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\'"
};
objCharacterPool.uppercase= objCharacterPool.lowercase.toUpperCase();

function generatePassword() {

  
  let nPassLength = 0;
  nPassLength = prompt("How many characters should the password have? (8-128)");
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
  console.log("validation..."+ValidatePassword(nFinalPass));
    return nFinalPass;
}

function GeneratePool() {
    // generates the pool of possible characters based on the user's choices
    sPassSource="";
    for (i=0;i<rgUserChoice.length;i++) {sPassSource=sPassSource.concat(objCharacterPool[rgUserChoice[i]]);}  
      //adding values from only those properties of the objCharacterPool object that correspond to
      //user criteria, which are stored in the rgUserChoice array.
                                                                    
    return;
}

/* function ValidatePassword(candidatePass) {
    let isValid=false;
    for (nVPChoiceIndex=0; nVPChoiceIndex<candidatePass.length; nVPChoiceIndex++) {
      isValid=false;
      for(nValPassIndex=0;nValPassIndex<rgUserChoice.length; nValPassIndex++){ 
        if (candidatePass[nVPChoiceIndex]===objCharacterPool[rgUserChoice[nValPassIndex]]) {
          //checking the candidate password against all the categories the user has chosen
          isValid=true;
        }
      } if (isValid==false) {return rgUserChoice[nValPassIndex]} 
      //if the password has failed to contain at least one character from the current category, exit function and return false.
    }
    return isValid;
} 
*/
function ValidatePassword (candidatePass) {
    let isValid=false;
    console.log("rgUserChoice is "+rgUserChoice);
    for (i=0; i<rgUserChoice.length; i++) {
        if (candidatePass.indexOf(rgUserChoice[i])===-1) {
          console.log("failed for lack of "+rgUserChoice[i]);
          return false;
        }
         
        }
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

function IsANumber(suppliedString) { //This function validates input as a number.
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
         strLIndex++ //incrementing the supplied string traversal loop
      }
    }
    return sValidString;
}