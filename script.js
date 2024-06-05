const cardNo = document.querySelector('.card-no'),
	cardName = document.querySelector('.card-name'),
	cardExp = document.querySelector('.card-exp'),
	cardCvc = document.querySelector('.back-text'),
	Name = document.getElementById('name'),
	number = document.getElementById('number'),
	cvc = document.getElementById('cvc'),
	expMonth = document.getElementById('exp1'),
	expYear = document.getElementById('exp2'),
	btn = document.querySelectorAll('.btn'),
	form = document.querySelector('.form'),
	complete = document.querySelector('.complete');

let textPattern,
	numPattern,
	numVal,
	arraySlice,
	hasName,
	hasCardNo,
	hasExpDate,
	hasCvc;

const fillCard = () => {
	textPattern = /[a-z]/gi;
	numPattern = /[0-9]/g;

	numVal = number.value;
	arraySlice = numVal.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ');

	Name.value.match(textPattern)
		? ((cardName.textContent = Name.value),
		  (Name.nextElementSibling.textContent = ` `),
		  (hasName = true))
		: complete.classList.contains('show')
		? ((Name.nextElementSibling.textContent = ` `),
		  (cardName.textContent = 'Jane Appleseed'),
		  (hasName = true))
		: !Name.value
		? ((cardName.textContent = 'Jane Appleseed'),
		  (Name.nextElementSibling.textContent = `Can't be blank`),
		  (hasName = false))
		: ((cardName.textContent = 'Jane Appleseed'),
		  (Name.nextElementSibling.textContent = 'Name should be alphabets alone'),
		  (hasName = false));

	number.value.match(numPattern) && number.value.length === 16
		? ((cardNo.textContent = arraySlice),
		  (number.nextElementSibling.textContent = ` `),
		  (hasCardNo = true))
		: complete.classList.contains('show')
		? ((number.nextElementSibling.textContent = ` `),
		  (cardNo.textContent = `0000 0000 0000 0000`),
		  (hasCardNo = true))
		: !number.value
		? ((cardNo.textContent = `0000 0000 0000 0000`),
		  (number.nextElementSibling.textContent = `Can't be blank`),
		  (hasCardNo = false))
		: number.value.length < 16
		? ((cardNo.textContent = arraySlice),
		  (number.nextElementSibling.textContent = `Number is not complete`),
		  (hasCardNo = false))
		: number.value.length > 16
		? ((cardNo.textContent = arraySlice),
		  (number.nextElementSibling.textContent = `Number exceeds `),
		  (hasCardNo = false))
		: ((cardNo.textContent = arraySlice),
		  (number.nextElementSibling.textContent = 'Wrong format, numbers only'),
		  (hasCardNo = false));

	expMonth.value.match(numPattern) &&
	expMonth.value.length <= 2 &&
	expYear.value.match(numPattern) &&
	expYear.value.length <= 2
		? expMonth.value.length < 2 && expYear.value.length < 2
			? ((cardExp.textContent =
					'0' + expMonth.value + '/' + '0' + expYear.value),
			  (hasExpDate = true))
			: expMonth.value.length < 2
			? ((cardExp.textContent = '0' + expMonth.value + '/' + expYear.value),
			  (hasExpDate = true))
			: expYear.value.length < 2
			? ((cardExp.textContent = expMonth.value + '/' + '0' + expYear.value),
			  (hasExpDate = true))
			: ((cardExp.textContent = expMonth.value + '/' + expYear.value),
			  (expMonth.parentElement.parentElement.nextElementSibling.textContent = ` `),
			  (hasExpDate = true))
		: complete.classList.contains('show')
		? ((expMonth.parentElement.parentElement.nextElementSibling.textContent = ` `),
		  (cardExp.textContent = '00' + '/' + '00'),
		  (hasExpDate = true))
		: !expMonth.value || !expYear.value
		? ((cardExp.textContent = '00' + '/' + '00'),
		  (expMonth.parentElement.parentElement.nextElementSibling.textContent = `Can't be blank`),
		  (hasExpDate = false))
		: !expMonth.value
		? ((cardExp.textContent = '00' + '/' + expYear.value),
		  (expMonth.parentElement.parentElement.nextElementSibling.textContent = `Can't be blank`),
		  (hasExpDate = false))
		: !expYear.value
		? ((cardExp.textContent = expMonth.value + '/' + '00'),
		  (expYear.parentElement.parentElement.nextElementSibling.textContent = `Can't be blank`),
		  (hasExpDate = false))
		: expMonth.value.length > 2 || expYear.value.length > 2
		? expMonth.value.length > 2
			? (cardExp.textContent = '00' + '/' + expYear.value)
			: expYear.value.length > 2
			? (cardExp.textContent = expMonth.value + '/' + '00')
			: ((cardExp.textContent = '00' + '/' + '00'),
			  (expMonth.parentElement.parentElement.nextElementSibling.textContent = `Number exceeds`),
			  (hasExpDate = false))
		: ((expMonth.parentElement.parentElement.nextElementSibling.textContent =
				'Wrong format, numbers only'),
		  (hasExpDate = false));

	cvc.value.match(numPattern) && cvc.value.length === 3
		? ((cardCvc.textContent = cvc.value),
		  (cvc.nextElementSibling.textContent = ` `),
		  (hasCvc = true))
		: complete.classList.contains('show')
		? ((cvc.nextElementSibling.textContent = ` `),
		  (cardCvc.textContent = '000'),
		  (hasCvc = true))
		: !cvc.value
		? ((cvc.nextElementSibling.textContent = `Can't be blank`),
		  (cardCvc.textContent = '000'),
		  (hasCvc = false))
		: cvc.value.length < 3
		? ((cvc.nextElementSibling.textContent = `Number is not complete`),
		  (cardCvc.textContent = '000'),
		  (hasCvc = false))
		: cvc.value.length > 3
		? ((cvc.nextElementSibling.textContent = `Number exceeds `),
		  (cardCvc.textContent = '000'),
		  (hasCvc = false))
		: ((cvc.nextElementSibling.textContent = 'Wrong format, numbers only'),
		  (cardCvc.textContent = '000'),
		  (hasCvc = false));

	hasName && hasCardNo && hasExpDate && hasCvc
		? (form.classList.toggle('hide'), complete.classList.toggle('show'))
		: '';
};

for (let i = 0; i < btn.length; i++) {
	btn[i].addEventListener('click', fillCard);
}
