import { type MeetingRecord } from '@/data/meetings'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { StageBadge } from '@/components/StageBadge'
import { Badge } from '@/components/ui/badge'

interface MeetingDetailModalProps {
    meeting: MeetingRecord | null
    onClose: () => void
}

export function MeetingDetailModal({ meeting, onClose }: MeetingDetailModalProps) {
    return (
        <Dialog open={meeting !== null} onOpenChange={(open) => { if (!open) onClose() }}>
            <DialogContent>
                {meeting && (
                    <>
                        <DialogHeader>
                            <DialogTitle>{meeting.company}</DialogTitle>
                            <div className="flex gap-2 flex-wrap mt-2">
                                <StageBadge stage={meeting.stage} label={meeting.stageLabel} />
                                <Badge variant="cold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
                                    {meeting.field}
                                </Badge>
                                <Badge variant="cold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
                                    📅 {meeting.date}
                                </Badge>
                            </div>
                        </DialogHeader>

                        <div className="space-y-4 mt-2">
                            <section>
                                <h3 className="text-[14px] font-bold tracking-[0.8px] uppercase text-[#4F6EF7] mb-2.5">
                                    📋 사업 개요
                                </h3>
                                <p className="text-[15px] text-gray-500 leading-relaxed">{meeting.overview}</p>
                            </section>

                            <section>
                                <h3 className="text-[14px] font-bold tracking-[0.8px] uppercase text-[#4F6EF7] mb-2.5">
                                    ✅ 핵심 포인트
                                </h3>
                                <ul className="text-[15px] text-gray-500 leading-relaxed list-disc pl-5 space-y-1">
                                    {meeting.points.map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-[14px] font-bold tracking-[0.8px] uppercase text-[#4F6EF7] mb-2.5">
                                    📌 다음 액션
                                </h3>
                                <p className="text-[15px] text-gray-500 leading-relaxed">{meeting.nextAction}</p>
                            </section>

                            {meeting.contact && (
                                <section>
                                    <h3 className="text-[14px] font-bold tracking-[0.8px] uppercase text-[#4F6EF7] mb-2.5">
                                        👤 담당자 연락처
                                    </h3>
                                    <p className="text-[15px] text-gray-500 leading-relaxed">{meeting.contact}</p>
                                </section>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
