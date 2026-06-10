'use client'

import * as React from 'react'

interface Dispute {
  id: string
  contractAddress: string
  tenantName: string
  tenantAddress: string
  tenantClaim: string
  landlordName: string
  landlordAddress: string
  landlordClaim: string
  depositAmount: string
  depositEth: number
  status: 'pending' | 'resolved'
  resolution?: string
  txHash?: string
}

const mockDisputes: Dispute[] = [
  {
    id: 'DISP-401',
    contractAddress: '0x1A2b...E5F6',
    tenantName: 'Nguyễn Văn A',
    tenantAddress: '0x71C...897',
    tenantClaim: 'Tôi phải chuyển công tác gấp ra Hà Nội. Tôi đã báo trước cho chủ nhà 30 ngày theo đúng quy định tại Điều 5 của hợp đồng. Yêu cầu hoàn lại 100% tiền cọc.',
    landlordName: 'Lê Hoàng Minh',
    landlordAddress: '0x3a4...2f8',
    landlordClaim: 'Người thuê nhà dọn đi sớm làm trống phòng trong tháng này. Hơn nữa tường nhà có một số vết xước lớn cần chi phí sơn sửa lại. Tôi muốn giữ lại 100% tiền cọc.',
    depositAmount: '12 triệu VND',
    depositEth: 1.5,
    status: 'pending',
  },
  {
    id: 'DISP-402',
    contractAddress: '0x8f9c...92a1',
    tenantName: 'Trần Thị B',
    tenantAddress: '0xab2...901',
    tenantClaim: 'Nhà bị thấm dột nặng khi trời mưa lớn, tôi đã báo chủ nhà 3 lần nhưng không được sửa chữa kịp thời. Tôi không thể tiếp tục sinh hoạt nên xin chấm dứt hợp đồng.',
    landlordName: 'Phạm Thanh Sơn',
    landlordAddress: '0xcd4...512',
    landlordClaim: 'Thấm dột là do thời tiết bão lớn bất khả kháng. Tôi đang xếp lịch sửa chữa nhưng khách thuê tự ý dọn đi và không đóng tiền thuê nhà tháng này.',
    depositAmount: '8 triệu VND',
    depositEth: 1.0,
    status: 'pending',
  },
]

