import { Question } from './types';

export const questions: Question[] = [
    // SECTION A
    { name: 'fullName', label: '1. Full Name (as it should appear on your certificate)', type: 'text', required: true, placeholder: 'e.g., Abdullah Ibn Masud' },
    { name: 'email', label: '2. Email Address', type: 'email', required: true, placeholder: 'e.g., abdullah@example.com' },
    { name: 'whatsappNumber', label: '3. WhatsApp Number (for direct updates and reminders)', type: 'tel', required: true, placeholder: '+234...' },
    { name: 'gender', label: '4. Gender', type: 'radio', required: true, options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }] },
    { name: 'location', label: '5. City & Country', type: 'text', required: true, placeholder: 'e.g., Lagos, Nigeria' },
    
    // SECTION B
    { name: 'businessName', label: '6. Business Name', type: 'text', required: true, placeholder: 'e.g., Ummah Innovations' },
    {
        name: 'businessStage',
        label: '7. What stage is your business currently in?',
        type: 'radio',
        required: true,
        options: [
            { value: 'Idea Stage', label: 'Idea Stage (not yet launched)' },
            { value: 'Early Stage', label: 'Early Stage (0–2 years)' },
            { value: 'Growth Stage', label: 'Growth Stage (3–5 years)' },
            { value: 'Established Stage', label: 'Established Stage (5+ years)' },
        ],
    },
    {
        name: 'cacRegistered',
        label: '8. Is your business registered under CAC?',
        type: 'radio',
        required: true,
        options: [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'In progress', label: 'In progress' },
        ],
    },
    {
        name: 'corporateAccount',
        label: '9. Do you have a corporate bank account for your business?',
        type: 'radio',
        required: true,
        options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },
    {
        name: 'financialPartnership',
        label: '10. Are you currently in any financial partnership or equity arrangement?',
        type: 'radio',
        required: true,
        options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },

    // SECTION C
    {
        name: 'appliedForGrant',
        label: '11. Have you ever applied for a business grant?',
        type: 'radio',
        required: true,
        options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },
    {
        name: 'grantApplicationsCount',
        label: '12. If yes, how many have you applied for?',
        type: 'radio',
        required: false,
        options: [
            { value: '1-2', label: '1–2' },
            { value: '3-5', label: '3–5' },
            { value: '6 or more', label: '6 or more' },
        ],
    },
    {
        name: 'wonGrant',
        label: '13. Have you ever won a grant before?',
        type: 'radio',
        required: true,
        options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },
    {
        name: 'takenLoan',
        label: '14. Have you ever collected a business loan before?',
        type: 'radio',
        required: true,
        options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }],
    },
    {
        name: 'loanType',
        label: '15. If yes, what type of loan was it?',
        type: 'radio',
        required: false,
        options: [
            { value: 'Interest-based', label: 'Interest-based (conventional)' },
            { value: 'Non-interest', label: 'Non-interest (Islamic-compliant)' },
        ],
    },
    
    // SECTION D
    {
        name: 'onlinePresence',
        label: '16. Is your business active online on any of the following platforms?',
        type: 'checkbox',
        required: true,
        options: [
            { value: 'LinkedIn', label: 'LinkedIn' },
            { value: 'Twitter', label: 'Twitter (X)' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'Instagram', label: 'Instagram' },
            { value: 'None', label: 'None of the above' },
        ],
    },
    { name: 'activeLink', label: '17. Please share the most active link (LinkedIn or main social media page)', type: 'url', required: false, placeholder: 'https://...' },

    // SECTION E
    { name: 'webinarGoals', label: '18. What do you hope to gain from this webinar?', type: 'textarea', required: true, placeholder: 'Tell us your expectations...' },
    { name: 'fundingChallenge', label: "19. What’s your biggest challenge in getting business funding right now?", type: 'textarea', required: true, placeholder: 'Describe your main obstacle...' },
    {
        name: 'howYouHeard',
        label: '20. How did you hear about this webinar?',
        type: 'radio',
        required: true,
        options: [
            { value: 'Instagram', label: 'Instagram' },
            { value: 'WhatsApp', label: 'WhatsApp' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'Referral', label: 'Referral' },
            { value: 'Other', label: 'Other' },
        ],
    },
    
    // SECTION F
    {
        name: 'agreement',
        label: '21. By submitting this form, I understand that this webinar is free to attend and that additional mentorship, community access, and implementation support may be offered as a paid opportunity.',
        type: 'checkbox',
        required: true,
        options: [
            { value: 'I agree', label: 'I agree' },
        ],
    },
];
