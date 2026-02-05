const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function getContract() {
  const ccpPath = path.resolve(
    __dirname,
    "./fabric-config/connection-org1.json"
  );

  const ccp = JSON.parse(fs.readFileSync(ccpPath));
  
  // Path to the test-network credentials
  const credPath = path.resolve(
    __dirname,
    "../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com"
  );

  const wallet = await Wallets.newFileSystemWallet(path.join(credPath, "wallet"));
  
  // Check if admin identity already exists, if not, create it
  let identity = await wallet.get("admin");
  
  if (!identity) {
    console.log("Loading admin credentials from msp...");
    
    // Read the certificate and key files
    const certPath = path.join(credPath, "msp/signcerts");
    const keyPath = path.join(credPath, "msp/keystore");
    
    const certFile = fs.readdirSync(certPath)[0];
    const keyFile = fs.readdirSync(keyPath)[0];
    
    const cert = fs.readFileSync(path.join(certPath, certFile), "utf8");
    const key = fs.readFileSync(path.join(keyPath, keyFile), "utf8");
    
    // Create the admin identity
    const identityLabel = "admin";
    identity = {
      credentials: {
        certificate: cert,
        privateKey: key
      },
      mspId: "Org1MSP",
      type: "X.509"
    };
    
    await wallet.put(identityLabel, identity);
    console.log("Admin identity loaded and cached in wallet");
  }

  const gateway = new Gateway();

  await gateway.connect(ccp, {
    wallet,
    identity: "admin",
    discovery: { enabled: true, asLocalhost: true }
  });

  const network = await gateway.getNetwork("mychannel");
  return network.getContract("consent");
}

module.exports = getContract;
