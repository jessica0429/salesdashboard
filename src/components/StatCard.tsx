import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
    variant: 'today' | 'active' | 'followup'
    label: string
    count: number
    sub: string
    icon: string
    onClick: () => void
}

const variantStyles = {
    today: {
        wrapper: 'stat-card-today',
        labelColor: 'text-[#3B82F6]',
    },
    active: {
        wrapper: 'stat-card-active',
        labelColor: 'text-[#10B981]',
    },
    followup: {
        wrapper: 'stat-card-followup',
        labelColor: 'text-[#F59E0B]',
    },
}

export function StatCard({ variant, label, count, sub, icon, onClick }: StatCardProps) {
    const styles = variantStyles[variant]

    return (
        <Card
            className={`relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${styles.wrapper}`}
            onClick={onClick}
        >
            <CardContent className="p-[22px_24px]">
                <div className={`text-[14px] font-semibold tracking-wide uppercase mb-2.5 ${styles.labelColor}`}>
                    {label}
                </div>
                <div className="text-[42px] font-extrabold leading-none mb-1.5">
                    {count}
                </div>
                <div className="text-sm text-gray-500">{sub}</div>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[36px] opacity-[0.12] pointer-events-none">
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}
