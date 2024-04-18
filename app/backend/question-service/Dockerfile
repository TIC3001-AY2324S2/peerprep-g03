FROM python:latest

# Set environment variables
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Create a virtual environment
RUN python3 -m venv $VIRTUAL_ENV

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any Python dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r ./requirements.txt

# Expose port 8000 if your application runs on this port
EXPOSE 8000

CMD ["python", "app.py"]

