# TDS Project 1: LLM Code Deployment System

An automated application builder that receives task briefs via API, generates web applications using Google Gemini AI, deploys them to GitHub Pages, and notifies evaluation servers.

## 🚀 Features

- **API Endpoint**: FastAPI server that accepts POST requests with application briefs
- **AI-Powered Generation**: Uses Google Gemini 2.5 Flash to generate complete web applications
- **Automated Deployment**: Creates GitHub repositories, enables Pages, adds MIT license
- **Round Support**: Handles initial builds (Round 1) and revisions (Round 2)
- **Secure**: Secret-based authentication to prevent unauthorized access
- **Background Processing**: Non-blocking task execution with immediate HTTP 200 responses
- **Retry Logic**: Exponential backoff for evaluation server notifications

## 📋 Requirements

- Python 3.8+
- GitHub Personal Access Token
- Google Gemini API Key
- FastAPI and dependencies (see `requirements.txt`)

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/subhuchan/tds-project-1.git
   cd tds-project-1
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file with:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_USERNAME=your_github_username
   GEMINI_API_KEY=your_gemini_api_key
   USER_SECRET=your_secret_key
   ```

## 🎯 Usage

### Start the Server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### API Request Format

Send a POST request to `/api-endpoint`:

```json
{
  "email": "student@example.com",
  "secret": "your_secret",
  "task": "unique-task-id",
  "round": 1,
  "nonce": "unique-nonce",
  "brief": "Create a captcha solver that handles ?url=...",
  "checks": [
    "Repo has MIT license",
    "README.md is professional",
    "Page displays captcha URL"
  ],
  "evaluation_url": "https://example.com/notify",
  "attachments": [
    {
      "name": "sample.png",
      "url": "data:image/png;base64,iVBORw..."
    }
  ]
}
```

### Example cURL Command

```bash
curl http://localhost:8000/api-endpoint \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","secret":"your_secret","task":"demo-001","round":1,"nonce":"test-123","brief":"Create a Hello World page","checks":[],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
```

## 📁 Project Structure

```
tds-project-1/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application & endpoints
│   ├── llm_generator.py     # AI code generation logic
│   ├── github_utils.py      # GitHub API interactions
│   ├── notify.py            # Evaluation server notifications
│   └── signature.py         # (if needed for signatures)
├── requirements.txt         # Python dependencies
├── runtime.txt             # Python version for deployment
├── .env                    # Environment variables (not in git)
├── .gitignore             # Git ignore patterns
└── README.md              # This file
```

## 🔧 How It Works

1. **Request Reception**: API endpoint receives JSON POST with app brief
2. **Secret Verification**: Validates the secret against `USER_SECRET`
3. **Background Processing**: Spawns async task for non-blocking execution
4. **Attachment Handling**: Decodes base64 attachments and saves temporarily
5. **AI Generation**: Sends brief to Gemini to generate HTML/JS/CSS code
6. **Repository Creation**: Creates/updates GitHub repo with generated code
7. **Licensing**: Adds MIT LICENSE to repository
8. **Pages Deployment**: Enables GitHub Pages for live hosting
9. **Notification**: POSTs repo details to evaluation URL with retry logic

## 🔄 Round Support

### Round 1 (Initial Build)
- Creates new repository
- Generates app from scratch
- Adds all attachments
- Creates README and LICENSE
- Enables GitHub Pages

### Round 2 (Revision)
- Updates existing repository
- Loads previous README for context
- Modifies code based on new brief
- Preserves existing functionality
- Updates README with changes

## 🌐 Deployment

### Local Development
```bash
uvicorn app.main:app --reload
```

### Production (Render/Railway/Vercel)

1. **Render** (Recommended):
   - Connect GitHub repo
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables from `.env`

2. **Railway**:
   - Import GitHub repo
   - Railway auto-detects Python
   - Add environment variables
   - Deploy automatically

3. **Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel --prod`
   - Add environment variables in dashboard

## 🔐 Security

- Never commit `.env` file to git
- Use GitHub Personal Access Tokens (not passwords)
- Rotate secrets regularly
- Keep API keys private
- Use secrets scanning tools (trufflehog, gitleaks)

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

**Student Email**: 23f3003784@ds.study.iitm.ac.in  
**GitHub**: [@subhuchan](https://github.com/subhuchan)

## 🙏 Acknowledgments

- TDS Course Instructors
- Google Gemini AI
- GitHub API
- FastAPI Framework

## 📞 Support

For issues or questions:
1. Check server logs for errors
2. Verify environment variables are set correctly
3. Ensure GitHub token has repo and pages permissions
4. Confirm Gemini API key is valid

## 🚦 Status Codes

- `200`: Request accepted and processing started
- `400`: Invalid secret or malformed request
- `500`: Internal server error (check logs)

---

**Last Updated**: October 2025  
**Course**: Tools in Data Science - IIT Madras
