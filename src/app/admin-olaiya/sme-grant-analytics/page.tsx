
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AnalyticsClient from './analytics-client';
import { questions } from '@/app/SMEgrant-readinessbootcamp/questions';
import type { SurveyAnswers } from '@/app/SMEgrant-readinessbootcamp/types';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

type Registration = SurveyAnswers & {
  id: string;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

// Helper function to count occurrences of each option in an array of strings
function countOccurrences(arr: (string | string[])[]) {
    const counts: { [key: string]: number } = {};
    arr.flat().forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

async function getAnalyticsData() {
    const regsRef = collection(db, 'smeGrantBootcampRegistrations');
    const q = query(regsRef, orderBy('submittedAt', 'asc'));
    const querySnapshot = await getDocs(q);
    const registrations = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Registration));

    // 1. Total Submissions
    const totalSubmissions = registrations.length;

    // 2. Total Questions
    const totalQuestions = questions.length;
    
    // 3. Submissions Over Time
    const submissionsByDate: { [key: string]: number } = {};
    registrations.forEach(reg => {
        if (reg.submittedAt) {
            const date = format(new Date(reg.submittedAt.seconds * 1000), 'MMM d');
            submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
        }
    });
    const submissionsOverTime = Object.entries(submissionsByDate).map(([date, count]) => ({ date, count }));

    // 4. Business Stage Distribution
    const businessStages = registrations.map(reg => reg.businessStage).filter(Boolean);
    const businessStageDistribution = countOccurrences(businessStages);

    // 5. How users heard about the survey
    const sources = registrations.map(reg => reg.howYouHeard).filter(Boolean);
    const howHeardDistribution = countOccurrences(sources);
    
    // 6. Calculate total referrals
    const totalReferrals = registrations.filter(reg => reg.howYouHeard === 'Referral').length;

    // 7. Gender Distribution
    const genders = registrations.map(reg => reg.gender).filter(Boolean);
    const genderDistribution = countOccurrences(genders);
    
    // 8. CAC Distribution
    const cacStatus = registrations.map(reg => reg.cacRegistered).filter(Boolean);
    const cacDistribution = countOccurrences(cacStatus);

    // 9. Corporate Account Distribution
    const corporateAccounts = registrations.map(reg => reg.corporateAccount).filter(Boolean);
    const corporateAccountDistribution = countOccurrences(corporateAccounts);

    return {
        totalSubmissions,
        totalQuestions,
        totalReferrals,
        submissionsOverTime,
        businessStageDistribution,
        howHeardDistribution,
        genderDistribution,
        cacDistribution,
        corporateAccountDistribution,
    };
}


export default async function SmeGrantAnalyticsPage() {
    const { 
        totalSubmissions, 
        totalQuestions,
        totalReferrals,
        submissionsOverTime, 
        businessStageDistribution, 
        howHeardDistribution,
        genderDistribution,
        cacDistribution,
        corporateAccountDistribution,
    } = await getAnalyticsData();
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">SME Grant Analytics</h1>
                <p className="text-muted-foreground">Visualizing registration data for the SME Grant Readiness Bootcamp.</p>
            </div>
            <AnalyticsClient
                totalSubmissions={totalSubmissions}
                totalQuestions={totalQuestions}
                totalReferrals={totalReferrals}
                submissionsOverTime={submissionsOverTime}
                businessStageDistribution={businessStageDistribution}
                howHeardDistribution={howHeardDistribution}
                genderDistribution={genderDistribution}
                cacDistribution={cacDistribution}
                corporateAccountDistribution={corporateAccountDistribution}
            />
        </div>
    );
}
