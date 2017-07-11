import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import Transform from '../lib/index.js';
import JSONStream from 'JSONStream';
import intersect from 'lodash.intersection';
import incomingData from '../test/util/test-object.json'

describe('Transform', function() {
    it('should be piped through all the pipes', async () => {
        const transformer = new Transform();
        const filePath = path.join(__dirname, 'util/test_data.json');
        const stream = fs.createReadStream(filePath, 'utf8').pipe(JSONStream.parse());
        transformer.transformContact(stream);
    });

    it('should have data', async () => {
        const transformer = new Transform();
        const filePath = path.join(__dirname, 'util/test_data.json');
        const stream = fs.createReadStream(filePath, 'utf8').pipe(JSONStream.parse());
        const dataStream = transformer.transformContact(stream);
        dataStream.on('readable', () => {
            var chunk;
            while(null !== (chunk = dataStream.read())){
                console.log(`chunk: ${chunk}`);
                assert.ok(chunk);
            }
        });
    });

    it('should contain all fields', async () => {
        const fields = [
            'crmId',
            'enrollmentId',
            'dob',
            'email',
            'schoolEmail',
            'entryYear',
            'entryTerm',
            'name',
            'last',
            'first',
            'middleInitial',
            'phone',
            'textSetting',
            'canText',
            'location',
            'address1',
            'address2',
            'address3',
            'city',
            'state',
            'zip',
            'county',
            'country',
            'application',
            'status',
            'profile',
            'studentType',
            'finAid',
            'fafsaReceived',
            'finAidComplete',
            'entranceCounselingComplete',
            'mpnPerkinsComplete',
            'mpnStaffordPlusComplete',
            'housing',
            'onCampus',
            'depositDate',
            'depositPaid',
            'residency',
            'orientation',
            'registeredDate',
            'needsToRsvp',
            'attended',
            'attendedDate',
            'intent',
            'intentReceivedDate',
            'intendsToEnroll',
            'scholarshipAwarded',
            'scholarshipAccepted',
            'statusExtended',
            'offered',
            'profile',
            'citizenVerified',
            'immunizationHold',
            'receivedHSTranscript',
            'emergencyContactHold',
            'honorsProspect',
            'honors',
            'fedLoanAccepted',
            'aidGap',
            'appCompleteDate',
            'decisionDate',
            'decisionType',
            'fafsaVerificationFlagDate',
            'finAidInterest',
            'firstGen',
            'hsGradYear',
            'hsCode',
            'georgia',
            'hopeAwardAmount',
            'hopeAwardDate',
            'hopeGSFAppSubmitted',
            'intendedCollege',
            'majorInterest',
            'fedLoanOffered',
            'pellAwardAmount',
            'pellAwardDate',
            'successAcademy',
            'qualified',
            'appReceived',
            'accepted',
            'tuition',
            'paymentPlan',
            'withdrawalReason',
            'workStudyAmount',
            'workStudyAwardDate'
        ];
        console.log(fields.length);
        const transformer = new Transform();
        const stream = fs.createReadStream('./test/util/test-object.json');
        const dataStream = transformer.transformContact(stream);
        const ws = fs.createWriteStream('foobar');
        let count = 0;
        dataStream.on('data', (chunk) => {
            console.log('piping');
            count = deepFind(chunk, fields);
            console.log('asserting');
            assert.equal(count, fields.length, 'all fields exist')
        });
        dataStream.pipe(ws);
    });
});

function deepFind(obj, fields) {
    let counter = 0;
    console.log(Object.keys(obj));
    Object.keys(obj).forEach((key) => {
        console.log('looping');
        if (fields.includes(key) && intersect(Object.keys(obj[key]), fields).length == 1) {
            counter++;
            console.log('upped counter');
        } else if (typeof obj[key] === 'object') {
            console.log('calling deepFind');
            deepFind(obj[key], fields);
        }
    });
    console.log('returning counter' + counter);
    return counter;
}
