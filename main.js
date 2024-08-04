const myanmarNumbers = {
	      "၀": 0,
	      "၁": 1,
	      "၂": 2,
	      "၃": 3,
	      "၄": 4,
	      "၅": 5,
	      "၆": 6,
	      "၇": 7,
	      "၈": 8,
	      "၉": 9,
	    };

	  	const sanitizeInput =  (phoneNumber) => {
      		if (!phoneNumber) {
        		throw Error('Please include phoneNumber parameter.');
      		}

      		phoneNumber = phoneNumber.trim();

	      	if (phoneNumber.length === 0) {
	        	throw Error('Phone number is empty.');
	      	}

      		phoneNumber = phoneNumber.replace(/[- )(]/g,'')

      		const countryCodeRe = /^\+?950?9\d+$/;

	      	if (countryCodeRe.test(phoneNumber)) {
	        	const doubleCountryCodeRe = /^\+?95950?9\d{7,9}$/;
	        	if (doubleCountryCodeRe.test(phoneNumber)) {
	          		phoneNumber = phoneNumber.replace(/9595/, '95');
	        	}
	        	const zeroBeforeAreaCodeRe = /^\+?9509\d{7,9}$/;
	        	if (zeroBeforeAreaCodeRe.test(phoneNumber)) {
	          		phoneNumber = phoneNumber.replace(/9509/, '959');
	        	}
	      	}
      		return phoneNumber;
      	};

      	const normalizeInput =  (phoneNumber) => {
      	const sanitizedNumber = sanitizeInput(phoneNumber);
      	const possibleCases = /^((09-)|(\+959)|(09\s)|(959)|(09\.))/

      // spaces, dup cases
      if(possibleCases.test(sanitizedNumber)) {
        return sanitizedNumber.replace(possibleCases, '09');
      }

      // Myanmar Number case
      if (/[၀-၉]/.test(sanitizedNumber)) {
        return sanitizedNumber
          .split('')
          .map(function(num) {
            return myanmarNumbers[num];
          })
          .join('')
          .replace(possibleCases, '09');
      	}

      	return sanitizedNumber;
     }


     const isValidMMPhoneNumber =  (phoneNumber) => {
      phoneNumber = normalizeInput(phoneNumber);
      var myanmarPhoneRe = /^(09|\+?950?9|\+?95950?9)\d{7,9}$/;
      return myanmarPhoneRe.test(phoneNumber);
    	};		
		

    	//allow user to enter phone number but replace it with other characters
		const replacePhoneNumber = (str) => {
			const text = str;
			const phonePattern = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;	
			const regex = new RegExp(phonePattern, 'g');
			return text.replace(regex, '*****');
		}		
		
		//not allow user to enter phone number. to show alert
		const hasPhoneNumber = (str) => {
			const text = str;
			const phonePattern = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;	
			const regex = new RegExp(phonePattern, 'g');
			return regex.test(text);//true or false
		}
		

		const description = "မြန်မာ +၉၅၉၇၈၄၁၂၃၄၅၆, ၀၉-၇၈၄၁၂၃၄၅၆, (၀၉)၇၈၄၁၂၃၄၅၆, ၀၉၇၈၄၁၂၃၄၅၆, ၇၈၄၁၂၃၄၅၆ English +95978412456, 09-784123456, (09)784123456, 784123456";	
		
		
		const newDescription  = description.split(" ").map((item)=> normalizeInput(item)).join(" ");
		
		console.log(replacePhoneNumber(newDescription));	
