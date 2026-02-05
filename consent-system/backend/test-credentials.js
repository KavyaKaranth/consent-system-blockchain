const fs = require("fs");
const path = require("path");

// Test if we can find and read the credentials
const credPath = path.resolve(
  __dirname,
  "../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com"
);

console.log("Credential path:", credPath);
console.log("Path exists:", fs.existsSync(credPath));

const certPath = path.join(credPath, "msp/signcerts");
const keyPath = path.join(credPath, "msp/keystore");

console.log("\nCertificate path:", certPath);
console.log("Cert path exists:", fs.existsSync(certPath));

console.log("\nKey path:", keyPath);
console.log("Key path exists:", fs.existsSync(keyPath));

try {
  const certFiles = fs.readdirSync(certPath);
  console.log("\nCert files:", certFiles);
  
  const keyFiles = fs.readdirSync(keyPath);
  console.log("Key files:", keyFiles);

  if (certFiles.length === 0 || keyFiles.length === 0) {
    console.error("ERROR: No cert or key files found!");
    process.exit(1);
  }

  const cert = fs.readFileSync(path.join(certPath, certFiles[0]), "utf8");
    const key = fs.readFileSync(path.join(keyPath, keyFiles[0]), "utf8");

  console.log("\n✓ Certificate loaded, length:", cert.length);
  console.log("✓ Private key loaded, length:", key.length);
  console.log("\n✓✓ Credentials can be loaded successfully!");

} catch (err) {
  console.error("ERROR loading credentials:", err.message);
  process.exit(1);
}
