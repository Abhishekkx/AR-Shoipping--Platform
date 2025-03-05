from flask import Flask, jsonify
import cv2
import mediapipe as mp
import threading

app = Flask(__name__)

# Set up MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Store the latest posture data
latest_pose = None

def process_video():
    global latest_pose
    cap = cv2.VideoCapture(0)  # Use webcam (0 for default camera)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # Convert frame to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)
        if results.pose_landmarks:
            # Extract nose landmark (head position)
            landmarks = results.pose_landmarks.landmark
            nose = landmarks[mp_pose.PoseLandmark.NOSE.value]
            latest_pose = {'x': nose.x, 'y': nose.y, 'z': nose.z}
        cv2.imshow('Pose Detection', frame)  # Optional: Show video feed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

# Run video processing in a background thread
thread = threading.Thread(target=process_video)
thread.daemon = True  # Ensure thread stops when main program exits
thread.start()

@app.route('/pose', methods=['GET'])
def get_pose():
    if latest_pose:
        return jsonify(latest_pose)
    return jsonify({'error': 'No pose data available'}), 404

if __name__ == '__main__':
    print("Starting pose detection server at http://localhost:5000/pose")
    app.run(host='0.0.0.0', port=5000)