const { checkName } = require("../helpers/checkName.js")

describe("Test if entered name in form is a valid name", () => {
    test("Name should not contain any spaces, numbers or special characters", () => {
        expect(() => {
            checkName("Hira");
          }).not.toThrow();
    });

    test("Check if name contains spaces", () => {
        expect(() => {
            checkName("Hira Akhtar");
        }).toThrow("Name should not contain spaces");
    });

    test("Check if name contains numbers", () => {
        expect(() => {
            checkName("Hira123");
        }).toThrow("Name should not contain numbers");
    });

    test("Check if name contains special characters", () => {
        expect(() => {
            checkName("Hir@");
        }).toThrow("Name should not contain special characters");
    });
})
