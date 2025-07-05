from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Load sentiment analysis model at startup
sentiment_analyzer = pipeline("sentiment-analysis")

class VoteRequest(BaseModel):
    userID: str
    choice: str
    comment: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Qubic Voting Backend"}

@app.post("/vote")
def post_vote(vote: VoteRequest):
    # Run NLP analysis
    sentiment_result = sentiment_analyzer(vote.comment)[0]

    # TODO: Call Qubic CLI to store vote on-chain

    return {
        "status": "success",
        "userID": vote.userID,
        "choice": vote.choice,
        "comment": vote.comment,
        "sentiment": {
            "label": sentiment_result["label"],
            "score": sentiment_result["score"]
        }
    }
