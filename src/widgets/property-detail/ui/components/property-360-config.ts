export interface HotspotConfig {
  targetIndex: number
  label: string
  yaw: number
  pitch: number
}

export const ROOM_LABELS = [
  'Phòng khách',
  'Phòng ngủ',
  'Phòng vệ sinh',
  'Phòng bếp',
  'Ban công',
]

// Hotspots mapping for each room index
export const ROOM_HOTSPOTS: Record<number, HotspotConfig[]> = {
  0: [
    { targetIndex: 1, label: 'Đi tới Phòng ngủ', yaw: 45, pitch: -5 },
    { targetIndex: 3, label: 'Đi tới Phòng bếp', yaw: -60, pitch: -5 },
  ],
  1: [
    { targetIndex: 0, label: 'Đi tới Phòng khách', yaw: 230, pitch: -5 },
    { targetIndex: 2, label: 'Đi tới Phòng vệ sinh', yaw: 120, pitch: -10 },
  ],
  2: [{ targetIndex: 1, label: 'Đi tới Phòng ngủ', yaw: 300, pitch: -5 }],
  3: [
    { targetIndex: 0, label: 'Đi tới Phòng khách', yaw: 120, pitch: -5 },
    { targetIndex: 4, label: 'Đi ra Ban công', yaw: -80, pitch: -5 },
  ],
  4: [{ targetIndex: 3, label: 'Đi vào Phòng bếp', yaw: 100, pitch: -5 }],
}

export const ROOM_NARRATIVES = [
  'Chào mừng bạn đến với phòng khách. Không gian được thiết kế vô cùng rộng rãi, tràn ngập ánh sáng tự nhiên từ ban công, cực kỳ thích hợp để đón tiếp khách quý.',
  'Đây là phòng ngủ ấm cúng. Thiết kế hiện đại mang lại cảm giác thư giãn tuyệt đối sau ngày dài làm việc, có cửa sổ lớn đón gió mát.',
  'Phòng vệ sinh hiện đại, được lát gạch men cao cấp và trang bị đầy đủ các thiết bị vệ sinh thông minh, tiện nghi.',
  'Không gian bếp tiện nghi với thiết kế mở. Được trang bị sẵn tủ bếp cao cấp và bàn ăn xinh xắn, lý tưởng cho các bữa cơm gia đình.',
  'Ban công lộng gió với tầm nhìn vô cực tuyệt đẹp, là nơi hoàn hảo để trồng cây cảnh hoặc nhâm nhi tách trà vào mỗi tối.',
]
