
'use client';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import type { Question } from './types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
    question: Question;
}

const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export default function QuestionCard({ question }: QuestionCardProps) {
    const { register, formState: { errors }, getValues, setValue } = useFormContext();
    const error = errors[question.name];

    const renderInput = () => {
        const commonProps = {
            ...register(question.name),
        };

        switch (question.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
                return (
                    <Input 
                        type={question.type} 
                        placeholder={question.placeholder || 'Type your answer here...'} 
                        {...commonProps} 
                        className="input-bottom-border h-12 text-xl sm:text-2xl focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                )
            case 'textarea':
                 return (
                    <Textarea 
                        placeholder={question.placeholder || 'Type your answer here...'} 
                        {...commonProps} 
                        rows={5} 
                        className="bg-transparent border border-border rounded-lg text-lg p-4"
                    />
                )
            case 'radio':
                return (
                    <RadioGroup
                        onValueChange={(value) => setValue(question.name, value)}
                        defaultValue={getValues(question.name)}
                        className="space-y-3"
                    >
                        {question.options?.map(option => {
                             const isSelected = getValues(question.name) === option.value;
                            return (
                            <Label 
                                key={option.value} 
                                htmlFor={`${question.name}-${option.value}`}
                                className={cn(
                                    "glass-card flex items-center space-x-4 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                    isSelected ? "border-primary scale-[1.02] shadow-lg bg-primary/20" : "border-transparent"
                                )}
                            >
                                <RadioGroupItem value={option.value} id={`${question.name}-${option.value}`} />
                                <span className="font-normal flex-grow">{option.label}</span>
                            </Label>
                        )})}
                    </RadioGroup>
                );
            case 'checkbox':
                return (
                    <div className="space-y-3">
                        {question.options?.map(option => {
                            const currentValues = getValues(question.name) || [];
                            const isSelected = currentValues.includes(option.value);
                            return (
                                 <Label 
                                    key={option.value} 
                                    htmlFor={`${question.name}-${option.value}`}
                                    className={cn(
                                        "glass-card flex items-center space-x-4 rounded-lg p-4 cursor-pointer transition-all duration-300",
                                        isSelected ? "border-primary scale-[1.02] shadow-lg bg-primary/20" : "border-transparent"
                                    )}
                                >
                                    <Checkbox
                                        id={`${question.name}-${option.value}`}
                                        onCheckedChange={(checked) => {
                                            const current = getValues(question.name) || [];
                                            const newValues = checked
                                                ? [...current, option.value]
                                                : current.filter((v: string) => v !== option.value);
                                            setValue(question.name, newValues, { shouldValidate: true });
                                        }}
                                        checked={isSelected}
                                    />
                                    <span className="font-normal flex-grow">{option.label}</span>
                                </Label>
                            )
                        })}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
        >
            <div className="p-4 sm:p-8 rounded-lg w-full">
                <label className="text-xl sm:text-2xl font-medium block mb-6 text-foreground">
                    {question.label}
                    {question.required && <span className="text-primary ml-1">*</span>}
                </label>
                {renderInput()}
                {error && <p className="text-sm font-medium text-destructive mt-2">{error.message as string}</p>}
            </div>
        </motion.div>
    );
}
