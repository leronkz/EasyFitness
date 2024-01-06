import CyclingIcon from '../img/assets/activity/cycling.svg';
import GymIcon from '../img/assets/activity/gym.svg';
import RunningIcon from '../img/assets/activity/running.svg';
import SwimmingIcon from '../img/assets/activity/swimming.svg';
import TrekkingIcon from '../img/assets/activity/trekking.svg';
import WalkingIcon from '../img/assets/activity/walk.svg';
import FootballIcon from '../img/assets/activity/football.svg';
import VolleyballIcon from '../img/assets/activity/volleyball.svg';
import OtherIcon from '../img/assets/activity/other.svg';

export const getIconFromType = (type: string) => {
  if(type === 'Gym') return GymIcon;
  if(type === 'Swimming') return SwimmingIcon;
  if(type === 'Running') return RunningIcon;
  if(type === 'Cycling') return CyclingIcon;
  if(type === 'Trekking') return TrekkingIcon;
  if(type === 'Walking') return WalkingIcon;
  if(type === 'Football') return FootballIcon;
  if(type === 'Volleyball') return VolleyballIcon;
  if(type === 'Other') return OtherIcon;
};