import { Card, SectionTitle, Portfolio, Carousel, Finder } from '../components';
import location from '../assets/location.png';
import people from '../assets/people.png';
import btnarrow from '../assets/btnarrow.png';
import finder from '../assets/finder.png';

const Landing = () => {
  return (
    <div>
      <section className="first-section">
        <Card
          title="Data Repository"
          imageUrl={location}
          description="
        Our platform serves as a comprehensive data repository where users 
        can easily access a wealth of valuable information on topics 
        ranging from the economy and the environment to education and more."
        />
      </section>

      <section className="second-section">
        <Finder
          title="Market Finder"
          imageUrl={finder}
          description="
            Our platform serves as a comprehensive data repository 
            where users can easily access a wealth of valuable information 
            on topics ranging from the economy and the environment to 
            education and more. "
          position="right"
        />
        <SectionTitle
          title="Uncommon Knowledge"
          subtitle="Collect vital data and thought-provoking insights into meaningful subjects."
        />
      </section>

      <section className="third-section">
        <div className="card-shape align-element py-20">
          <Carousel />
        </div>

        <SectionTitle
          title="Daily Data"
          subtitle="Nigerian Data vividly visualized"
        />
        <div className="card-shape-2 align-element py-20">
          <Carousel />
        </div>
      </section>

      <section className="fourth-section">
        {/* <div className="text-slate-800 text-[64px] font-semibold font-['Poppins'] text-center">
          Stay updated with Data Insights
        </div> */}
        <div className="text-slate-800 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold font-['Poppins'] text-center">
          Stay updated with Data Insights
        </div>

        <form className="flex align-element">
          <input
            type="text"
            placeholder="Email address"
            className="border border-gray-300 py-4 px-4"
          />

          <button type="submit" className="px-6 py-2 text-white ">
            subscribe now
          </button>
        </form>
        <Portfolio />
      </section>

      <section className="fifth-section">
        <div className="w-[1521px] h-[681px] bg-slate-800 rounded-[60px] last-card">
          <div className="last-card-content">
            <p className="text-white text-[64px] font-semibold font-['Poppins']">
              Your Reliable Platform For Seamless Search
            </p>
            <div className="bg-white rounded-[50px] cursor-pointer button">
              <span className="text-black text-[30px] font-medium">
                Start Now
              </span>
              <div className="w-[55px] h-[55px] bg-slate-800 rounded-full">
                <img
                  src={btnarrow}
                  alt="btnarrow"
                  className="object-cover w-[30] h-[30]"
                />
              </div>
            </div>
          </div>
          <img src={people} alt="people" className="object-cover people" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
