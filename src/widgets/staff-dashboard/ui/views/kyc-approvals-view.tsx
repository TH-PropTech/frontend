'use client'

import * as React from 'react'

interface KycRecord {
  id: string
  name: string
  email: string
  cccdNumber: string
  dob: string
  gender: string
  hometown: string
  address: string
  ocrScore: number
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

const mockKycRecords: KycRecord[] = [
  {
    id: 'KYC-801',
    name: 'NGUYỄN VĂN A',
    email: 'nguyenvana@gmail.com',
    cccdNumber: '001202008745',
    dob: '15/08/2002',
    gender: 'Nam',
    hometown: 'Hoài Đức, Hà Nội',
    address: '22 Bis Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM',
    ocrScore: 98.6,
    submittedAt: '10/06/2026 14:22',
    status: 'pending',
  },
  {
    id: 'KYC-802',
    name: 'TRẦN THỊ B',
    email: 'tranthib@yahoo.com',
    cccdNumber: '079199008273',
    dob: '02/11/1999',
    gender: 'Nữ',
    hometown: 'Thủ Dầu Một, Bình Dương',
    address: 'Chung cư Masteri Thảo Điền, Quận 2, TP.HCM',
    ocrScore: 95.4,
    submittedAt: '10/06/2026 13:05',
    status: 'pending',
  },
  {
    id: 'KYC-803',
    name: 'LÊ HOÀNG PHÚC',
    email: 'phucle1990@gmail.com',
    cccdNumber: '048090001827',
    dob: '24/04/1990',
    gender: 'Nam',
    hometown: 'Sông Cầu, Phú Yên',
    address: '45 Trần Hưng Đạo, Quận 1, TP.HCM',
    ocrScore: 100,
    submittedAt: '09/06/2026 18:40',
    status: 'approved',
  },
]

export function KycApprovalsView(): React.ReactElement {
  const [records, setRecords] = React.useState<KycRecord[]>(mockKycRecords)
  const [selectedRecord, setSelectedRecord] = React.useState<KycRecord | null>(null)
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const filteredRecords = records.filter(
    (r) => filter === 'all' || r.status === filter
  )

  const handleVerify = (id: string): void => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
    setSelectedRecord(null)
  }

  const handleReject = (id: string): void => {
    if (!rejectReason.trim()) return
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
    setShowRejectDialog(false)
    setSelectedRecord(null)
    setRejectReason('')
  }

