const { checkName } = require("../helpers/checkName.js")

describe("Test if entered name in form is a valid name", () => {
    test("Test the name using checkName function", () => {
        expect(() => {
            checkName("Hira");
          }).not.toThrow();

        expect(() => {
            checkName("Hira Akhtar");
        }).toThrow("Name should not contain spaces");

        expect(() => {
            checkName("Hira123");
        }).toThrow("Name should not contain numbers");

        expect(() => {
            checkName("Hir@");
        }).toThrow("Name should not contain special characters");
    });
})

