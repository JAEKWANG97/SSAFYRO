import happyImg from './../../public/profile/happy.png'
import angryImg from './../../public/profile/angry.png'
import deadImg from './../../public/profile/dead.png'
import neutralImg from './../../public/profile/neutral.png'
import sadnessImg from './../../public/profile/sad.png'
import surprisedImg from './../../public/profile/suprised.png'
import vomitingImg from './../../public/profile/vomiting.png'


export function getEmotionImageColor(emotion) {
  switch(emotion) {
    case 'HAPPY':
      return happyImg;
    case 'SAD':
      return sadnessImg;
    case 'DISGUST':
      return vomitingImg;
    case 'ANGRY':
      return angryImg;
    case 'SURPRISED':
      return surprisedImg;
    case 'FEAR':
      return deadImg
    case 'NEUTRAL':
      return neutralImg;  
  }
}