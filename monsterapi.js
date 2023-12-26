// Import the MonsterApiClient class
const MonsterApiClient = require("monsterapi").default;
require('dotenv').config;

// Replace 'your-api-key' in env File
const client = new MonsterApiClient(process.env.MONSTERAPI_API_KEY);

// Example: Generating content using a SDXL model
const model = "sdxl-base"; // Replace with a valid model name
const input = { // Replace with valid input data for the model
    "negprompt": "deformed, bad anatomy, disfigured, poorly draw face, mutation, mutated, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blurry, mutated hands, fingers",
    "samples": 1,
    "steps": 50,
    "aspect_ratio": "square",
    "guidance_scale": 12.5,
    "seed": 2414,
    "safe_filter": "true",
    "prompt": "portrait of a model with raindrops in the foreground, wet look, slight smile, hyper-detailed skin texture illuminated by neon light, white dress, long hair, fickle face, perfect anatomy, wet-to-wet background technique by Misilbu. . hyper detailed 8k painting, 8k concept art portrait by Greg Rutkowski Artgerm WLOP Alphonse Beeple Caravaggio, muted colors, watercolor style, bokeh, f1.0 lens"

};

client
    .generate(model, input)
    .then((response) => {
        // Handle the response from the API
        console.log("Generated content:", response);
    })
    .catch((error) => {
        // Handle API errors
        console.error("Error:", error);
    });



// Example 2: Generating content using a Whisper Model
const modelForFile = 'whisper'; // Replace with a valid model name
const selectedFile = './hackwiseAcademy.mp3'; // Replace with the path to your local file


// // Upload the file
client.uploadFile(selectedFile)
    .then((uploadResponse) => {
        console.log(uploadResponse)
        const { upload_url, download_url } = uploadResponse;

        // Perform file upload to 'upload_url' (using PUT request)

        // After successful upload, use 'download_url' as input in the model request
        const inputForFile = {  // Replace with valid input data for the model
            "transcription_format": "text",
            "diarize": "false",
            "num_speakers": 2,
            "remove_silence": "false",
            "file": download_url, // Use the 'download_url' as the 'file' input
        };

        // Make a model request using the input
        return client.generate(modelForFile, inputForFile);
    })
    .then((generatedResponse) => {
        // Handle the response from the API
        console.log('Generated content from file:', generatedResponse);
    })
    .catch((error) => {
        // Handle API errors or file upload errors
        console.error("Error:", error);
    });
