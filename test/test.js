import test from 'blue-tape';
import fs from 'fs';
import path from 'path';
import Transform from '../lib/index.js';
import JSONStream from 'JSONStream';

test('reads file and insert documents', async (t) => {
    const transformer = new Transform();
    const filePath = path.join(__dirname, 'util/test_data.json');
    const stream = fs.createReadStream(filePath, 'utf8');
    transformer.transformFromStream(stream);
});
