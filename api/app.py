from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin
from datetime import datetime
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "*"}})

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True


def persist_to_db(data):
    """
    You can save the data to the db here.

    :param data:
    :return:
    """
    pass


@app.route('/post', methods=['POST'])
@cross_origin(origin="*")
def post():
    # Read request body (Data from clusters)
    data = request.get_json()

    # Extract the required properties from the data
    message = data['message']
    temperature = random.randint(1, 150)
    data['measurements'] = {"temperature": temperature}
    current_time = datetime.now()
    app.logger.info("Current Time: " + str(current_time))
    data['time'] = current_time.timestamp()

    # Persist the data into the DB tables
    persist_to_db(data)

    # Emit latest datapoint as an Socket IO event
    socketIo.emit("cluster_data", data)

    # Log message
    app.logger.info("POST REQUEST: " + str(message))

    # Return Response
    return jsonify(data)


if __name__ == '__main__':
    socketIo.run(app, host="0.0.0.0", port="5000")
