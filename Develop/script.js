// Assignment code here

const criteria = {
  length: 0,
  lowercase: false,
  uppercase: false,
  numeric: false,
  specialChars: false, 
}


// Functions for generating specific characters =================================
function generateRandomLowercase() {
  var alphabet = "abcdefghijklmnopqrstuvwxyz"; // Initalize alphabet for grabbing random letter
  var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]

  return randomLetter;
}

function generateRandomUppercase() {
  var capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return capitalAlphabet[Math.floor(Math.random() * capitalAlphabet.length)];
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateRandomSpecialChar() {
  var specialCharacters = "!@#$%&<>?";

  return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
}
// =============================================================================


function generatePassword() {
  var pw = "";
  var passwordLength = prompt("Enter password length: ", "Min: 8 / Max: 128");
  
  // Ask user for password length and validate their response
  if (passwordLength === null) {
    return
  }
  else if (Number(passwordLength) < 8) {
    alert("Password length is too short.");
    return
  }
  else if (Number(passwordLength) > 128) {
    alert("Password length is too long.");
    return
  }
  else if (isNaN(passwordLength)) {
    alert("Invalid response.");
    return
  }
  else {
    criteria.length = passwordLength;
  }
  
  // Prompt user for character types within criteria
  criteria.lowercase = confirm("Use lowercase letters?");
  criteria.uppercase = confirm("Use uppercase letters?");
  criteria.numeric = confirm("Use numerical values?");
  criteria.specialChars = confirm("Use special characters?");

  // Creates a randomizer to use when generating the password
  const randomizer = [];
  for (var criteriaKey in criteria) { // Grabs key from criteria object
    if (criteria[criteriaKey] === true) { // Checks if key is true
      switch(criteriaKey) { // If key is true, check which key it is and append to randomizer
        case "lowercase":
          randomizer.push(generateRandomLowercase);
          break;
        case "uppercase":
          randomizer.push(generateRandomUppercase);
          break;
        case "numeric":
          randomizer.push(generateRandomNumber);
          break;
        case "specialChars":
          randomizer.push(generateRandomSpecialChar);
          break;
        default:
          break;
      }
    }
  }
  console.log(randomizer)

  // Confirm criteria for user
  if (confirm("Generate password using this criteria?\nPassword length: " + criteria.length + "\nLowercase letters: " + criteria.lowercase + "\nUppercase letters: " + criteria.uppercase + "\nNumerical values: " + criteria.numeric + "\nSpecial Characters: " + criteria.specialChars)) {
    for (var firstIteration = 0; firstIteration < randomizer.length; firstIteration++) { // A first time iteration through the randomizer to ensure one of each
      pw += randomizer[firstIteration]();                                                // charcter type is generated
    }
    for (var i = 0; i < (criteria.length - randomizer.length); i++) { // Randomly generates a character type until specified length is reached
      var randomInt = Math.floor(Math.random() * randomizer.length);
      pw += randomizer[randomInt]();
    }
    console.log(pw.length);
    return pw;
  }
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
