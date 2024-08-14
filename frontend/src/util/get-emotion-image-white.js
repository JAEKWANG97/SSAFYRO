import happyImg from './../../public/emotion/happy_9294644.png'
import angryImg from './../../public/emotion/angry_2274563.png'
import deadImg from './../../public/emotion/dead_3746935.png'
import neutralImg from './../../public/emotion/neutral_3688059.png'
import sadnessImg from './../../public/emotion/sadness_7198866.png'
import surprisedImg from './../../public/emotion/surprised_3898405.png'
import vomitingImg from './../../public/emotion/vomiting_3688154.png'


export function getEmotionImage(emotion) {
  switch(emotion) {
    case 'HAPPY':
      return happyImg;
    case 'SAD':
      return sadnessImg;
    case 'DISGUST':
      return vomitingImg;
    case 'ANGRY':
      return angryImg;
    case 'SURPRISE':
      return surprisedImg;
    case 'FEAR':
      return deadImg
    case 'NEUTRAL':
      return neutralImg;  
  }
}