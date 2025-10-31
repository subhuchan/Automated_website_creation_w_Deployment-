import requests
import json

# Test data
data = {
    "email": "test@example.com",
    "secret": "subhashree_secret_123",
    "task": "debug-test-001",
    "round": 1,
    "nonce": "test-nonce-123",
    "brief": "Create a simple test page",
    "checks": [],
    "evaluation_url": "https://httpbin.org/post",
    "attachments": []
}

print("=" * 60)
print("Testing API with secret validation")
print("=" * 60)
print(f"\nSending secret: '{data['secret']}'")
print(f"Secret length: {len(data['secret'])}")
print(f"Secret bytes: {data['secret'].encode()}")
print("\nMaking POST request to http://localhost:8000/api/v1/builder/create")
print("=" * 60)

try:
    response = requests.post(
        "http://localhost:8000/api/v1/builder/create",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Body: {response.text}")
    
    if response.status_code == 200:
        print("\n✅ SUCCESS! Secret validation passed!")
        result = response.json()
        print(f"Project created: {result.get('task_id')}")
    else:
        print(f"\n❌ FAILED! Status code: {response.status_code}")
        print("Check backend logs for debug output")
        
except Exception as e:
    print(f"\n❌ ERROR: {e}")

print("\n" + "=" * 60)
print("Check the backend terminal for debug output!")
print("=" * 60)
