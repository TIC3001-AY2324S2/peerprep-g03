# CS3219-AY22-23-Project-Skeleton

## User Service

### Quick Start
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

### Complete User Service Guide: [User Service Guide](./user-service/README.md)


### Starting backend
1. Navigate to the backend directory
    - In the project root directory, go to the backend folder using `cd app/backend`
2. Set up the .env file
    - Create a `.env` file within the backend direcotry
    - Add the line `COSMOS_DB_CONNECTION_STRING=<connection string>` to the file
    - Replace <connection string> with the actual connection string that was shared on telegram
3. (Optional) Create virtual environment
    - On Windows: `python -m venv .venv` then `.\.venv\Scripts\activate`
    - On macOS: `python3 -m venv .venv` then `source .venv/bin/activate`
4. Install required libraries
    - Install all necessary libaries by executing `pip install -r requirements.txt`
5.  Run the program
    - Start the flask application with `python app.py`
6. Verify successful launch 
    - Upon successful startup, the msg "Running on http://127.0.0.1:5000" should be displayed in your terminal
