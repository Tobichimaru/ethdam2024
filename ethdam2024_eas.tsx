// Example attestation UID: 0xff5dc0cdc3de27dfe6a4352c596c0f97b1f99c51a67bbae142ce315e34969dcd

const { easRenderAttestation } = VM.require(
    "flowscience.near/widget/easRenderAttestation"
  );
  
  // ABI
  const abi = Near.view("silent_ssh.testnet", "get_abi", {});
  if (!abi) return;
  console.log(JSON.parse(abi));
  
  // Get user and signer
  const user = Ethers.send("eth_requestAccounts", [])[0];
  if (!user) return <Web3Connect connectLabel="Connect" />;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.drpc.org"
  );
  const signer = provider.getSigner(user);
  
  // EAS interface
  const iface = new ethers.utils.Interface(abi);
  
  // const schemaUID =
  //   "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";
  // const [attestation, setAttestation] = useState(null);
  // const [error, setError] = useState("");
  // const [uid, setUid] = useState("");
  // const [toaddress, setToAddress] = useState("");
  
  const dataToEncode = [
    {
      name: "to",
      value: "0x0000000000000000000000000000000000000000",
      type: "address",
    },
    { name: "rating", value: false, type: "bool" },
    { name: "label", value: [], type: "string[]" },
    { name: "title", value: "", type: "string" },
    { name: "content", value: "", type: "string" },
  ];
  
  const encodedData = iface.encodeFunctionData("attest", [dataToEncode]);
  console.log(encodedData);
  
  async function createAttestation() {
    console.log("hey");
  
    // const dataToEncode = [
    //   {
    //     name: "to",
    //     value: "0x0000000000000000000000000000000000000000",
    //     type: "address",
    //   },
    //   { name: "rating", value: false, type: "bool" },
    //   { name: "label", value: [], type: "string[]" },
    //   { name: "title", value: "", type: "string" },
    //   { name: "content", value: "", type: "string" },
    // ];
  
    // const encodedData = iface.encodeFunctionData("attest", dataToEncode);
    // console.log(encodedData);
  
    // Initialize SchemaEncoder with the schema string
    // const schemaEncoder = new SchemaEncoder(
    //   "address to,bool rating,string[] label,string title,string content"
    // );
  
    // Encode the data using the schema encoder
  
    console.log("Iliya is a chad1");
  
    // Attest the data using the EAS instance
    const tx = await contract.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });
  
    // Wait for the transaction to be mined
    console.log("Iliya is a chad");
    const receipt = await tx.wait();
  
    // Extract the new attestation UID from the transaction receipt
    const newAttestationUID = receipt.events[0].args.uid;
  
    console.log("New attestation UID:", newAttestationUID);
    setAttestation(newAttestationUID);
  }
  
  function getAttestation() {
    if (typeof uid !== "string" || uid.trim() === "") {
      console.error("UID must be a non-empty string.");
      setError("UID must be provided.");
      return;
    }
  
    contract
      .getAttestation(uid)
      .then((result) => {
        const [
          uid,
          schema,
          time,
          expirationTime,
          revocationTime,
          refUID,
          recipient,
          attester,
          revocable,
          data,
        ] = result;
        const mappedAttestation = {
          uid,
          schema,
          time: time.toNumber(),
          expirationTime: expirationTime.toNumber(),
          revocationTime: revocationTime.toNumber(),
          refUID,
          recipient,
          attester,
          revocable,
          data,
        };
        setAttestation(mappedAttestation);
        setError("");
      })
      .catch((error) => {
        console.error("error fetching attestation:", error);
        setError("Failed to retrieve data. Please try with a verified uid.");
      });
  }
  
  return (
    <>
      {/* <div className="m-3">
        <h3>Create Attestation</h3>
        <input
          type="text"
          placeholder="address to review"
          value={toaddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <div className="m-3">
        <button className="btn btn-primary m-1" onClick={createAttestation}>
          Create Attestation
        </button>
        <p className="m-1">{error}</p>
      </div>
      <div>
        {attestation && (
          <div className="App">
            <easRenderAttestation attestation={attestation} />
          </div>
        )}
      </div> */}
    </>
  );
  