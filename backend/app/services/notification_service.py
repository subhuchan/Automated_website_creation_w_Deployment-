import httpx
import time

def notify_evaluation_server(evaluation_url: str, payload: dict) -> bool:
    """
    Send repo details back to the evaluation server.
    Retries with exponential backoff if needed.
    """
    headers = {"Content-Type": "application/json"}

    delay = 1  # start with 1 second
    for attempt in range(5):  # try up to 5 times
        try:
            r = httpx.post(evaluation_url, headers=headers, json=payload, timeout=30.0)
            if r.status_code == 200:
                print("✅ Evaluation server notified successfully.")
                return True
            else:
                print(f"⚠️ Attempt {attempt+1}: Server responded {r.status_code} - {r.text}")
        except Exception as e:
            print(f"❌ Attempt {attempt+1} failed: {e}")

        # Exponential backoff
        time.sleep(delay)
        delay *= 2

    print("❌ Failed to notify evaluation server after retries.")
    return False
