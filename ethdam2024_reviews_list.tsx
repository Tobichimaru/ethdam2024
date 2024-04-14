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
  
  const reactToReview = (attestationId, like) => {
    // TODO: Create an attestation for upvoting
  };
  
  return (
    <div>
      <ul>
        {props.attestations.map((a, i) => {
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
                      By: {a.attesterShortAddress}
                    </div>
                    <div
                      title={a.recipient}
                      style={{
                        ...STYLES["reviewEntryAddress"],
                        backgroundColor: ethAddressToColor(a.recipient),
                      }}
                    >
                      For: {a.recipientShortAddress}
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
  