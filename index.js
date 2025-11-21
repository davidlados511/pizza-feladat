import express from 'express';
const app = express();

app.use('/static', express.static('static'));

import cors from 'cors';
app.use(cors()); // Kikapcsolja a CORS korlátozásokat

app.use(express.json()); // Beállítja, hogy a bejövő kérések JSON formátumúak legyenek

import futar from './Routes/futar.js';
import pizza from './Routes/pizza.js';
import rendeles from './Routes/rendeles.js';
import tetel from './Routes/tetel.js';
import vevo from './Routes/vevo.js';
import ujrendeles from './Routes/ujrendeles.js';

app.use('/api/pizza', pizza);
app.use('/api/futar', futar);
app.use('/api/rendeles', rendeles);
app.use('/api/tetel', tetel);
app.use('/api/vevo', vevo);
app.use('/api/ujrendeles', ujrendeles);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
