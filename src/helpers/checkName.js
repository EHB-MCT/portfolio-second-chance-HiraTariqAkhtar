/**
 * Check if entered name in form is a valid name
 * 
 * @param name(string) : enterd name in form
 * @returns (char): first letter of entered name
 */
async function checkName(name) {
    let letters = /^[A-Za-z]+$/;
    if (!name.match(letters)) {
        throw new Error("Name should not contain any spaces, numbers or special characters")
      }
    const firstLetter = name.charAt(0).toLowerCase()
    return firstLetter
}

module.exports = {
    checkName
}