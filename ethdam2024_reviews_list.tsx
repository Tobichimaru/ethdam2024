// Props:
// - recipient: string (the address of a wallet to show the reviews for, can be omited to show all reviews)

// TODO use state to handle pagination

const STYLES = {
    reviewEntry: {
      listStyleType: "none",
      margin: "1rem 1rem",
    },
    reviewEntryContainer: {
      backgroundColor: "#D7E1E9",
      borderRadius: "10px",
      padding: "1rem 2rem 1rem 2rem",
    },
    reviewEntryHeader: {
      justifyContent: "space-between",
    },
    reviewEntryTitle: {
      fontWeight: "bold",
    },
    reviewEntryContent: {},
    reviewEntryAddressDetails: {
      display: "flex",
      alignItems: "center",
    },
    reviewEntryAddress: {
      borderRadius: "5px",
      backgroundColor: "red",
      paddingLeft: "5px",
      paddingRight: "5px",
      marginRight: "3px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
    },
  };
  
  const shortenAddress = (address) => {
    return `0x${address.slice(2, 7)}...${address.slice(-5)}`;
  };
  
  const ethAddressToColor = (address) => {
    return `#${address.slice(2, 8)}`;
  };
  
  const decodeData = (decodedDataJson) => {
    return JSON.parse(decodedDataJson).reduce((data, field) => {
      data[field.name] = field.value.value;
      return data;
    }, {});
  };
  
  const reactToReview = (attestationId, like) => {
    // TODO: Create an attestation for upvoting
  };
  
  const GQL_ENDPOINT = "https://sepolia.easscan.org/graphql";
  const REVIEWS_SCHEMA_ID =
    "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";
  
  const recipientScoreResponse = fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        "query($likesWhere: AttestationWhereInput) { attestations(where: $likesWhere) { recipient, decodedDataJson }}",
      variables: {
        likesWhere: {
          schemaId: {
            equals: REVIEWS_SCHEMA_ID,
          },
        },
      },
    }),
  });
  
  if (!recipientScoreResponse.ok) {
    return <h1>Loading...</h1>;
  }
  
  const recipientScores = recipientScoreResponse.body.data.attestations
    .map((a) => {
      const decodedData = decodeData(a.decodedDataJson);
      return {
        recipient: a.recipient,
        like: decodedData.rating === true,
      };
    })
    .reduce((scoresByRecipient, score) => {
      const point = score.like ? 1 : -1;
      scoresByRecipient[score.recipient] =
        (scoresByRecipient[score.recipient] ?? 0) + point;
      return scoresByRecipient;
    }, {});
  
  return (
    <div>
      <ul>
        {(props.attestations ?? []).map((a, i) => {
          return (
            <li style={STYLES["reviewEntry"]}>
              <div style={STYLES["reviewEntryContainer"]}>
                <div style={STYLES["reviewEntryHeader"]}>
                  <div style={STYLES["reviewEntryAddressDetails"]}>
                    <div
                      title={a.attester}
                      style={{
                        ...STYLES["reviewEntryAddress"],
                        backgroundColor: ethAddressToColor(a.attester),
                      }}
                    >
                      By: {a.attesterShortAddress} (🌟{" "}
                      {recipientScores[a.recipient]})
                    </div>
                    <div
                      title={a.recipient}
                      style={{
                        ...STYLES["reviewEntryAddress"],
                        backgroundColor: ethAddressToColor(a.recipient),
                      }}
                    >
                      For: {a.recipientShortAddress} (🌟{" "}
                      {recipientScores[a.recipient]})
                    </div>
                  </div>
                  <div style={STYLES["reviewEntryTitle"]}>{a.data.title}</div>
                </div>
                <div>
                  <p style={STYLES["reviewEntryContent"]}>{a.data.content}</p>
                </div>
  
                <button onClick={() => reactToReview(a.id, true)}>
                  👍 {a.upvotes || ""}
                </button>
                <button onClick={() => reactToReview(a.id, false)}>
                  👎 {a.downvotes || ""}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  