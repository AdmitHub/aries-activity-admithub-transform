import test from 'blue-tape';
import fs from 'fs';
import path from 'path';
import Transform from '../lib/index.js';
import JSONStream from 'JSONStream';

test('transform ID', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformID({ attributes: [{ name: '', mappingName: 'ID', value: 'myId' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform date of birth', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformDateOfBirth({ attributes: [{ name: '', mappingName: 'Date of Birth', value: '2/24/1994' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform entry term and year', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformEntryTerm({ attributes: [{ name: '', mappingName: 'Entry Term', value: '16 Fall' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform nick name', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformNickName({ attributes: [{ name: '', mappingName: 'Nick Name', value: 'my nick name' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform first name', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformFirstName({ attributes: [{ name: '', mappingName: 'First Name', value: 'my first name' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform middle name', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformMiddleName({ attributes: [{ name: '', mappingName: 'Middle Name', value: 'Johnson' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform TXTPhone', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformTXTPhone({ attributes: [{ name: '', mappingName: 'TXTPhone', value: '1999454df525' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform TXTOptOut', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformTXTOptOut({ attributes: [{ name: '', mappingName: 'Text Message Opt Out', value: 'N' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform Address Line 1', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformAddressLine1({ attributes: [{ name: '', mappingName: 'Address Line 1', value: '214 Huckleberry Drive' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform zip', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformZip({ attributes: [{ name: '', mappingName: 'Zip', value: '56478487-534' }] });
    t.comment(JSON.stringify(transformed));
});

test('transform student status category', async (t) => {
    const transformer = new Transform();
    const transformed = transformer.transformStudentStatusCategory({ attributes: [{ name: '', mappingName: 'Student Status Category', value: 'Admit' }] });
    t.comment(JSON.stringify(transformed));
});
