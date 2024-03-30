from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Initialize database connection
cosmos_db_connection_string = os.getenv("COSMOS_DB_CONNECTION_STRING")
client = MongoClient(cosmos_db_connection_string)
db = client["peerprep_db"]
questions_collection = db["questions"]
categories_collection = db["categories"]


@app.route('/questions', methods=['GET'])
def get_questions():
    # Filter questions based on optional 'complexity' and 'category' query parameters
    query = {}
    complexity = request.args.get('complexity')
    category = request.args.get('category')
    if complexity:
        query['complexity'] = complexity
    if category:
        query['categories'] = {'$in': [category.strip().title() for category in category.split(',')]}
    
    # Fetch and return filtered questions
    questions = list(questions_collection.find(query, {'_id': 1, 'title': 1, 'complexity': 1, 'categories': 1}))
    for question in questions:
        question['id'] = str(question['_id'])
        question['categories'] = ', '.join(question['categories'])
        del question['_id']
    return jsonify(questions), 200

@app.route('/questions/<question_id>', methods=['GET'])
def get_question(question_id):
    # Fetch a question by its ID
    try:
        obj_id = ObjectId(question_id)
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400
    try:
        document = questions_collection.find_one({"_id": ObjectId(question_id)})
    except Exception:
        return jsonify({"error: An unknown error has occured"}), 400
    if not document:
        return jsonify({"error": "Question not found"}), 404
    else:
        document["categories"] = ", ".join(document["categories"])
        document['id'] = str(document['_id'])
        del document['_id']
        return jsonify(document), 200

@app.route('/questions', methods=['POST'])
def add_question():
    data = request.json
    required_fields = ['complexity', 'categories', 'title', 'description']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": "Missing required fields", "missing": missing_fields}), 400
    
    data['complexity'] = data['complexity'].title()
    data['categories'] = [category.strip().title() for category in data['categories'].split(",")]
    data['title'] = data['title'].title()

    # Prevent duplicate entries
    if questions_collection.find_one({'title': data['title'], 'description': data['description']}):
        return jsonify({"error": "Question already exists"}), 409

    result = questions_collection.insert_one(data)
    data['id'] = str(result.inserted_id)
    del data['_id']
    return jsonify(data), 201

@app.route('/questions/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    # Delete a question by its ID
    try:
        result = questions_collection.delete_one({"_id": ObjectId(question_id)})
        return jsonify({"message": "Question deleted successfully"} if result.deleted_count else {"error": "Question not found"}), 200 if result.deleted_count else 404
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

@app.route('/questions/<question_id>', methods=['PATCH'])
def update_question(question_id):
    # Update a question by its ID
    data = request.json
    if 'categories' in data:
        data['categories'] = [category.strip().title() for category in data['categories'].split(",")]
    try:
        obj_id = ObjectId(question_id)
    except InvalidId:
        return jsonify({"error": "Invalid ID format"})
    try:
        result = questions_collection.update_one({"_id": obj_id}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"error": "Question not found"}), 404
        return jsonify({"message": "Question updated successfully"} if result.modified_count else {"message": "No changes detected"}), 200
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400
    

@app.route('/categories', methods=['GET'])
def get_categories():
    # Fetch and return all categories
    result = list(categories_collection.find({}, {'_id': 1, 'name': 1}))
    all_categories = []
    print(all_categories)
    for category in result:
        all_categories.append(
            {
              "value" : str(category['_id']),
              "label": category["name"]   
            }
        )
        del category['_id']
    return jsonify(all_categories), 200

@app.route('/categories', methods=['POST'])
def add_category():
    # Add a new category
    data = request.json
    # Validate data, ensure 'name' is present
    if 'label' not in data:
        return jsonify({"error": "Missing category label"}), 400

    # Optionally check for duplicates
    if categories_collection.find_one({'name': data['label']}):
        return jsonify({"error": "Category already exists"}), 409

    result = categories_collection.insert_one({"name": data["label"].strip().title()})
    data['value'] = str(result.inserted_id)
    return jsonify(data), 201

@app.route('/categories/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    # Delete a category by its ID
    try:
        obj_id = ObjectId(category_id)
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400
    try:
        result = categories_collection.delete_one({"_id": obj_id})
        return jsonify({"message": "Category deleted successfully"} if result.deleted_count else {"error": "Category not found"}), 200 if result.deleted_count else 404
    except Exception:
        return jsonify({"error": "An unknown error has occured"}), 400
    
@app.route('/categories/<category_id>', methods=['GET'])
def get_category(category_id):
    # Fetch a category by its ID
    try:
        obj_id = ObjectId(category_id)
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400
    try:
        result = categories_collection.find_one({"_id": obj_id})
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400
    if not result:
        return jsonify({"error": "Category not found"}), 404
    else:
        return(jsonify({
            "value": str(result['_id']),
            'label': result['name']
        })
        ), 200
    
@app.route('/categories/<category_id>', methods=['PATCH'])
def update_category(category_id):
    #Update a category by its ID
    data = request.json
    if "label" not in data:
        return jsonify({"error": "Missing required field: label"})
    try:
        obj_id = ObjectId(category_id)
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400
    update_data = {"name": data["label"].strip().title()}
    try:
        result = categories_collection.update_one({"_id": obj_id}, {"$set": update_data})
        if result.matched_count == 0:
            return jsonify({"error": "Category not found"}), 404
        return jsonify({"message": "Category updated successfully"} if result.modified_count else {"message": "No changes detected"}), 200
    except Exception:
        return jsonify({"error": "An unknow error has occured"}), 400

if __name__ == '__main__':
    app.run(debug=True)
    