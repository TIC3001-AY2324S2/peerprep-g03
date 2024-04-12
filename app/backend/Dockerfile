FROM python:latest

# Update package lists and install Python 3
RUN apt-get update && apt-get install -y python3

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any Python dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r /app/question-service/requirements.txt

# Expose port 8000 if your application runs on this port
EXPOSE 8000

# Activate the virtual environment
# For Windows
CMD [".\.venv\Scripts\activate && python3 .\question-service\app.py"]
# For Mac
CMD ["/bin/bash", "-c", "source .venv/bin/activate && python3 ./question-service/app.py"]
