from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import pickle
import cvzone

app = Flask(__name__)
CORS(app)

# Load parking position data
with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

width, height = 107, 48

def checkParkingSpace(imgPro):
    spaces = []
    free_space_count = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgPro[y:y + height, x:x + width]
        count = cv2.countNonZero(imgCrop)
        
        # Determine if space is free or occupied
        is_free = count < 900
        spaces.append({"position": pos, "is_free": is_free})
        free_space_count += is_free

    return free_space_count, spaces

def process_image_for_parking(image):
    imgGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3, 3), np.uint8)
    imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

    return checkParkingSpace(imgDilate)

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    free_spaces, spaces = process_image_for_parking(img)

    return jsonify({
        "free_spaces": free_spaces,
        "total_spaces": len(posList),
        "spaces": spaces
    })

@app.route('/api/upload-video', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    video = cv2.VideoCapture(file.read())
    all_frames_data = []

    while True:
        success, frame = video.read()
        if not success:
            break
        free_spaces, spaces = process_image_for_parking(frame)
        all_frames_data.append({"free_spaces": free_spaces, "spaces": spaces})

    video.release()

    return jsonify({
        "frames_data": all_frames_data,
        "total_spaces": len(posList)
    })

if __name__ == '__main__':
    app.run(debug=True)
