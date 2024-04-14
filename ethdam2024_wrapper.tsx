const Theme = styled.div`
  height: 100%;
`;

// const LayoutContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   gap: 20px;
// `;

const user = Ethers.send("eth_requestAccounts", [])[0];
const [viewMode, setViewMode] = useState("list"); // 'list' or 'graph'
const [attestations, setAttestations] = useState([]);

const toggleView = () => {
  if (viewMode === "list") {
    setViewMode("graph");
  } else {
    setViewMode("list");
  }
};

const shortenAddress = (address) => {
  return `0x${address.slice(2, 7)}...${address.slice(-5)}`;
};

const GQL_ENDPOINT = "https://sepolia.easscan.org/graphql";
const SCHEMA_ID =
  "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";

// TODO: Remove default recipient
const recipient =
  props.recipient ?? "0x58C8E31bE33DB76B60156276e4abAC096B803a0A";
const attestationsResponse = fetch(GQL_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query:
      "query($where: AttestationWhereInput) { attestations(where: $where) { id, timeCreated, attester, recipient, decodedDataJson }}",
    variables: {
      where: {
        schemaId: {
          equals: SCHEMA_ID,
        },
        recipient: recipient ? { equals: recipient } : undefined,
      },
    },
  }),
});

if (!attestationsResponse.ok) {
  return <div>Failed to fetch reviews</div>;
}

const attestationsData = attestationsResponse.body.data.attestations.map(
  (a) => {
    const prettifiedData = JSON.parse(a.decodedDataJson).reduce(
      (data, field) => {
        data[field.name] = field.value.value;
        return data;
      },
      {}
    );
    return {
      ...a,
      attesterShortAddress: shortenAddress(a.attester),
      recipientShortAddress: shortenAddress(a.recipient),
      decodedDataJson: undefined,
      data: prettifiedData,
      // TODO: Get upvotes and downvotes attestations separately
      upvotes: 10,
      downvotes: 4,
    };
  }
);

useEffect(() => {
  setAttestations(attestationsData);
}, [attestationsData]);

return (
  <Theme>
    {/* {user || ""} */}
    <Widget src="silent_ssh.testnet/widget/walletconnect_testnet" />
    <button onClick={toggleView}>Toggle View</button>
    <Widget src="silent_ssh.testnet/widget/ethdam2024_eas_fe" />
    <Widget
      src="silent_ssh.testnet/widget/ethdam2024_reviews_graph"
      props={{ attestations }}
    />
    <Widget
      src="silent_ssh.testnet/widget/ethdam2024_reviews_list"
      props={{ attestations }}
    />
  </Theme>
);
