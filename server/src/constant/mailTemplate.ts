const date = new Date().toLocaleString()


export const signedMail = (receiver: string) => ({
    receiverEmail: receiver,
    subject: 'Application has been signed',
    content: 'Your application has been signed by College Dean.',
    date: date
})

export const mailToNextReviewer = (receiver: string, user: string) => ({
    receiverEmail: receiver,
    subject: 'An application has been arrived',
    content: 'An application is arrived by ' + user + '.',
    date: date
})

export const approveMail = (receiver: string, sender: string) => ({
    receiverEmail: receiver,
    subject: 'Your application has been approved',
    content: 'Congratulations! Your application has been approved by ' + sender + ' and went to the next reviewer.',
    date: date
})

export const denyMail = (receiver: string) => ({
    receiverEmail: receiver,
    subject: 'Your application has been rejected',
    content: 'Sorry, your application has been rejected.',
    date: date
})

export const acceptedMail = (receiver: string) => ({
    receiverEmail: receiver,
    subject: 'Finally accepted your application',
    content: 'Your application has been accepted finally.',
    date: date
})