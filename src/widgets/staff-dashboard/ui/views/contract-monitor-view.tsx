'use client'

import * as React from 'react'

interface TxLog {
  hash: string
  blockNumber: number
  event: 'LeaseDeployed' | 'DepositLocked' | 'RentPaid' | 'LeaseTerminated' | 'RefundExecuted'
  contractAddress: string
  gasUsed: string
  feeEth: string
  timestamp: string
  status: 'success' | 'pending'
}

const mockTxLogs: TxLog[] = [
  {
    hash: '0x8fa3e8293798ef...09a1',
    blockNumber: 18920144,
    event: 'DepositLocked',
    contractAddress: '0x1A2b...E5F6',
    gasUsed: '84,213',
    feeEth: '0.0025 ETH',
    timestamp: '10/06/2026 16:30',
    status: 'success',
  },
  {
    hash: '0x498abf10927e3d...89f2',
    blockNumber: 18920138,
    event: 'LeaseDeployed',
    contractAddress: '0x1A2b...E5F6',
    gasUsed: '890,214',
    feeEth: '0.0152 ETH',
    timestamp: '10/06/2026 16:15',
    status: 'success',
  },
  {
    hash: '0x2b2c3a50619a8f...008f',
    blockNumber: 18920090,
    event: 'RentPaid',
    contractAddress: '0x8f9c...92a1',
    gasUsed: '65,112',
    feeEth: '0.0019 ETH',
    timestamp: '10/06/2026 14:10',
    status: 'success',
  },
]

export function ContractMonitorView(): React.ReactElement {
  const [logs, setLogs] = React.useState<TxLog[]>(mockTxLogs)
  const [inspectAddress, setInspectAddress] = React.useState<string | null>(null)
  
  // State variables for contract query simulator
  const [queryBalance, setQueryBalance] = React.useState('1.5 ETH')
  const [queryState, setQueryState] = React.useState('Active (Deposit Locked)')
  const [isQuerying, setIsQuerying] = React.useState(false)

  const handleQueryState = (address: string) => {
    setIsQuerying(true)
    setTimeout(() => {
      if (address.includes('1A2b')) {
        setQueryBalance('1.5 ETH')
        setQueryState('Active (Locked)')
      } else {
        setQueryBalance('1.0 ETH')
        setQueryState('Active (Locked)')
      }
      setIsQuerying(false)
    }, 800)
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-fg font-marketing">Giám sát Hợp đồng thông minh</h2>
        <p className="text-xs text-muted mt-1">Theo dõi hoạt động, giao dịch và trạng thái ví ký thác cọc của các hợp đồng thuê nhà trên chuỗi khối Blockchain.</p>
      </div>

      {/* Contract Template Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-body">Contract Factory</span>
          <p className="font-mono text-xs text-fg truncate font-semibold">0x76aBC543e...F129</p>
          <span className="text-xs text-accent-2 block font-medium">Bản phát hành chính thức v1.2.0</span>
        </div>

        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-body">Hợp đồng hoạt động</span>
          <p className="text-2xl font-bold text-fg font-display">142</p>
          <span className="text-xs text-subtle block font-body">Tăng +8 hợp đồng mới trong tuần này</span>
        </div>

        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-body">Tổng số giao dịch</span>
          <p className="text-2xl font-bold text-fg font-display">1,820</p>
          <span className="text-xs text-accent-2 block font-semibold">Gas trung bình: 42 Gwei</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction log table */}
        <div className="lg:col-span-2 bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-fg font-marketing">Nhật ký giao dịch gần đây</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-muted/30 border-b border-line text-muted uppercase font-semibold font-body">
                  <th className="p-3">Giao dịch (Tx)</th>
                  <th className="p-3">Sự kiện</th>
                  <th className="p-3">Hợp đồng</th>
                  <th className="p-3">Gas sử dụng</th>
                  <th className="p-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-bg/10 transition-colors">
                    <td className="p-3 font-mono text-primary font-semibold truncate max-w-[120px]" title={log.hash}>
                      {log.hash}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.event === 'LeaseDeployed' 
                          ? 'bg-blue-100 text-blue-800' 
                          : log.event === 'DepositLocked' 
                          ? 'bg-amber-100 text-amber-800' 
                          : log.event === 'RentPaid' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.event}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-muted">{log.contractAddress}</td>
                    <td className="p-3 text-subtle">{log.gasUsed} ({log.feeEth})</td>
                    <td className="p-3 text-subtle">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contract state reader simulator */}
        <div className="bg-surface border border-line rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-fg font-marketing">Truy vấn Trạng thái Hợp đồng</h3>
          <p className="text-xs text-muted">Đọc trực tiếp dữ liệu thô (Raw Read State) của hợp đồng đang chạy trên Blockchain.</p>

          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider font-body">Địa chỉ hợp đồng</label>
              <select
                onChange={(e) => {
                  const addr = e.target.value
                  setInspectAddress(addr)
                  if (addr) handleQueryState(addr)
                }}
                className="w-full mt-1.5 p-2.5 bg-bg/30 border border-line rounded-lg text-xs font-mono font-semibold text-fg focus:outline-none focus:border-accent"
              >
                <option value="">-- Chọn hợp đồng cần truy vấn --</option>
                <option value="0x1A2b...E5F6">0x1A2b...E5F6 (Nguyễn Văn A)</option>
                <option value="0x8f9c...92a1">0x8f9c...92a1 (Trần Thị B)</option>
              </select>
            </div>

            {inspectAddress && (
              <div className="border-t border-line/60 pt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-subtle font-body">Trạng thái (State):</span>
                  {isQuerying ? (
                    <span className="text-accent animate-pulse font-semibold">Đang đọc chuỗi...</span>
                  ) : (
                    <strong className="text-accent-2 font-mono">{queryState}</strong>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-subtle font-body">Số dư quỹ cọc (Balance):</span>
                  {isQuerying ? (
                    <span className="text-accent animate-pulse font-semibold">Đang đọc chuỗi...</span>
                  ) : (
                    <strong className="text-fg font-mono">{queryBalance}</strong>
                  )}
                </div>

                <div className="bg-bg/40 border border-line p-3 rounded-lg text-[10px] font-mono text-muted-foreground space-y-1">
                  <p className="text-indigo-900 font-bold">// ABI Read Functions</p>
                  <p>function getLeaseState() public view returns (enum State)</p>
                  <p>function getLockedDeposit() public view returns (uint256)</p>
                  <p>function getEscrowParties() public view returns (address, address)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
