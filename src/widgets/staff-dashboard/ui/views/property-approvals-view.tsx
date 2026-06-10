'use client'

import * as React from 'react'

interface Property {
  id: string
  title: string
  address: string
  price: string
  landlord: string
  phone: string
  documents: string[]
  status: 'pending' | 'approved' | 'rejected'
  vrUrl: string
}

const mockProperties: Property[] = [
  {
    id: 'PROP-101',
    title: 'Căn hộ Studio Vinhomes Grand Park',
    address: 'Phân khu Rainbow, Quận 9, TP.HCM',
    price: '6.5 triệu / tháng',
    landlord: 'Nguyễn Văn Hoàng',
    phone: '0912 345 678',
    documents: ['Sổ hồng số 129038/SH', 'Giấy tờ sở hữu căn hộ chính chủ'],
    status: 'pending',
    vrUrl: 'https://panoramas.example.com/grandpark-studio',
  },
  {
    id: 'PROP-102',
    title: 'Căn hộ 2PN Landmark 81 Luxury',
    address: 'Tầng 42, Vinhomes Central Park, Bình Thạnh, TP.HCM',
    price: '35 triệu / tháng',
    landlord: 'Lê Đình Quốc Khánh',
    phone: '0988 777 666',
    documents: ['Hợp đồng mua bán căn hộ LH-8102', 'Ủy quyền quản lý tài sản'],
    status: 'pending',
    vrUrl: 'https://panoramas.example.com/lm81-luxury',
  },
  {
    id: 'PROP-103',
    title: 'Căn hộ Horizon Sunshine 1PN',
    address: 'Số 10 Mai Chí Thọ, Quận 2, TP.HCM',
    price: '11 triệu / tháng',
    landlord: 'Trần Minh Quân',
    phone: '0909 123 456',
    documents: ['Sổ hồng chung cư Horizon'],
    status: 'approved',
    vrUrl: 'https://panoramas.example.com/horizon-1pn',
  },
]

