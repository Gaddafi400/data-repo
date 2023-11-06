import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bulb from '../assets/bulb.png';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png';
import c3 from '../assets/c3.png';
import c4 from '../assets/c4.png';
import c5 from '../assets/c5.png';
import c6 from '../assets/c6.png';

function getRandomImage() {
  const images = [bulb, c1, c2, c3, c4, c5, c6];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

const MyCarousel = ({ data }) => {
  const slideContentStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const imageStyles = {
    width: '120px',
  };

  console.log(getRandomImage());

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      emulateTouch={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
    >
      {data.map((item) => (
        <div className="c-parent" key={item?.id}>
          <div style={slideContentStyles}>
            <div className="circle-with-ding">
              <img src={getRandomImage()} alt="Icon 1" style={imageStyles} />
              <h2 className="font-semibold text-slate-800">DID YOU KNOW?</h2>
              <p>{item?.message}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

MyCarousel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MyCarousel;
