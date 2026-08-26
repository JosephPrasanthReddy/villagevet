export const livestockPhotos = {
  'cattle-dairy': {
    src: 'https://images.pexels.com/photos/10914633/pexels-photo-10914633.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Dairy cattle walking through a green farm landscape in Tamil Nadu, India',
    source: 'https://www.pexels.com/photo/cow-and-calf-on-farm-10914633/',
    photographer: 'Yoga Thiru',
    position: 'center 48%'
  },
  buffalo: {
    src: 'https://images.pexels.com/photos/21966883/pexels-photo-21966883.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Murrah buffalo feeding on a farm in Jaipur, India',
    source: 'https://www.pexels.com/photo/murrah-buffalo-eating-grain-on-farm-21966883/',
    photographer: 'Manish Meena',
    position: 'center 42%'
  },
  goat: {
    src: 'https://images.pexels.com/photos/15084412/pexels-photo-15084412.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Goat on a rural farm in Tamil Nadu, India',
    source: 'https://www.pexels.com/photo/goat-in-farm-15084412/',
    photographer: 'Soundarapandian MS',
    position: 'center 42%'
  },
  sheep: {
    src: 'https://images.pexels.com/photos/36462545/pexels-photo-36462545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Sheep in a sunny rural farm setting in Kolar, Karnataka, India',
    source: 'https://www.pexels.com/photo/closeup-of-sheep-on-farm-in-kolar-india-36462545/',
    photographer: 'Harshith K S',
    position: 'center 44%'
  },
  poultry: {
    src: 'https://images.pexels.com/photos/28928307/pexels-photo-28928307.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Free-range chickens on a farm in Tamil Nadu, India',
    source: 'https://www.pexels.com/photo/free-range-chickens-in-an-indian-farm-setting-28928307/',
    photographer: 'Prithiv Raj',
    position: 'center 48%'
  }
}

export const heroPhotos = [
  {
    src: 'https://images.pexels.com/photos/20356930/pexels-photo-20356930.jpeg?auto=compress&cs=tinysrgb&w=1800',
    alt: 'Indian women farmers with cattle in a village setting in Nagpur, India',
    source: 'https://www.pexels.com/photo/farmers-in-india-20356930/',
    photographer: 'EqualStock IN',
    label: 'Cattle & Dairy',
    position: 'center 46%'
  },
  {
    ...livestockPhotos.buffalo,
    label: 'Buffalo'
  },
  {
    ...livestockPhotos.poultry,
    label: 'Poultry'
  }
]
