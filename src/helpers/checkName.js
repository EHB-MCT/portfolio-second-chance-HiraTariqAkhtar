/**
 * Check if entered name in form is a valid name
 * 
 * @param name(string) : enterd name in form
 * @returns (char): first letter of entered name
 */
function checkName(name) {
    let letters = /^[A-Za-z]+$/;
    let numbers = /^[0-9a-zA-Z]+$/;
    let space = /\s/;
    let specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (name.match(letters)) {
        const firstLetter = name.charAt(0).toLowerCase()
        return firstLetter
    } 
    if(name.match(numbers)) {
        throw new Error("Name should not contain numbers")
    }
    if(name.match(space)) {
        throw new Error("Name should not contain spaces")
    }
    if(name.match(specialCharacters)) {
        throw new Error("Name should not contain special characters")
    }
    throw new Error("Name should not contain any spaces, numbers or special characters")
}

module.exports = {
    checkName
}