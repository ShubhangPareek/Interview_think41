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
    cursor.execute("""
    SELECT p.id, p.name, p.brand, p.retail_price, d.name AS department
    FROM products p
    JOIN departments d ON p.department_id = d.id
    LIMIT 100
""")
    products = cursor.fetchall()
    return jsonify(products), 200

@app.route('/api/departments', methods=['GET'])
def get_departments():
    cursor = conn.cursor(dictionary=True)
    query = '''
        SELECT d.id, d.name, COUNT(p.id) AS product_count
        FROM departments d
        LEFT JOIN products p ON d.id = p.department_id
        GROUP BY d.id
    '''
    cursor.execute(query)
    departments = cursor.fetchall()
    return jsonify({"departments": departments})

# GET product by ID
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cursor.fetchone()
    if product:
        return jsonify(product), 200
    else:
        return jsonify({"error": "Product not found"}), 404
    
@app.route('/api/departments/<int:id>', methods=['GET'])
def get_department(id):
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM departments WHERE id = %s', (id,))
    department = cursor.fetchone()
    if not department:
        return jsonify({"error": "Department not found"}), 404
    return jsonify(department)

@app.route('/api/departments/<int:id>/products', methods=['GET'])
def get_department_products(id):
    cursor = conn.cursor(dictionary=True)
    # Validate department exists
    cursor.execute('SELECT name FROM departments WHERE id = %s', (id,))
    department = cursor.fetchone()
    if not department:
        return jsonify({"error": "Department not found"}), 404

    # Get products
    cursor.execute('SELECT * FROM products WHERE department_id = %s', (id,))
    products = cursor.fetchall()
    return jsonify({
        "department": department["name"],
        "products": products
    })


# Start server
if __name__ == '__main__':
    app.run(use_reloader=False)