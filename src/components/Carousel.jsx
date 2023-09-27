import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image from '../assets/image.jpg';
import image1 from '../assets/image3.jpg';
import image2 from '../assets/image2.jpg';

const MyCarousel = () => {
  const [centerPercentage, setCenterPercentage] = useState(100);

  useEffect(() => {
    // Update the centerPercentage based on the screen width
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setCenterPercentage(100); // Show one slide on mobile
      } else {
        setCenterPercentage(33.33); // Show three slides on larger screens
      }
    };

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Initial calculation
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        emulateTouch={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        centerMode={true}
        centerSlidePercentage={centerPercentage} // Dynamically set based on screen size
        showArrows={false}
        style={{ borderRadius: '20px !important', overflow: 'hidden' }}
      >
        <div className="carousel-item">
          <div
            style={{
              width: '100%',
              height: '533px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                color: 'black',
                border: '30px #292949 solid',
                fontSize: 40,
                fontFamily: 'Poppins',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}
            >
              DID YOU KNOW
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={image} alt="Image 2" />
        </div>
        <div className="carousel-item">
          <img src={image1} alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
