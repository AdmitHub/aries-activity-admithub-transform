import { Activity, singleS3StreamInput, singleS3StreamOutput } from 'aries-data';
import find from 'lodash.find';
import indexOf from 'lodash.indexof';
import has from 'lodash.has';
import map from 'through2-map';
import moment from 'moment';

export default class AdmitHubTransform extends Activity {

    @singleS3StreamInput('json', true)
    @singleS3StreamOutput('json')
    async onTask(activityTask) {
        return this.transformContact(activityTask.input.file);
    }

    transformContact(stream) {
        return stream.pipe(map.obj(::this.transformID))
        .pipe(map.obj(::this.transformPantherID))
        .pipe(map.obj(::this.transformDateOfBirth))
        .pipe(map.obj(::this.transformEmail))
        .pipe(map.obj(::this.transformGSUEmail))
        .pipe(map.obj(::this.transformEntryTerm))
        .pipe(map.obj(::this.transformFirstName))
        .pipe(map.obj(::this.transformLastName))
        .pipe(map.obj(::this.transformMiddleName))
        .pipe(map.obj(::this.transformTXTPhone))
        .pipe(map.obj(::this.transformMobilePhone))
        .pipe(map.obj(::this.transformPhone))
        .pipe(map.obj(::this.transformTXTOptOut))
        .pipe(map.obj(::this.transformAddressLine1))
        .pipe(map.obj(::this.transformAddressLine2))
        .pipe(map.obj(::this.transformAddressLine3))
        .pipe(map.obj(::this.transformCity))
        .pipe(map.obj(::this.transformState))
        .pipe(map.obj(::this.transformState))
        .pipe(map.obj(::this.transformZip))
        .pipe(map.obj(::this.transformCounty))
        .pipe(map.obj(::this.transformCountry))
        .pipe(map.obj(::this.transformStudentStatusCategory))
        .pipe(map.obj(::this.transformStudentType))
        .pipe(map.obj(::this.transformStudentStatus))
        .pipe(map.obj(::this.transformFinAidOutstanding))
        .pipe(map.obj(::this.transformFinAidInterest))
        .pipe(map.obj(::this.transformFinancialAidOffered))
        .pipe(map.obj(::this.transformFAFSAReceived))
        .pipe(map.obj(::this.transformScholarshipAwarded))
        .pipe(map.obj(::this.transformScholarshipAccepted))
        .pipe(map.obj(::this.transformHousingPreference))
        .pipe(map.obj(::this.transformHousingDepositDate))
        .pipe(map.obj(::this.transformResidency))
        .pipe(map.obj(::this.transformInceptRegistrationDate))
        .pipe(map.obj(::this.transformInceptAttended))
        .pipe(map.obj(::this.transformInceptAttendedDate))
        .pipe(map.obj(::this.transformIntentReceivedDate))
        .pipe(map.obj(::this.transformLPVerified))
        .pipe(map.obj(::this.transformImmunizationHold))
        .pipe(map.obj(::this.transformReceivedHSTranscript))
        .pipe(map.obj(::this.transformEmergencyContactHold))
        .pipe(map.obj(::this.transformAdmitHubHonorsProspect))
        .pipe(map.obj(::this.transformHonors))
        .pipe(map.obj(::this.transformMatchDate))
        .pipe(map.obj(::this.transformAcceptedFederalLoan))
        .pipe(map.obj(::this.transformAidGap))
        .pipe(map.obj(::this.transformAppCompleteDate))
        .pipe(map.obj(::this.transformDecisionDate))
        .pipe(map.obj(::this.transformDecisionPlan))
        .pipe(map.obj(::this.transformFAFSAVerificationDate))
        .pipe(map.obj(::this.transformFinancialAidInterest))
        .pipe(map.obj(::this.transformFirstGeneration))
        .pipe(map.obj(::this.transformHighSchoolGraduationYear))
        .pipe(map.obj(::this.transformHighSchoolCode))
        .pipe(map.obj(::this.transformHopeAwardAmount))
        .pipe(map.obj(::this.transformHopeAwardDate))
        .pipe(map.obj(::this.transformHOPGSF))
        .pipe(map.obj(::this.transformMajorCollege))
        .pipe(map.obj(::this.transformMajorInterest))
        .pipe(map.obj(::this.transformOfferedFederalLoan))
        .pipe(map.obj(::this.transformPellAwardAmount))
        .pipe(map.obj(::this.transformMPNPerkins))
        .pipe(map.obj(::this.transformMPNStaffordPlus))
        .pipe(map.obj(::this.transformCompletedEntrLoanCounseling))
        .pipe(map.obj(::this.transformPellAwardDate))
        .pipe(map.obj(::this.transformSAAppl87))
        .pipe(map.obj(::this.transformSAApplReceived))
        .pipe(map.obj(::this.transformSuccessAcademy))
        .pipe(map.obj(::this.transformTuitionPaymentPlan))
        .pipe(map.obj(::this.transformWithdrawalReason))
        .pipe(map.obj(::this.transformWorkstudyAwardAmount))
        .pipe(map.obj(::this.transformWorkstudyAwardDate))
        .pipe(map.obj(::this.transformCollegeId))
        .pipe(map.obj(::this.transformPermittedUser))
        .pipe(map.obj(::this.transformCollegeName))
        .pipe(map.obj(::this.transformKnownUser))
        .pipe(map.obj(::this.transformLastIntegrationDate))
        .pipe(map.obj(::this.transformGeorgia));
    }