export function DisputesView(): React.ReactElement {
  const [disputes, setDisputes] = React.useState<Dispute[]>(mockDisputes)
  const [selectedDisp, setSelectedDisp] = React.useState<Dispute | null>(null)
  const [tenantShare, setTenantShare] = React.useState<number>(50)
  const [landlordShare, setLandlordShare] = React.useState<number>(50)
  const [isExecuting, setIsExecuting] = React.useState(false)
  const [executedTx, setExecutedTx] = React.useState('')
  const [disputeNotes, setDisputeNotes] = React.useState('')

  const handleSliderChange = (val: number) => {
    setTenantShare(val)
    setLandlordShare(100 - val)
  }

  const handleResolve = (id: string) => {
    setIsExecuting(true)
    
    // Simulate transaction execution on smart contract
    setTimeout(() => {
      const generatedTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      
      setDisputes(prev => prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            status: 'resolved',
            resolution: `Phán quyết phân chia cọc: Khách thuê ${tenantShare}% (${(d.depositEth * tenantShare / 100).toFixed(2)} ETH) - Chủ nhà ${landlordShare}% (${(d.depositEth * landlordShare / 100).toFixed(2)} ETH). Lý do: ${disputeNotes || 'Trọng tài viên phân chia dựa trên điều khoản hợp đồng.'}`,
            txHash: generatedTx
          }
        }
        return d
      }))
      
      setExecutedTx(generatedTx)
      setIsExecuting(false)
    }, 2500)
  }

  const resetForm = () => {
    setSelectedDisp(null)
    setExecutedTx('')
    setDisputeNotes('')
    setTenantShare(50)
    setLandlordShare(50)
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">Trọng tài phân giải tranh chấp cọc</h2>
        <p className="text-xs text-muted mt-1">Đóng vai trò là bên thứ ba đáng tin cậy giữ chữ ký số đa bên (multisig) để giải phóng tiền cọc trong hợp đồng thông minh Escrow.</p>
      </div>

      {/* Disputes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disputes.map((disp) => (
          <div key={disp.id} className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-muted bg-fg/5 px-2.5 py-0.5 rounded font-display uppercase">{disp.id}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                disp.status === 'resolved' 
                  ? 'bg-accent-2/10 text-accent-2' 
                  : 'bg-accent/10 text-accent animate-pulse'
              }`}>
                {disp.status === 'resolved' ? 'Đã giải quyết' : 'Cần xử lý gấp'}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-fg font-marketing">Hợp đồng: {disp.contractAddress}</h3>
              <p className="text-xs text-muted flex justify-between">
                <span>Quỹ cọc đang khóa:</span> 
                <strong className="text-primary font-display">{disp.depositAmount} ({disp.depositEth} ETH)</strong>
              </p>
            </div>

            <div className="border-t border-line/50 pt-3 space-y-2.5 text-xs">
              <div className="bg-accent/5 border border-accent/10 p-2.5 rounded-lg">
                <span className="font-semibold text-accent block font-body">Khách thuê ({disp.tenantName}):</span>
                <p className="text-[11px] text-muted mt-0.5 italic">"{disp.tenantClaim}"</p>
              </div>
              <div className="bg-fg/5 border border-line/40 p-2.5 rounded-lg">
                <span className="font-semibold text-fg block font-body">Chủ nhà ({disp.landlordName}):</span>
                <p className="text-[11px] text-muted mt-0.5 italic">"{disp.landlordClaim}"</p>
              </div>
            </div>

            {disp.status === 'resolved' && disp.resolution && (
              <div className="bg-accent-2/5 border border-accent-2/15 p-3 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-accent-2 block font-body">Kết quả phán quyết:</span>
                <p className="text-[11px] text-muted">{disp.resolution}</p>
                {disp.txHash && (
                  <span className="text-[9px] text-muted-foreground block font-mono mt-1 bg-black/5 p-1 rounded overflow-x-auto">
                    Tx Hash: {disp.txHash}
                  </span>
                )}
              </div>
            )}

            {disp.status === 'pending' && (
              <div className="border-t border-line/30 pt-3 flex justify-end">
                <button
                  onClick={() => setSelectedDisp(disp)}
                  className="px-4 py-2 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Phân giải tranh chấp
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resolution panel Modal */}
      {selectedDisp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-fg/40 backdrop-blur-sm" onClick={resetForm} />
          
          <div className="relative z-10 w-full max-w-lg bg-surface border border-line rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-line bg-surface-muted/30 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-primary font-display">{selectedDisp.id}</span>
                <h3 className="text-sm font-bold text-fg font-marketing mt-0.5">Xử lý phân giải tranh chấp cọc</h3>
              </div>
              <button onClick={resetForm} className="text-subtle hover:text-fg transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Summary stats */}
              <div className="p-3 bg-bg/50 border border-line rounded-lg text-xs space-y-1.5">
                <p className="text-muted"><strong className="text-fg font-medium">Hợp đồng:</strong> {selectedDisp.contractAddress}</p>
                <p className="text-muted"><strong className="text-fg font-medium">Tổng tiền cọc:</strong> <span className="text-primary font-bold">{selectedDisp.depositAmount} ({selectedDisp.depositEth} ETH)</span></p>
              </div>

              {/* Slider for Split ratio */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold text-fg font-body">
                  <span>Khách thuê: {tenantShare}%</span>
                  <span>Chủ nhà: {landlordShare}%</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tenantShare}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent-2"
                />

                <div className="flex justify-between text-[11px] text-muted font-mono bg-bg/30 p-2.5 rounded-lg border border-line/60">
                  <span>Khách nhận: {(selectedDisp.depositEth * tenantShare / 100).toFixed(2)} ETH</span>
                  <span>Chủ nhà nhận: {(selectedDisp.depositEth * landlordShare / 100).toFixed(2)} ETH</span>
                </div>
              </div>

              {/* Reason input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Lý do & Căn cứ phân chia cọc</label>
                <textarea
                  value={disputeNotes}
                  onChange={(e) => setDisputeNotes(e.target.value)}
                  placeholder="Ví dụ: Khách thuê đã báo trước đủ 30 ngày, tuy nhiên có làm hư hỏng nhẹ một số trang thiết bị nên khấu trừ 10% tiền cọc cho chủ nhà để khắc phục..."
                  className="w-full h-20 p-2.5 text-xs border border-line rounded-lg focus:outline-none focus:border-accent bg-bg/25 resize-none"
                  required
                />
              </div>

              {/* Executing blockchain overlay */}
              {isExecuting ? (
                <div className="p-4 bg-black/95 text-white rounded-lg font-mono text-[10px] space-y-2 border border-white/10">
                  <p className="text-accent-3 animate-pulse">&gt; Đang kết nối ví Multisig của Trọng tài...</p>
                  <p className="text-slate-400">&gt; Khởi tạo giao dịch giải phóng Escrow Smart Contract...</p>
                  <p className="text-slate-400">&gt; Phân phối: {tenantShare}% tenant, {landlordShare}% landlord...</p>
                  <p className="text-slate-400">&gt; Đang chờ xác thực khối (Mined block)...</p>
                  <div className="flex items-center gap-2 text-accent-2 font-bold mt-1">
                    <span className="h-2 w-2 rounded-full bg-accent-2 animate-ping" />
                    Đang phát sóng chữ ký lên chuỗi...
                  </div>
                </div>
              ) : executedTx ? (
                <div className="p-4 bg-accent-2/10 border border-accent-2/20 text-accent-2 rounded-lg text-xs space-y-1">
                  <p className="font-semibold">✓ Giao dịch blockchain đã được xác thực!</p>
                  <p className="text-[10px] text-muted mt-0.5">Tiền cọc đã được tự động phân phối về ví của hai bên trên chuỗi.</p>
                  <span className="text-[9px] text-muted-foreground block font-mono bg-black/5 p-1 rounded mt-1.5 overflow-x-auto truncate">
                    Tx Hash: {executedTx}
                  </span>
                  <button
                    onClick={resetForm}
                    className="w-full mt-2.5 py-1.5 bg-accent-2 text-white font-semibold rounded text-[11px] hover:bg-accent-2/95 transition-colors"
                  >
                    Hoàn tất đóng hồ sơ
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={resetForm}
                    className="flex-1 py-2.5 border border-line text-muted hover:text-fg text-xs font-semibold rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleResolve(selectedDisp.id)}
                    disabled={!disputeNotes.trim()}
                    className="flex-1 py-2.5 bg-accent hover:bg-accent/95 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    Thực thi Smart Contract
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
