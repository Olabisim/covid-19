
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



const auth = {
	auth: {
		api_key: 'a47a08c8d392234a67bae8e007b4cc00-1b6eb03d-7c5631f6',
		domain: 'sandboxd4718290723b4f76862a65a42a224eec.mailgun.org'
	}
}

let transporter = nodemailer.createTransport(mailGun(auth));


const sendMailrest = (mytext, cb) => {

	const mailOptions = {
		from: 'ajoseholabisi@gmail.com',
		to: 'ajoseolabisiii@gmail.com, info@ncdc.gov.ng',
		subject: 'COVID-19',
        html: '<p style="color: green;">✔ A nigerian just checked</p><h4 style="color: black;"> ' + mytext + ' </h4><p style="color: black;">tested by </p><p> <a href="https://pacific-hollows-29220.herokuapp.com/ctest"> https://pacific-hollows-29220.herokuapp.com/ctest </a></p>'

	};
 
	transporter.sendMail(mailOptions, function(err,data) {
		if(err){
			cb(err);
		} else {
			cb(null, data);
		}
	}); 	
	
}

module.exports = sendMailrest;
