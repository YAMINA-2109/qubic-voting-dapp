# Smart Contract Plan - Qubic Voting dApp

## Goal

Store votes on-chain using Qubic testnet.

## Data Model

struct Vote {
string userID;
string choice;
}

## Functions

- addVote(userID, choice): stores the vote.
- getVotes(): returns all votes.

## Steps

1. Install Qubic Dev Kit.
2. Use official contract template.
3. Replace struct and functions as planned.
4. Compile with Dev Kit CLI.
5. Deploy to Qubic testnet.
6. Test via Qubic CLI.

## Expected Result

- Votes are recorded on-chain.
- We can query votes from the testnet.
