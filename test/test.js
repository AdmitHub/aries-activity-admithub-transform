import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import Transform from '../lib/index.js';
import JSONStream from 'JSONStream';

describe('Transform', function() {
    it('all the pipes', async () => {
        const transformer = new Transform();
        const filePath = path.join(__dirname, 'util/test_data.json');
        const stream = fs.createReadStream(filePath, 'utf8').pipe(JSONStream.parse());
        transformer.transformContact(stream);
    });

    it('should have data', async () => {
        const transformer = new Transform();
        const filePath = path.join(__dirname, 'util/test_data.json');
        const stream = fs.createReadStream(filePath, 'utf8').pipe(JSONStream.parse());
        const data = transformer.transformContact(stream);
        console.log(data);
    });
});

