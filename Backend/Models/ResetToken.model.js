import mongoose from 'mongoose';
const { Schema } = mongoose;

const passwordResetTokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // Token will automatically delete after 5 minutes
    },
    clicks: {
        type: Number,
        default: 0
    },
    maxClicks: {
        type: Number,
        default: 2
    }
});

const ResetToken = mongoose.model('ResetToken', passwordResetTokenSchema);

export { ResetToken };
