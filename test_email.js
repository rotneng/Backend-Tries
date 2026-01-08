// test_email.js
const nodemailer = require("nodemailer");

// 👇 REPLACE THIS WITH YOUR REAL LONG KEY (Start with xsmtpsib-...)
const MY_REAL_KEY =
  "xsmtpsib-f0f66e87badf4c18cbeb12c8a4a8b9c43c77982715855d08815b631e2e068d91-LjOeWOlDxZwstR3q";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "rotneng@gmail.com",
    pass: MY_REAL_KEY,
  },
});

async function main() {
  console.log("---------------------------------------");
  console.log("Testing Brevo Credentials directly...");
  console.log(`User: rotneng@gmail.com`);
  console.log(`Pass Length: ${MY_REAL_KEY.length} characters (Should be ~70+)`);

  if (!MY_REAL_KEY.startsWith("xsmtpsib-")) {
    console.log(
      "❌ ERROR: Key does not start with 'xsmtpsib-'! You have the wrong key."
    );
    return;
  }

  try {
    await transporter.verify();
    console.log("✅ SUCCESS! Your Password/Key is CORRECT.");
    console.log("You can now safely put this key into your .env file.");
  } catch (error) {
    console.log("❌ FAILURE. Brevo rejected this key.");
    console.log("Error Response:", error.response);
    console.log(
      "Reason: The key is invalid, revoked, or the account is locked."
    );
  }
  console.log("---------------------------------------");
}

main();