export function PropertyApprovalsView(): React.ReactElement {
  const [properties, setProperties] = React.useState<Property[]>(mockProperties)
  const [selectedProp, setSelectedProp] = React.useState<Property | null>(null)
  const [vrZoom, setVrZoom] = React.useState(100)
  const [vrRotation, setVrRotation] = React.useState(0)
  const [rejectReason, setRejectReason] = React.useState('')
  const [showRejectDialog, setShowRejectDialog] = React.useState(false)
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const filteredProps = properties.filter(
    (p) => filter === 'all' || p.status === filter
  )

  const handleApprove = (id: string): void => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p))
    setSelectedProp(null)
  }

  const handleReject = (id: string): void => {
    if (!rejectReason.trim()) return
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p))
    setShowRejectDialog(false)
    setSelectedProp(null)
    setRejectReason('')
  }

  return (
    <div className="space-y-6">
      {/* Title & Filter headers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fg font-marketing">Danh sách tin đăng căn hộ</h2>
          <p className="text-xs text-muted mt-1">Kiểm tra thông tin pháp lý, chất lượng ảnh quét VR 360° trước khi hiển thị lên hệ thống.</p>
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
            Chờ duyệt ({properties.filter(p => p.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'approved' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'rejected' ? 'bg-primary text-on-control shadow-sm' : 'text-muted hover:text-fg'}`}
          >
            Đã từ chối
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProps.map((prop) => (
          <div key={prop.id} className="bg-surface border border-line rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-display px-2.5 py-0.5 rounded bg-fg/5 text-muted uppercase">
                  {prop.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  prop.status === 'approved' 
                    ? 'bg-accent-2/10 text-accent-2' 
                    : prop.status === 'rejected' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-accent-3/10 text-accent-3'
                }`}>
                  {prop.status === 'approved' ? 'Đã duyệt' : prop.status === 'rejected' ? 'Bị từ chối' : 'Chờ duyệt'}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-fg leading-snug font-marketing line-clamp-1">{prop.title}</h3>
              <p className="text-xs text-subtle mt-1 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {prop.address}
              </p>
              <div className="mt-4 border-t border-line/50 pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-subtle block">Giá thuê</span>
                  <span className="font-bold text-fg">{prop.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-subtle block">Chủ nhà</span>
                  <span className="font-semibold text-fg">{prop.landlord}</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-1.5 border-t border-line/30 bg-surface-muted/10">
              <button
                onClick={() => setSelectedProp(prop)}
                className="w-full py-2 bg-fg/5 hover:bg-fg/10 text-fg text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                Thẩm định & Duyệt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Drawer/Modal */}
      {selectedProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="absolute inset-0 bg-fg/40 backdrop-blur-sm" onClick={() => setSelectedProp(null)} />
          
          <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-5xl h-[85vh] bg-surface rounded-xl border border-line shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Left side: VR 360 Preview (Simulated interactive container) */}
            <div className="relative flex-1 bg-neutral-900 flex flex-col justify-between p-4 overflow-hidden border-r border-line">
              {/* VR controls top */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  GIẢ LẬP VR 360° SCANNER
                </span>
                <div className="flex gap-1">
                  <button onClick={() => setVrZoom(z => Math.max(50, z - 10))} className="h-8 w-8 bg-black/60 hover:bg-black/85 text-white rounded-lg flex items-center justify-center border border-white/10">-</button>
                  <button onClick={() => setVrZoom(z => Math.min(150, z + 10))} className="h-8 w-8 bg-black/60 hover:bg-black/85 text-white rounded-lg flex items-center justify-center border border-white/10">+</button>
                </div>
              </div>

              {/* Panoramic Scene Container */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div 
                  className="relative transition-transform duration-300 ease-out select-none cursor-grab active:cursor-grabbing"
                  style={{
                    width: '1800px',
                    height: '100%',
                    transform: `translateX(${vrRotation}px) scale(${vrZoom / 100})`,
                  }}
                >
                  {/* Custom Simulated VR Scene */}
                  <svg className="w-full h-full opacity-80" viewBox="0 0 1800 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="vr-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e1b4b" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#vr-sky)" />
                    {/* Grids and lines simulating 3D spatial scanning */}
                    <path d="M0 300h1800M900 0v600M450 0v600M1350 0v600" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />
                    
                    {/* Living Room Area */}
                    <g transform="translate(100, 150)" className="text-white">
                      <rect x="50" y="50" width="300" height="200" fill="none" stroke="#64748b" strokeWidth="2" />
                      <line x1="50" y1="50" x2="0" y2="0" stroke="#475569" strokeWidth="2" />
                      <line x1="350" y1="50" x2="400" y2="0" stroke="#475569" strokeWidth="2" />
                      <line x1="50" y1="250" x2="0" y2="300" stroke="#475569" strokeWidth="2" />
                      <line x1="350" y1="250" x2="400" y2="300" stroke="#475569" strokeWidth="2" />
                      <text x="120" y="150" fill="#94a3b8" fontSize="22" fontFamily="serif" fontWeight="bold">PHÒNG KHÁCH (VR)</text>
                      {/* Sofa */}
                      <rect x="90" y="180" width="220" height="60" rx="10" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                    </g>

                    {/* Bedroom Area */}
                    <g transform="translate(700, 150)">
                      <rect x="50" y="50" width="300" height="200" fill="none" stroke="#64748b" strokeWidth="2" />
                      <line x1="50" y1="50" x2="0" y2="0" stroke="#475569" strokeWidth="2" />
                      <line x1="350" y1="50" x2="400" y2="0" stroke="#475569" strokeWidth="2" />
                      <text x="135" y="150" fill="#94a3b8" fontSize="22" fontFamily="serif" fontWeight="bold">PHÒNG NGỦ 1</text>
                      {/* Bed */}
                      <rect x="100" y="120" width="200" height="120" rx="5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                    </g>

                    {/* Kitchen Area */}
                    <g transform="translate(1300, 150)">
                      <rect x="50" y="50" width="300" height="200" fill="none" stroke="#64748b" strokeWidth="2" />
                      <line x1="50" y1="50" x2="0" y2="0" stroke="#475569" strokeWidth="2" />
                      <line x1="350" y1="50" x2="400" y2="0" stroke="#475569" strokeWidth="2" />
                      <text x="145" y="150" fill="#94a3b8" fontSize="22" fontFamily="serif" fontWeight="bold">KHU BẾP</text>
                      {/* Kitchen table */}
                      <rect x="80" y="160" width="240" height="80" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
                    </g>
                  </svg>

                  {/* Hotspots */}
                  <div className="absolute left-[280px] top-[260px] flex flex-col items-center">
                    <span className="h-6 w-6 rounded-full bg-accent-2/70 animate-ping absolute" />
                    <span className="h-6 w-6 rounded-full bg-accent-2 flex items-center justify-center text-white text-[10px] font-bold relative border border-white shadow-md cursor-pointer">i</span>
                    <span className="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded mt-1.5 border border-white/10 font-body">Sofa da cao cấp</span>
                  </div>

                  <div className="absolute left-[880px] top-[220px] flex flex-col items-center">
                    <span className="h-6 w-6 rounded-full bg-accent-2/70 animate-ping absolute" />
                    <span className="h-6 w-6 rounded-full bg-accent-2 flex items-center justify-center text-white text-[10px] font-bold relative border border-white shadow-md cursor-pointer">i</span>
                    <span className="bg-black/80 text-white text-[10px] px-2 py-0.5 rounded mt-1.5 border border-white/10 font-body">Giường ngủ King Size</span>
                  </div>
                </div>
              </div>

              {/* VR Rotation controls bottom */}
              <div className="relative z-10 flex justify-between items-center bg-black/60 border border-white/10 p-2.5 rounded-lg">
                <span className="text-[10px] text-white/50 font-body">Kéo chuột hoặc nhấn các nút để xoay góc nhìn 360°</span>
                <div className="flex gap-2">
                  <button onClick={() => setVrRotation(r => r + 80)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors">&larr; Xoay trái</button>
                  <button onClick={() => setVrRotation(r => r - 80)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors">Xoay phải &rarr;</button>
                </div>
              </div>
            </div>

            {/* Right side: Property Details and Document Verification */}
            <div className="w-full lg:w-[420px] flex flex-col h-full bg-surface overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-line bg-surface-muted/30 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-primary font-display">{selectedProp.id}</span>
                  <h2 className="text-sm font-bold text-fg font-marketing mt-0.5">{selectedProp.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProp(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-subtle hover:bg-fg/5 hover:text-fg transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Form body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">Thông tin căn hộ</h4>
                  <div className="mt-2.5 space-y-2 text-xs">
                    <p className="text-muted"><strong className="text-fg font-medium">Địa chỉ:</strong> {selectedProp.address}</p>
                    <p className="text-muted"><strong className="text-fg font-medium">Giá đề xuất:</strong> {selectedProp.price}</p>
                    <p className="text-muted"><strong className="text-fg font-medium">Người đăng:</strong> {selectedProp.landlord} ({selectedProp.phone})</p>
                  </div>
                </div>

                <div className="border-t border-line/60 pt-4">
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">Hồ sơ pháp lý đính kèm</h4>
                  <div className="mt-2.5 space-y-2">
                    {selectedProp.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 bg-bg/40 border border-line rounded-lg text-xs hover:bg-bg/60 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d04a1e" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        <span className="font-semibold text-fg truncate flex-1">{doc}</span>
                        <span className="text-[10px] text-accent-2 font-medium bg-accent-2/10 px-1.5 py-0.5 rounded">PDF</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-line/60 pt-4">
                  <h4 className="text-xs font-bold text-fg font-body uppercase tracking-wider">Trạng thái kiểm duyệt ảnh 360°</h4>
                  <div className="mt-2.5 p-3.5 bg-accent-2/5 border border-accent-2/10 rounded-lg text-xs flex gap-2.5">
                    <svg className="text-accent-2 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    <div>
                      <p className="font-semibold text-accent-2">Ảnh quét đạt tiêu chuẩn</p>
                      <p className="text-[10px] text-muted mt-0.5">Không phát hiện méo ảnh, đủ độ sáng, các điểm di chuyển liên kết chính xác.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action footer */}
              {selectedProp.status === 'pending' && (
                <div className="p-4 border-t border-line bg-surface-muted/20 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowRejectDialog(true)}
                      className="flex-1 py-2.5 bg-surface border border-accent hover:bg-accent/5 text-accent text-xs font-semibold rounded-lg transition-colors"
                    >
                      Từ chối duyệt
                    </button>
                    <button
                      onClick={() => handleApprove(selectedProp.id)}
                      className="flex-1 py-2.5 bg-accent-2 hover:bg-accent-2/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Phê duyệt tin
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject dialog */}
      {showRejectDialog && selectedProp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-fg/50 backdrop-blur-sm" onClick={() => setShowRejectDialog(false)} />
          <div className="relative z-10 w-full max-w-md bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5">
              <h3 className="text-base font-bold text-fg font-marketing">Lý do từ chối tin đăng</h3>
              <p className="text-xs text-muted mt-1">Nêu rõ lý do để chủ nhà nhận được thông báo phản hồi và chỉnh sửa lại.</p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Giấy tờ sở hữu bị mờ hoặc ảnh quét 360° có chất lượng kém..."
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
                  onClick={() => handleReject(selectedProp.id)}
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
