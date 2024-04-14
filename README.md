# KudAs

## Description
Post and receive verifiable reviews on the blockchain. Boost reputations, filter insights, and watch the emerging social network of blockchain attestations.

## Features
- **Write and post verifiable reviews** for people (identified by their wallets). If your wallet is reputable, the reviews you give will boost their reputation.
- **Receive verifiable reviews** from others. Reviews from reputable wallets will give you credibility.
- **Upvote (downvote) reviews** given to other people that you find helpful (unhelpful).
- **Watch a social graph emerge** from the collective reviews. The graph is shaped by the reviews’ helpfulness, a function of the rating and upvotes.

## Using KudAs
### Installation
[Installation Link](https://test.near.org/silent_ssh.testnet/widget/ethdam2024_wrapper)

### Full list of components
1. https://test.near.social/silent_ssh.testnet/widget/ethdam2024_wrapper
2. https://test.near.social/silent_ssh.testnet/widget/ethdam2024_reviews_graph
3. https://test.near.social/ilyamatsuev.testnet/widget/ethdam2024_reviews_list
4. https://test.near.social/silent_ssh.testnet/widget/ethdam2024_eas_fe
5. https://test.near.social/silent_ssh.testnet/widget/walletconnect_testnet

### How to use KudAs
1. **Post a review**
   - Write your review, including the wallet of the person you’d like to review, a topic to review her/him for, a score, and the text of your review
   - Post your review as an on-chain attestation via EAS via our review [schema](https://sepolia.easscan.org/schema/view/0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d)
2. **Upvote helpful reviews**
   - Upvote reviews you find helpful via our [upvote schema](https://sepolia.easscan.org/attestation/view/0xc33ab62c0391f3f8b6f7ba6cfa6649ca5b0ceac2d42fcacb61a4f912f072b8ac) on EAS
3. **Collect your verifiable reviews**
   - If you’re proud of your verifiable reviews, share them with others (e.g., as references for a job interview)
4. **Verify other people’s reviews**
   - Filter someone’s reviews and verify they’re valid EAS attestations (e.g., as a hiring manager)
5. **Watch the emerging social graph**
   - Watch how the wallets and their reviews are connected, forming a social graph of verifiable reviews

## Technology Stack
- The backend are attestations executed and stored using the [Ethereum Attestation Service](https://attest.org/). It mainly consists of 2 schemas that store attestations for reviews:
  - Review schema used by a reviewer to review someone. It includes a score, a topic of the review, a title, and a body. ([Review schema](https://sepolia.easscan.org/schema/view/0x6fe41fc5a5c39368d2aa147368558ffa101c023136e60a84ef05281823ea1d4d))
  - Upvote schema used by anyone to upvote or downvote an existing review. It includes the EAS ID of the review it links to and an up/down-vote. ([Upvote schema](https://sepolia.easscan.org/attestation/view/0xc33ab62c0391f3f8b6f7ba6cfa6649ca5b0ceac2d42fcacb61a4f912f072b8ac))
- The front end is a collection of React components hosted on NEAR BOS.
  - [Near components](https://docs.near.org/build/near-components/what-is)
- The NEAR components fetch attestation data from the EAS contracts using the [GraphQL API](https://docs.attest.org/docs/developer-tools/api) 

## Challenges Encountered
- NEAR BOS doesn't yet support easy debugging and testing.
- NEAR Documentation for the dev environment is still quite new.
- EAS SDK is not available on NEAR as it is an external library.
- EAS SDK has conflicts with the latest version of certain libraries (e.g., Ethers).
- There's no access to DOM API in the NEAR components.

## Future Work
- Filter reviews that matter by filtering on wallet address.
- Label which wallets are persons vs. smart contract protocols.
- Port the EAS SDK to a NEAR smart contract.

## What We Learned
- NEAR BOS components are powerful tools that help developers to embed and reuse the code. It enables calls to smart contracts from other chains. In addition, sandbox and test environments, and jitsu ai tools are really handy. 

## Contact Information
- Sasha: [GitHub](https://github.com/muchiNoChi) 
- Kate: [GitHub](https://github.com/Tobichimaru) 
- Ilya: [GitHub](https://github.com/IlyaMatsuev) 
- Leo: [GitHub](https://github.com/leo-sizaret) 
