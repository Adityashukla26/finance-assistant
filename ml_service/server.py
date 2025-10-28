
from flask import Flask, request, jsonify
import joblib
# from anomaly_detector import detect_anomalies # Remove this import
import os
import pandas as pd # Import pandas
import pickle # Import pickle

app = Flask(__name__)

# --- Load the Categorization Model and Vectorizer ---
# Load the pre-trained model and vectorizer at startup
MODEL_PATH = './models/mnb_bank_model.pkl'
VECTORIZER_PATH = './models/tfidf_vectorizer.pkl'
categorizer_model = None
tfidf_vectorizer = None

try:
    categorizer_model = joblib.load(MODEL_PATH)
    tfidf_vectorizer = joblib.load(VECTORIZER_PATH)
    print(f"Categorizer model loaded successfully from {MODEL_PATH}")
    print(f"TF-IDF vectorizer loaded successfully from {VECTORIZER_PATH}")
except FileNotFoundError:
    print(f"ERROR: Model or vectorizer file not found. Please ensure {MODEL_PATH} and {VECTORIZER_PATH} exist.")
    categorizer_model = None
    tfidf_vectorizer = None
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")
    categorizer_model = None
    tfidf_vectorizer = None

# --- Load the Anomaly Detection Model and Encoder ---
ANOMALY_MODEL_PATH = './models/anomaly_model.pkl'
ENCODER_PATH = './models/encoder.pkl'
anomaly_model = None
encoder = None

try:
    with open(ANOMALY_MODEL_PATH, 'rb') as f:
        anomaly_model = pickle.load(f)
    with open(ENCODER_PATH, 'rb') as f:
        encoder = pickle.load(f)
    print(f"Anomaly model loaded successfully from {ANOMALY_MODEL_PATH}")
    print(f"Encoder loaded successfully from {ENCODER_PATH}")
except FileNotFoundError:
    print(f"ERROR: Anomaly model or encoder file not found. Please ensure {ANOMALY_MODEL_PATH} and {ENCODER_PATH} exist.")
    anomaly_model = None
    encoder = None
except Exception as e:
    print(f"Error loading anomaly model or encoder: {e}")
    anomaly_model = None
    encoder = None


@app.route('/categorize', methods=['POST'])
def categorize_transactions():
    """
    Categorizes a list of transaction descriptions.
    Expects a JSON payload: {"descriptions": ["desc1", "desc2", ...]}
    """
    if categorizer_model is None or tfidf_vectorizer is None:
        return jsonify({"error": "Model or vectorizer not loaded. Please check server logs."}), 500
    
    data = request.get_json()
    if not data or 'descriptions' not in data:
        return jsonify({"error": "Invalid input. 'descriptions' key is required."}), 400

    descriptions = data['descriptions']
    try:
        # Preprocess descriptions
        processed_descriptions = [desc.lower() for desc in descriptions]
        # Vectorize descriptions
        X_vec = tfidf_vectorizer.transform(processed_descriptions)
        # Predict categories
        predictions = categorizer_model.predict(X_vec)
        return jsonify({"categories": list(predictions)})
    except Exception as e:
        return jsonify({"error": f"An error occurred during prediction: {e}"}), 500


@app.route('/detect-anomalies', methods=['POST'])
def find_anomalies():
    """
    Detects anomalies in a user's transaction history.
    Expects a JSON payload: {"transactions": [{...}, {...}, ...]}
    """
    if anomaly_model is None or encoder is None:
        return jsonify({"error": "Anomaly model or encoder not loaded. Please check server logs."}), 500

    data = request.get_json()
    if not data or 'transactions' not in data:
        return jsonify({"error": "Invalid input. 'transactions' key is required."}), 400

    transactions = data['transactions']
    try:
        # Convert list of dictionaries to DataFrame
        transactions_df = pd.DataFrame(transactions)

        # Preprocessing steps as in the user's notebook
        transactions_df = transactions_df.rename(columns={'Amount': 'amount', 'Date': 'date', 'Category': 'category'})
        transactions_df['date'] = pd.to_datetime(transactions_df['date'])
        transactions_df['amount_abs'] = transactions_df['amount'].abs()
        transactions_df['day_of_week'] = transactions_df['date'].dt.dayofweek
        transactions_df['hour_of_day'] = transactions_df['date'].dt.hour

        # Apply one-hot encoding
        category_encoded = encoder.transform(transactions_df[['category']]).toarray()
        category_df = pd.DataFrame(category_encoded, columns=encoder.get_feature_names_out(['category']))

        # Concatenate features
        features_df = transactions_df[['amount_abs', 'day_of_week', 'hour_of_day']].reset_index(drop=True)
        features_df = pd.concat([features_df, category_df], axis=1)

        # Predict anomalies
        transactions_df['anomaly_prediction'] = anomaly_model.predict(features_df)

        # Filter for anomalous transactions (assuming anomaly prediction is 1 for anomaly)
        anomalous_transactions = transactions_df[transactions_df['anomaly_prediction'] == 1]

        # Return the IDs of anomalous transactions
        # Assuming there's an 'id' field in the input transactions
        if 'id' in anomalous_transactions.columns:
             anomaly_ids = anomalous_transactions['id'].tolist()
        else:
             # If no 'id' field, return the index as identifier
             anomaly_ids = anomalous_transactions.index.tolist()


        return jsonify({"anomalous_transaction_ids": anomaly_ids})
    except Exception as e:
        return jsonify({"error": f"An error occurred during anomaly detection: {e}"}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """A simple health check endpoint."""
    return jsonify({"status": "ok", "categorizer_model_loaded": categorizer_model is not None, "vectorizer_loaded": tfidf_vectorizer is not None, "anomaly_model_loaded": anomaly_model is not None, "encoder_loaded": encoder is not None})


if __name__ == '__main__':
    # To run this, use a production-ready server like gunicorn:
    # gunicorn --bind 0.0.0.0:5001 ml_service:app
    # For development, you can use:
    app.run(port=5001, debug=True)