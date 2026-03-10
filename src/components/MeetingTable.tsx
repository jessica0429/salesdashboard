import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { type MeetingRecord, type Stage } from '@/data/meetings'
import { Input } from '@/components/ui/input'
import { StageBadge } from '@/components/StageBadge'

type FilterType = 'all' | Stage

interface MeetingTableProps {
    meetings: MeetingRecord[]
    today: string
    onSelectMeeting: (m: MeetingRecord) => void
}

const PRIORITY: Record<string, number> = {
    progress: 0,
    followup: 1,
    review: 2,
    new: 3,
    cold: 4,
}

const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'progress', label: '진행중' },
    { key: 'followup', label: 'Follow-up' },
    { key: 'review', label: '검토중' },
    { key: 'cold', label: '보류' },
]

export function MeetingTable({ meetings, today, onSelectMeeting }: MeetingTableProps) {
    const [filter, setFilter] = useState<FilterType>('all')
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        let list = meetings

        if (filter !== 'all') list = list.filter((m) => m.stage === filter)

        const q = search.trim().toLowerCase()
        if (q) {
            list = list.filter(
                (m) =>
                    m.company.toLowerCase().includes(q) ||
                    m.field.toLowerCase().includes(q) ||
                    m.summary.toLowerCase().includes(q) ||
                    m.points.some((p) => p.toLowerCase().includes(q)) ||
                    (m.contact && m.contact.toLowerCase().includes(q))
            )
        }

        return [...list].sort((a, b) => (PRIORITY[a.stage] ?? 5) - (PRIORITY[b.stage] ?? 5))
    }, [meetings, filter, search, today])

    const handleSearch = (val: string) => {
        setSearch(val)
        if (val.trim()) setFilter('all')
    }

    return (
        <div>
            {/* Header Row */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-[14px] font-semibold text-gray-400 tracking-[1.2px] uppercase">
                        미팅 로그
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-150 cursor-pointer ${filter === key
                                        ? 'bg-[#4F6EF7] border-[#4F6EF7] text-white'
                                        : 'bg-transparent border-gray-200 text-gray-400 hover:bg-[#4F6EF7] hover:border-[#4F6EF7] hover:text-white'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search */}
                <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-400 pointer-events-none h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="업체명 / 키워드 검색"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-9 w-[220px]"
                    />
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="max-h-[520px] overflow-y-auto custom-scroll">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50">
                                {['업체명 / 분야', '미팅일', '계약 단계', '주요 내용', ''].map((h, i) => (
                                    <th
                                        key={i}
                                        className="sticky top-0 z-[5] bg-gray-50 px-[18px] py-[13px] text-[14px] font-bold tracking-[0.4px] uppercase text-gray-400 text-left border-b border-gray-200"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-[14px] text-gray-400">
                                        해당 항목이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((m) => (
                                    <tr
                                        key={m.id}
                                        onClick={() => onSelectMeeting(m)}
                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                                    >
                                        <td className="px-[18px] py-[16px] align-middle">
                                            <div className="text-[16px] font-bold text-gray-900 mb-0.5">{m.company}</div>
                                            <div className="text-[13px] text-gray-400">{m.field}</div>
                                        </td>
                                        <td className="px-[18px] py-[16px] align-middle">
                                            <span className="text-[14px] text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md whitespace-nowrap">
                                                📅 {m.date}
                                            </span>
                                        </td>
                                        <td className="px-[18px] py-[16px] align-middle">
                                            <StageBadge stage={m.stage} label={m.stageLabel} />
                                        </td>
                                        <td className="px-[18px] py-[16px] align-middle">
                                            <div className="text-[14px] text-gray-400 leading-relaxed max-w-[480px]">
                                                {m.summary}
                                            </div>
                                        </td>
                                        <td className="px-[18px] py-[16px] align-middle">
                                            <button
                                                className="bg-none border-none cursor-pointer text-gray-400 text-base px-1.5 py-1 rounded-md hover:bg-gray-100 hover:text-[#4F6EF7] transition-all duration-150"
                                                title="상세보기"
                                                onClick={(e) => { e.stopPropagation(); onSelectMeeting(m) }}
                                            >
                                                🔍
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
