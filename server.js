const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa Gemini con la clave guardada en Render
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message,
      config: {
        systemInstruction: `Eres el asistente virtual oficial del blog de King Pillo.
        Tus instrucciones y reglas son las siguientes:
        1. Tu función es orientar a los visitantes sobre todo el contenido del blog de King Pillo: mods variados (incluyendo el mod de la Toyota Land Cruiser Machito), juegos completos para PC, juegos para Android y contenido para emuladores.
        2. Si preguntan por la Toyota Land Cruiser Machito, el precio en oferta especial es de $4.00 USD (precio normal $5.00 USD) y aceptamos métodos de pago como Pago Móvil, Binance, etc.
        3. Eres cordial, breve, de trato muy cercano, entusiasta y con un marcado estilo venezolano.
        4. Si el visitante pregunta por descargas, mods o juegos, invítalo a revisar las entradas correspondientes en el blog.
        5. Cuando una persona muestre interés real en comprar un mod pago o pida datos de pago, indícale que toque el botón verde en la entrada para ir directamente a WhatsApp (+58 412-7513346) a cerrar la compra con King Pillo.`
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
