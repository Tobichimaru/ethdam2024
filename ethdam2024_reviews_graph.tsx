// Get user
const user = Ethers.send("eth_requestAccounts", [])[0];

const [svgReady, setSvgReady] = useState(false);
const [graphData, setGraphData] = useState(null);

const svg = styled.svg`{}`;

const transformDataToGraph = (attestations) => {
  const nodes = {}; // Object to store unique nodes (addresses)
  const edges = []; // Array to store edges (connections)

  // Assuming attestations is either an array or an object:
  if (Array.isArray(attestations)) {
    // Handle 'attestations' as an array
    attestations.forEach((review) => {
      const reviewer = review.attesterShortAddress;
      const reviewed = review.recipientShortAddress;
      const reviewerFullAddress = review.attester;
      const reviewedFullAddress = review.recipient;

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          addr: reviewerFullAddress,
          x: Math.random() * 500,
          y: Math.random() * 300,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          addr: reviewedFullAddress,
          x: Math.random() * 500,
          y: Math.random() * 300,
        }; // Random position for now
      }

      // Add edge for the review connection
      edges.push({ source: reviewer, target: reviewed });
    });
  } else if (typeof attestations === "object") {
    // Handle 'attestations' as an object
    for (const reviewId in attestations) {
      const review = attestations[reviewId];
      const reviewer = review.attesterShortAddress;
      const reviewerFullAddress = review.attester;
      const reviewedFullAddress = review.recipient;

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          addr: reviewerFullAddress,
          x: Math.random() * 500,
          y: Math.random() * 300,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          addr: reviewedFullAddress,
          x: Math.random() * 500,
          y: Math.random() * 300,
        }; // Random position for now
      }

      // Add edge for the review connection
      edges.push({ source: reviewer, target: reviewed });
    }
  } else {
    // Handle an unexpected data type
    console.error("Unexpected data type for attestations!");

    console.log(typeof attestations);
  }

  return { nodes: Object.values(nodes), edges }; // Convert object to array for nodes
};

// const data = {
//   nodes: [
//     { id: "Address1", reviewCount: 5 }, // Reviewer
//     { id: "Address2", reviewCount: 10 }, // Reviewed
//     { id: "Address3", reviewCount: 3 }, // Reviewer, connected to others
//   ],
//   links: [
//     { source: "Address3", target: "Address1" },
//     { source: "Address3", target: "Address2" },
//   ],
// };

useEffect(() => {
  console.log(props.attestations);
  const preparedGraphData = transformDataToGraph(props.attestations);
  setGraphData(preparedGraphData);
  console.log(preparedGraphData);
}, [props.attestations]);

useEffect(() => {
  console.log(svg); // For debugging
  setSvgReady(true);
}, [svg]);

function calculateRadius(node) {
  // TODO Adjust the logic here to scale the radius
  const baseRadius = 45;
  return baseRadius + 0; // TODO
}

const ethAddressToColor = (address) => {
  console.log(`#${address.slice(2, 8)}`);
  return `#${address.slice(2, 8)}`;
};

return (
  <div style={{ justifyContent: "center", alignItems: "center" }}>
    <svg width="800" height="600">
      {graphData.nodes.map((node) => (
        <g key={node.id}>
          {" "}
          {/* Wrap circle and text in a group */}
          <circle
            cx={node.x}
            cy={node.y}
            r={calculateRadius(node)} // Dynamic radius
            fill={ethAddressToColor(node.addr)}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle" // Center the text
            dominantBaseline="central" // Center vertically
            fontSize="10px"
            fill="#787878"
          >
            {node.id}
          </text>
        </g>
      ))}

      {graphData.edges.map((edge) => (
        <line
          key={`${edge.source}-${edge.target}`} // Unique key
          x1={graphData.nodes.find((n) => n.id === edge.source).x}
          y1={graphData.nodes.find((n) => n.id === edge.source).y}
          x2={graphData.nodes.find((n) => n.id === edge.target).x}
          y2={graphData.nodes.find((n) => n.id === edge.target).y}
          stroke="gray"
        />
      ))}
    </svg>
  </div>
);
