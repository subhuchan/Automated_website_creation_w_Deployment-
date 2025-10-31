FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY backend ./backend

# Create temp directory
RUN mkdir -p /tmp/tds_attachments

# Expose port
EXPOSE 8000

# Start command
CMD cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
