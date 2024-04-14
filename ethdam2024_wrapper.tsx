const Theme = styled.div`
  height: 100%;
`;

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
`;

const user = Ethers.send("eth_requestAccounts", [])[0];
const [viewMode, setViewMode] = useState("list"); // 'list' or 'graph'
const [reviews, setReviews] = useState([]);

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

const decodeData = (decodedDataJson) => {
  return JSON.parse(decodedDataJson).reduce((data, field) => {
    data[field.name] = field.value.value;
    return data;
  }, {});
};

const GQL_ENDPOINT = "https://sepolia.easscan.org/graphql";
const REVIEWS_SCHEMA_ID =
  "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";
const LIKES_SCHEMA_ID =
  "0x9622d675e8d804bd19e28c6dd268b15a55dc34f19735e06cced73f1ba93c4a6c";

const reviewsResponse = fetch(GQL_ENDPOINT, {
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
          equals: REVIEWS_SCHEMA_ID,
        },
        recipient: props.recipient ? { equals: props.recipient } : undefined,
      },
    },
  }),
});

if (!reviewsResponse.ok) {
  return <h1>Loading...</h1>;
}

const reviewsData = reviewsResponse.body.data.attestations.map((a) => {
  return {
    ...a,
    attesterShortAddress: shortenAddress(a.attester),
    recipientShortAddress: shortenAddress(a.recipient),
    decodedDataJson: undefined,
    data: decodeData(a.decodedDataJson),
  };
});

//
const likesResponse = fetch(GQL_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query:
      "query($likesWhere: AttestationWhereInput) { attestations(where: $likesWhere) { decodedDataJson }}",
    variables: {
      likesWhere: {
        AND: [
          {
            schemaId: {
              equals: LIKES_SCHEMA_ID,
            },
          },
          {
            OR: [...new Set(reviewsData.map((r) => r.id))].map((reviewId) => ({
              decodedDataJson: {
                contains: `\"value\":\"${reviewId}\"`,
              },
            })),
          },
        ],
      },
    },
  }),
});

if (!likesResponse.ok) {
  return <h1>Loading...</h1>;
}

const likesData = likesResponse.body.data.attestations
  .map((a) => {
    return {
      decodedDataJson: undefined,
      data: decodeData(a.decodedDataJson),
    };
  })
  .reduce((likesByReviewIds, likeEntry) => {
    const currentUpvotes =
      likesByReviewIds[likeEntry.data.attestationId]?.upvotes ?? 0;
    const currentDownvotes =
      likesByReviewIds[likeEntry.data.attestationId]?.downvotes ?? 0;
    const isUpvote = likeEntry.data.upvote === true;
    likesByReviewIds[likeEntry.data.attestationId] = {
      upvotes: currentUpvotes + (isUpvote ? 1 : 0),
      downvotes: currentDownvotes + (isUpvote ? 0 : 1),
    };
    return likesByReviewIds;
  }, {});

reviewsData = reviewsData.map((r) => ({
  ...r,
  upvotes: likesData[r.id]?.upvotes ?? 0,
  downvotes: likesData[r.id]?.downvotes ?? 0,
}));

useEffect(() => {
  setReviews(reviewsData);
}, [reviewsData]);

return (
  <Theme>
    <Widget src="silent_ssh.testnet/widget/ethdam2024_eas_fe" />
    <LayoutContainer>
      <Widget src="silent_ssh.testnet/widget/walletconnect_testnet" />
      {/* <button onClick={toggleView}>Toggle View</button> */}
    </LayoutContainer>
    <Widget
      src="ilyamatsuev.testnet/widget/ethdam2024_reviews_list"
      props={{ attestations: reviews }}
    />
    <Widget
      src="silent_ssh.testnet/widget/ethdam2024_reviews_graph"
      props={{ attestations: reviews }}
    />
  </Theme>
);
