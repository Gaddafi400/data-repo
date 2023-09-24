import { Card, SectionTitle, Portfolio } from '../components';
import location from '../assets/location.png';
import people from '../assets/people.png';
import btnarrow from '../assets/btnarrow.png';

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
        <Card
          title="Market Finder"
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
          <div className="w-[666px] h-[455.10px] bg-white rounded-[50px] shadow" />
          <div className="w-[750px] h-[510px] bg-white rounded-[50px] shadow" />
          <div className="w-[666px] h-[455.10px] bg-white rounded-[50px] shadow" />
        </div>

        <SectionTitle
          title="Daily Data"
          subtitle="Nigerian Data vividly visualized"
        />
        <div className="card-shape-2 align-element py-20">
          <div className="w-[666px] h-[500px] bg-white rounded-[50px] shadow" />
          <div className="w-[750px] h-[550px] bg-white rounded-[50px] shadow" />
          <div className="w-[659px] h-[500px] bg-white rounded-[50px] shadow" />
        </div>
      </section>

      <section className="fourth-section">
        <div className="text-slate-800 text-[64px] font-semibold font-['Poppins'] text-center">
          Stay updated with Data Insights
        </div>
        <form className="flex align-element">
          <input
            type="text"
            placeholder="Email address"
            className="border border-gray-300 py-5 px-5"
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
            <div className="w-[333px] h-[118px] bg-white rounded-[50px] cursor-pointer button">
              <span className="text-black text-[32px] font-medium font-['Poppins']">
                Start Now
              </span>
              <div className="w-[70px] h-[70px] bg-slate-800 rounded-full">
                <img src={btnarrow} alt="btnarrow" className="object-cover" />
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
