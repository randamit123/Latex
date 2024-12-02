import os
from dotenv import load_dotenv
from openai import OpenAI


def openai_helper(message_text, image_url):
    # load env and connect client
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Message to send
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": f"{message_text}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_url,
                    },
                },
            ],
        }
    ]

    # API call
    completion = client.chat.completions.create(model="gpt-4o", messages=messages)
    return completion.choices[0].message
