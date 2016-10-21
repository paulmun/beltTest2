var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BucketSchema = new Schema({
	title: {
		type: String,
		minlength: [5, 'Your title must be at least five characters long'],
		required: [true, 'Please enter a title'],
		trim: true
	},

	description: {
		type: String,
		minlength: [10, 'Your description must be at least ten characters long'],
		required: [true, 'Please enter a description'],
		trim: true
	},

	tagged:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	user:{
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	created_at: {
		type: Date,
		required: true,
		default: new Date
	},

	checked: {
		type: Boolean,
		required: true,
		default: false
	}
});


var Bucket = mongoose.model('Bucket', BucketSchema);