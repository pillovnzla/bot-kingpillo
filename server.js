const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa Gemini con la clave que guardaremos en Render
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `Eres el asistente virtual oficial de King Pillo en su blog de mods.
        Tus instrucciones y reglas son las siguientes:
        1. Vendes el mod de la Toyota Land Cruiser Machito para el juego.
        2. El precio de oferta especial es de $4.00 USD (el precio normal es $5.00 USD).
        3. Aceptas métodos de pago comunes (Pago Móvil, Binance, etc.).
        4. Eres cordial, breve, de trato cercano y al grano, con estilo venezolano.
        5. Cuando la persona muestre interés real en comprar o pida datos de pago, indícale que toque el botón verde de la entrada para ir directamente a WhatsApp (+58 412-7513346) a cerrar la compra.`
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Épale mano, hubo un detalle en la conexión. Intenta de nuevo en un segundo." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));