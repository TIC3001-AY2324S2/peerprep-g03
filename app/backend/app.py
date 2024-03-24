from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Initialize database connection
cosmos_db_connection_string = os.getenv("COSMOS_DB_CONNECTION_STRING")
client = MongoClient(cosmos_db_connection_string)
db = client["peerprep_db"]
collection = db["questions"]

@app.route('/questions', methods=['GET'])
def get_questions():
    # Filter questions based on optional 'complexity' and 'category' query parameters
    query = {}
    complexity = request.args.get('complexity')
    category = request.args.get('category')
    if complexity:
        query['complexity'] = complexity
    if category:
        query['categories'] = {'$in': category.split(',')}
    
    # Fetch and return filtered questions
    questions = list(collection.find(query, {'_id': 1, 'title': 1, 'complexity': 1, 'categories': 1}))
    for question in questions:
        question['id'] = str(question['_id'])
        del question['_id']
    return jsonify(questions), 200

@app.route('/questions/<question_id>', methods=['GET'])
def get_question(question_id):
    # Fetch a question by its ID
    try:
        document = collection.find_one({"_id": ObjectId(question_id)}, {'_id': False})
        return jsonify(document if document else {"error": "Question not found"}), 200 if document else 404
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

@app.route('/questions', methods=['POST'])
def add_question():
    data = request.json
    required_fields = ['complexity', 'categories', 'title', 'description']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": "Missing required fields", "missing": missing_fields}), 400
    
    data['complexity'] = data['complexity'].title()
    data['categories'] = [category.title() for category in data['categories']]
    data['title'] = data['title'].title()

    # Prevent duplicate entries
    if collection.find_one({'title': data['title'], 'description': data['description']}):
        return jsonify({"error": "Question already exists"}), 409

    result = collection.insert_one(data)
    data['id'] = str(result.inserted_id)
    del data['_id']
    return jsonify(data), 201

@app.route('/questions/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    # Delete a question by its ID
    try:
        result = collection.delete_one({"_id": ObjectId(question_id)})
        return jsonify({"message": "Question deleted successfully"} if result.deleted_count else {"error": "Question not found"}), 200 if result.deleted_count else 404
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

@app.route('/questions/<question_id>', methods=['PATCH'])
def update_question(question_id):
    # Update a question by its ID
    try:
        result = collection.update_one({"_id": ObjectId(question_id)}, {"$set": request.json})
        if result.matched_count == 0:
            return jsonify({"error": "Question not found"}), 404
        return jsonify({"message": "Question updated successfully"} if result.modified_count else {"message": "No changes detected"}), 200
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

if __name__ == '__main__':
    app.run(debug=True)
    