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
let rgUserChoice = [];

// console.log(objCharacterPool.lowercase[8-1]);
const objCharacterPool = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "1234567890",
  symbols: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\'"
};
objCharacterPool.uppercase= objCharacterPool.lowercase.toUpperCase();

function generatePassword() {

  
  let nPassLength = 0;
  nPassLength = prompt("How many characters should the password have? (8-128)");
  switch (true) {
      case (!IsANumber(nPassLength)):
        
        {alert("That is not a number. Please begin the process again by clicking the Generate Password button.");}
        return "The user has failed to request a valid password length."
      case (nPassLength > 128):
        {alert("The maximum password length is 128 characters, and you have selected "+Number(nPassLength)+". Please begin the process again by clicking the Generate Password button.");}
        return "The requested password was too long."
      break;
      case (nPassLength < 8):  
        { alert("The minimum password length is 8 characters, and you have selected "+Number(nPassLength)+". Please begin the process again by clicking the Generate Password button.")}
        return "The requested password was too short."
      break;
  }
  return nPassLength;

}


function IsANumber(suppliedString) { //This function validates input as a number.
  let sValidString=true;
  let strLIndex=0;
  
  if (suppliedString===undefined && suppliedString==="") {sValidString=false; }
  else
    {
      console.log("indexNum: "+ strLIndex);
      while (strLIndex<suppliedString.length && sValidString) {
          // We check every character in the supplied string for membership in the digit set,
          // which is already conveniently present in objCharacterPool.numbers property.
          
          sValidString=false;
          
         for (numSetIndex=0; numSetIndex<objCharacterPool.numbers.length; numSetIndex++) {
            if (suppliedString[strLIndex] == objCharacterPool.numbers[numSetIndex]) {
              console.log("indexNum: "+ strLIndex+"numSetIndex: "+numSetIndex);
              sValidString=true; //if there is at least one match, the digit is validated.
              
            } 
         }
         strLIndex++ //incrementing the supplied string traversal loop
      }
    }
    return sValidString;
}