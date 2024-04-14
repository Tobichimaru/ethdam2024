const Theme = styled.div`
  a {
    display: block;
    width: 100%;
    padding: 8px;
    background-color: black;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.5s;
    text-align: center;
    text-decoration: none;
  }

  a:hover {
    background-color: #1b1c1c;
  }
`;
const handleRedirect = () => {
  window.open(
    "https://sepolia.easscan.org/attestation/attestWithSchema/0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d",
    "_blank"
  );
};

return (
  <Theme>
    <a
      target="_blank"
      href="https://sepolia.easscan.org/attestation/attestWithSchema/0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d"
    >
      Leave a Review
    </a>
  </Theme>
);
