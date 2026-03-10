import { useState, useEffect, useMemo } from 'react'
import { type MeetingRecord } from '@/data/meetings'
import { StatCard } from '@/components/StatCard'
import { MeetingTable } from '@/components/MeetingTable'
import { MeetingDetailModal } from '@/components/MeetingDetailModal'

const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL as string

const TODAY = new Date().toISOString().split('T')[0]

function App() {
    const [meetings, setMeetings] = useState<MeetingRecord[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedMeeting, setSelectedMeeting] = useState<MeetingRecord | null>(null)

    useEffect(() => {
        if (!SHEETS_API_URL) {
            setError('VITE_SHEETS_API_URL 환경변수가 설정되지 않았습니다.')
            setIsLoading(false)
            return
        }

        fetch(SHEETS_API_URL)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json()
            })
            .then((data: MeetingRecord[]) => {
                setMeetings(data)
                setIsLoading(false)
            })
            .catch((err: Error) => {
                setError(`데이터를 불러오지 못했어요: ${err.message}`)
                setIsLoading(false)
            })
    }, [])

    const stats = useMemo(() => ({
        today: meetings.filter((m) => m.date === TODAY).length,
        active: meetings.filter((m) => m.stage === 'progress').length,
        followup: meetings.filter((m) => m.stage === 'followup').length,
    }), [meetings])

    const headerDate = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    })

    return (
        <div className="min-h-screen bg-[#F7F8FA]">
            {/* ── Header ── */}
            <header className="flex items-center justify-between px-8 py-[18px] border-b border-gray-200 bg-white sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                <div className="text-[17px] font-extrabold tracking-tight">
                    <span className="text-[#4F6EF7]">Sales</span> Dashboard
                </div>
                <div className="flex gap-5 items-center">
                    <span className="text-[14px] text-gray-400">📊 영업 관리</span>
                    <span className="text-[14px] text-[#7C5CDB] font-semibold">{headerDate}</span>
                </div>
            </header>

            <main className="max-w-[1300px] mx-auto px-6 py-8 pb-16">
                {/* ── Overview Section ── */}
                <h2 className="text-[14px] font-semibold text-gray-400 tracking-[1.2px] uppercase mb-3.5">
                    Overview
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-9 max-[860px]:grid-cols-1">
                    <StatCard
                        variant="today"
                        label="📅 오늘 미팅"
                        count={stats.today}
                        sub="당일 진행 예정 / 완료"
                        icon="🤝"
                        onClick={() => { }}
                    />
                    <StatCard
                        variant="active"
                        label="🚀 진행중인 업체"
                        count={stats.active}
                        sub="계약 협의 / 테스트 진행"
                        icon="⚙️"
                        onClick={() => { }}
                    />
                    <StatCard
                        variant="followup"
                        label="📌 Follow-up 필요"
                        count={stats.followup}
                        sub="자료 송부 / 후속 연락 대기"
                        icon="📨"
                        onClick={() => { }}
                    />
                </div>

                {/* ── Loading / Error / Table ── */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <div className="w-8 h-8 border-4 border-[#4F6EF7] border-t-transparent rounded-full animate-spin" />
                        <p className="text-[14px] text-gray-400">데이터를 불러오는 중...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-8 text-center">
                        <p className="text-[15px] text-red-500 font-semibold mb-1">⚠️ 오류 발생</p>
                        <p className="text-[13px] text-red-400">{error}</p>
                    </div>
                ) : (
                    <MeetingTable
                        meetings={meetings}
                        today={TODAY}
                        onSelectMeeting={(m) => setSelectedMeeting(m)}
                    />
                )}
            </main>

            {/* ── Detail Modal ── */}
            <MeetingDetailModal
                meeting={selectedMeeting}
                onClose={() => setSelectedMeeting(null)}
            />
        </div>
    )
}

export default App
