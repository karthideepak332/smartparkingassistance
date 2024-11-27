import cv2
import pickle
import cvzone
import numpy as np

# Load the parking position data
with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

width, height = 107, 48
free_space_count = 0

def checkParkingSpace(imgPro, img):
    global free_space_count
    spaceCounter = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgPro[y:y + height, x:x + width]
        count = cv2.countNonZero(imgCrop)

        # Determine color based on occupancy
        if count < 900:
            color = (0, 255, 0)  # Green for free space
            thickness = 5
            spaceCounter += 1
        else:
            color = (0, 0, 255)  # Red for occupied space
            thickness = 2

        # Draw rectangle for each parking space
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        cvzone.putTextRect(img, str(count), (x, y + height - 5), scale=1.5, thickness=2, offset=0, colorR=color)

    # Update global variable for free spaces count
    free_space_count = spaceCounter
    # Display total free spaces count on the image
    cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3, thickness=5, offset=20, colorR=(255, 0, 0))

def process_video():
    cap = cv2.VideoCapture('./media/carPark.mp4')  # Ensure your video file is placed correctly
    
    while True:
        success, img = cap.read()
        if not success:
            print("Error: Could not read frame from video.")
            break

        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
        imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
        imgMedian = cv2.medianBlur(imgThreshold, 5)
        kernel = np.ones((3, 3), np.uint8)
        imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

        # Check parking space availability
        checkParkingSpace(imgDilate, img)

        # Display the frame
        cv2.imshow("Parking Detection", img)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Run the video processing function
process_video()
