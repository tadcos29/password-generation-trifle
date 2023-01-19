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
  for (property in objCharacterPool) {
    if(confirm("Shall we add "+ property +" characters to the pool of characters to draw from? Select OK to approve or Cancel to exclude "+ property +" characters.")) {
      rgUserChoice.push(property);
    }
  }
  console.log (rgUserChoice);
  
  return nPassLength;

}

//function RandomFromPool(inputPool) {
      // for number of elements in array, add the .element from object, hopefully elegantly.

      // if not, you must select at least one type of character (# # # #) to generate the password
      // from. PLease try again later, etc.

      // will add a validator for at least one of selected categories.

// }

function IsANumber(suppliedString) { //This function validates input as a number.
  let sValidString=true;
  let strLIndex=0; 
  if (suppliedString==undefined || suppliedString==="") {sValidString=false; }
  // getting rid of the usual suspects
  else
    {
      console.log("indexNum: "+ strLIndex);
      while (strLIndex<suppliedString.length && sValidString) {
          // We check every character in the supplied string for membership in the digit set,
          // which is already conveniently present in objCharacterPool.numbers property.
          
          sValidString=false; 
          
         for (numSetIndex=0; numSetIndex<objCharacterPool.number.length; numSetIndex++) {
            if (suppliedString[strLIndex] == objCharacterPool.number[numSetIndex]) {
              console.log("indexNum: "+ strLIndex+"numSetIndex: "+numSetIndex);
              sValidString=true; //if there is at least one match, that character is validated
                                 //as a digit, and the loop continues until all characters have been checked.
                                 //Otherwise, if sValidString remains false, the while loop ends.
              
            } 
         }
         strLIndex++ //incrementing the supplied string traversal loop
      }
    }
    return sValidString;
}