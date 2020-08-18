import { _, orderBy } from 'lodash';

let instance = null;

class CountryCheck {
    static getInstance() {
        if (!instance) {
          instance = new CountryCheck();
        }
        return instance;
      }

    constructor() {    
        this.countryCodes = [];
      }

    addCountryCode(iso2, dialCode, priority) {
        if (!(dialCode in this.countryCodes)) {
            this.countryCodes[dialCode] = [];
        }

        const index = priority || 0;
        this.countryCodes[dialCode][index] = iso2;
    }

    getAll() {
        if (!this.countries) {
            this.countries = orderBy(
            this.countriesData || require('resources/countries.json'),
            ['name'],
            ['asc'],
            );
        }

        return this.countries;
    }

    getCountryCodes() {
        if (!this.countryCodes.length) {
            this.getAll().map((country) => {
            this.addCountryCode(country.iso2, country.dialCode, country.priority);
            if (country.areaCodes) {
                country.areaCodes.map((areaCode) => {
                this.addCountryCode(country.iso2, country.dialCode + areaCode);
                });
            }
            });
        }
        return this.countryCodes;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getDialCode(number) {
        let dialCode = '';
        // only interested in international numbers (starting with a plus)
        if (number.charAt(0) === '+') {
            let numericChars = '';
            // iterate over chars
            for (let i = 0; i < number.length; i++) {
            const c = number.charAt(i);
            // if char is number
            if (this.isNumeric(c)) {
                numericChars += c;
                // if current numericChars make a valid dial code
                // if (this.countryCodes[numericChars]) {
                if (this.getCountryCodes()[numericChars]) {
                // store the actual raw string (useful for matching later)
                dialCode = number.substr(0, i + 1);
                }
                // longest dial code is 4 chars
                if (numericChars.length === 4) {
                break;
                }
            }
            }
        }
        return dialCode;
    }

    getCountryCodeOfNumber = (number) => {
        const dialCode = this.getDialCode(number);
        const numeric = this.getNumeric(dialCode);
        const countryCode = this.getCountryCodes()[numeric];

        // countryCode[0] can be null -> get first element that is not null
        if (countryCode) {
            return _.first(countryCode.filter(iso2 => iso2));
        }

        return '';
    }

    getNumeric(str) {
        return str.replace(/\D/g, '');
    }
}

export default CountryCheck.getInstance();