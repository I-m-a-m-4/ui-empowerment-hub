
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AreaChart as ReAreaChart,
  BarChart as ReBarChart,
  PieChart as RePieChart,
  XAxis,
  YAxis,
  Area,
  Bar,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Users, MessageSquareText, GitFork } from "lucide-react";

interface AnalyticsClientProps {
  totalSubmissions: number;
  totalQuestions: number;
  totalReferrals: number;
  submissionsOverTime: { date: string; count: number }[];
  businessStageDistribution: { name: string; value: number }[];
  howHeardDistribution: { name: string; value: number }[];
  genderDistribution: { name: string; value: number }[];
  cacDistribution: { name: string; value: number }[];
  corporateAccountDistribution: { name: string; value: number }[];
}

export default function AnalyticsClient({
  totalSubmissions,
  totalQuestions,
  totalReferrals,
  submissionsOverTime,
  businessStageDistribution,
  howHeardDistribution,
  genderDistribution,
  cacDistribution,
  corporateAccountDistribution,
}: AnalyticsClientProps) {

  const chartDataFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

  // Define color palettes
  const STAGE_COLORS = ["#C21010", "#FFC107", "#2196F3", "#4CAF50", "#6A1B9A"];
  const HEARD_COLORS = ["#C21010", "#FF9800", "#FFC107", "#4CAF50", "#2196F3", "#E91E63"];
  const GENDER_COLORS = ["#2196F3", "#E91E63"];
  const CAC_COLORS = ["#4CAF50", "#FFC107", "#C21010"];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent * 100 < 5) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label, formatter }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm p-3 border rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
          <p className="text-sm font-bold mb-1">{label}</p>
          {payload.map((pld: any, index: number) => (
             <p key={index} className="text-sm" style={{ color: pld.color || pld.fill }}>
                {`${pld.name}: ${formatter ? formatter(pld.value) : pld.value}`}
             </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{totalSubmissions}</div>
                  <p className="text-xs text-muted-foreground">All-time registrations</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                  <MessageSquareText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{totalQuestions}</div>
                  <p className="text-xs text-muted-foreground">In the current survey</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                  <GitFork className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{totalReferrals}</div>
                  <p className="text-xs text-muted-foreground">Number of referred applicants</p>
              </CardContent>
          </Card>
          <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Channel</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">
                    {howHeardDistribution.sort((a,b) => b.value - a.value)[0]?.name || 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">Most popular acquisition channel</p>
              </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Chart 1: Submissions Over Time --- */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ReAreaChart
                data={submissionsOverTime}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis tickFormatter={chartDataFormatter} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#C21010"
                  fill="#C21010"
                  fillOpacity={0.3}
                  name="Submissions"
                />
              </ReAreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* --- Chart 2: Business Stage Distribution --- */}
        <Card>
          <CardHeader>
            <CardTitle>Business Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={businessStageDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={50}
                  label={renderCustomLabel}
                  labelLine={false}
                  paddingAngle={5}
                >
                  {businessStageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STAGE_COLORS[index % STAGE_COLORS.length]} stroke={""} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie data={genderDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={renderCustomLabel} labelLine={false}>
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Corporate Account</CardTitle>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie data={corporateAccountDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={renderCustomLabel} labelLine={false}>
                    {corporateAccountDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
      </div>
      
       <div className="grid grid-cols-1 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>CAC Registration Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <ReBarChart
                            data={cacDistribution}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} cursor={{fill: 'rgba(120, 120, 120, 0.1)'}}/>
                            <Bar dataKey="value" name="Submissions" radius={[4, 4, 0, 0]}>
                                {cacDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CAC_COLORS[index % CAC_COLORS.length]} />
                                ))}
                            </Bar>
                        </ReBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Acquisition Channels</CardTitle>
                    <CardDescription>How users heard about the bootcamp.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <ReBarChart
                            data={howHeardDistribution}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip content={<CustomTooltip formatter={chartDataFormatter} />} cursor={{fill: 'rgba(120, 120, 120, 0.1)'}}/>
                            <Bar dataKey="value" name="Submissions" radius={[4, 4, 0, 0]}>
                                {howHeardDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={HEARD_COLORS[index % HEARD_COLORS.length]} />
                                ))}
                            </Bar>
                        </ReBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
