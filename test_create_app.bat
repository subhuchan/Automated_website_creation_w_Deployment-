@echo off
echo ====================================================================
echo Testing TDS Project 1 API - Creating Test App
echo ====================================================================
echo.
echo This will create a test repository on GitHub
echo Repository name: hello-world-test-001
echo.
echo Make sure the server is running in another terminal!
echo ====================================================================
echo.
pause

curl http://localhost:8000/api-endpoint ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"23f3003784@ds.study.iitm.ac.in\",\"secret\":\"subhashree_secret_123\",\"task\":\"hello-world-test-001\",\"round\":1,\"nonce\":\"test-nonce-001\",\"brief\":\"Create a simple Hello World page with Bootstrap 5. Display a welcome message and a colorful gradient background.\",\"checks\":[\"Has Bootstrap 5 CSS\",\"Title says Hello World\",\"Has welcome message\"],\"evaluation_url\":\"https://httpbin.org/post\",\"attachments\":[]}"

echo.
echo.
echo ====================================================================
echo Check results in 2-3 minutes:
echo   - GitHub: https://github.com/subhuchan?tab=repositories
echo   - Pages: https://subhuchan.github.io/hello-world-test-001/
echo ====================================================================
pause
