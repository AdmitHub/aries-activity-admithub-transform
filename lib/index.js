import { Activity, singleS3StreamInput, singleS3StreamOutput, createLogger } from 'aries-data';
import find from 'lodash.find';
import indexOf from 'lodash.indexof';
import has from 'lodash.has';
import map from 'through2-map';

const log = createLogger(__filename);

export default class AdmitHubTransform extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version,
    };

    @singleS3StreamInput('json', true)
    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        return transformContact(activityTask.input.file);
    }

    transformContact(stream) {
        return stream.pipe(map.obj(::this.transformID))
        .pipe(map.obj(::this.transformPantherID))
        .pipe(map.obj(::this.transformDateOfBirth))
        .pipe(map.obj(::this.transformEmail))
        .pipe(map.obj(::this.transformGSUEmail))
        .pipe(map.obj(::this.transformEntryTerm))
        .pipe(map.obj(::this.transformNickName))
        .pipe(map.obj(::this.transformFirstName))
        .pipe(map.obj(::this.transformLastName))
        .pipe(map.obj(::this.transformMiddleName))
        .pipe(map.obj(::this.transformTXTPhone))
        .pipe(map.obj(::this.transformTXTOptOut))
        .pipe(map.obj(::this.transformAddressLine1))
        .pipe(map.obj(::this.transformAddressLine2))
        .pipe(map.obj(::this.transformAddressLine3))
        .pipe(map.obj(::this.transformCity))
        .pipe(map.obj(::this.transformState))
        .pipe(map.obj(::this.transformState))
        .pipe(map.obj(::this.transformZip))
        .pipe(map.obj(::this.transformCounty))
        .pipe(map.obj(::this.transformStudentStatusCategory))
        .pipe(map.obj(::this.transformStudentType))
        .pipe(map.obj(::this.transformLevelOfInterestInGSU))
        .pipe(map.obj(::this.transformFAFSAIncomplete))
        .pipe(map.obj(::this.transformMissingEntranceLoan))
        .pipe(map.obj(::this.transformMissingMasterPromissoryLoan))
        .pipe(map.obj(::this.transformHousingPreference))
        .pipe(map.obj(::this.transformPlanToLiveWhere))
        .pipe(map.obj(::this.transformHousingDepositDate))
        .pipe(map.obj(::this.transformResidency))
        .pipe(map.obj(::this.transformInceptRegistrationDate))
        .pipe(map.obj(::this.transformInceptAttended))
        .pipe(map.obj(::this.transformInceptAttendedDate))
        .pipe(map.obj(::this.transformIntentReceivedDate))
    }

    transformID(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'ID';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia, crmid: attribute.value };
        return { ...contact, georgia };
    }

    transformPantherID(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Panther ID';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia, enrollmentId: attribute.value };
        return { ...contact, georgia };
    }

    transformDateOfBirth(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Date of Birth';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia, dob: new Date(attribute.value) };
        return { ...contact, georgia };
    }

    transformEmail(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'E-mail';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia, email: attribute.value };
        return { ...contact, georgia };
    }

    transformGSUEmail(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'GSU Email';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia, schoolEmail: attribute.value };
        return { ...contact, georgia };
    }

    transformEntryTerm(contact) {
        const allowedTerms = ['Fall', 'Spring', 'Winter', 'Summer'];
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Entry Term';
        });

        if (!attribute || attribute.value === '') {
            return contact;
        }

        let georgia = { ...contact.georgia };
        const split = attribute.value.split(' ');
        const year = '20' + split[0];
        const term = split[1];
        if (indexOf(allowedTerms, term) !== -1 && Number(year) >= 2016) {
            georgia.entryTerm = term;
            georgia.entryYear = Number(year);
        }

        return { ...contact, georgia };
    }

    transformNickName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Nick Name';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, nickName: attribute.value };
        return { ...contact, georgia };
    }

    transformFirstName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'First Name';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, first: attribute.value };
        return { ...contact, georgia };
    }

    transformLastName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Last Name';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, last: attribute.value };
        return { ...contact, georgia };
    }

    transformMiddleName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Middle Name';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        if (attribute.value.length > 0) {
            georgia.name = { ...georgia.name, middleInitial: attribute.value.charAt(0) };
        }
        return { ...contact, georgia };
    }

    transformTXTPhone(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'TXTPhone';
        });

        if (!attribute) {
            return contact;
        }

        let numbersOnly = attribute.value.replace(/\D/g, '');
        if (numbersOnly.charAt(0) === '1') {
            numbersOnly = numbersOnly.substr(1);
        }

        let georgia = { ...contact.georgia, phone: numbersOnly };
        return { ...contact, georgia };
    }

    transformTXTOptOut(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Text Message Opt Out';
        });

        if (!attribute) {
            return contact;
        }

        const canText = attribute.value !== 'Y';
        let georgia = { ...contact.georgia };
        georgia.textSetting = { ...georgia.textSetting, canText: canText };
        return { ...contact, georgia };
    }

    transformAddressLine1(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Address Line 1';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, address1: attribute.value };
        return { ...contact, georgia };
    }

    transformAddressLine2(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Address Line 2';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, address2: attribute.value };
        return { ...contact, georgia };
    }

    transformAddressLine3(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Address Line 3';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, address3: attribute.value };
        return { ...contact, georgia };
    }

    transformCity(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'City';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, city: attribute.value };
        return { ...contact, georgia };
    }

    transformState(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'State/Province';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, state: attribute.value };
        return { ...contact, georgia };
    }

    transformZip(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Zip';
        });

        if (!attribute) {
            return contact;
        }

        let zip = attribute.value;
        if (zip.length > 5) {
            zip = zip.substr(0, 5); 
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, zip: zip };
        return { ...contact, georgia };
    }

    transformCounty(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'County';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, county: attribute.value };
        return { ...contact, georgia };
    }

    transformStudentStatusCategory(contact) {
        const allowedValues = [
            'Admit', 
            'Admit: Withdrawn', 
            'Applicant: Complete', 
            'Applicant: Denied', 
            'Applicant: Incomplete', 
            'Applicant: Wait list',
            'Enrolled',
            'Suspect',
            'Confirmed',
            'Applicant: Defer',
            'Applicant: Withdrawn Prospect',
            'Applicant: Wait List Denied',
            'Applicant: Wait List Declined',
            'Applicant: Success Academy',
            'Admit: Declined',
            'Unknown'
        ];

        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Student Status Category';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        const statusCategory = attribute.value;
        if (indexOf(allowedValues, statusCategory) !== -1) {
            georgia.application = { ...georgia.application, status: statusCategory };
        }

        return { ...contact, georgia };
    } 

    transformStudentType(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Student Type';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, studentType: attribute.value }; 
        return { ...contact, georgia };
    }

    transformLevelOfInterestInGSU(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Level of Interest in GSU';
        });

        if (!attribute) {
            return contact;
        }

        const georgia = { ...contact.georgia }; 
        georgia.interest = { ...georgia.interest, crm: attribute.value }; 
        return { ...contact, georgia }
    }

    transformFAFSAIncomplete(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FAFSA_Incomplete';
        });

        if (!attribute) {
            return contact;
        }

        const value = attribute.value !== 'Y' || attribute.value !== '';
        let georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, fafsaComplete: value };
        return { ...contact, georgia };
    }

    transformMissingEntranceLoan(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Missing_Entrance_Loan';
        });

        if (!attribute) {
            return contact;
        }

        const value = attribute.value === 'Y';
        let georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, missingEntryLoan: value }; 
        return { ...contact, georgia };
    }

    transformMissingMasterPromissoryLoan(contact) {
        log.info('calling promissory');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Missing_Master_Promissory_Loan';
        });

        if (!attribute) {
            return contact;
        }

        const value = attribute.value === 'Y';
        let georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, missingPromissoryLoan: value };
        return { ...contact, georgia };
    }

    transformHousingPreference(contact) {
        log.info('calling housing preference');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Housing Preference';
        });

        if (!attribute) {
            return contact;
        }

        const value = attribute.value === 'On Campus';
        let georgia = { ...contact.georgia };
        georgia.housing = { ...georgia.housing, onCampus: value };
        return { ...contact, georgia };
    }

    transformPlanToLiveWhere(contact) {
        log.info('calling plan to live where');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Plan to Live Where';
        });

        if (!attribute) {
            return contact;
        }

        let value = null;
        switch (attribute.value) {
            case 1:
                value = 'Residence Hall';
            break;
            case 2:
                value = 'Off-campus';
            break;
            case 3:
                value = 'Parents';
            break;
            case 4:
                value = 'Married Housing';
            break;
            case 5:
                value = 'Fraternity/Sorority';
            break;
            default:
                value = 'Residence Hall';
            break;
        }

        let georgia = { ...contact.georgia };
        georgia.housing = { ...georgia.housing, preference: value };
        return { ...contact, georgia };
    }

    transformHousingDepositDate(contact) {
        log.info('calling deposit date');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Housing_Deposit_Date';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.housing = { ...georgia.housing, depositDate: new Date(attribute.value) };
        if (has(georgia, 'housing.onCampus') && georgia.housing.onCampus === true) {
            const depositPaid = georgia.housing.onCampus === true && attribute.value !== '';
            georgia.housing.depositPaid = depositPaid;
        } 
        return { ...contact, georgia };
    }

    transformResidency(contact) {
        log.info('calling residency');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Residency';
        });

        if (!attribute) {
            return contact;
        }

        const value = attribute.value === 'Y' || attribute.value === 'Yes';
        let georgia = { ...contact.georgia, inStateStudent: value };
        return { ...contact, georgia };
    }

    transformInceptRegistrationDate(contact) {
        log.info('calling incept registration date');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept Registration Date';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        let needsToRSVP = attribute.value === null;
        georgia.orientation = { ...georgia.orientation, registeredDate: new Date(attribute.value), needsToRsvp: needsToRSVP }; 
        return { ...contact, georgia };
    }

    transformInceptAttended(contact) {
        log.info('calling incept attended');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept_Attended';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        const value = attribute.value === 'Y';
        georgia.orientation = { ...georgia.orientation, attended: value }; 
        return { ...contact, georgia };
    }

    transformInceptAttendedDate(contact) {
        log.info('calling incept attended date');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept Attended Date';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.orientation = { ...georgia.orientation, attendedDate: new Date(attribute.value) }; 
        return { ...contact, georgia };
    }

    transformIntentReceivedDate(contact) {
        log.info('calling intent received date');
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Intent_Received_Date15';
        });

        if (!attribute) {
            return contact;
        }

        let georgia = { ...contact.georgia };
        georgia.intent = { ...georgia.intent };
        if (has(georgia, 'application.status')) {
           georgia.intent.intendsToEnroll = attribute.value && georgia.application.status === 'Enrolled';
        }
        georgia.intent.intentReceivedDate = new Date(attribute.value);
        log.info({ ...contact, georgia });
        return { ...contact, georgia };
    }
};

