const { config } = require('../config');

const engineId = 'stable-diffusion-v1-6';
const apiHost = config.API_HOST ?? 'https://api.stability.ai';
const apiKey = config.STABILITY_API_KEY;

if (!apiKey) throw new Error('Missing Stability API key.');

exports.generateImage = async (req, res) => {
  const { text, type, style, canvas } = req.body;

  if (!text || !style || !canvas) {
    return res.status(400).json({
      message: 'Please provide all required fields: text, style, and canvas.',
    });
  }

  const prompt = `${text}, ${style} style, for a ${type}`;

  let imageSize = '512x512'; // Default size

  switch (String(canvas)?.toLowerCase()) {
    case 'square':
      imageSize = '512x512';
      break;
    case 'portrait':
      imageSize = '512x768';
      break;
    case 'landscape':
      imageSize = '768x512';
      break;
    case 'custom':
      if (req.body.customSize) {
        imageSize = req.body.customSize;
      }
      break;
    default:
      imageSize = '512x512'; // Default to square
  }

  try {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          width: parseInt(imageSize.split('x')[0]),
          height: parseInt(imageSize.split('x')[1]),
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        message: 'Error generating image',
        details: errorText,
      });
    }

    const responseJSON = await response.json();

    // TODO: (@vikram-2101) store this in the database with use sessions so we can display the history

    // responseJSON?.artifacts?.forEach((image, index) => {
    //   const buffer = Buffer.from(image.base64, 'base64');
    // });

    const imageBuffer = Buffer.from(
      responseJSON?.artifacts?.[0]?.base64,
      'base64'
    );
    res.setHeader('Content-Type', 'image/png');
    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      details: error.message,
    });
  }
};
