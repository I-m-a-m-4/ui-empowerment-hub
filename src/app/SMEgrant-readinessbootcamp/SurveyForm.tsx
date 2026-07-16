
'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Home, Loader2 } from 'lucide-react';
import Confetti from 'react-confetti';

import type { Question, SurveyAnswers } from './types';
import QuestionCard from './QuestionCard';
import { submitSurvey } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useWindowSize } from 'react-use';

interface SurveyFormProps {
    questions: Question[];
}

const generateSchema = (questions: Question[]) => {
  const schemaShape: { [key: string]: z.ZodType<any, any, any> } = {};
  questions.forEach(q => {
    let schema: z.ZodType<any, any, any>;
    if (q.type === 'email') {
        schema = z.string().email({ message: "Please enter a valid email." });
    } else if (q.type === 'checkbox') {
        schema = z.array(z.string());
    } else if (q.type === 'tel') {
        schema = z.string().min(10, { message: "Please enter a valid phone number." });
    } else {
        schema = z.string();
    }
    
    if (q.required) {
        if (schema instanceof z.ZodString) {
            schema = schema.min(1, { message: "This field is required." });
        } else if (schema instanceof z.ZodArray) {
            schema = schema.nonempty({ message: "Please select at least one option." });
        }
    } else {
        schema = schema.optional();
    }
    schemaShape[q.name] = schema;
  });
  return z.object(schemaShape);
};

export default function SurveyForm({ questions }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { width, height } = useWindowSize();
  
  const surveySchema = generateSchema(questions);

  const methods = useForm<SurveyAnswers>({
    resolver: zodResolver(surveySchema),
    mode: 'onChange',
  });

  const { trigger, getValues } = methods;

  useEffect(() => {
    if (submitted) {
        window.location.href = 'https://wa.link/atvpx4';
    }
  }, [submitted]);

  const handleNext = async () => {
    const currentQuestion = questions[currentStep];
    const isValid = await trigger(currentQuestion.name as any);
    if (isValid && currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
        toast({
            variant: "destructive",
            title: "Oops! Something is missing.",
            description: "Please check your answers for any errors.",
        })
        return;
    }

    setIsSubmitting(true);
    const values = getValues();
    const result = await submitSurvey(values);
    setIsSubmitting(false);

    if (result.success) {
        setSubmitted(true);
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }
  };

  if (submitted) {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className="w-full text-center p-8 bg-background rounded-lg shadow-lg relative">
                <Loader2 className="mx-auto h-16 w-16 text-primary animate-spin mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Registration Successful!</h2>
                <p className="text-muted-foreground mb-8">
                    Redirecting you to our WhatsApp group...
                </p>
            </div>
        </div>
    )
  }

  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLast = currentStep === questions.length - 1;
  const isFirst = currentStep === 0;

  return (
    <FormProvider {...methods}>
      <motion.div className="w-full h-full flex flex-col pb-20 sm:pb-0">
        <div className="p-4 sm:p-0 sm:mb-4">
            <Progress value={progress} className="w-full h-2 bg-secondary/50" />
            <p className="text-center text-sm mt-2 text-foreground/70">
                Question {currentStep + 1} of {questions.length}
            </p>
        </div>
        <div className="flex-grow flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
                <QuestionCard
                    key={currentStep}
                    question={questions[currentStep]}
                />
            </AnimatePresence>
        </div>
        
         <div className="flex items-center justify-between mt-auto pt-4 sm:pt-4 p-4 sm:p-0 bg-transparent fixed bottom-0 left-0 w-full sm:static">
            <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={isFirst}
                className="text-foreground hover:bg-muted disabled:opacity-50"
                aria-label="Previous question"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Prev
            </Button>
            
            {isLast ? (
                <Button
                    size="lg"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto"
                    aria-label="Submit survey"
                >
                    {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Check className="mr-2 h-4 w-4" />
                    )}
                    Submit
                </Button>
            ) : (
                <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-1/2 sm:w-auto"
                    variant="default"
                    aria-label="Next question"
                >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
      </div>
      </motion.div>
    </FormProvider>
  );
}