    transformID(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'ID';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia = { ...contact.georgia, crmid: null };
            return contact;
        }

        const georgia = { ...contact.georgia, crmid: attribute.value };
        return { ...contact, georgia };
    }

    transformPantherID(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Panther ID';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia = { ...contact.georgia, enrollmentId: null };
            return contact;
        }

        const georgia = { ...contact.georgia, enrollmentId: attribute.value };
        return { ...contact, georgia };
    }

    transformDateOfBirth(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Date of Birth';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia = { ...contact.georgia, dob: null };
            return contact;
        }

        const georgia = { ...contact.georgia, dob: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformEmail(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'E-mail';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia = { ...contact.georgia, email: null };
            return contact;
        }

        const georgia = { ...contact.georgia, email: attribute.value };
        return { ...contact, georgia };
    }

    transformGSUEmail(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'GSU Email';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia = { ...contact.georgia, schoolEmail: null };
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
            contact.georgia = { ...contact.georgia, entryTerm: null, entryYear: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        const split = attribute.value.split(' ');
        const year = `20${split[0]}`;
        const term = split[1];
        if (indexOf(allowedTerms, term) !== -1 && Number(year) >= 2017) {
            georgia.entryTerm = term;
            georgia.entryYear = Number(year);
        }
        return { ...contact, georgia };
    }

    transformFirstName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'First Name';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.name = { ...contact.georgia.name, first: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, first: attribute.value };
        return { ...contact, georgia };
    }

    transformLastName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Last Name';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.name = { ...contact.georgia.name, last: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, last: attribute.value };
        return { ...contact, georgia };
    }

    transformMiddleName(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Middle Name';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.name = { ...contact.georgia.name, middleInitial: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.name = { ...georgia.name, middleInitial: attribute.value.charAt(0) };
        return { ...contact, georgia };
    }

    transformTXTPhone(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'TXTPhone';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.phone = null;
            return contact;
        }

        let numbersOnly = attribute.value.replace(/\D/g, '');
        if (numbersOnly.charAt(0) === '1') {
            numbersOnly = numbersOnly.substr(1);
        }

        if (numbersOnly.length !== 10) {
            contact.georgia.phone = null;
            return contact;
        }

        const georgia = { ...contact.georgia, phone: numbersOnly };
        return { ...contact, georgia };
    }

    transformMobilePhone(contact) {
        // not all users have a TXTPhone, we only want 'Mobile Phone' if there is no TXTPhone
        if (has(contact, 'georgia.phone') && contact.georgia.phone !== null && contact.georgia.phone !== '') {
            return contact;
        }

        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Mobile Phone';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.phone = null;
            return contact;
        }

        let numbersOnly = attribute.value.replace(/\D/g, '');
        if (numbersOnly.charAt(0) === '1') {
            numbersOnly = numbersOnly.substr(1);
        }

        if (numbersOnly.length !== 10) {
            contact.georgia.phone = null;
            return contact;
        }

        const georgia = { ...contact.georgia, phone: numbersOnly };
        return { ...contact, georgia };
    }

    transformPhone(contact) {
        // not all users have a TXTPhone or a Mobile Phone. If we have neither, use 'Phone'
        if (has(contact, 'georgia.phone') && contact.georgia.phone !== null && contact.georgia.phone !== '') {
            return contact;
        }

        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Phone';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.phone = null;
            return contact;
        }

        let numbersOnly = attribute.value.replace(/\D/g, '');
        if (numbersOnly.charAt(0) === '1') {
            numbersOnly = numbersOnly.substr(1);
        }

        if (numbersOnly.length !== 10) {
            contact.georgia.phone = null;
            return contact;
        }

        const georgia = { ...contact.georgia, phone: numbersOnly };
        return { ...contact, georgia };
    }

    transformTXTOptOut(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Text Message Opt Out';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.textSetting = { ...contact.georgia.textSetting, canText: true };
            return contact;
        }

        const canText = attribute.value !== 'Y';
        const georgia = { ...contact.georgia };
        georgia.textSetting = { ...georgia.textSetting, canText };
        return { ...contact, georgia };
    }

    transformAddressLine1(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Address Line 1';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, address1: null };
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

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, address2: null };
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

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, address3: null };
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

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, city: null };
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

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, state: null };
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

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, zip: null };
            return contact;
        }

        let zip = attribute.value;
        if (zip.length > 5) {
            zip = zip.substr(0, 5);
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, zip };
        return { ...contact, georgia };
    }

    transformCounty(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'County';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, county: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, county: attribute.value };
        return { ...contact, georgia };
    }

    transformCountry(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Country';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.location = { ...contact.georgia.location, country: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.location = { ...georgia.location, country: attribute.value };
        return { ...contact, georgia };
    }

    transformStudentStatusCategory(contact) {
        const allowedValues = [
            'Admit',
            'Admit: Withdrawn',
            'Applicant: Compconste',
            'Applicant: Denied',
            'Applicant: Incompconste',
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
            'Unknown',
        ];

        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Student Status Category';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.application = { ...contact.georgia.application, status: null };
            return contact;
        }


        const georgia = { ...contact.georgia };

        if (attribute.value === 'Confirmed') {
            georgia.intent = { ...georgia.intent, intendsToEnroll: true };
        } else if (attribute.value === 'Admit') {
            georgia.intent = { ...georgia.intent, intendsToEnroll: false };
        }

        const statusCategory = attribute.value;
        if (indexOf(allowedValues, statusCategory) !== -1) {
            georgia.application = { ...georgia.application, status: statusCategory };
        } else {
            georgia.application = { ...georgia.application, status: null };
        }

        return { ...contact, georgia };
    }

    transformStudentStatus(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Student Status';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.application = { ...contact.georgia.application, statusExtended: '' };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.application = { ...georgia.application, statusExtended: attribute.value };
        return { ...contact, georgia };
    }

    transformStudentType(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Student Type';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, studentType: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, studentType: attribute.value };
        return { ...contact, georgia };
    }

    transformFinAidOutstanding(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FinAid_Outstanding';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, finAidCompconste: null };
            return contact;
        }

        const value = attribute.value !== 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, finAidCompconste: value };
        return { ...contact, georgia };
    }

    transformFinancialAidOffered(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FinancialAidOffered';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, offered: false };
            return contact;
        }

        const value = attribute.value === 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, offered: value };
        return { ...contact, georgia };
    }

    transformFinAidInterest(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FinancialAidInterest';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, finAidInterest: false };
            return contact;
        }

        const value = attribute.value === 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, finAidInterest: value };
        return { ...contact, georgia };
    }

    transformFAFSAReceived(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FAFSA_Received';
        });

        if (!attribute) {
            contact.georgia.finAid = { ...contact.georgia.finAid, fafsaReceived: false };
            return contact;
        }

        const value = attribute.value === 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, fafsaReceived: value };
        return { ...contact, georgia };
    }

    transformScholarshipAwarded(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Scholarship_Awarded';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, scholarshipAwarded: false };
            return contact;
        }

        const value = attribute.value === 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, scholarshipAwarded: value };
        return { ...contact, georgia };
    }

    transformScholarshipAccepted(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Scholarship_Accepted';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, scholarshipAccepted: false };
            return contact;
        }

        const value = attribute.value === 'Y';
        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, scholarshipAccepted: value };
        return { ...contact, georgia };
    }

    transformHousingPreference(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Housing Preference';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.housing = { ...contact.georgia.housing, onCampus: null };
            return contact;
        }

        const value = attribute.value === 'On Campus';
        const georgia = { ...contact.georgia };
        georgia.housing = { ...georgia.housing, onCampus: value };
        return { ...contact, georgia };
    }

    transformHousingDepositDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Housing_Deposit_Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.housing = {
                ...contact.georgia.housing,
                depositDate: null,
                depositPaid: null,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.housing = { ...georgia.housing, depositDate: moment(new Date(attribute.value)).format('MM/DD/YY'), depositPaid: true };
        return { ...contact, georgia };
    }

    transformResidency(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Residency';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.residency = null;
            return contact;
        }

        let residencyValue = '';

        switch (attribute.value) {
            case 'R':
                residencyValue = 'resident';
                break;
            case 'N':
                residencyValue = 'non-resident';
                break;
            case 'G':
                residencyValue = 'green card needed';
                break;
            case 'Q':
                residencyValue = 'residency in question';
                break;
            case 0:
                residencyValue = 'not yet determined';
                break;
            default:
                // no default case
        }

        const georgia = { ...contact.georgia, residency: residencyValue };
        return { ...contact, georgia };
    }

    transformInceptRegistrationDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept Registration Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.orientation = {
                ...contact.georgia.orientation,
                registeredDate: null,
                needsToRsvp: null,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        const needsToRSVP = attribute.value === null;
        georgia.orientation = { ...georgia.orientation, registeredDate: moment(new Date(attribute.value)).format('MM/DD/YY'), needsToRsvp: needsToRSVP };
        return { ...contact, georgia };
    }

    transformInceptAttended(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept_Attended';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.orientation = { ...contact.georgia.orientation, attended: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        const value = attribute.value === 'Y';
        georgia.orientation = { ...georgia.orientation, attended: value };
        return { ...contact, georgia };
    }

    transformInceptAttendedDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Incept Attended Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.orientation = { ...contact.georgia.orientation, attendedDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.orientation = { ...georgia.orientation, attendedDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformIntentReceivedDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Intent Received Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.intent = { ...contact.georgia.intent, intentReceivedDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.intent = { ...georgia.intent };

        georgia.intent.intentReceivedDate = moment(new Date(attribute.value)).format('MM/DD/YY');
        return { ...contact, georgia };
    }

    transformLPVerified(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'LP_Verified';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, citizenVerified: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile };

        georgia.profile.citizenVerified = true;
        return { ...contact, georgia };
    }

    transformImmunizationHold(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'ImmunizationHold';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, immunizationHold: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile };

        georgia.profile.immunizationHold = true;
        return { ...contact, georgia };
    }

    transformReceivedHSTranscript(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Received_Final_HS_Transcript';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.application = {
                ...contact.georgia.application,
                receivedHSTranscript: false,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.application = { ...georgia.application };

        georgia.application.receivedHSTranscript = true;
        return { ...contact, georgia };
    }

    transformEmergencyContactHold(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'EmergencyContactHold';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, emergencyContactHold: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile };

        georgia.profile.emergencyContactHold = true;
        return { ...contact, georgia };
    }

    transformAdmitHubHonorsProspect(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'AdmitHub_Honors_Prospect';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, honorsProspect: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile };

        georgia.profile.honorsProspect = true;
        return { ...contact, georgia };
    }

    transformHonors(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Honors';
        });

        if (!attribute || attribute.value === '' || attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, honors: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile };

        georgia.profile.honors = true;
        return { ...contact, georgia };
    }

    transformMatchDate(contact) {
        contact.georgia.matchDate = new Date();
        return contact;
    }

    transformPellAwardDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Pell Award Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, pellAwardDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, pellAwardDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformSAAppl87(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'SA_Appl_87';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.successAcademy = { ...contact.georgia.successAcademy, qualified: null };
            return contact;
        } else if (attribute.value !== '87') {
            contact.georgia.successAcademy = {
                ...contact.georgia.successAcademy,
                qualified: false,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.successAcademy = { ...georgia.successAcademy, qualified: true };
        return { ...contact, georgia };
    }

    transformSAApplReceived(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'SA_Appl_Received';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.successAcademy = {
                ...contact.georgia.successAcademy,
                appReceived: null,
            };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.successAcademy = {
                ...contact.georgia.successAcademy,
                appReceived: false,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.successAcademy = { ...georgia.successAcademy, appReceived: true };
        return { ...contact, georgia };
    }

    transformSuccessAcademy(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Success_Academy';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.successAcademy = { ...contact.georgia.successAcademy, accepted: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.successAcademy = { ...contact.georgia.successAcademy, accepted: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.successAcademy = { ...georgia.successAcademy, successAcademy: true };
        return { ...contact, georgia };
    }

    transformTuitionPaymentPlan(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Tuition_Payment_Plan';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.tuition = { ...contact.georgia.tuition, paymentPlan: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.tuition = { ...contact.georgia.tuition, paymentPlan: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.tuition = { ...georgia.tuition, paymentPlan: true };
        return { ...contact, georgia };
    }

    transformWithdrawalReason(contact) {
        const withdrawalReasonAllowedValues = [
            '10 - location - general',
            '11 - urban campus environment',
            '12 - close to home',
            '13 - far from home',
            '14 - want to be near friends',
            '15 - stay in state',
            '16 - relocating / leaving state',
            '17 - military deployment',
            '18 - appointmnt to military academy',
            '20 - size - general',
            '21 - large',
            '22 - small',
            '30 - financial - general',
            '31 - cost / expense',
            '32 - financial aid package',
            '33 - scholarship award',
            '40 - academics - general',
            '41 - strength of program/curriculum',
            '42 - academic reputation',
            '43 - degree/major availability',
            '44 - admission to desired program',
            '45 - transfer credit',
            '46 - honors program',
            '50 - atmosphere - general',
            '51 - fit',
            '52 - diversity',
            '53 - sports opportunities',
            '54 - security issues / crime rate',
            '55 - campus life & activities',
            '56 - housing',
            '57 - transportation /parking issues',
            '60 - other - general',
            '61 - first choice institution',
            '62 - parental influence',
            '63 - health reasons',
            '64 - not attending college',
            '65 - working full-time',
            '66 - staying at current school',
            '67 - application process experience',
            '68 - communication from school',
            '69 - attention from school',
            '70 - not accepted to 1st choice sch',
            '71 - relative of GSU alumni',
        ];

        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Withdrawal_Reason';
        });

        if (!attribute || attribute.value === '' || indexOf(withdrawalReasonAllowedValues, attribute.value) === -1) {
            contact.georgia = { ...contact.georgia, withdrawalReason: null };
            return contact;
        }

        const georgia = { ...contact.georgia, withdrawalReason: attribute.value };
        return { ...contact, georgia };
    }

    transformWorkstudyAwardAmount(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Workstudy Award Amount';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, workstudyAmount: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, workstudyAmount: attribute.value };
        return { ...contact, georgia };
    }

    transformWorkstudyAwardDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Workstudy Award Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, workstudyAwardDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, workstudyAwardDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformAcceptedFederalLoan(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Accepted_Federal_Loan';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, fedLoanAccepted: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = { ...contact.georgia.finAid, fedLoanAccepted: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, fedLoanAccepted: true };
        return { ...contact, georgia };
    }

    transformAidGap(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'AidGap';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, aidGap: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, aidGap: attribute.value };
        return { ...contact, georgia };
    }

    transformAppCompleteDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'App Compconste Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.application = {
                ...contact.georgia.application,
                appCompconsteDate: null,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.application = { ...georgia.application, appCompconsteDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformDecisionDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Decision Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.application = { ...contact.georgia.application, decisionDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.application = { ...georgia.application, decisionDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformDecisionPlan(contact) {
        const allowedValues = ['Early Decision', 'Regular Decision'];
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Decision Plan';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.application = { ...contact.georgia.application, decisionType: null };
            return contact;
        }
        const georgia = { ...contact.georgia };
        if (indexOf(allowedValues, attribute.value) !== -1) {
            georgia.application = { ...georgia.application, decisionType: attribute.value };
        } else {
            georgia.application = { ...georgia.application, decisionType: null };
        }
        return { ...contact, georgia };
    }

    transformFAFSAVerificationDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FAFSA_Verification_Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, fafsaVerificationFlagDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, fafsaVerificationFlagDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformFinancialAidInterest(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'FinancialAidInterest';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, finAidInterest: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = { ...contact.georgia.finAid, finAidInterest: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, finAidInterest: true };
        return { ...contact, georgia };
    }

    transformFirstGeneration(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'First Generation';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, firstGen: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.profile = { ...contact.georgia.profile, firstGen: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, firstGen: true };
        return { ...contact, georgia };
    }

    transformHighSchoolGraduationYear(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'High School Graduation Year';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, hsGradYear: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, hsGradYear: attribute.value };
        return { ...contact, georgia };
    }

    transformHighSchoolCode(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'High School Code';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, hsCode: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, hsCode: attribute.value };
        return { ...contact, georgia };
    }

    transformHopeAwardAmount(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Hope Award Amount';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.georgia = { ...contact.georgia.georgia, hopeAwardAmount: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.georgia = { ...georgia.georgia, hopeAwardAmount: attribute.value };
        return { ...contact, georgia };
    }

    transformHopeAwardDate(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Hope Award Date';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.georgia = { ...contact.georgia.georgia, hopeAwardDate: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.georgia = { ...georgia.georgia, hopeAwardDate: moment(new Date(attribute.value)).format('MM/DD/YY') };
        return { ...contact, georgia };
    }

    transformHOPGSF(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'HOPGSF';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.georgia = { ...contact.georgia.georgia, hopeGSFAppSubmitted: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.georgia = { ...contact.georgia.georgia, hopeGSFAppSubmitted: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.georgia = { ...georgia.georgia, hopeGSFAppSubmitted: true };
        return { ...contact, georgia };
    }

    transformMajorCollege(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Major College';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, intendedCollege: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, intendedCollege: attribute.value };
        return { ...contact, georgia };
    }

    transformMajorInterest(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'MajorInterest1';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.profile = { ...contact.georgia.profile, majorInterest: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.profile = { ...georgia.profile, majorInterest: attribute.value };
        return { ...contact, georgia };
    }

    transformOfferedFederalLoan(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Offered_Federal_Loan';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, fedLoanOffered: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = { ...contact.georgia.finAid, fedLoanOffered: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, fedLoanOffered: true };
        return { ...contact, georgia };
    }

    transformPellAwardAmount(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Pell Award Amount';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, pellAwardAmount: null };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, pellAwardAmount: attribute.value };
        return { ...contact, georgia };
    }

    transformMPNPerkins(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'MPN_Perkins';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, mpnPerkinsCompconste: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = { ...contact.georgia.finAid, mpnPerkinsCompconste: false };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, mpnPerkinsCompconste: true };
        return { ...contact, georgia };
    }

    transformMPNStaffordPlus(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'MPN_Stafford_Plus';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = { ...contact.georgia.finAid, mpnStaffordPlusCompconste: null };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = {
                ...contact.georgia.finAid,
                mpnStaffordPlusCompconste: false,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, mpnStaffordPlusCompconste: true };
        return { ...contact, georgia };
    }

    transformCompletedEntrLoanCounseling(contact) {
        const attribute = find(contact.attributes, (obj) => {
            return obj.mappingName === 'Completed_Entr_Loan_Counseling';
        });

        if (!attribute || attribute.value === '') {
            contact.georgia.finAid = {
                ...contact.georgia.finAid,
                entranceCounselingCompconste: null,
            };
            return contact;
        } else if (attribute && attribute.value === 'N') {
            contact.georgia.finAid = {
                ...contact.georgia.finAid,
                entranceCounselingCompconste: false,
            };
            return contact;
        }

        const georgia = { ...contact.georgia };
        georgia.finAid = { ...georgia.finAid, entranceCounselingCompconste: true };
        return { ...contact, georgia };
    }

    transformCollegeId(contact) {
        const georgia = { ...contact.georgia };
        georgia.collegeId = 'gxhRWDJLtyYhpbu3P';
        return { ...contact, georgia };
    }

    transformCollegeName(contact) {
        const georgia = { ...contact.georgia };
        georgia.collegeName = 'Georgia State';
        return { ...contact, georgia };
    }

    transformKnownUser(contact) {
        const georgia = { ...contact.georgia };
        georgia.knownUser = true;
        return { ...contact, georgia };
    }

    transformPermittedUser(contact) {
        const georgia = { ...contact.georgia };
        georgia.permittedUser = true;
        return { ...contact, georgia };
    }

    transformLastIntegrationDate(contact) {
        const georgia = { ...contact.georgia };
        georgia.lastIntegrationDate = moment(new Date()).format('MM/DD/YY');
        return { ...contact, georgia };
    }

    transformGeorgia(contact) {
        return contact.georgia;
    }
}
