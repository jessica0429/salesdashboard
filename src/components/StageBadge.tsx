import { type Stage } from '@/data/meetings'
import { Badge } from '@/components/ui/badge'

interface StageBadgeProps {
    stage: Stage
    label: string
}

const dotColors: Record<Stage, string> = {
    new: 'bg-[#3B82F6]',
    progress: 'bg-[#10B981] animate-[pulse-dot_1.5s_infinite]',
    followup: 'bg-[#D97706]',
    review: 'bg-[#7C5CDB]',
    cold: 'bg-[#9CA3AF]',
}

export function StageBadge({ stage, label }: StageBadgeProps) {
    return (
        <Badge variant={stage}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColors[stage]}`} />
            {label}
        </Badge>
    )
}
