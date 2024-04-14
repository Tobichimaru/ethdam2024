// Get user
const user = Ethers.send("eth_requestAccounts", [])[0];

const [svgReady, setSvgReady] = useState(false);
const [graphData, setGraphData] = useState(null);

const svg = styled.svg`{}`;

// props.attestations = [
//   { attesterShortAddress: "0x2", recipientShortAddress: "0x3" },
//   { attesterShortAddress: "0x3", recipientShortAddress: "0x2" },
// ];

const transformDataToGraph = (attestations) => {
  const nodes = {}; // Object to store unique nodes (addresses)
  const edges = []; // Array to store edges (connections)

  // Assuming attestations is either an array or an object:
  if (Array.isArray(attestations)) {
    // Handle 'attestations' as an array
    attestations.forEach((review) => {
      const reviewer = review.attesterShortAddress;
      const reviewed = review.recipientShortAddress;

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          x: Math.random() * 600,
          y: Math.random() * 400,
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
      const reviewed = review.recipientShortAddress;

      // Add nodes if they don't exist yet
      if (!nodes[reviewer]) {
        nodes[reviewer] = {
          id: reviewer,
          x: Math.random() * 600,
          y: Math.random() * 400,
        }; // Random position for now
      }
      if (!nodes[reviewed]) {
        nodes[reviewed] = {
          id: reviewed,
          x: Math.random() * 600,
          y: Math.random() * 400,
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
  const baseRadius = 50;
  return baseRadius + 0; // TODO
}

return (
  <div>
    <svg width="600" height="400">
      {graphData.nodes.map((node) => (
        <g key={node.id}>
          {" "}
          {/* Wrap circle and text in a group */}
          <circle
            cx={node.x}
            cy={node.y}
            r={calculateRadius(node)} // Dynamic radius
            fill="#91c52b"
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle" // Center the text
            dominantBaseline="central" // Center vertically
            fontSize="10px"
            fill="black"
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
