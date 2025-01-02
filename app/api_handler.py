import requests
import json

JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any"
API_NINJAS_KEY = "EVJYbf1EXbi7yC8G9CeipA==WJ3C6SwC5nH70xpS" 
def fetch_joke():
    try:
        response = requests.get(JOKE_API_URL, params={"format": "json", "safe-mode": "true"})
        print("Joke API Response:", response.text) 
        if response.status_code == 200:
            data = response.json()
            return data["joke"] if data["type"] == "single" else f"{data['setup']} {data['delivery']}"
        return "No joke available right now."
    except Exception as e:
        return f"Error fetching joke: {e}"

def fetch_quote():
    ZEN_QUOTES_URL = "https://zenquotes.io/api/random"
    try:
        response = requests.get(ZEN_QUOTES_URL)
        if response.status_code == 200:
            data = response.json()
            return data[0]['q']  # Extract the quote text
        return "No quote available right now."
    except Exception as e:
        return f"Error fetching quote: {e}"

def generate_content():
    joke = fetch_joke()
    quote = fetch_quote()
    return {"joke": joke, "quote": quote}
    
    with open("app/data.json", "w") as file:
        json.dump(content, file, indent=4)
        
    return content
