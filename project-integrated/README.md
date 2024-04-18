# CS3219-AY22-23-Project-Skeleton

### 1. Start the RabbitMQ
1. Pull the official RabbitMQ image from Docker Hub: 'docker pull rabbitmq:3-management'
2. Run a RabbitMQ container with the management plugin enabled: 'docker run -d --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management'


### 2. Start the producer
1. Navigate to matching servier folder './app/backend/matching-service'.
2. Install npm packages using 'npm i'.
3. Run the frontend using 'npm run dev'

### 3. Start the consumer
1. Navigate to matching servier folder './app/backend/matching-service'.
2. Run the consumer.js using 'node consumer.js'

### 4. Start the question service
1. Navigate to the question servie folder './app/backend/question-service'.
2. Set up the .env file Rename `.env.sample` file to `.env`.
3. Install required libraries using `pip install -r requirements.txt`
4.  Run the program using 'python app.py'

### 5. Start the user-service
1. Navigate to the user servie folder './app/backend/user-service'.
2. Set up the .env file Rename `.env.sample` file to `.env`.
3. Install npm packages using 'npm i'.
4. Run the frontend using 'npm run dev'

### Start frontend
1. Navigate to root folder '/assignment4'
2. Install npm packages using 'npm i'.
3. Run frontend using 'npm run dev'.
4. Start the frontend by specific 'localhost:3000/' in the web browser.

