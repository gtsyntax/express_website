var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'email@gmail.com',
			pass: 'password'
		}
	});

	var mailOptions = {
		from: 'First Name <email@gmail.com>',
		to: 'email@gmail.com',
		subject: 'Website Submission',
		text: 'New Submission...Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
		html: '<p>New Submission..</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;