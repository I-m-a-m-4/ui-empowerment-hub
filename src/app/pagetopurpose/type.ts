
export interface Question {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'radio' | 'checkbox' | 'number';
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    section?: string;
}

export type SurveyAnswers = {
    [key: string]: string | string[];
};
