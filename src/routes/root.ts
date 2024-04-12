import { FastifyPluginAsync } from 'fastify'
import { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";
import {useSigner} from "../../lib/signer"

const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID = "0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d";
const eas = new EAS(easContractAddress);

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/reviews', async function (request, reply) {
    // Signer must be an ethers-like signer.
    await eas.connect(useSigner());

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("address to,bool rating,string[] label,string title,string content");
    const encodedData = schemaEncoder.encodeData([
      { name: "to", value: "0x0000000000000000000000000000000000000000", type: "address" },
      { name: "rating", value: false, type: "bool" },
      { name: "label", value: [], type: "string[]" },
      { name: "title", value: "", type: "string" },
      { name: "content", value: "", type: "string" },
    ]);

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);

    return 'this is an example' + newAttestationUID
  })

  fastify.post('/reviews', async function (request, reply) {
    return 'this is an example'
  })
}

export default root;
