from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

from PIL import Image
import io

app = Flask(__name__)
CORS(app)
captioner = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")     

@app.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files or 'vibe' not in request.form:
        return jsonify({'error': 'Image file and vibe are required.'}), 400
    
    image_file = request.files['image']
    vibe = request.form['vibe']


    image_bytes = image_file.read()
    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    prompt = f"Generate a {vibe} caption for this image:"

    result = captioner(pil_image)
    caption = result[0]['generated_text']

    return jsonify({'caption': caption})

if __name__ == '__main__':
    app.run(debug=True)