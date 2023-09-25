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
        showArrows={true}
        style={{ borderRadius: '20px !important' }}
      >
        <div className="carousel-item">
          <img src={image2} alt="Image 1" />
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
