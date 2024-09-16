import { BsCode } from 'react-icons/bs';
import {
  FaShoppingBag,
  FaMusic,
  FaPaintBrush,
  FaCameraRetro,
  FaPlaneDeparture,
  FaPalette,
  FaUtensils,
} from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { RiPresentationLine } from 'react-icons/ri';

export const topics = [
  { name: 'coding', icon: <BsCode /> },
  { name: 'fashion', icon: <FaShoppingBag /> },
  { name: 'music', icon: <FaMusic /> },
  { name: 'art', icon: <FaPaintBrush /> },
  { name: 'photography', icon: <FaCameraRetro /> },
  { name: 'travel', icon: <FaPlaneDeparture /> },
  { name: 'makeup', icon: <FaPalette /> },
  { name: 'food', icon: <FaUtensils /> },
];

export const aboutAndContactLinks = [
  'About',
  'Newsroom',
  'Store',
  'Contact',
  'Careers',
  'ByteDance',
  'Creator Directory',
];

export const cliphubForGoodLinks = [
  'ClipHub for Good',
  'Advertise',
  'Developers',
  'Transparency',
  'ClipHub Rewards',
];

export const helpAndGuidelinesLinks = [
  'Help',
  'Safety',
  'Terms',
  'Privacy',
  'Creator Portal',
  'Community Guidelines',
];

export const dropdownMenuLinks = [
  { name: 'Profile', icon: <CgProfile /> },
  { name: 'DIY', icon: <RiPresentationLine /> },
  { name: 'Earnings', icon: <GrMoney /> },
];
