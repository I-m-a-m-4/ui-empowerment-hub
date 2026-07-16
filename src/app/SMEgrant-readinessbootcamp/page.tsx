
import Logo from './Logo';
import SurveyForm from './SurveyForm';
import { questions } from './questions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SME Grant Readiness Webinar Registration | Scale with Olaiya',
    description: 'Register for the free webinar on How Muslim Entrepreneurs Can Qualify for SME Grants Without Taking Loans.',
};

export default async function SMEGrantPage() {

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-4 bg-[#F8F8F8] dark:bg-[#0a0a0a] overflow-hidden">
      <div className="w-full max-w-2xl mx-auto z-10 h-full flex flex-col justify-center sm:h-auto sm:max-h-[90vh]">
        <header className="text-center pt-8 pb-4 sm:pt-0 sm:pb-8">
            <Logo />
        </header>
        <div className="flex-grow flex items-center px-4 sm:px-0 min-h-0 sm:flex-grow-0">
             <SurveyForm questions={questions} />
        </div>
      </div>
       <footer className="hidden sm:block absolute bottom-4 text-center text-sm text-foreground/50 z-10">
        <p>&copy; {new Date().getFullYear()} Scale with Olaiya. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
