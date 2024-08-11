import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function EssayCorrectionsCarousel({ changedContent }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false, 
  };

  const correctionItems = changedContent
    .split(/(?<!\d)[.?!]\s+/)
    .map((sentence, index) => (
      <div key={index} className="p-4 text-sm text-gray-900 ">
        {sentence}
      </div>
    ));

  return <Slider {...settings}>{correctionItems}</Slider>;
}

export default EssayCorrectionsCarousel;