  return (
    <div className="space-y-6">
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">Xác minh danh tính (KYC)</h2>
          <p className="text-xs text-muted mt-1">Đối chiếu ảnh chụp thẻ CCCD của người dùng với kết quả trích xuất tự động từ hệ thống OCR.</p>
        </div>
        <div className="flex rounded-lg border border-line p-1 bg-surface-muted/30 text-xs gap-1 font-semibold self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'pending' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Chờ duyệt ({records.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã xác minh
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Records table */}
      <div className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-muted/30 border-b border-line text-muted uppercase tracking-wider font-semibold font-body">
                <th className="p-4">Mã hồ sơ</th>
                <th className="p-4">Họ và tên</th>
                <th className="p-4">Số CCCD</th>
                <th className="p-4">Tỷ lệ khớp OCR</th>
                <th className="p-4">Ngày gửi</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-bg/10 transition-colors">
                  <td className="p-4 font-mono font-bold text-fg">{record.id}</td>
                  <td className="p-4 font-semibold text-fg">{record.name}</td>
                  <td className="p-4 font-mono">{record.cccdNumber}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-fg/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${record.ocrScore > 97 ? 'bg-accent-2' : record.ocrScore > 90 ? 'bg-accent-3' : 'bg-accent'}`}
                          style={{ width: `${record.ocrScore}%` }}
                        />
                      </div>
                      <span className="font-semibold text-fg">{record.ocrScore}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-subtle">{record.submittedAt}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      record.status === 'approved' 
                        ? 'bg-accent-2/10 text-accent-2' 
                        : record.status === 'rejected' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-accent-3/10 text-accent-3'
                    }`}>
                      {record.status === 'approved' ? 'Đã duyệt' : record.status === 'rejected' ? 'Đã từ chối' : 'Đang chờ'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="px-3 py-1.5 bg-fg/5 hover:bg-fg/10 text-fg rounded-md font-semibold transition-colors"
                    >
                      Đối chiếu & Duyệt
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-subtle font-body">
                    Không có hồ sơ KYC nào phù hợp với bộ lọc này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Comparison Workspace Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-fg/40 backdrop-blur-sm" onClick={() => setSelectedRecord(null)} />
          
          <div className="relative z-10 flex flex-col w-full max-w-5xl h-[85vh] bg-surface rounded-xl border border-line shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-line bg-surface-muted/30 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-primary font-display">{selectedRecord.id}</span>
                <h2 className="text-sm font-bold text-fg font-marketing mt-0.5">Xác minh KYC: {selectedRecord.name}</h2>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-fg/5 hover:text-fg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Split layout content workspace */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Side: Uploaded CCCD Mockup Images */}
              <div className="flex-1 bg-bg/50 p-6 overflow-y-auto space-y-6 border-r border-line">
                <h3 className="text-xs font-bold text-fg uppercase tracking-wider font-body mb-3">Hình ảnh CCCD do người dùng tải lên</h3>
                
                {/* Front side of CCCD */}
                <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-gradient-to-tr from-sky-100 to-indigo-50 border border-indigo-200/80 rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 2px, transparent 0)', backgroundSize: '12px 12px' }} />
                  <div className="relative flex justify-between items-start">
                    <div className="text-[8px] font-bold text-indigo-950 font-body leading-tight">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br />
                      Độc lập - Tự do - Hạnh phúc
                    </div>
                    <span className="text-[9px] font-bold text-indigo-900 border border-indigo-300 px-1 py-0.5 rounded bg-white/50">CCCD</span>
                  </div>
                  
                  <div className="relative flex gap-3 my-2 items-center">
                    {/* Simulated avatar */}
                    <div className="h-14 w-11 bg-slate-300 rounded border border-indigo-300 flex items-center justify-center text-slate-500 font-mono text-[8px]">
                      ảnh 3x4
                    </div>
                    {/* Key identity text */}
                    <div className="text-[8px] space-y-1 font-body text-indigo-950">
                      <div><span className="text-slate-500">Số/No:</span> <strong className="font-mono text-[10px]">{selectedRecord.cccdNumber}</strong></div>
                      <div><span className="text-slate-500">Họ và tên/Full name:</span> <strong>{selectedRecord.name}</strong></div>
                      <div><span className="text-slate-500">Ngày sinh/Date of birth:</span> <strong>{selectedRecord.dob}</strong></div>
                      <div><span className="text-slate-500">Quê quán/Place of origin:</span> <strong>{selectedRecord.hometown}</strong></div>
                    </div>
                  </div>
                  
                  <div className="text-[6px] text-slate-500 font-body text-right border-t border-indigo-200 pt-1.5">
                    CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI
                  </div>
                </div>

                {/* Back side of CCCD */}
                <div className="relative aspect-[1.58/1] w-full max-w-sm mx-auto bg-gradient-to-tr from-sky-100 to-indigo-50 border border-indigo-200/80 rounded-xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 2px, transparent 0)', backgroundSize: '12px 12px' }} />
                  <div className="relative flex justify-between items-start">
                    <span className="text-[7px] text-indigo-900 font-body">MẶT SAU / BACK SIDE</span>
                    <span className="text-[8px] font-mono text-indigo-950">MRZ ZONE CODE</span>
                  </div>

                  <div className="relative flex gap-4 my-2 items-center">
                    {/* Fingerprint block */}
                    <div className="h-10 w-10 border border-dashed border-indigo-400 bg-white/40 rounded flex items-center justify-center text-[6px] text-indigo-800 font-body">vân tay</div>
                    {/* Address info */}
                    <div className="text-[8px] font-body text-indigo-950 flex-1 space-y-0.5">
                      <div><span className="text-slate-500">Nơi thường trú:</span><br /><strong>{selectedRecord.address}</strong></div>
                    </div>
                  </div>

                  {/* MRZ bar */}
                  <div className="bg-slate-200 p-1 rounded font-mono text-[7px] text-indigo-950 tracking-wider">
                    I<span className="text-indigo-600">VNM</span>{selectedRecord.cccdNumber}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
                    0208154M&lt;&lt;&lt;&lt;&lt;&lt;&lt;VNM&lt;&lt;&lt;&lt;&lt;&lt;&lt;NGUYEN&lt;&lt;VAN&lt;A
                  </div>
                </div>
              </div>

              {/* Right Side: OCR Extracted Fields Side-by-side Form */}
              <div className="w-full md:w-[450px] p-6 overflow-y-auto space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-fg uppercase tracking-wider font-body">Dữ liệu trích xuất từ OCR</h3>
                  <span className="text-xs font-bold text-accent-2 bg-accent-2/10 px-2.5 py-1 rounded-lg border border-accent-2/20">
                    Trùng khớp {selectedRecord.ocrScore}%
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Họ và tên (Full Name)</label>
                    <input 
                      type="text" 
                      defaultValue={selectedRecord.name} 
                      className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Số CCCD (ID Number)</label>
                      <input 
                        type="text" 
                        defaultValue={selectedRecord.cccdNumber} 
                        className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-mono font-semibold text-fg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Ngày sinh (Date of birth)</label>
                      <input 
                        type="text" 
                        defaultValue={selectedRecord.dob} 
                        className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Giới tính (Gender)</label>
                      <input 
                        type="text" 
                        defaultValue={selectedRecord.gender} 
                        className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Email liên kết</label>
                      <input 
                        type="text" 
                        defaultValue={selectedRecord.email} 
                        className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Quê quán (Place of origin)</label>
                    <input 
                      type="text" 
                      defaultValue={selectedRecord.hometown} 
                      className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Nơi thường trú (Residence)</label>
                    <textarea 
                      defaultValue={selectedRecord.address} 
                      rows={2}
                      className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-semibold text-fg focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Verification footer */}
                {selectedRecord.status === 'pending' && (
                  <div className="border-t border-line/60 pt-4 mt-6 flex gap-2">
                    <button
                      onClick={() => setShowRejectDialog(true)}
                      className="flex-1 py-2.5 bg-surface border border-accent hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors"
                    >
                      Yêu cầu chụp lại
                    </button>
                    <button
                      onClick={() => handleVerify(selectedRecord.id)}
                      className="flex-1 py-2.5 bg-accent-2 hover:bg-accent-2/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Xác nhận KYC
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason input dialog */}
      {showRejectDialog && selectedRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-fg/50 backdrop-blur-sm" onClick={() => setShowRejectDialog(false)} />
          <div className="relative z-10 w-full max-w-md bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">Lý do từ chối hồ sơ KYC</h3>
              <p className="text-xs text-muted mt-1">Nêu rõ lý do để người dùng chụp lại tài liệu rõ ràng hơn.</p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Ảnh mặt sau của thẻ CCCD bị lóa sáng mất phần mã MRZ..."
                className="w-full h-24 p-3 mt-3 text-xs border border-line rounded-lg focus:outline-none focus:border-accent bg-bg/25 resize-none"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowRejectDialog(false)
                    setRejectReason('')
                  }}
                  className="px-4 py-2 border border-line text-muted hover:text-fg text-xs font-semibold rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleReject(selectedRecord.id)}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
