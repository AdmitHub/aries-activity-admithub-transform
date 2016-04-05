import { Activity, singleS3StreamInput } from 'astronomer-aries';
import JSONStream from 'JSONStream';
import find from 'lodash.find';
import indexOf from 'lodash.indexof';
import has from 'lodash.has';

export default class MongoDBSink extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    async onTask(activityTask, config) {
    }

    transformFromStream(stream, config) {
        let transformedContacts = [];
        return new Promise((resolve, reject) => {
            const jsonParser = JSONStream.parse();
            jsonParser.on('data', async (data) => {
                const transformedContact = await this.transformContact(data);
                transformedContacts.push(transformedContact);
            });
            jsonParser.on('end', () => {
                this.log.info('Finished');
                this.log.info(transformedContacts.length);
                resolve(transformedContacts);
            });
            stream.pipe(jsonParser);
        });
    }

    transformContact(contact) {
        return new Promise((resolve, reject) => {
            let transformedContact = { georgia: {} };
            this.transformID(contact, transformedContact);
            this.transformPantherID(contact, transformedContact);
            this.transformDateOfBirth(contact, transformedContact);
            this.transformEmail(contact, transformedContact);
            this.transformGSUEmail(contact, transformedContact);
            this.transformEntryTerm(contact, transformedContact);
            this.transformNickName(contact, transformedContact);
            this.transformFirstName(contact, transformedContact);
            this.transformLastName(contact, transformedContact);
            this.transformMiddleInitial(contact, transformedContact);
            this.log.info(transformedContact);
            resolve(transformedContact);
        });
    }

    transformID(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'ID';
        });
        if (attribute) {
            transformedContact.georgia.crmid = attribute.value; 
        }
    }

    transformPantherID(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Panther ID';
        });
        if (attribute) {
            transformedContact.georgia.enrollmentId = attribute.value; 
        }
    }

    transformDateOfBirth(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Date of Birth';
        });
        if (attribute && attribute !== '') {
            transformedContact.georgia.dob = new Date(attribute.value); 
        }
    }

    transformEmail(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'E-mail';
        });
        if (attribute) {
            transformedContact.georgia.email = attribute.value; 
        }
    }

    transformGSUEmail(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'GSU Email';
        });
        if (attribute) {
            transformedContact.georgia.schoolEmail = attribute.value; 
        }
    }

    transformEntryTerm(contact, transformedContact) {
        const allowedTerms = ['Fall', 'Spring', 'Winter', 'Summer'];
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Entry Term';
        });
        if (attribute && attribute !== '') {
            const split = attribute.value.split(' ');
            const year = '20' + split[0];
            const term = split[1];
            if (indexOf(allowedTerms, term) !== -1 && Number(year) >= 2016) {
                transformedContact.georgia.entryTerm = term; 
                transformedContact.georgia.entryYear = Number(year);
            }
        }
    }

    transformNickName(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Nick Name';
        });
        if (attribute) {
            if (!has(transformedContact, 'georgia.name')) {
                transformedContact.georgia.name = {};
            }
            transformedContact.georgia.name.nick = attribute.value; 
        }
    }

    transformFirstName(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'First Name';
        });
        if (attribute) {
            if (!has(transformedContact, 'georgia.name')) {
                transformedContact.georgia.name = {};
            }
            transformedContact.georgia.name.first = attribute.value; 
        }
    }

    transformLastName(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Last Name';
        });
        if (attribute) {
            if (!has(transformedContact, 'georgia.name')) {
                transformedContact.georgia.name = {};
            }
            transformedContact.georgia.name.last = attribute.value; 
        }
    }

    transformMiddleInitial(contact, transformedContact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Middle Name';
        });
        if (attribute && attribute !== '') {
            if (!has(transformedContact, 'georgia.name')) {
                transformedContact.georgia.name = {};
            }
            transformedContact.georgia.name.middleInitial = attribute.value.charAt(0); 
        }
    }
};
