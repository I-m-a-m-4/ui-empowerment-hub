
import { Question } from './type';

export const questions: Question[] = [
  // SECTION 1
  { section: 'SECTION 1: Personal & Professional Snapshot', name: 'fullName', label: 'What is your full name?', type: 'text', required: true, placeholder: 'e.g., Abdullah Ibn Masud' },
  { name: 'email', label: 'What is your email address?', type: 'email', required: true, placeholder: 'e.g., abdullah@example.com' },
  { name: 'whatsappNumber', label: 'What is your phone/WhatsApp number?', type: 'tel', required: true, placeholder: '+234...' },
  {
    name: 'businessStage',
    label: 'What stage is your business currently in?',
    type: 'radio',
    required: true,
    options: [
      { value: 'Idea stage', label: 'Idea stage' },
      { value: 'Early stage', label: 'Early stage' },
      { value: 'Growing', label: 'Growing' },
      { value: 'Scaling', label: 'Scaling' },
      { value: 'Not running a business yet', label: 'Not running a business yet' },
    ],
  },
  { name: 'industry', label: 'What industry or niche are you currently in?', type: 'text', required: true, placeholder: 'e.g., E-commerce, Tech, Education' },

  // SECTION 2
  { section: 'SECTION 2: Your Intentions & Goals', name: 'motivation', label: 'What motivated you to join Page to Purpose™?', type: 'textarea', required: true, placeholder: 'Tell us your expectations...' },
  {
    name: 'growthAreas',
    label: 'What three areas are you most seeking growth in right now?',
    type: 'checkbox',
    required: true,
    options: [
      { value: 'Personal mastery', label: 'Personal mastery' },
      { value: 'Spiritual development', label: 'Spiritual development' },
      { value: 'Business/leadership', label: 'Business/leadership' },
      { value: 'Productivity', label: 'Productivity' },
      { value: 'Mindset', label: 'Mindset' },
      { value: 'Other', label: 'Other (please specify)' },
    ],
  },
  { name: 'transformationGoal', label: 'What transformation do you hope to experience in the next 3–6 months?', type: 'textarea', required: true, placeholder: 'Describe your desired change...' },
  
  // SECTION 3
  {
    section: 'SECTION 3: Reading Habits & Learning Style',
    name: 'readingFrequency',
    label: 'How often do you currently read?',
    type: 'radio',
    required: true,
    options: [
      { value: 'Daily', label: 'Daily' },
      { value: 'A few times weekly', label: 'A few times weekly' },
      { value: 'Occasionally', label: 'Occasionally' },
      { value: 'Rarely', label: 'Rarely' },
    ],
  },
  {
    name: 'preferredFormat',
    label: 'What format do you prefer?',
    type: 'radio',
    required: true,
    options: [
      { value: 'Physical books', label: 'Physical books' },
      { value: 'E-books', label: 'E-books' },
      { value: 'Audiobooks', label: 'Audiobooks' },
    ],
  },
  { name: 'readingChallenges', label: 'What challenges do you usually face when trying to read and implement what you learn?', type: 'textarea', required: true, placeholder: 'e.g., Lack of time, distraction...' },

  // SECTION 4
  { section: 'SECTION 4: Faith & Application', name: 'islamicInterpretationImportance', label: 'How important is it to you that book lessons are interpreted through Qur’ān and Sunnah?', type: 'textarea', required: true, placeholder: 'e.g., Very important because...' },
  { name: 'islamicValues', label: 'What specific Islamic values do you want reflected in your personal or business growth?', type: 'textarea', required: true, placeholder: 'e.g., Ihsan, Amanah...' },
  { name: 'islamicDiscussions', label: 'Are you comfortable participating in reflective discussions rooted in Islamic principles?', type: 'radio', required: true, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },

  // SECTION 5
  { section: 'SECTION 5: Commitment & Engagement', name: 'commitOneBookMonthly', label: 'Can you commit to reading one book per month?', type: 'radio', required: true, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
  { name: 'accountabilityPartner', label: 'Would you like to be paired with a partner for accountability?', type: 'radio', required: true, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
  { name: 'implementationChallenges', label: 'Are you open to participating in implementation challenges each month?', type: 'radio', required: true, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
  { name: 'willingnessToApply', label: 'How would you rate your willingness to apply what you learn (1–10)?', type: 'number', required: true, placeholder: '1-10' },

  // SECTION 6
  {
    section: 'SECTION 6: Future Alignment',
    name: 'futureGrowthAreas',
    label: 'Which of these categories do you want to grow the most in?',
    type: 'radio',
    required: true,
    options: [
      { value: 'Personal Mastery & Self-Development', label: 'Personal Mastery & Self-Development' },
      { value: 'Spiritual Alignment & Character Formation', label: 'Spiritual Alignment & Character Formation' },
      { value: 'Business, Leadership & Professional Excellence', label: 'Business, Leadership & Professional Excellence' },
    ],
  },
  { name: 'bookSuggestions', label: 'Are there specific books or authors you would like us to consider in future cycles?', type: 'textarea', required: false, placeholder: 'e.g., "The 7 Habits..." by Stephen Covey' },
];
