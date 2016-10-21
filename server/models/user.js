var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
	name: {
		type: String,
		minlength: [2, 'Your name must be at least two letters long'],
		required: [true, 'Please enter a name'],
		unique: true,
		uniqueCaseInsensitive: true,
		trim: true
	},
	buckets: [{
		type: Schema.Types.ObjectId,
		ref: 'Bucket'
	}]
});

UserSchema.plugin(uniqueValidator, {message: 'Someone already took your name! Please enter a new one.'});

var User = mongoose.model('User', UserSchema);