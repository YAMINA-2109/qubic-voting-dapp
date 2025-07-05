from fastapi import FastAPI
from pydantic import BaseModel, Field, validator
from transformers import pipeline
import json
import os


app = FastAPI()

# Load sentiment analysis model at startup
sentiment_analyzer = pipeline("sentiment-analysis")

# In-memory "database" for votes
votes_db = []

class VoteRequest(BaseModel):
    userID: str = Field(..., example="user123", min_length=1)
    choice: str = Field(..., example="yes")
    comment: str = Field(..., example="I love this law!", min_length=1)

    @validator('choice')
    def choice_must_be_yes_or_no(cls, v):
        if v.lower() not in ["yes", "no"]:
            raise ValueError('choice must be "yes" or "no"')
        return v.lower()



VOTES_FILE = "votes.json"

def load_votes():
    if not os.path.exists(VOTES_FILE):
        return []
    with open(VOTES_FILE, "r") as f:
        return json.load(f)

def save_vote(vote_data):
    votes = load_votes()
    votes.append(vote_data)
    with open(VOTES_FILE, "w") as f:
        json.dump(votes, f, indent=4)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Qubic Voting Backend"}

@app.post("/vote")
def post_vote(vote: VoteRequest):
    sentiment_result = sentiment_analyzer(vote.comment)[0]

    vote_data = {
        "userID": vote.userID,
        "choice": vote.choice,
        "comment": vote.comment,
        "sentiment": {
            "label": sentiment_result["label"],
            "score": sentiment_result["score"]
        }
    }

    save_vote(vote_data)

    return {
        "status": "success",
        **vote_data
    }
@app.get("/votes")
def get_votes():
    votes = load_votes()
    return {"votes": votes}

