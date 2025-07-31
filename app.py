from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# DB connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    database="ecommerce"
)
cursor = conn.cursor(dictionary=True)

# GET all products
@app.route('/api/products', methods=['GET'])
def get_all_products():
    cursor.execute("SELECT * FROM products LIMIT 100")
    products = cursor.fetchall()
    return jsonify(products), 200

# GET product by ID
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cursor.fetchone()
    if product:
        return jsonify(product), 200
    else:
        return jsonify({"error": "Product not found"}), 404

# Start server
if __name__ == '__main__':
    app.run(debug=True)